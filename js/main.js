window.onload = function(){
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
    var geometry = new THREE.CubeGeometry(1,1,1);
    var material = new THREE.MeshBasicMaterial({color: 0xFF00FF});
    var cube = new THREE.Mesh(geometry, material); scene.add(cube);
    camera.position.z = 4;

    // // 监控 (不好使) 
    // stats = new Stats();
    // stats.domElement.style.position = 'absolute';
    // stats.domElement.style.left = '0px';
    // stats.domElement.style.top = '0px';
    // document.body.appendChild(stats.domElement);

    function render() { // 自动旋转
        requestAnimationFrame(render);
        cube.rotation.x += 0.02;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    render();
    var vun = true;
    function animation(){ // 相机运动
        //renderer.clear();
        if (camera.position.x > 5){
            vun = false
        }else if (camera.position.x < -5){
            vun = true;
        }
        if (vun){
            camera.position.x =camera.position.x +0.01;
            renderer.render(scene, camera);
            requestAnimationFrame(animation);
        }else{
            camera.position.x =camera.position.x -0.01;
            renderer.render(scene, camera);
            requestAnimationFrame(animation);
        }
        
    }
    animation();
    // $(document).keydown(function (event) {// 手动旋转
    //     switch (event.keyCode) {
    //         case 37: 
    //             cube.rotation.y -= 0.1;
    //             break;
    //         case 38: 
    //             cube.rotation.x -= 0.1;
    //             break;
    //         case 39: 
    //             cube.rotation.y += 0.1;
    //             break; 
    //         case 40:
    //             cube.rotation.x += 0.1;
    //             break; 
    //     };
    //     renderer.render(scene, camera);
    //     return false;
    // });
}