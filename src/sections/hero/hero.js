function initTypingEffect() {
  if (!document.getElementById("typing") || !window.Typed) return;

  new Typed("#typing", {
    strings: [
      "Full Stack Developer",
      "Laravel, Bootstrap & MySQL Developer",
      "MERN Stack Developer",
      "Docker-ready Web Application Builder",
      "Software Developer",
      "MCA (AI & ML) Graduate",
      "Artificial Intelligence Enthusiast",
      "Building Modern Web Applications",
    ],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true,
  });
}

function initHeroScene() {
  const heroCanvas = document.getElementById("canvas");

  if (!heroCanvas || !window.THREE) return;

  const heroScene = new THREE.Scene();
  const heroCamera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const heroRenderer = new THREE.WebGLRenderer({
    canvas: heroCanvas,
    antialias: false,
    powerPreference: "high-performance",
  });

  heroRenderer.setSize(window.innerWidth, window.innerHeight);
  heroRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  heroCamera.position.z = 4;

  const heroStarGeometry = new THREE.BufferGeometry();
  const heroStarVertices = [];

  for (let index = 0; index < 2000; index += 1) {
    heroStarVertices.push(
      (Math.random() - 0.5) * 1500,
      (Math.random() - 0.5) * 1500,
      (Math.random() - 0.5) * 1500
    );
  }

  heroStarGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(heroStarVertices, 3)
  );

  const heroStars = new THREE.Points(
    heroStarGeometry,
    new THREE.PointsMaterial({ color: 0xffffff, size: 1 })
  );
  const heroHexBall = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.2, 1),
    new THREE.MeshStandardMaterial({ color: 0x00ffff, wireframe: true })
  );
  const heroLight = new THREE.PointLight(0xffffff, 1);

  heroLight.position.set(5, 5, 5);
  heroScene.add(heroStars);
  heroScene.add(heroHexBall);
  heroScene.add(heroLight);

  window.addEventListener("mousemove", (event) => {
    heroHexBall.rotation.x = event.clientY * 0.001;
    heroHexBall.rotation.y = event.clientX * 0.001;
  });

  window.addEventListener("resize", () => {
    heroCamera.aspect = window.innerWidth / window.innerHeight;
    heroCamera.updateProjectionMatrix();
    heroRenderer.setSize(window.innerWidth, window.innerHeight);
  });

  function animateHero() {
    requestAnimationFrame(animateHero);
    heroHexBall.rotation.z += 0.002;
    heroStars.rotation.y += 0.0001;
    heroRenderer.render(heroScene, heroCamera);
  }

  animateHero();
}

initTypingEffect();
initHeroScene();
