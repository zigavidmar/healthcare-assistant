"use client";
import { useRef, useEffect } from "react";

export default function WaveformVisualizer({
  analyser,
}: {
  analyser: AnalyserNode | null | undefined;
}) {
  const canvasRef = useRef(null);
  const dataArrayRef = useRef(new Uint8Array(0));

  useEffect(() => {
    if (!analyser) return;

    analyser.fftSize = 1024;
    dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function drawWaveform() {
      if (!canvas || !ctx || !analyser) return;

      analyser.getByteTimeDomainData(dataArrayRef.current);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.strokeStyle = "#4f46e5"; // Indigo color
      ctx.lineWidth = 2;

      const sliceWidth = canvas.width / dataArrayRef.current.length;
      let x = 0;

      for (let i = 0; i < dataArrayRef.current.length; i++) {
        const v = dataArrayRef.current[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.stroke();
      requestAnimationFrame(drawWaveform);
    }

    drawWaveform();
  }, [analyser]);

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={100}
      className="bg-white rounded w-full"
    />
  );
}
