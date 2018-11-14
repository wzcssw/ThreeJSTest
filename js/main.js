var scene;
var camera;
var renderer;
var light;

var camera_config;
var startX,endX,startY,endY;
var ismousedown = false;

// initThree initThree
var initThree = function(){
    camera_config = {
        fov: 75,
        near: 0.1,
        far: 1000,
        aspect: window.innerWidth/window.innerHeight
    };
    camera = new THREE.PerspectiveCamera(camera_config.fov, camera_config.aspect,camera_config.near, camera_config.far);
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();

    MouseEvent();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
};

window.onload = function(){
    initThree();
    var geometry = new THREE.CubeGeometry(20,40,10);
    var material = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 90;
    camera.position.y = 30;

    // 地面
    let geometryPlane = new THREE.PlaneGeometry(100,100);
    let materialPlane = new THREE.MeshLambertMaterial({color:0xD3D3D3});
    let rect = new THREE.Mesh(geometryPlane,materialPlane);
    rect.rotation.x = -1.5;
    rect.position.y = -30;
    scene.add(rect);

    
    // 光源
    yellowLight = new THREE.PointLight( 0xFFFFFF, 6, 100 );
    redLight = new THREE.PointLight( 0xFFFFFF, 7, 100 );
    yellowLight.position.set( 50, 60, 70 );
    redLight.position.set( 50, 50, -70 );
    scene.add( yellowLight );
    scene.add( redLight );

    // 相机运动
    function animation(){  
        if (!ismousedown){
            var newPoint = CircleNextPoint( camera.position.x, camera.position.z,0.005);
            camera.position.x = newPoint.x;
            camera.position.z = newPoint.z;
        }
        renderer.render(scene, camera);
        camera.lookAt(0,0,0)
        requestAnimationFrame(animation);
    }
    animation();
};

// 计算下个点的坐标
var CircleNextPoint = function(x,z,r){
    NewX = x * Math.cos(r) + z * Math.sin(r);
    NewZ = z * Math.cos(r) - x * Math.sin(r);
    return {x: NewX, z: NewZ}
}

