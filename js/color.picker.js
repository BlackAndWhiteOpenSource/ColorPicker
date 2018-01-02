var ctx1;
var ctx2;
var rgbaColor = 'rgba(255,0,0,1)';
var width1;
var width2;
var height1;
var height2;
var inputColor;
var inputHex;
var drag = false;
var SelectedCallBack;

var OpenColorPicker = function (idElement, CallBack) {
    SelectedCallBack = CallBack;
    var element = document.getElementById(idElement);
    rgbaColor = element.style.backgroundColor.replace("rgb", "rgba");
    var box = document.getElementById('canvas-color-picker');

    box.innerHTML = null;
    box.innerHTML +=
        '<div id="box-color-picker">' +
        '    <canvas id="color-picker"></canvas>' +
        '    <canvas id="color-picker-line"></canvas>' +
        '    Hex: <span id="hex-color"></span> ' +
        '         <div class="input-color-picker" id="hex-set-color"></div> ' +
        '    <button class="button-color-picker" id="picker-ok">OK</button> <button class="button-color-picker" id="picker-close">X</button>' +
        '</div>';
    RenderColorPicker(idElement);
    document.getElementById('picker-ok').addEventListener('click', function (e) {
        var color = document.getElementById('hex-color').innerText;
        Ok(idElement, color);
    });
    document.getElementById('picker-close').addEventListener('click', function (e) {
        document.getElementById('canvas-color-picker').innerHTML = null;
    });
    AddStyle(element);
}
var RenderColorPicker = function () {
    var colorBlock = document.getElementById('color-picker');
    ctx1 = colorBlock.getContext('2d');
    width1 = colorBlock.width;
    height1 = colorBlock.height;

    var colorStrip = document.getElementById('color-picker-line');
    ctx2 = colorStrip.getContext('2d');
    width2 = colorStrip.width;
    height2 = colorStrip.height;

    inputColor = document.getElementById('hex-set-color');
    inputHex = document.getElementById('hex-color');
    inputColor.style.backgroundColor = RbgToHex(rgbaColor);
    inputHex.innerText = RbgToHex(rgbaColor);

    var x = 0;
    var y = 0;

    ctx1.rect(0, 0, width1, height1);
    fillGradient();

    ctx2.rect(0, 0, width2, height2);
    var grd1 = ctx2.createLinearGradient(0, 0, 0, height1);
    grd1.addColorStop(0, 'rgba(255, 0, 0, 1)');
    grd1.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
    grd1.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
    grd1.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
    grd1.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
    grd1.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
    grd1.addColorStop(1, 'rgba(255, 0, 0, 1)');
    ctx2.fillStyle = grd1;
    ctx2.fill();

    colorStrip.addEventListener("click", click, false);
    colorBlock.addEventListener("mousedown", mousedown, false);
    colorBlock.addEventListener("mouseup", mouseup, false);
    colorBlock.addEventListener("mousemove", mousemove, false);
}
var Ok = function (idElement, color) {
    document.getElementById('canvas-color-picker').innerHTML = null;
    SelectedCallBack(color);
}
var click = function (e) {
    x = e.offsetX;
    y = e.offsetY;
    var imageData = ctx2.getImageData(x, y, 1, 1).data;
    rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
    inputColor.style.backgroundColor = RbgToHex(rgbaColor);
    inputHex.innerText = RbgToHex(rgbaColor);
    fillGradient();
}
var fillGradient = function () {
    ctx1.fillStyle = rgbaColor;
    ctx1.fillRect(0, 0, width1, height1);

    var grdWhite = ctx2.createLinearGradient(0, 0, width1, 0);
    grdWhite.addColorStop(0, 'rgba(255,255,255,1)');
    grdWhite.addColorStop(1, 'rgba(255,255,255,0)');
    ctx1.fillStyle = grdWhite;
    ctx1.fillRect(0, 0, width1, height1);

    var grdBlack = ctx2.createLinearGradient(0, 0, 0, height1);
    grdBlack.addColorStop(0, 'rgba(0,0,0,0)');
    grdBlack.addColorStop(1, 'rgba(0,0,0,1)');
    ctx1.fillStyle = grdBlack;
    ctx1.fillRect(0, 0, width1, height1);
}
var mousedown = function (e) {
    drag = true;
    changeColor(e);
}
var mousemove = function (e) {
    if (drag)
        changeColor(e);
}
var mouseup = function (e) {
    drag = false;
}
var changeColor = function (e) {
    x = e.offsetX;
    y = e.offsetY;
    var imageData = ctx1.getImageData(x, y, 1, 1).data;
    rgbaColor = "rgba(" + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',' + imageData[3] + ")";
    var hex = RbgToHex(rgbaColor);
    inputColor.style.backgroundColor = hex;
    inputHex.innerText = hex;
}
var RbgToHex = function (rgbaColor) {
    var rgba = rgbaColor.substring(5, rgbaColor.length - 1);
    var imgData = rgba.split(',');
    return "#" + ToHex(imgData[0]) + ToHex(imgData[1]) + ToHex(imgData[2]);
}
var ToHex = function (number) {
    number = parseInt(number, 10);
    if (isNaN(number))
        return "00";
    number = Math.max(0, Math.min(number, 255));
    return "0123456789ABCDEF".charAt((number - number % 16) / 16) + "0123456789ABCDEF".charAt(number % 16);
}
var AddStyle = function (element) {
    Style(element, function (data) {
        var style = document.createElement('style');
        style.type = "text/css";
        document.getElementsByTagName("head")[0].appendChild(style);
        style.appendChild(document.createTextNode(data));
    });
}

var Style = function (element, callback) {
    var boxLeft = element.offsetLeft.toString() + "px";
    var boxTop = (element.offsetTop + 20).toString() + "px";
    callback('#box-color-picker {' +
             '    width: 21.9% !important;' +
             '    height: 187px !important;' +
             '    border: 5px solid #696767 !important;' +
             '    margin: 1% 0% 0% 0% !important;' +
             '    background-color: #696767 !important;' +
             '    position: absolute !important;' +
             '    left: ' + boxLeft + ' !important;' +
             '    top: ' + boxTop + ' !important;' +
             '    z-index: 1 !important;' +
             '}' +
             '#color-picker {' +
             '    cursor: crosshair !important;' +
             '    width: 86% !important;' +
             '    height: 150px !important;' +
             '}' +
             '#color-picker-line {' +
             '    cursor: crosshair !important;' +
             '    width: 12.2% !important;' +
             '    height: 150px !important;' +
             '    background-color: #fff !important;' +
             '}' +
             '#hex-set-color{' +
             '    width: 17% !important;' +
             '    height: 22px !important;' +
             '    float: left !important;' +
             '    border: #000 solid 1px !important' +
             '}' +
             '#hex-color{' +
             '    color: #fff !important;' +
             '}' +
             '.button-color-picker{' +
             '    float: right !important;' +
             '    width: 12% !important;' +
             '    height: 23px !important;' +
             '    margin-left: 0 !important;' +
             '    margin-right: 1% !important;' +
             '    font-size: 1em !important;' +
             '}');
}
