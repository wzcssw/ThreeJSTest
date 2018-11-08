// 全局：便于调试
var scene;
var camera;
var renderer;

var initThree = function(){
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.9, 1000);
}; 

$().ready(function(){
        initThree();

        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.position.z = 6;
        
        document.body.appendChild(renderer.domElement);
        var geometry = new THREE.CubeGeometry(1,2,3);
        var material = new THREE.MeshBasicMaterial({color: 0xFF69B4});// 骚粉
        var cube = new THREE.Mesh(geometry, material); scene.add(cube);
        
        function render() {
            requestAnimationFrame(render);
            cube.rotation.x += 0.02;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        }
        render();
});