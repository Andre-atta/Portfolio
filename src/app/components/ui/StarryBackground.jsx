import React, { useRef, useEffect } from "react";

const STAR_MIN_RADIUS = 0.7;
const STAR_MAX_RADIUS = 1.8;
const TWINKLE_SPEED = 0.04;

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function getStarCount(width, height) {
  const area = width * height;
  return Math.max(30, Math.min(180, Math.round(area / 7000)));
}

function createStars(width, height, count) {
  return Array.from({ length: count }).map(() => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: randomBetween(STAR_MIN_RADIUS, STAR_MAX_RADIUS),
    baseAlpha: randomBetween(0.5, 1),
    twinklePhase: Math.random() * Math.PI * 2,
    twinkleSpeed: randomBetween(0.5, 1.5) * TWINKLE_SPEED,
  }));
}

const StarryBackground = () => {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const animationRef = useRef();

  useEffect(() => {
    // Tutto il codice che usa window va qui dentro
    const dpr = window.devicePixelRatio || 1;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    const starCount = getStarCount(width, height);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    starsRef.current = createStars(width, height, starCount);

    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (const star of starsRef.current) {
        const twinkle = Math.sin(performance.now() * star.twinkleSpeed + star.twinklePhase) * 0.3 + 0.7;
        ctx.globalAlpha = star.baseAlpha * twinkle;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.shadowColor = "#fff";
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(draw);
    }
    draw();

    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      const starCount = getStarCount(width, height);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      starsRef.current = createStars(width, height, starCount);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 bg-transparent"
      aria-hidden="true"
    />
  );
};

export default StarryBackground;
