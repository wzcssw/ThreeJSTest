var scene;
var camera;
var renderer;
var light;

// initThree initThree
var initThree = function(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();

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

    // 鼠标事件
    var startX,endX,startY,endY;
    var ismousedown = false;
    console.log(camera.position.x,camera.position.y);
    document.body.onmousedown=function (event) {
        ismousedown = true
        startX = event.clientX;
        startY = event.clientY;
    };
    document.body.onmouseup=function (event) {
        ismousedown = false;
        startX = event.clientX;
        startY = event.clientY;
    };
    document.body.onmousemove=function (event) {
        console.log(event.button)
        if (ismousedown ) {
            endX = event.clientX;
            endY = event.clientY;
            var x=endX-startX;
            var y=endY-startY;
            if (Math.abs(x)>Math.abs(y)) {
                camera.position.x=camera.position.x-x*0.04;
            } else {

                camera.position.y=camera.position.y+y*0.04;
            }
            console.log(camera.position.x,endY,startY);
            startX=endX;
            startY=endY;
        }
    };

    // 光源
    yellowLight = new THREE.PointLight( 0xFFFFFF, 6, 100 );
    redLight = new THREE.PointLight( 0xFFFFFF, 7, 100 );
    yellowLight.position.set( 50, 50, 70 );
    redLight.position.set( 50, 50, -70 );
    scene.add( yellowLight );
    scene.add( redLight );

    // 相机运动
    var ArrayIndex = 0;
    var pointArray = CalcaulateCirArray(); // 计算圆周运动坐标数组
    function animation(){ 
        if (!ismousedown){
            // camera.position.x = pointArray[ArrayIndex].x;
            // camera.position.z = pointArray[ArrayIndex].y;
        }
        renderer.render(scene, camera);
        camera.lookAt(0,0,0)
        requestAnimationFrame(animation);
        if(ArrayIndex>=360*5-1){
            ArrayIndex=0;
        }else{
            ArrayIndex++;
        }
    }
    animation();
};

// CalcaulateCir 计算圆周运动坐标
var CalcaulateCir = function(a,x0,y0,r,pi){
    x1 = x0 + r * Math.sin( a * pi / 180.0);
    y1 = y0 + r * Math.cos( a * pi / 180.0);
    return {x: x1,y: y1};
};

var CalcaulateCirArray = function(){
    var pointArray = [];
    for (var a = 0;a < 360*5; a++){
        var flg = 0;
        if (a>0){
            flg = a / 5
        }
        var point = CalcaulateCir(flg,0,0,90,3.1415);
        pointArray[a] = point;
    }
    return pointArray;
};

