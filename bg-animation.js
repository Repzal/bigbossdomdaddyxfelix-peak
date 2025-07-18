// Animated pastel bubbles background
const canvas = document.createElement('canvas');
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100vw';
canvas.style.height = '100vh';
canvas.style.zIndex = '1';
canvas.style.pointerEvents = 'none';
document.body.appendChild(canvas);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const pastelColors = [
  'rgba(255, 179, 198, 0.35)', // pastel pink
  'rgba(182, 255, 200, 0.35)', // pastel green
  'rgba(255, 233, 244, 0.25)',
  'rgba(211, 255, 229, 0.20)'
];

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

let bubbles = Array.from({length: 20}, () => ({
  x: randomBetween(0, canvas.width),
  y: randomBetween(0, canvas.height),
  r: randomBetween(40, 100),
  dx: randomBetween(-0.3, 0.3),
  dy: randomBetween(0.2, 0.6),
  color: pastelColors[Math.floor(Math.random() * pastelColors.length)]
}));

function animate() {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bubbles.forEach(bub => {
    ctx.beginPath();
    ctx.arc(bub.x, bub.y, bub.r, 0, Math.PI * 2);
    ctx.fillStyle = bub.color;
    ctx.fill();
    bub.y += bub.dy;
    bub.x += bub.dx;
    if (bub.y - bub.r > canvas.height) {
      bub.y = -bub.r;
      bub.x = randomBetween(0, canvas.width);
      bub.r = randomBetween(40, 100);
      bub.dx = randomBetween(-0.3, 0.3);
      bub.dy = randomBetween(0.2, 0.6);
      bub.color = pastelColors[Math.floor(Math.random() * pastelColors.length)];
    }
    if (bub.x - bub.r > canvas.width || bub.x + bub.r < 0) {
      bub.x = randomBetween(0, canvas.width);
    }
  });
  requestAnimationFrame(animate);
}
animate();
