import React, { useEffect } from 'react';

const CursorDots = ({ count = 10 }) => {
  useEffect(() => {
    const container = document.createElement('div');
    container.className = 'cursor-dots';
    document.body.appendChild(container);

    const dots = [];
    for (let i = 0; i < count; i++) {
      const d = document.createElement('div');
      d.className = 'cursor-dot';
      d.style.opacity = `${1 - i / (count * 1.4)}`;
      d.style.width = `${10 + (i % 3)}px`;
      d.style.height = d.style.width;
      container.appendChild(d);
      dots.push({ el: d, x: window.innerWidth / 2, y: window.innerHeight / 2 });
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', onMove);

    let rafId;
    const render = () => {
      let lastX = mouseX;
      let lastY = mouseY;
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        // ease towards previous dot / mouse
        dot.x += (lastX - dot.x) * (0.18 + i * 0.01);
        dot.y += (lastY - dot.y) * (0.18 + i * 0.01);
        dot.el.style.transform = `translate3d(${dot.x - (parseFloat(dot.el.style.width) / 2)}px, ${dot.y - (parseFloat(dot.el.style.height) / 2)}px, 0)`;
        lastX = dot.x;
        lastY = dot.y;
      }
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      if (container.parentNode) container.parentNode.removeChild(container);
    };
  }, [count]);

  return null;
};

export default CursorDots;
