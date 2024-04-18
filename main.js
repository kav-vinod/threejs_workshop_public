//WORKSHOP PLAN

//cover basics first of any scene - scnee, camera, renderer and touch on lighting 
//then do a quick overview of some essential elements - geometries, materials, animation. Contrast Mesh basic vs. Mesh Standard and the importance of lighting when using the latter.

//create a sun (spheres) + animate w/ rotation around y axis
//have a "solar system" of maybe 3-4 "planets" attached to the sun (so it'll rotate around the sun) but they won't be spheres, I can maybe have a tetrahedral, an isocahedron, and another fun shape
//will attempt to make Saturn bc that might be fun - think I can manipulate a torus so it's flat and put a sphere in the middle
//May make Earth as well for the aesthetic

//IF TIME PERMITS
//Simple camera movement through event handlers when arrows clicked
//I may cover camera rotation as well thorugh using sin/cos to make the camera move in a circle, in case you have a reason for wanting to move the object in a circle independently w/o it being tied to another object's rotation

//an add on 

// Create scene
const scene = new THREE.Scene();

// Create camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 200;
camera.position.y = 30;
// Create renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Up to this point is kinda the same in a lot of Three.js scenes

// Create a point light
const ambientLight = new THREE.AmbientLight(0xffffff);
//ambientLight.intensity = 100; 
const pointLight = new THREE.PointLight(0xffffff);
const pointLight2 = new THREE.PointLight(0xffffff);
//pointLight.intensity = 100;
pointLight.position.set(0, 0, 200); // Set position of the light
pointLight2.position.set(0, 50, 0); // Set position of the light
scene.add(pointLight);
scene.add(pointLight2);

// Create geometries (cube)
const octGeo = new THREE.OctahedronGeometry(10, 0);
const sphereGeo =  new THREE.SphereGeometry(10, 32, 32);
const icosGeo = new THREE.IcosahedronGeometry(10, 0);
const torusGeo = new THREE.TorusGeometry(20, 5, 2, 100);

//texture + material for sun
const textureSun = new THREE.TextureLoader().load("suntexture.jpg");
const sunMaterial = new THREE.MeshStandardMaterial({ map: textureSun });

// Create material for octahedron
const octMaterial = new THREE.MeshStandardMaterial({ color: 0xaddfad });

//material for icosahedron
const icosMaterial = new THREE.MeshStandardMaterial({ color: 0x800000 });

//texture + material for Saturn
const textureSat = new THREE.TextureLoader().load("saturntexture.jpg");
const satMaterial = new THREE.MeshStandardMaterial({ map: textureSat });


// Create meshes for planets 
const sun = new THREE.Mesh(sphereGeo, sunMaterial);
const octPlanet = new THREE.Mesh(octGeo, octMaterial);
const icosPlanet = new THREE.Mesh(icosGeo, icosMaterial);
const satSphere = new THREE.Mesh(sphereGeo, satMaterial);
const satRing = new THREE.Mesh(torusGeo, satMaterial);

//set planet positions
octPlanet.position.set(-40, 0, -40); 
icosPlanet.position.set(0, 0, 120);
satSphere.position.set(-160, 0, 0);  
satRing.rotation.set(Math.PI / 2, 0, 0); 


scene.add(sun);
sun.add(octPlanet); 
sun.add(icosPlanet); 
satSphere.add(satRing); 
sun.add(satSphere); 

// Animation loop
function animate() {

    //built-in method in web browsers that allows you to schedule a function to be called before the next repaint or reflow of the web page
    requestAnimationFrame(animate);

    // Rotate things
    sun.rotation.y += 0.01;
    octPlanet.rotation.x += 0.01; 
    icosPlanet.rotation.y += 0.01; 
    satSphere.rotation.x += 0.01; 

    // Render scene
    renderer.render(scene, camera);


}

animate();
