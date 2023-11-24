function createRandomShapes() {
  const container = document.querySelector("body");
  const shapeCount = calculateShapeCount();

  for (let i = 0; i < shapeCount; i++) {
    const shape = document.createElement("div");
    shape.className = "shape";

    const branchCount = Math.floor(Math.random() * 50) + 100; // Número aleatorio entre 1 y 5
    for (let j = 0; j < branchCount; j++) {
      const star = document.createElement("div");
      star.className = "star";
      star.style.width = Math.random() * 2 + "px";
      star.style.height = star.style.width;
      star.style.top = Math.random() * 100 + "%";
      star.style.left = Math.random() * 100 + "%";
      shape.appendChild(star);
    }

    connectStars(shape);

    container.appendChild(shape);
  }
}

function calculateShapeCount() {
  const zoomLevel = window.devicePixelRatio || 1;
  const baseShapeCount = 50;

  return Math.floor(baseShapeCount - zoomLevel * 10);
}

function connectStars(shape) {
  const stars = shape.querySelectorAll(".star");
  const starArray = Array.from(stars);

  starArray.forEach((star, index) => {
    const nextStar = starArray[(index + 1) % starArray.length];
    const line = createLineBetweenStars(star, nextStar);
    shape.appendChild(line);
  });
}

function createLineBetweenStars(star1, star2) {
  const line = document.createElement("div");
  line.className = "line";
  const angle = Math.atan2(star2.offsetTop - star1.offsetTop, star2.offsetLeft - star1.offsetLeft);
  const distance = Math.hypot(star2.offsetTop - star1.offsetTop, star2.offsetLeft - star1.offsetLeft);
  line.style.width = distance + "px";
  line.style.transform = `rotate(${angle}rad)`;
  line.style.top = star1.offsetTop + star1.offsetHeight / 2 + "px";
  line.style.left = star1.offsetLeft + star1.offsetWidth / 2 + "px";
  return line;
}

createRandomShapes();

window.addEventListener("resize", function () {
  const container = document.querySelector("body");
  const shapes = document.querySelectorAll(".shape");

  shapes.forEach(shape => container.removeChild(shape));

  createRandomShapes();
});

document.addEventListener("DOMContentLoaded", function () {
  const backgroundMusic = document.getElementById("backgroundMusic");
  backgroundMusic.play(); // Iniciar reproducción automáticamente
});