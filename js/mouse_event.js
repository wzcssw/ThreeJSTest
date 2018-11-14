// 鼠标事件
var MouseEvent = function(){
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
        if (ismousedown) {
            endX = event.clientX;
            endY = event.clientY;
            var x=endX-startX;
            var y=endY-startY;
            if (Math.abs(x)>Math.abs(y)) { // 水平
                var newPoint = CircleNextPoint( camera.position.x, camera.position.z,-x*0.001);
                camera.position.x = newPoint.x;
                camera.position.z = newPoint.z;
            } else {   // 垂直
                var newPoint = CircleNextPoint( camera.position.y, camera.position.z,y*0.001);
                camera.position.y = newPoint.x;
                camera.position.z = newPoint.z;
            }
            startX=endX;
            startY=endY;
        }
    };
    
    //监听鼠标滚动事件
    document.addEventListener('mousewheel', mousewheel, false);
    function mousewheel(e) {
                e.preventDefault();
                //e.stopPropagation();
                if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
                    if (e.wheelDelta > 0) { //当滑轮向上滚动时
                        camera_config.fov -= (camera_config.near < camera_config.fov ? 1 : 0);
                    }
                    if (e.wheelDelta < 0) { //当滑轮向下滚动时
                        camera_config.fov += (camera_config.fov < camera_config.far ? 1 : 0);
                    }
                } else if (e.detail) {  //Firefox滑轮事件
                    if (e.detail > 0) { //当滑轮向上滚动时
                        fov -= 1;
                    }
                    if (e.detail < 0) { //当滑轮向下滚动时
                        camera_config.fov += 1;
                    }
                }
                //改变fov值，并更新场景的渲染
                camera.fov = camera_config.fov;
                camera.updateProjectionMatrix();
                renderer.render(scene, camera);
    }
};