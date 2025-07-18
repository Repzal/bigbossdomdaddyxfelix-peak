// Animated pastel bubbles background with fade and blur
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
  'rgba(255, 179, 198, 0.36)',
  'rgba(182, 255, 200, 0.32)',
  'rgba(255, 233, 244, 0.26)',
  'rgba(211, 255, 229, 0.20)'
];

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

let bubbles = Array.from({length: 23}, () => ({
  x: randomBetween(0, canvas.width),
  y: randomBetween(0, canvas.height),
  r: randomBetween(55, 120),
  dx: randomBetween(-0.18, 0.18),
  dy: randomBetween(0.18, 0.42),
  color: pastelColors[Math.floor(Math.random() * pastelColors.length)],
  opacity: randomBetween(0.65, 1),
  fade: randomBetween(0.002, 0.005)
}));

function animate() {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bubbles.forEach(bub => {
    ctx.save();
    ctx.globalAlpha = bub.opacity;
    ctx.filter = 'blur(11px)';
    ctx.beginPath();
    ctx.arc(bub.x, bub.y, bub.r, 0, Math.PI * 2);
    ctx.fillStyle = bub.color;
    ctx.fill();
    ctx.restore();
    bub.y += bub.dy;
    bub.x += bub.dx;
    bub.opacity += bub.fade;
    if (bub.opacity > 1) bub.fade = -Math.abs(bub.fade);
    if (bub.opacity < 0.42) bub.fade = Math.abs(bub.fade);

    // Reset bubble if out of bounds
    if (bub.y - bub.r > canvas.height) {
      bub.y = -bub.r;
      bub.x = randomBetween(0, canvas.width);
      bub.r = randomBetween(55, 120);
      bub.dx = randomBetween(-0.18, 0.18);
      bub.dy = randomBetween(0.18, 0.42);
      bub.color = pastelColors[Math.floor(Math.random() * pastelColors.length)];
      bub.opacity = randomBetween(0.65, 1);
      bub.fade = randomBetween(0.002, 0.005);
    }
    if (bub.x - bub.r > canvas.width || bub.x + bub.r < 0) {
      bub.x = randomBetween(0, canvas.width);
    }
  });
  requestAnimationFrame(animate);
}
animate();
