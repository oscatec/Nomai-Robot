//Desarrollado por Óscar Ferrer Domingo 
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
//import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//Variables escena
var scene, camera, renderer, suelo, fondo, milkyWayLight, ambientLight, controls;
//Variables cabeza
var facedown, faceup1, faceup2, faceup3, faceup4, faceup5, faceup6mouth, eye1up, eye2left, eye3right, mouth1, mouth2, mouth3, pupil1, pupil2, pupil3, pupilLight1, pupilLight2, pupilLight3, ear1, ear2, crown1straight, crown1arc, crown2straight, crown2arc, crown3straight, crown3arc, crown4straight, crown4arc, crown5straight, crown5arc, crown6straight, crown6arc;
//Variables cuerpo
var bodyCylinder, neckCylinder, neckSphere, bodyTorus1, bodyTorus2, leftLegCylinder, rightLegCylinder, leftFootCylinder, rightFootCylinder, leftArmCube, rightArmCube, leftArmCapsule, rightArmCapsule, leftArmOctahedron, rightArmOctahedron;
//Pared nomai
var paredNomai;

var listaGrupos=[];
var diccionarioMovimiento={};
var mueve=false;
var signoIzquierda, signoDerecha;

// variables de velocidad de movimiento
var xSpeed = 0.1;
var zSpeed = 0.1;
var velRotCabeza = 0.1;
document.addEventListener("keydown", onDocumentKeyDown, false);
document.addEventListener("keyup", onDocumentKeyUp, false);

function main() {

// ESCENA
  scene= new THREE.Scene();
  scene.background = new THREE.Color(0xaaaaaa);
  

// CAMARA Y PERSPECTIVA
    //camara con fov 60
  const fov = 60;
  const aspect = window.innerWidth / window.innerHeight;  
  const near = 0.1;
  const far = 2000;
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  //posicion de camara
    //creamos espacio para la profundidad 
    camera.position.z = 8;
    //elevamos un poco la camara
    camera.position.y = 2.5;



//RENDERER  
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
    // Añade la salida del renderer al documento HTML
  document.body.appendChild( renderer.domElement );
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;   


//CONTROLES DE CAMARA LIBRE
  // controls
  controls = new OrbitControls( camera, renderer.domElement );
  //controls.listenToKeyEvents( window ); // optional

  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.05;

  controls.screenSpacePanning = false;

  controls.minDistance = 2;
  controls.maxDistance = 40;

  controls.maxPolarAngle = Math.PI / 2;


// AÑADO LUCES
  //luces ojos
  pupilLight1 = new THREE.PointLight(0xff14ff, 0.05, 0, 2);
  pupilLight2 = new THREE.PointLight(0xff14ff, 0.05, 0, 2);
  pupilLight3 = new THREE.PointLight(0xff14ff, 0.05, 0, 2);

  //luz via lactea
  milkyWayLight = new THREE.DirectionalLight( 0xffffff, 0.7 );
  
  //luz ambiental
  ambientLight = new THREE.AmbientLight( 0x666666 );
  

//GEOMETRIAS

  //suelo
  const geometrySuelo = new THREE.BoxGeometry( 40, 40, 0.2 );
  //fondo
  const geometryFondo = new THREE.SphereGeometry( 100, 32, 16 );//radius, number of horizontal segments, number of vertical segments
  
  //GEOMETRIAS CABEZA
  //Cabeza
  //facedown
  const geometryfacedown = new THREE.BoxGeometry( 1, 1, 0.1 );
  //faceup1
  const geometryfaceup1 = new THREE.BoxGeometry( 1, 1, 0.1 );
  //faceup2
  const geometryfaceup2 = new THREE.BoxGeometry( 1, 1, 0.1 );
  //faceup3
  const geometryfaceup3 = new THREE.BoxGeometry( 1, 1, 0.1 );
  //faceup4
  const geometryfaceup4 = new THREE.BoxGeometry( 1, 1, 0.1 );
  //faceup5
  const geometryfaceup5 = new THREE.BoxGeometry( 1, 1, 0.1 );
  //faceup6mouth
  const geometryfaceup6mouth = new THREE.BoxGeometry( 1, 1, 0.1 );
  
  //Cara
  //eye1up
  const geometryeye1up = new THREE.TorusGeometry( 0.2, 0.02, 10, 4, 6.28319 );//el ultimo parametro son radianes, son 360º
  //eye2left
  const geometryeye2left = new THREE.TorusGeometry( 0.2, 0.02, 10, 4, 6.28319 );
  //eye3right
  const geometryeye3right = new THREE.TorusGeometry( 0.2, 0.02, 10, 4, 6.28319 );
  //mouth1
  const geometrymouth1 = new THREE.BoxGeometry( 0.02, 0.38, 0.02 );
  //mouth2
  const geometrymouth2 = new THREE.BoxGeometry( 0.02, 0.38, 0.02 );
  //mouth3
  const geometrymouth3 = new THREE.BoxGeometry( 0.02, 1, 0.02 );
  //pupil1
  const geometrypupil1 = new THREE.BoxGeometry( 0.08, 0.08, 0.02 );
  //pupil2
  const geometrypupil2 = new THREE.BoxGeometry( 0.08, 0.08, 0.02 );
  //pupil3
  const geometrypupil3 = new THREE.BoxGeometry( 0.08, 0.08, 0.02 );

  //Corona
  //ear1
  const geometryear1 = new THREE.BoxGeometry( 0.19, 0.19, 0.19 );
  //ear2
  const geometryear2 = new THREE.BoxGeometry( 0.19, 0.19, 0.19 );
  //crown1straight
  const geometrycrown1straight = new THREE.PlaneGeometry( 0.1, 0.55 );
  //crown1arc
  const geometrycrown1arc = new THREE.RingGeometry( 0.5, 0.6, 32, 1, 1.5708, 1.309 );
  //crown2straight
  const geometrycrown2straight = new THREE.PlaneGeometry( 0.1, 0.55 );
  //crown2arc
  const geometrycrown2arc = new THREE.RingGeometry( 0.5, 0.6, 32, 1, 1.5708, -1.309 );
  //crown3straight
  const geometrycrown3straight = new THREE.PlaneGeometry( 0.1, 0.55 );
  //crown3arc
  const geometrycrown3arc = new THREE.RingGeometry( 0.5, 0.6, 32, 1, -0.785398, 1.309 );
  //crown4straight
  const geometrycrown4straight = new THREE.PlaneGeometry( 0.1, 0.55 );
  //crown4arc
  const geometrycrown4arc = new THREE.RingGeometry( 0.5, 0.6, 32, 1, -0.785398, -0.959931 );
  //crown5straight
  const geometrycrown5straight = new THREE.PlaneGeometry( 0.1, 0.55 );
  //crown5arc
  const geometrycrown5arc = new THREE.RingGeometry( 0.5, 0.6, 32, 1, -2.35619, 0.959931 );
  //crown6straight
  const geometrycrown6straight = new THREE.PlaneGeometry( 0.1, 0.55 );
  //crown6arc
  const geometrycrown6arc = new THREE.RingGeometry( 0.5, 0.6, 32, 1, -2.35619, -1.309 );


  //GEOMETRIAS CUERPO
  //Cuello
  //neckSphere
  const geometryneckSphere = new THREE.SphereGeometry( 0.3, 32, 16, 0, 3.14159, 3.14159, 3.14159);
  //neckCylinder
  const geometryneckCylinder = new THREE.CylinderGeometry( 0.2, 0.2, 0.5, 5, 1 );

  //Cuerpo
  //bodyCylinder
  const geometrybodyCylinder = new THREE.CylinderGeometry( 0.35, 0.35, 1.3, 32, 1 );
  //bodyTorus1
  const geometrybodyTorus1 = new THREE.TorusGeometry( 0.35, 0.05, 12, 48, 6.28319 );
  //bodyTorus2
  const geometrybodyTorus2 = new THREE.TorusGeometry( 0.35, 0.05, 12, 48, 6.28319 );
  //leftLegCylinder
  const geometryleftLegCylinder = new THREE.CylinderGeometry( 0.1, 0.15, 0.7, 32, 1 );
  //rightLegCylinder
  const geometryrightLegCylinder = new THREE.CylinderGeometry( 0.1, 0.15, 0.7, 32, 1 );
  //leftFootCylinder
  const geometryleftFootCylinder = new THREE.CylinderGeometry( 0.1, 0.25, 0.2, 4, 1 );
  //rightFootCylinder
  const geometryrightFootCylinder = new THREE.CylinderGeometry( 0.1, 0.25, 0.2, 4, 1 );
  //leftArmCube
  const geometryleftArmCube = new THREE.BoxGeometry( 0.2, 0.3, 0.2 );
  //rightArmCube
  const geometryrightArmCube = new THREE.BoxGeometry( 0.2, 0.3, 0.2 );
  //leftArmCapsule
  const geometryleftArmCapsule = new THREE.CapsuleGeometry( 0.05, 0.4, 4, 8 );
  //rightArmCapsule
  const geometryrightArmCapsule = new THREE.CapsuleGeometry( 0.05, 0.4, 4, 8 );
  //leftArmOctahedron
  const geometryleftArmOctahedron = new THREE.OctahedronGeometry( 0.12, 0 );
  //rightArmOctahedron
  const geometryrightArmOctahedron = new THREE.OctahedronGeometry( 0.12, 0 );

  //paredNomai
  const geometryParedNomai = new THREE.BoxGeometry( 14, 6, 1);


//TEXTURAS
// Creo un objeto TextureLoader que carga la imagen
  const loader = new THREE.TextureLoader();

//Creo los materiales a utilizar
  const materialSuelo = new THREE.MeshPhongMaterial( {
    map: loader.load('./img/moonrock2.png'), side: THREE.DoubleSide} );
  const materialFondo = new THREE.MeshPhongMaterial( {
    map: loader.load('./img/via-lactea.jpg'), side: THREE.BackSide} );

  const materialNegro = new THREE.MeshPhongMaterial({
    map: loader.load('./img/black-floor.jpg'), side: THREE.DoubleSide});
  const materialBlanco = new THREE.MeshPhongMaterial({
    map: loader.load('./img/white-marble.jpg'), side: THREE.DoubleSide});
  const materialMorado = new THREE.MeshPhongMaterial({
    map: loader.load('./img/purple.jpg'), side: THREE.DoubleSide});
  const materialDorado = new THREE.MeshPhongMaterial({
    map: loader.load('./img/gold-texture.jpg'), side: THREE.DoubleSide});
  const materialGris = new THREE.MeshPhongMaterial({
    map: loader.load('./img/gray-mate.jpg'), side: THREE.DoubleSide});
  const materialGrisEstrellas = new THREE.MeshPhongMaterial({
    map: loader.load('./img/gray-stars-texture.jpg'), side: THREE.DoubleSide});
  const materialLaberinto = new THREE.MeshPhongMaterial({
    map: loader.load('./img/labirinth.jpg'), side: THREE.DoubleSide});
  const materialBeige = new THREE.MeshPhongMaterial({
    map: loader.load('./img/beige-texture.jpg'), side: THREE.DoubleSide});
  const materialCobre = new THREE.MeshPhongMaterial({
    map: loader.load('./img/cooper-texture.jpg'), side: THREE.DoubleSide});
  const materialAzul = new THREE.MeshPhongMaterial({
    map: loader.load('./img/blue-fabric-with-golden-line.jpg'), side: THREE.DoubleSide});
  const materialCuero = new THREE.MeshPhongMaterial({
    map: loader.load('./img/brown-leather.jpg'), side: THREE.DoubleSide});
  const materialParedNomai = new THREE.MeshPhongMaterial({
    map: loader.load('./img/nomai-writing-wall.png'), side: THREE.DoubleSide});

  //Cambiamos la reflectividad de algunos materiales
  materialCobre.metalness=1;
  materialDorado.metalness=1;
  materialMorado.metalness=1;
  materialAzul.roughness=0.7;
  materialCuero.roughness=0.8;
  materialBeige.roughness=0.8;
  materialMorado.reflectivity=1;
  
  

//OBJETOS
  //Uno en una malla, la geometría y el material
  suelo = new THREE.Mesh(geometrySuelo, materialSuelo);
  fondo = new THREE.Mesh(geometryFondo, materialFondo);
  
  facedown = new THREE.Mesh(geometryfacedown, materialGris);
  faceup1 = new THREE.Mesh(geometryfaceup1, materialNegro);
  faceup2 = new THREE.Mesh(geometryfaceup2, materialNegro);
  faceup3 = new THREE.Mesh(geometryfaceup3, materialNegro);
  faceup4 = new THREE.Mesh(geometryfaceup4, materialNegro);
  faceup5 = new THREE.Mesh(geometryfaceup5, materialNegro);
  faceup6mouth = new THREE.Mesh(geometryfaceup6mouth, materialNegro);
  
  eye1up = new THREE.Mesh(geometryeye1up, materialBlanco);
  eye2left = new THREE.Mesh(geometryeye2left, materialBlanco);
  eye3right = new THREE.Mesh(geometryeye3right, materialBlanco);
  mouth1 = new THREE.Mesh(geometrymouth1, materialBlanco);
  mouth2 = new THREE.Mesh(geometrymouth2, materialBlanco);
  mouth3 = new THREE.Mesh(geometrymouth3, materialBlanco);
  pupil1 = new THREE.Mesh(geometrypupil1, materialMorado);
  pupil2 = new THREE.Mesh(geometrypupil2, materialMorado);
  pupil3 = new THREE.Mesh(geometrypupil3, materialMorado);

  ear1 = new THREE.Mesh(geometryear1, materialLaberinto);
  ear2 = new THREE.Mesh(geometryear2, materialLaberinto);
  crown1straight = new THREE.Mesh(geometrycrown1straight, materialGrisEstrellas);
  crown1arc = new THREE.Mesh(geometrycrown1arc, materialDorado);
  crown2straight = new THREE.Mesh(geometrycrown2straight, materialGrisEstrellas);
  crown2arc = new THREE.Mesh(geometrycrown2arc, materialDorado);
  crown3straight = new THREE.Mesh(geometrycrown3straight, materialGrisEstrellas);
  crown3arc = new THREE.Mesh(geometrycrown3arc, materialDorado);
  crown4straight = new THREE.Mesh(geometrycrown4straight, materialGrisEstrellas);
  crown4arc = new THREE.Mesh(geometrycrown4arc, materialDorado);
  crown5straight = new THREE.Mesh(geometrycrown5straight, materialGrisEstrellas);
  crown5arc = new THREE.Mesh(geometrycrown5arc, materialDorado);
  crown6straight = new THREE.Mesh(geometrycrown6straight, materialGrisEstrellas);
  crown6arc = new THREE.Mesh(geometrycrown6arc, materialDorado);
  
  neckSphere = new THREE.Mesh(geometryneckSphere, materialBlanco);
  neckCylinder = new THREE.Mesh(geometryneckCylinder, materialCobre);

  bodyCylinder = new THREE.Mesh(geometrybodyCylinder, materialBeige);
  bodyTorus1 = new THREE.Mesh(geometrybodyTorus1, materialCobre);
  bodyTorus2 = new THREE.Mesh(geometrybodyTorus2, materialCobre);
  leftLegCylinder = new THREE.Mesh(geometryleftLegCylinder, materialAzul);
  rightLegCylinder = new THREE.Mesh(geometryrightLegCylinder, materialAzul);
  leftFootCylinder = new THREE.Mesh(geometryleftFootCylinder, materialDorado);
  rightFootCylinder = new THREE.Mesh(geometryrightFootCylinder, materialDorado);
  leftArmCube = new THREE.Mesh(geometryleftArmCube, materialCobre);
  rightArmCube = new THREE.Mesh(geometryrightArmCube, materialCobre);
  leftArmCapsule = new THREE.Mesh(geometryleftArmCapsule, materialAzul);
  rightArmCapsule = new THREE.Mesh(geometryrightArmCapsule, materialAzul);
  leftArmOctahedron = new THREE.Mesh(geometryleftArmOctahedron, materialCuero);
  rightArmOctahedron = new THREE.Mesh(geometryrightArmOctahedron, materialCuero);

  paredNomai = new THREE.Mesh(geometryParedNomai, materialParedNomai);


//SCALE, POSITION y ROTATION de los objetos individuales (Dar cast y receive shadow a los objetos)
    //colocamos el suelo
    suelo.position.y=-1;
    suelo.rotation.x = 1.57;//1.57 es horizontal

    //colocamos la luz lejana
    milkyWayLight.position.set(0, 10, 90);

    milkyWayLight.castShadow=true;
    pupilLight1.castShadow=true;
    pupilLight2.castShadow=true;
    pupilLight3.castShadow=true;

    //componemos el robot con las piezas que tenemos
    facedown.position.set(0.009, 2.786, 0.008);
    facedown.rotateZ(0.785398);//45º
    faceup1.position.set(0.007, 2.868, 0.09);
    faceup1.rotateZ(0.785398);
    faceup1.scale.set(0.7, 0.7, 1);
    faceup2.position.set(-0.261, 3.146, 0.09);
    faceup2.rotateZ(0.785398);
    faceup2.scale.set(0.7, 0.121, 1);
    faceup3.position.set(0.274, 3.144, 0.09);
    faceup3.rotateZ(0.785398);
    faceup3.scale.set(0.121, 0.7, 1);
    faceup4.position.set(0.339, 2.559, 0.09);
    faceup4.rotateZ(0.785398);
    faceup4.scale.set(0.7, 0.213, 1);
    faceup5.position.set(-0.325, 2.563, 0.09);
    faceup5.rotateZ(0.785398);
    faceup5.scale.set(0.213, 0.7, 1);
    faceup6mouth.position.set(0, 2.567, 0.09);
    faceup6mouth.scale.set(0.317, 1, 1);

    eye1up.position.set(0.005, 3.103, 0.15);
    eye2left.position.set(-0.237, 2.860, 0.15);
    eye3right.position.set(0.244, 2.863, 0.15);
    mouth1.position.set(-0.052, 2.495, 0.15);
    mouth1.scale.set(1, 1.784, 1);
    mouth2.position.set(0.063, 2.5, 0.15);
    mouth2.scale.set(1, 1.776, 1);
    mouth3.position.set(0.006, 2.163, 0.15);
    mouth3.rotateZ(1.5708)
    mouth3.scale.set(1, 0.136, 1);
    pupil1.position.set(0.004, 3.106, 0.15);
    pupil1.rotateZ(0.785398);
    pupil2.position.set(-0.244, 2.861, 0.15);
    pupil2.rotateZ(0.785398);
    pupil3.position.set(0.243, 2.86, 0.15);
    pupil3.rotateZ(0.785398);

    pupilLight1.position.set(0, 3.120, 0.16);
    pupilLight2.position.set(-0.239, 2.868, 0.16);
    pupilLight3.position.set(0.246, 2.866, 0.16);

    ear1.position.set(-0.239, 3.386, 0.042);
    ear1.rotateZ(0.785398);
    ear2.position.set(0.217, 3.390, 0.042);
    ear2.rotateZ(0.785398);
    crown1straight.position.set(-0.154, 3.443, 0);
    crown1arc.position.set(-0.118, 3.155, 0.01);
    crown2straight.position.set(0.155, 3.444, 0);
    crown2arc.position.set(0.118, 3.152, 0.01);
    crown3straight.position.set(0.728, 2.632, 0);
    crown3straight.rotateZ(0.785398);
    crown3arc.position.set(0.461, 2.800, 0.01);
    crown4straight.position.set(0.515, 2.446, 0);
    crown4straight.rotateZ(0.785398);
    crown4arc.position.set(0.312, 2.668, 0.01);
    crown5straight.position.set(-0.724, 2.620, 0);
    crown5straight.rotateZ(-0.785398);
    crown5arc.position.set(-0.325, 2.677, 0.01);
    crown6straight.position.set(-0.520, 2.449, 0);
    crown6straight.rotateZ(-0.785398);
    crown6arc.position.set(-0.463, 2.795, 0.01);

    neckSphere.position.set(0, 2.859, -0.871);
    neckSphere.rotateX(-0.523599);
    neckCylinder.position.set(-0.004, 2.613, -1.016);
    neckCylinder.rotateX(0.523599);
    neckCylinder.rotateY(3.14159);

    bodyCylinder.position.set(0, 1.861, -1.118);
    bodyTorus1.position.set(0, 2.394, -1.114);
    bodyTorus1.rotateX(1.5708);
    bodyTorus2.position.set(0, 1.338, -1.116);
    bodyTorus2.rotateX(1.5708);
    leftLegCylinder.position.set(0.279, 1.005, -1.117);
    rightLegCylinder.position.set(-0.269, 0.995, -1.100);
    leftFootCylinder.position.set(0.279, 0.747, -1.128);
    rightFootCylinder.position.set(-0.271, 0.745, -1.107);
    leftArmCube.position.set(0.330, 1.884, -1.084);
    rightArmCube.position.set(-0.320, 1.889, -1.085);
    leftArmCapsule.position.set(0.406, 1.809, -0.806);
    leftArmCapsule.rotateX(1.91986);
    rightArmCapsule.position.set(-0.404, 1.806, -0.836);
    rightArmCapsule.rotateX(1.91986);
    leftArmOctahedron.position.set(0.405, 1.746, -0.624);
    rightArmOctahedron.position.set(-0.402, 1.749, -0.645);

    paredNomai.position.set(0,2,-15);

    //SOMBRAS DE CADA MESH
    facedown.castShadow=true;
    facedown.receiveShadow=true;
    faceup1.castShadow=true;
    faceup1.receiveShadow=true;
    faceup2.castShadow=true;
    faceup2.receiveShadow=true;
    faceup3.castShadow=true;
    faceup3.receiveShadow=true;
    faceup4.castShadow=true;
    faceup4.receiveShadow=true;
    faceup5.castShadow=true;
    faceup5.receiveShadow=true;
    faceup6mouth.castShadow=true;
    faceup6mouth.receiveShadow=true;
    eye1up.castShadow=true;
    eye1up.receiveShadow=true;
    eye2left.castShadow=true;
    eye2left.receiveShadow=true;
    eye3right.castShadow=true;
    eye3right.receiveShadow=true;
    mouth1.castShadow=true;
    mouth1.receiveShadow=true;
    mouth2.castShadow=true;
    mouth2.receiveShadow=true;
    mouth3.castShadow=true;
    mouth3.receiveShadow=true;
    pupil1.castShadow=true;
    pupil1.receiveShadow=true;
    pupil2.castShadow=true;
    pupil2.receiveShadow=true;
    pupil3.castShadow=true;
    pupil3.receiveShadow=true;
    ear1.castShadow=true;
    ear1.receiveShadow=true;
    ear2.castShadow=true;
    ear2.receiveShadow=true;
    crown1straight.castShadow=true;
    crown1straight.receiveShadow=true;
    crown1arc.castShadow=true;
    crown1arc.receiveShadow=true;
    crown2straight.castShadow=true;
    crown2straight.receiveShadow=true;
    crown2arc.castShadow=true;
    crown2arc.receiveShadow=true;
    crown3straight.castShadow=true;
    crown3straight.receiveShadow=true;
    crown3arc.castShadow=true;
    crown3arc.receiveShadow=true;
    crown4straight.castShadow=true;
    crown4straight.receiveShadow=true;
    crown4arc.castShadow=true;
    crown4arc.receiveShadow=true;
    crown5straight.castShadow=true;
    crown5straight.receiveShadow=true;
    crown5arc.castShadow=true;
    crown5arc.receiveShadow=true;
    crown6straight.castShadow=true;
    crown6straight.receiveShadow=true;
    crown6arc.castShadow=true;
    crown6arc.receiveShadow=true;
    
    bodyCylinder.castShadow=true;
    bodyCylinder.receiveShadow=true;
    neckCylinder.castShadow=true;
    neckCylinder.receiveShadow=true;
    neckSphere.castShadow=true;
    neckSphere.receiveShadow=true;
    bodyTorus1.castShadow=true;
    bodyTorus1.receiveShadow=true;
    bodyTorus2.castShadow=true;
    bodyTorus2.receiveShadow=true;
    leftLegCylinder.castShadow=true;
    leftLegCylinder.receiveShadow=true;
    rightLegCylinder.castShadow=true;
    rightLegCylinder.receiveShadow=true;
    leftFootCylinder.castShadow=true;
    leftFootCylinder.receiveShadow=true;
    rightFootCylinder.castShadow=true;
    rightFootCylinder.receiveShadow=true;
    leftArmCube.castShadow=true;
    leftArmCube.receiveShadow=true;
    rightArmCube.castShadow=true;
    rightArmCube.receiveShadow=true;
    leftArmCapsule.castShadow=true;
    leftArmCapsule.receiveShadow=true;
    rightArmCapsule.castShadow=true;
    rightArmCapsule.receiveShadow=true;
    leftArmOctahedron.castShadow=true;
    leftArmOctahedron.receiveShadow=true;
    rightArmOctahedron.castShadow=true;
    rightArmOctahedron.receiveShadow=true;

    paredNomai.castShadow=true;
    paredNomai.receiveShadow=true;


//GRUPOS
    //CREAMOS GRUPOS
  let grupoCabeza = new THREE.Group();
  grupoCabeza.add(facedown);
  grupoCabeza.add(faceup1);
  grupoCabeza.add(faceup2);
  grupoCabeza.add(faceup3);
  grupoCabeza.add(faceup4);
  grupoCabeza.add(faceup5);
  grupoCabeza.add(faceup6mouth);
  grupoCabeza.add(eye1up);
  grupoCabeza.add(eye2left);
  grupoCabeza.add(eye3right);
  grupoCabeza.add(mouth1);
  grupoCabeza.add(mouth2);
  grupoCabeza.add(mouth3);
  grupoCabeza.add(pupil1);
  grupoCabeza.add(pupil2);
  grupoCabeza.add(pupil3);
  grupoCabeza.add(ear1);
  grupoCabeza.add(ear2);
  grupoCabeza.add(crown1straight);
  grupoCabeza.add(crown1arc);
  grupoCabeza.add(crown2straight);
  grupoCabeza.add(crown2arc);
  grupoCabeza.add(crown3straight);
  grupoCabeza.add(crown3arc);
  grupoCabeza.add(crown4straight);
  grupoCabeza.add(crown4arc);
  grupoCabeza.add(crown5straight);
  grupoCabeza.add(crown5arc);
  grupoCabeza.add(crown6straight);
  grupoCabeza.add(crown6arc);
  //añadimos luces de los ojos al grupo tambien
  grupoCabeza.add(pupilLight1);
  grupoCabeza.add(pupilLight2);
  grupoCabeza.add(pupilLight3);


  //inclinamos la cabeza -30ª
  grupoCabeza.rotateX(-0.523599);
  //colocamos la cabeza sobre el cuello
  grupoCabeza.position.set(0, 0.5, 0.5);


  let grupoCuello = new THREE.Group();
  grupoCuello.add(neckSphere);
  grupoCuello.add(neckCylinder);

  let grupoPiernaIzquierda = new THREE.Group();
  grupoPiernaIzquierda.add(leftLegCylinder);
  grupoPiernaIzquierda.add(leftFootCylinder);
  let grupoPiernaDerecha = new THREE.Group();
  grupoPiernaDerecha.add(rightLegCylinder);
  grupoPiernaDerecha.add(rightFootCylinder);


  let grupoCuerpo =new THREE.Group();
  grupoCuerpo.add(bodyCylinder);
  grupoCuerpo.add(bodyTorus1);
  grupoCuerpo.add(bodyTorus2);
  grupoCuerpo.add(leftArmCube);
  grupoCuerpo.add(rightArmCube);
  grupoCuerpo.add(leftArmCapsule);
  grupoCuerpo.add(rightArmCapsule);
  grupoCuerpo.add(leftArmOctahedron);
  grupoCuerpo.add(rightArmOctahedron);
  grupoCuerpo.add(grupoPiernaIzquierda);
  grupoCuerpo.add(grupoPiernaDerecha);


  let grupoRobot = new THREE.Group();
  grupoRobot.add(grupoCabeza);
  grupoRobot.add(grupoCuello);
  grupoRobot.add(grupoCuerpo);

  let grupoFondo = new THREE.Group();
  grupoFondo.add(fondo);
  grupoFondo.add(milkyWayLight);


  //SCALE, POSITION, ROTATION de los grupos
  grupoRobot.position.y=-1.6;

  suelo.receiveShadow=true;


//AÑADIMOS OBJETOS Y GRUPOS A LA ESCENA
  
  scene.add(suelo);
  scene.add(paredNomai);

  scene.add(grupoRobot);
  scene.add(grupoFondo);
  
  scene.add(ambientLight);
  
  window.addEventListener( 'resize', onResize, false);

  //guardamos los grupos para utilizarlos en las funciones en la lista de 0 a 6
  listaGrupos.push(grupoCabeza);
  listaGrupos.push(grupoCuello);
  listaGrupos.push(grupoPiernaIzquierda);
  listaGrupos.push(grupoPiernaDerecha);
  listaGrupos.push(grupoCuerpo);
  listaGrupos.push(grupoRobot);
  listaGrupos.push(grupoFondo);
  
  update();

}

function update(){
    requestAnimationFrame( update );
    
    controls.update();

    let grupoFondo = listaGrupos[6];
    grupoFondo.rotation.y += 0.00015;

    animacion();
    renderer.render( scene, camera );
}

function onResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function avanzar(){
    grupoRobot.translateZ();
}

function animacion(){
    let grupoRobot=listaGrupos[5];
    if (diccionarioMovimiento['w']) {//W
        grupoRobot.position.z -= zSpeed;
        grupoRobot.rotation.y = 3.14159;
        mueve=true;
        legMovement();
    }
    if (diccionarioMovimiento['s']) {//S  
        grupoRobot.position.z += zSpeed;
        grupoRobot.rotation.y = 0;
        mueve=true;
        legMovement();
    }
    if (diccionarioMovimiento['a']) {//A
        grupoRobot.position.x += xSpeed;
        grupoRobot.rotation.y = 1.5708;
        mueve=true;
        legMovement();
    }
    if (diccionarioMovimiento['d']) {//D
        grupoRobot.position.x -= xSpeed;
        grupoRobot.rotation.y = 4.71239;
        mueve=true;
        legMovement();
    }
    
    let grupoCabeza=listaGrupos[0];
    let grupoCuello=listaGrupos[1];
    //const axisX=grupoCabeza.position.x;
    //const axisY=grupoCabeza.position.y-0.3;
    //const axisZ=0;
    //var axis = new THREE.Vector3(axisX, axisY, axisZ);
    if(diccionarioMovimiento['q']){//Q
        //grupoCabeza.rotateOnAxis(axis,velRotCabeza);
        //grupoCuello.rotateOnAxis(axis,velRotCabeza);
        grupoCabeza.rotation.y = -0.523599;
        //grupoCuello.rotation.y = -0.523599;
    }
    if(diccionarioMovimiento['e']){//E
        //grupoCabeza.rotateOnAxis(axis,-velRotCabeza);
        //grupoCuello.rotateOnAxis(axis,-velRotCabeza);
        grupoCabeza.rotation.y = 0.523599;
        //grupoCuello.rotation.y = 0.523599;
    }
    

    if (diccionarioMovimiento[' ']) {//espacio
        grupoRobot.position.set(0, -1.6, 0);
        grupoRobot.rotation.y = 0;
        grupoCabeza.rotation.y = 0;
        grupoCuello.rotation.y = 0;
        mueve=false;
        legMovement();
    }
};

function onDocumentKeyDown(event) {
    diccionarioMovimiento[event.key]=true;    
};

function onDocumentKeyUp(event) {
    delete diccionarioMovimiento[event.key];

    mueve=false;
    legMovement();

    let grupoCabeza=listaGrupos[0];
    grupoCabeza.rotation.y = 0;
    
};

function legMovement(){//funcion para que se muevan las piernas
    let grupoPiernaIzquierda=listaGrupos[2];
    let grupoPiernaDerecha=listaGrupos[3];
    if(mueve==true){
        
        grupoPiernaIzquierda.position.y = 0.35;
        grupoPiernaDerecha.position.y = 0.35;

    }else{
        grupoPiernaIzquierda.position.y=0;
        grupoPiernaDerecha.position.y=0;
    }

}

//main();

window.addEventListener('DOMContentLoaded', () => {
    main();
  });
