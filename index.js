/* =====================================================
NAVBAR TOGGLE
===================================================== */

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if(menuBtn && mobileMenu){

menuBtn.addEventListener("click", () => {

mobileMenu.classList.toggle("hidden");

});

document.querySelectorAll("#mobileMenu a").forEach(link => {

link.addEventListener("click", () => {

mobileMenu.classList.add("hidden");

});

});

}


/* =====================================================
OPTIMIZED CURSOR (NO LAG)
===================================================== */

const cursor = document.getElementById("cursor");
const trail = document.getElementById("trail");

if(cursor && trail){

let mouseX = 0;
let mouseY = 0;

let cursorX = 0;
let cursorY = 0;

let trailX = 0;
let trailY = 0;

window.addEventListener("mousemove", e => {

mouseX = e.clientX;
mouseY = e.clientY;

});

function animateCursor(){

requestAnimationFrame(animateCursor);

cursorX += (mouseX - cursorX) * 0.2;
cursorY += (mouseY - cursorY) * 0.2;

trailX += (mouseX - trailX) * 0.08;
trailY += (mouseY - trailY) * 0.08;

cursor.style.transform =
`translate(${cursorX}px, ${cursorY}px)`;

trail.style.transform =
`translate(${trailX}px, ${trailY}px)`;

}

animateCursor();

}


/* =====================================================
TYPING EFFECT
===================================================== */

if(document.getElementById("typing")){

new Typed("#typing", {

strings: [
"Full Stack Developer",
"Software Developer",
"MCA (AI & ML) Graduate",
"Artificial Intelligence & Machine Learning Enthusiast",
"Building Modern Web Applications"
],

typeSpeed: 50,
backSpeed: 30,
loop: true

});

}


/* =====================================================
HERO SECTION THREE.JS (OPTIMIZED)
===================================================== */

const heroCanvas = document.getElementById("canvas");

if(heroCanvas){

const heroScene = new THREE.Scene();

const heroCamera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

const heroRenderer = new THREE.WebGLRenderer({
canvas: heroCanvas,
antialias:false,
powerPreference:"high-performance"
});

heroRenderer.setSize(window.innerWidth,window.innerHeight);

heroRenderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5));

heroCamera.position.z = 4;


/* Stars */

const heroStarGeometry = new THREE.BufferGeometry();
const heroStarVertices = [];

const STAR_COUNT = 2000;

for(let i=0;i<STAR_COUNT;i++){

heroStarVertices.push(
(Math.random()-0.5)*1500,
(Math.random()-0.5)*1500,
(Math.random()-0.5)*1500
);

}

heroStarGeometry.setAttribute(
"position",
new THREE.Float32BufferAttribute(heroStarVertices,3)
);

const heroStarMaterial = new THREE.PointsMaterial({
color:0xffffff,
size:1
});

const heroStars = new THREE.Points(heroStarGeometry,heroStarMaterial);

heroScene.add(heroStars);


/* Hex ball */

const heroGeometry = new THREE.IcosahedronGeometry(1.2,1);

const heroMaterial = new THREE.MeshStandardMaterial({
color:0x00ffff,
wireframe:true
});

const heroHexBall = new THREE.Mesh(heroGeometry,heroMaterial);

heroScene.add(heroHexBall);


/* Light */

const heroLight = new THREE.PointLight(0xffffff,1);

heroLight.position.set(5,5,5);

heroScene.add(heroLight);


/* Mouse interaction */

window.addEventListener("mousemove",e=>{

heroHexBall.rotation.x=e.clientY*0.001;
heroHexBall.rotation.y=e.clientX*0.001;

});


/* Animation */

function animateHero(){

requestAnimationFrame(animateHero);

heroHexBall.rotation.z+=0.002;
heroStars.rotation.y+=0.0001;

heroRenderer.render(heroScene,heroCamera);

}

animateHero();

}


/* =====================================================
PROJECTS NEURAL NETWORK (OPTIMIZED)
===================================================== */

const projectsCanvas = document.getElementById("projectsCanvas");

if(projectsCanvas){

const projectsScene = new THREE.Scene();

const projectsCamera = new THREE.PerspectiveCamera(
75,
projectsCanvas.clientWidth/projectsCanvas.clientHeight,
0.1,
1000
);

const projectsRenderer = new THREE.WebGLRenderer({
canvas:projectsCanvas,
alpha:true,
antialias:false,
powerPreference:"high-performance"
});

projectsRenderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5));

projectsRenderer.setSize(
projectsCanvas.clientWidth,
projectsCanvas.clientHeight
);

projectsCamera.position.z = 5;


const particles=[];
const geometry=new THREE.SphereGeometry(0.008,4,4);

const PARTICLE_COUNT = 60;

for(let i=0;i<PARTICLE_COUNT;i++){

const material=new THREE.MeshBasicMaterial({color:0x00ffff});

const particle=new THREE.Mesh(geometry,material);

particle.position.set(
(Math.random()-0.5)*10,
(Math.random()-0.5)*6,
(Math.random()-0.5)*2
);

particle.userData={
xSpeed:(Math.random()-0.5)*0.005,
ySpeed:(Math.random()-0.5)*0.005
};

projectsScene.add(particle);
particles.push(particle);

}


const lineMaterial=new THREE.LineBasicMaterial({
color:0x00ffff,
transparent:true,
opacity:0.2
});


let frameSkip=0;

function createConnections(){

projectsScene.children =
projectsScene.children.filter(obj=>obj.type!=="Line");

for(let i=0;i<particles.length;i++){

for(let j=i+1;j<particles.length;j++){

const dist=
particles[i].position.distanceTo(particles[j].position);

if(dist<1.2){

const geo=new THREE.BufferGeometry().setFromPoints([
particles[i].position,
particles[j].position
]);

const line=new THREE.Line(geo,lineMaterial);

projectsScene.add(line);

}

}

}

}


function animateProjects(){

requestAnimationFrame(animateProjects);

particles.forEach(p=>{

p.position.x+=p.userData.xSpeed;
p.position.y+=p.userData.ySpeed;

});

frameSkip++;

if(frameSkip % 3 === 0){
createConnections();
}

projectsRenderer.render(projectsScene,projectsCamera);

}

animateProjects();

}

/* Remove projectsCanvas on mobile */

if (window.innerWidth <= 768) {

  const projectsCanvas = document.getElementById("projectsCanvas");

  if (projectsCanvas) {
    projectsCanvas.remove();
  }

}

function handleProjectsCanvas(){

  const projectsCanvas = document.getElementById("projectsCanvas");

  if(window.innerWidth <= 768){

    if(projectsCanvas){
      projectsCanvas.remove();
    }

  }

}

handleProjectsCanvas();

window.addEventListener("resize", handleProjectsCanvas);


/* =====================================================
CONTACT FORM
===================================================== */

const form=document.getElementById("contactForm");

if(form){

const scriptURL="https://script.google.com/macros/s/AKfycbyKAUlYwPk51R71KJ_f56xtjTKCUtiWs5dDt2UUh_Oigb2R0hXbmw-y6ea3af0q8RnmKA/exec";

const status=document.getElementById("formStatus");

form.addEventListener("submit",async e=>{

e.preventDefault();

const formData=new FormData(form);

const data={
name:formData.get("name"),
email:formData.get("email"),
phone:formData.get("phone"),
message:formData.get("message")
};

try{

await fetch(scriptURL,{
method:"POST",
mode:"no-cors",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(data)
});

status.classList.remove("hidden");

form.reset();

}catch{

alert("Error sending message");

}

});

}


/* =====================================================
SCROLL TO TOP BUTTON
===================================================== */

const scrollBtn=document.getElementById("scrollTopBtn");

if(scrollBtn){

window.addEventListener("scroll",()=>{

if(window.scrollY>300)
scrollBtn.classList.remove("hidden");
else
scrollBtn.classList.add("hidden");

});

scrollBtn.addEventListener("click",()=>{

window.scrollTo({
top:0,
behavior:"smooth"
});

});

}