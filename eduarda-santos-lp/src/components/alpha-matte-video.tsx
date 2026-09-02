"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * Vídeo com transparência real em qualquer navegador — inclusive o Safari
 * do iOS.
 *
 * Nenhum formato de vídeo com alfa atende a web inteira: o VP9 com canal
 * alfa (o `seal.webm` do hero) não é composto pelo Safari, e o único que
 * ele aceita é HEVC com alpha layer, que só se codifica no VideoToolbox da
 * Apple. Por isso o alfa aqui vai embutido no próprio arquivo como **matte
 * empacotado**: o MP4 tem o dobro da altura do recorte visível — metade de
 * cima é a cor (já pré-multiplicada, preto onde é transparente), metade de
 * baixo é a máscara em tons de cinza (preto = transparente, branco =
 * opaco). Um shader remonta as duas metades em um único RGBA e desenha num
 * <canvas>, que tem alfa nativo.
 *
 * Não é chroma key nem truque de CSS: a máscara é um canal de verdade, com
 * as bordas suaves do render original preservadas. H.264 comum, decodificado
 * em hardware, um arquivo só para todos os navegadores.
 *
 * Enquanto o primeiro quadro não é desenhado — e para sempre, se faltar
 * WebGL ou o autoplay for bloqueado (Modo de Baixo Consumo do iOS) — fica o
 * `poster`, que também carrega alfa real. Em nenhum estado existe um
 * retângulo opaco.
 */

const VERTEX_SRC = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = vec2((a_pos.x + 1.0) * 0.5, (1.0 - a_pos.y) * 0.5);
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAGMENT_SRC = `
precision mediump float;
uniform sampler2D u_frame;
varying vec2 v_uv;
void main() {
  vec3 rgb = texture2D(u_frame, vec2(v_uv.x, v_uv.y * 0.5)).rgb;
  float a = texture2D(u_frame, vec2(v_uv.x, v_uv.y * 0.5 + 0.5)).r;
  // A cor chega pré-multiplicada, então nenhum canal deveria passar do
  // alfa. A compressão com perdas faz passar por frações de nível nas
  // bordas, e num contexto premultiplied isso vira um fio claro em volta
  // da imagem — exatamente o halo que este arquivo existe para não ter.
  gl_FragColor = vec4(min(rgb, vec3(a)), a);
}
`;

type AlphaMatteVideoProps = {
  src: string;
  poster: string;
  /** Dimensões do recorte visível — a metade de cima do arquivo. */
  width: number;
  height: number;
  className?: string;
  /** Toca enquanto true, pausa quando false. */
  playing?: boolean;
  loop?: boolean;
};

export function AlphaMatteVideo({
  src,
  poster,
  width,
  height,
  className,
  playing = true,
  loop = true,
}: AlphaMatteVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [painting, setPainting] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      depth: false,
      stencil: false,
    });
    // Sem WebGL não há composição possível: o poster com alfa fica no lugar.
    if (!gl) return;

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const vertex = compile(gl.VERTEX_SHADER, VERTEX_SRC);
    const fragment = compile(gl.FRAGMENT_SHADER, FRAGMENT_SRC);
    const program = gl.createProgram();
    if (!vertex || !fragment || !program) return;

    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    // Um triângulo que cobre a tela inteira — mais barato que dois de um
    // quad e sem a costura diagonal no meio.
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const position = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    // NEAREST, não LINEAR: o canvas tem exatamente a resolução de meio
    // arquivo, então cada texel cai em um pixel e o filtro só faria mal —
    // interpolar na costura puxaria pixels da máscara para dentro da imagem.
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 0);

    let painted = false;
    const paint = () => {
      if (video.readyState < 2) return;
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, video);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!painted) {
        painted = true;
        setPainting(true);
      }
    };

    // `requestVideoFrameCallback` acorda uma vez por quadro do vídeo e para
    // sozinho quando o vídeo pausa ou termina; o rAF acordaria a 60/s de
    // qualquer jeito, redesenhando o mesmo quadro várias vezes.
    let rafId = 0;
    let frameId = 0;
    // O lib.dom declara rVFC como obrigatório, mas o Safari só ganhou o
    // método na 15.4 — daí a checagem em runtime e o tipo alargado à mão.
    const scheduler: ((cb: () => void) => number) | undefined =
      typeof video.requestVideoFrameCallback === "function"
        ? video.requestVideoFrameCallback.bind(video)
        : undefined;
    const loopFrames = () => {
      paint();
      if (scheduler) frameId = scheduler(loopFrames);
      else rafId = requestAnimationFrame(loopFrames);
    };
    loopFrames();

    // Com rVFC nada dispara enquanto o vídeo está parado — o que inclui o
    // caso de nascer pausado sob prefers-reduced-motion (`loadeddata`) e o
    // de um clipe sem loop que já chegou ao fim (`ended`), onde o último
    // quadro precisa ficar desenhado no canvas.
    video.addEventListener("loadeddata", paint);
    video.addEventListener("ended", paint);

    return () => {
      video.removeEventListener("loadeddata", paint);
      video.removeEventListener("ended", paint);
      if (scheduler) video.cancelVideoFrameCallback(frameId);
      else cancelAnimationFrame(rafId);
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, []);

  // A reprodução é dirigida por prop, não pelo atributo `autoplay`: este
  // clipe só pode começar quando a seção entra na tela, e `autoplay` não
  // reage a mudanças de prop depois de já ter iniciado.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      video.play().catch(() => {
        // Autoplay bloqueado: o poster com alfa já conta a história.
      });
    } else {
      video.pause();
    }
  }, [playing]);

  return (
    <div className={`relative ${className ?? ""}`}>
      {/* O poster dá a caixa (e portanto o aspecto) para o canvas absoluto
          por cima, além de ser o estado de fallback. */}
      <Image
        src={poster}
        alt=""
        width={width}
        height={height}
        className={`block h-auto w-full transition-opacity duration-300 ${
          painting ? "opacity-0" : "opacity-100"
        }`}
      />
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${
          painting ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* Fora de vista, mas nunca `display:none`: o iOS se recusa a decodificar
          um vídeo removido do layout, e é dele que sai cada textura. */}
      <video
        ref={videoRef}
        src={src}
        className="pointer-events-none absolute top-0 left-0 h-px w-px opacity-0"
        loop={loop}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />
    </div>
  );
}
