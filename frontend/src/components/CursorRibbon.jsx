import { useEffect } from 'react';

const CursorRibbon = () => {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.className = 'cursor-ribbon';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(canvas);

    const trailLifetime = 780;
    const points = [];
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;
    let animationFrame = 0;

    const resizeCanvas = () => {
      viewportWidth = window.innerWidth;
      viewportHeight = window.innerHeight;
      canvas.width = Math.round(viewportWidth * pixelRatio);
      canvas.height = Math.round(viewportHeight * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      points.length = 0;
    };

    const drawRibbon = (time) => {
      animationFrame = 0;
      context.clearRect(0, 0, viewportWidth, viewportHeight);

      while (points.length && time - points[0].time > trailLifetime) {
        points.shift();
      }

      if (points.length > 1) {
        const firstPoint = points[0];
        const lastPoint = points[points.length - 1];
        const gradient = context.createLinearGradient(
          firstPoint.x,
          firstPoint.y,
          lastPoint.x,
          lastPoint.y
        );
        gradient.addColorStop(0, '#5227ff');
        gradient.addColorStop(0.55, '#a855f7');
        gradient.addColorStop(1, '#57f0ff');

        context.lineCap = 'round';
        context.lineJoin = 'round';

        for (let index = 1; index < points.length; index += 1) {
          const previous = points[index - 1];
          const point = points[index];
          const progress = index / (points.length - 1);
          const fade = Math.max(0, 1 - (time - point.time) / trailLifetime);
          const thickness = 14 * Math.pow(progress, 0.55) * fade;
          if (thickness < 0.2) continue;

          const deltaX = point.x - previous.x;
          const deltaY = point.y - previous.y;
          const distance = Math.hypot(deltaX, deltaY) || 1;
          const wave = Math.sin(time * 0.004 + index * 0.32) * 2.6 * progress;
          const offsetX = (-deltaY / distance) * wave;
          const offsetY = (deltaX / distance) * wave;
          const midX = (previous.x + point.x) / 2 + offsetX;
          const midY = (previous.y + point.y) / 2 + offsetY;
          const endX = point.x + offsetX;
          const endY = point.y + offsetY;

          context.globalAlpha = fade * 0.82;
          context.strokeStyle = gradient;
          context.lineWidth = thickness;
          context.shadowColor = '#5227ff';
          context.shadowBlur = 18;
          context.beginPath();
          context.moveTo(previous.x, previous.y);
          context.quadraticCurveTo(midX, midY, endX, endY);
          context.stroke();

          context.globalAlpha = fade * 0.48;
          context.strokeStyle = 'rgba(255, 255, 255, 0.9)';
          context.lineWidth = Math.max(0.7, thickness * 0.12);
          context.shadowBlur = 0;
          context.beginPath();
          context.moveTo(previous.x, previous.y);
          context.quadraticCurveTo(midX, midY, endX, endY);
          context.stroke();
        }

        context.globalAlpha = 1;
        context.shadowBlur = 0;
      }

      if (points.length > 1) {
        animationFrame = window.requestAnimationFrame(drawRibbon);
      } else {
        points.length = 0;
      }
    };

    const handlePointerMove = (event) => {
      if (event.pointerType === 'touch') return;

      const time = performance.now();
      const previous = points[points.length - 1];

      if (!previous) {
        points.push({ x: event.clientX, y: event.clientY, time });
        return;
      }

      const distance = Math.hypot(event.clientX - previous.x, event.clientY - previous.y);
      const steps = Math.min(32, Math.max(1, Math.ceil(distance / 10)));

      for (let step = 1; step <= steps; step += 1) {
        const progress = step / steps;
        points.push({
          x: previous.x + (event.clientX - previous.x) * progress,
          y: previous.y + (event.clientY - previous.y) * progress,
          time
        });
      }

      if (points.length > 96) {
        points.splice(0, points.length - 96);
      }

      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(drawRibbon);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointermove', handlePointerMove);
      canvas.remove();
    };
  }, []);

  return null;
};

export default CursorRibbon;
