var scene;
var camera;
var renderer;

var initThree = function(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
};

window.onload = function(){
    initThree();
    var geometry = new THREE.CubeGeometry(40,20,10);
    var material = new THREE.MeshBasicMaterial({color: 0xFF00FF});
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 80;

    function render() { // 自动旋转
        requestAnimationFrame(render);
        cube.rotation.x += 0.02;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    render();
    var vun = true;
    function animation(){ // 相机运动
        camera.position.x =camera.position.x -0.5;
        renderer.render(scene, camera);
        requestAnimationFrame(animation);
    }
    animation();
}