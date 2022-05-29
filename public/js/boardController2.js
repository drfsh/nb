
var scale = 0.3;
var scaleMin = 0.05;
var scaleMax = 1;
var alphaWScroll = 1
var alphaHScroll = 1.1

if (window.innerWidth < 500) {
    scale = 0.16;
    alphaWScroll = 2.16
    alphaHScroll = 1
}

var ele = document.getElementById('container');
ele.style.cursor = 'grab';

var pos = {top: 0, left: 0, x: 0, y: 0};

var permissionDraw = true;

var mouseDownHandler = function (e) {
    ele.style.cursor = 'grabbing';
    ele.style.userSelect = 'none';
    pos = {
        left: ele.scrollLeft,
        top: ele.scrollTop,
        // Get the current mouse position
        x: e.clientX,
        y: e.clientY,
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
};

var mouseMoveHandler = function (e) {
    // How far the mouse has been moved
    var dx = e.clientX - pos.x;
    var dy = e.clientY - pos.y;
    permissionDraw = false

    // Scroll the element
    ele.scrollTop = pos.top - dy;
    ele.scrollLeft = pos.left - dx;
};

var mouseUpHandler = function () {
    ele.style.cursor = 'grab';
    ele.style.removeProperty('user-select');

    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
    setTimeout(function () {
        permissionDraw = true
    }, 200)
};

// Attach the handler
ele.addEventListener('mousedown', mouseDownHandler);

//end.scroll

//start.ping_touch
// var scaling = false
// var touchStart = function (e) {
//     if (e.touches.length === 2) {
//         scaling = true;
//         pinchStart(e)
//     }
// }
//
// var touchMove = function (e) {
//     if (scaling) {
//         pinchMove(e)
//     }
// }
// var touchend = function (e) {
//     if (scaling) {
//         pinchEnd(e)
//         scaling = false
//     }
// }
// ele.addEventListener('touchstart', touchStart);
// ele.addEventListener('touchmove', touchMove);
// ele.addEventListener('touchend', touchend);
// var oldDist = 0;
//
// function pinchStart(e) {
//     oldDist = Math.hypot(e.touches[0].pageX - e.touches[1].pageX, e.touches[0].pageY - e.touches[1].pageY)
// }
//
// var canvasE = document.getElementById("canvas");
//
//
// canvasE.style.zoom = scale
// ele.scrollTop = window.scrollTop + ele.clientHeight / 2;
// ele.scrollLeft = window.innerWidth - canvasE.clientWidth / 2;
//
// function scrollTo(id) {
//     $('#' + id).animate({
//         scrollTop: $("#" + id).offset().top + $(window).height()*alphaHScroll,
//         scrollLeft: $("#" + id).offset().left + $(window).width() * alphaWScroll
//     }, 0);
// }
//
// function scrollToC(x,y) {
//     console.log(x,y)
//     $('#container').animate({
//         scrollTop: $("#container").offset().top + $(window).height()+(y*2),
//         scrollLeft: $("#container").offset().left + $(window).width() +(x*2)
//     }, 500);
// }
//
// function pinchMove(e) {
//     var dist = Math.hypot(e.touches[0].pageX - e.touches[1].pageX, e.touches[0].pageY - e.touches[1].pageY)
//     var isZoom = false
//     if (dist > oldDist) {
//         // alert("zoom")
//         isZoom = true
//     } else {
//         // alert("unzoom")
//     }
//     var zoom = dist - oldDist
//     var windowW = window.innerHeight
//
//     var dd = (zoom * 100) / windowW
//
//     scale = scale + (dd / 300)
//     if (scale < scaleMin) scale = scaleMin
//     canvasE.style.zoom = scale
//
//
// }
//
// function pinchEnd(e) {
//     oldDist = 0
// }

//end.ping_touch

$(document).keydown(function (e) { // requires jQuery
    if (e.keyCode === 109) { // minus
        if (scale <= scaleMin) return false
        scale -= 0.01
        canvasE.style.zoom = scale
        return false;
    }
    if (e.keyCode === 107) { // plus
        if (scale >= scaleMax) return false
        scale += 0.01
        canvasE.style.zoom = scale
        return false;
    }
});

$('#zoom_in').click(function () {
    if (scale >= scaleMax) return false
    scale += 0.01
    canvasE.style.zoom = scale
})
$('#zoom_out').click(function () {
    if (scale <= scaleMin) return false
    scale -= 0.01
    canvasE.style.zoom = scale
})

$('#zoom_fix').click(function () {
    if (window.innerWidth < 500) {
        scale = 0.16;
    } else
        scale = 0.3;

    canvasE.style.zoom = scale
})

$('.colors').click(function () {
    var dashboard = $('.dashboard')
    if (dashboard.hasClass('hide'))
        dashboard.removeClass('hide')
    else
        dashboard.addClass('hide')
})
$('#range_alpha').on('input', function () {
    var alpha = $('#range_alpha').val()
    $('#alpha').text(alpha)
    document.getElementById("color-selected").style.opacity = alpha / 100;
})
$('#zoom').on('input', function () {
    var zoom = $('#zoom').val()
    scale = zoom /100
    if (scale<=scaleMin) scale = scaleMin
    canvasE.style.zoom = scale
    console.log(scale)
})



let canvas = document.getElementById("canvas")
let ctx = canvas.getContext('2d')

let cameraOffset = { x: window.innerWidth/2, y: window.innerHeight/2 }
let cameraZoom = 1
let MAX_ZOOM = 5
let MIN_ZOOM = 0.1
let SCROLL_SENSITIVITY = 0.0005


// Gets the relevant location from a mouse or single touch event
function getEventLocation(e)
{
    if (e.touches && e.touches.length == 1)
    {
        return { x:e.touches[0].clientX, y: e.touches[0].clientY }
    }
    else if (e.clientX && e.clientY)
    {
        return { x: e.clientX, y: e.clientY }
    }
}

function drawRect(x, y, width, height)
{
    ctx.fillRect( x, y, width, height )
}

function drawText(text, x, y, size, font)
{
    ctx.font = `${size}px ${font}`
    ctx.fillText(text, x, y)
}

let isDragging = false
let dragStart = { x: 0, y: 0 }

function onPointerDown(e)
{
    isDragging = true
    dragStart.x = getEventLocation(e).x/cameraZoom - cameraOffset.x
    dragStart.y = getEventLocation(e).y/cameraZoom - cameraOffset.y
}

function onPointerUp(e)
{
    isDragging = false
    initialPinchDistance = null
    lastZoom = cameraZoom
}

function onPointerMove(e)
{
    if (isDragging)
    {
        cameraOffset.x = getEventLocation(e).x/cameraZoom - dragStart.x
        cameraOffset.y = getEventLocation(e).y/cameraZoom - dragStart.y
    }
}

function handleTouch(e, singleTouchHandler)
{
    if ( e.touches.length == 1 )
    {
        singleTouchHandler(e)
    }
    else if (e.type == "touchmove" && e.touches.length == 2)
    {
        isDragging = false
        handlePinch(e)
    }
}

let initialPinchDistance = null
let lastZoom = cameraZoom

function handlePinch(e)
{
    e.preventDefault()

    let touch1 = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    let touch2 = { x: e.touches[1].clientX, y: e.touches[1].clientY }

    // This is distance squared, but no need for an expensive sqrt as it's only used in ratio
    let currentDistance = (touch1.x - touch2.x)**2 + (touch1.y - touch2.y)**2

    if (initialPinchDistance == null)
    {
        initialPinchDistance = currentDistance
    }
    else
    {
        adjustZoom( null, currentDistance/initialPinchDistance )
    }
}

function adjustZoom(zoomAmount, zoomFactor)
{
    if (!isDragging)
    {
        if (zoomAmount)
        {
            cameraZoom += zoomAmount
        }
        else if (zoomFactor)
        {
            console.log(zoomFactor)
            cameraZoom = zoomFactor*lastZoom
        }

        cameraZoom = Math.min( cameraZoom, MAX_ZOOM )
        cameraZoom = Math.max( cameraZoom, MIN_ZOOM )

        console.log(zoomAmount)
        console.log(zoomAmount)
        document.getElementById('log').innerText = zoomAmount+"/"+cameraZoom;
    }
}

canvas.addEventListener('mousedown', onPointerDown)
canvas.addEventListener('touchstart', (e) => handleTouch(e, onPointerDown))
canvas.addEventListener('mouseup', onPointerUp)
canvas.addEventListener('touchend',  (e) => handleTouch(e, onPointerUp))
canvas.addEventListener('mousemove', onPointerMove)
canvas.addEventListener('touchmove', (e) => handleTouch(e, onPointerMove))
canvas.addEventListener( 'wheel', (e) => adjustZoom(e.deltaY*SCROLL_SENSITIVITY))

// Ready, set, go
