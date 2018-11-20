var scene;
var camera;
var renderer;
var light;

var camera_config;
var startX,endX,startY,endY;
var ismousedown = false;
/*
    问题：
        1. 鼠标拖拽时相机在不同坐标轴下的行为不同
        2. 拖拽镜头抖动
        3. 划线的方法过期需要更换
 */


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
    cube.position.set(200, 200, 200);
    scene.add(cube);
    camera.position.z = 290;
    camera.position.y = 230;

    // 地面
    let geometryPlane = new THREE.PlaneGeometry(100,100);
    let materialPlane = new THREE.MeshLambertMaterial({color:0xD3D3D3});
    let rect = new THREE.Mesh(geometryPlane,materialPlane);
    rect.rotation.x = -1.58;
    // rect.position.y = -20;
    rect.position.set(200, 180, 200);
    scene.add(rect);

    // 线（test）
    var geometryLineX = new THREE.Geometry();
    var geometryLineY = new THREE.Geometry();
    var geometryLineZ = new THREE.Geometry();
    var materialLine = new THREE.LineBasicMaterial( { vertexColors: true } );
    var colorLine2 = new THREE.Color( 0xFF0000 ),
        colorLine3 = new THREE.Color( 0x0000FF ), colorLine4 = new THREE.Color( 0xFFFF00 );
    // 线的材质可以由2点的颜色决定
    var p1 = new THREE.Vector3( -800, 0, 0 );
    var p2 = new THREE.Vector3(  800, 0, 0 );
    geometryLineX.vertices.push(p1);
    geometryLineX.vertices.push(p2);
    geometryLineX.colors.push( colorLine2, colorLine2 );
    var lineX = new THREE.Line( geometryLineX, materialLine, THREE.LinePieces );
    scene.add(lineX);

    var p3 = new THREE.Vector3( 0, 800, 0 );
    var p4 = new THREE.Vector3(  0, -800, 0 );
    geometryLineY.vertices.push(p3);
    geometryLineY.vertices.push(p4);
    geometryLineY.colors.push( colorLine3, colorLine3 );
    var lineY = new THREE.Line( geometryLineY, materialLine, THREE.LinePieces );
    scene.add(lineY);

    var p5 = new THREE.Vector3( 0, 0, 800 );
    var p6 = new THREE.Vector3(  0, 0, -800 );
    geometryLineZ.vertices.push(p5);
    geometryLineZ.vertices.push(p6);
    geometryLineZ.colors.push( colorLine4, colorLine4 );
    var lineZ = new THREE.Line( geometryLineZ, materialLine, THREE.LinePieces );
    scene.add(lineZ);

    
    // 光源
    yellowLight = new THREE.PointLight( 0xFFFFFF, 6, 200 );
    redLight = new THREE.PointLight( 0xFFFFFF, 7, 180 );
    yellowLight.position.set( 280, 320, 270 );
    redLight.position.set( 280, 320, -170 );
    scene.add( yellowLight );
    scene.add( redLight );

    // 相机运动
    function animation(){  
        if (!ismousedown){
            var newPoint = CircleNextPoint( camera.position.x, camera.position.z,0.005);
            console.log(newPoint);
            camera.position.x = newPoint.x;
            camera.position.z = newPoint.z;
        }
        renderer.render(scene, camera);
        camera.lookAt(200,200,200)
        requestAnimationFrame(animation);
    }
    animation();
};

// 计算下个点的坐标
var CircleNextPoint = function(x,z,r){
    NewX = x * Math.cos(r) + z * Math.sin(r)+200;
    NewZ = z * Math.cos(r) - x * Math.sin(r)+200;
    return {x: NewX, z: NewZ}
}

