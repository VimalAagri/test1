function initProjectsScene() {
  const projectsCanvas = document.getElementById("projectsCanvas");

  if (!projectsCanvas || !window.THREE || window.innerWidth <= 768) {
    projectsCanvas?.remove();
    return;
  }

  const projectsScene = new THREE.Scene();
  const projectsCamera = new THREE.PerspectiveCamera(
    75,
    projectsCanvas.clientWidth / projectsCanvas.clientHeight,
    0.1,
    1000
  );
  const projectsRenderer = new THREE.WebGLRenderer({
    canvas: projectsCanvas,
    alpha: true,
    antialias: false,
    powerPreference: "high-performance",
  });

  projectsRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  projectsRenderer.setSize(projectsCanvas.clientWidth, projectsCanvas.clientHeight);
  projectsCamera.position.z = 5;

  const particles = [];
  const geometry = new THREE.SphereGeometry(0.008, 4, 4);

  for (let index = 0; index < 60; index += 1) {
    const particle = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({ color: 0x00ffff })
    );

    particle.position.set(
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 2
    );
    particle.userData = {
      xSpeed: (Math.random() - 0.5) * 0.005,
      ySpeed: (Math.random() - 0.5) * 0.005,
    };

    projectsScene.add(particle);
    particles.push(particle);
  }

  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x00ffff,
    transparent: true,
    opacity: 0.2,
  });
  let frameSkip = 0;

  function createConnections() {
    projectsScene.children = projectsScene.children.filter((object) => object.type !== "Line");

    for (let i = 0; i < particles.length; i += 1) {
      for (let j = i + 1; j < particles.length; j += 1) {
        if (particles[i].position.distanceTo(particles[j].position) < 1.2) {
          const lineGeometry = new THREE.BufferGeometry().setFromPoints([
            particles[i].position,
            particles[j].position,
          ]);
          projectsScene.add(new THREE.Line(lineGeometry, lineMaterial));
        }
      }
    }
  }

  function animateProjects() {
    requestAnimationFrame(animateProjects);

    particles.forEach((particle) => {
      particle.position.x += particle.userData.xSpeed;
      particle.position.y += particle.userData.ySpeed;
    });

    frameSkip += 1;
    if (frameSkip % 3 === 0) createConnections();
    projectsRenderer.render(projectsScene, projectsCamera);
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth <= 768) projectsCanvas.remove();
  });

  animateProjects();
}

initProjectsScene();
