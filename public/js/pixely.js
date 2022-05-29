var Tool = {
    "pen": 0,
    "eraser": 1,
    "fillBucket": 2,
    "line": 3,
    "circle": 4,
    "ellipse": 5,
    "addFrame": 6,
    "undo": 7,
    "redo": 8,
    "clearCanvas": 9
};
var tools = [true, false, false, false, false, false];
var lc = [];
var data = {};

class Canvas {
    constructor(width, height) {
        this.canvas = document.querySelector("#canvas");
        this.canvas.width = 20 * width;
        this.canvas.height = 20 * height;
        this.width = width;
        this.height = height;
        this.canvas.style.display = "block";
        // this.canvas.style.height = Math.floor((height / width) * this.canvas.clientWidth) + "px";
        this.w = +this.canvas.width;
        this.h = +this.canvas.height;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.fillStyle = "white";
        this.alpha = 1
        this.color = window.colors[0]
        this.ctx.globalAlpha = this.alpha;
        this.ctx.fillRect(0, 0, this.w, this.h);
        this.data = [...Array(this.width)].map(e => Array(this.height).fill([255, 255, 255, 255]));
        this.steps = [];
        this.redo_arr = [];
        this.frames = [];

        this.previous_point = new Point(undefined, undefined)
        // Moved on-click to on-mouse-up to tell the difference
        //  between a click and a mouse-drag + click

        this.canvas.addEventListener("mousemove", e => {
            if (this.active) {
                if (!permissionDraw) return false
                var rect = this.canvas.getBoundingClientRect();
                var x = e.clientX - rect.left;
                var y = e.clientY - rect.top;
                x = Math.floor(this.width * x / this.canvas.clientWidth);
                y = Math.floor(this.height * y / this.canvas.clientHeight);
                if (tools[Tool.pen]) {
                    var p = new Point(x, y);
                    if (!p.equals(this.previous_point)) {
                        this.previous_point = p;
                        this.draw(p.x, p.y);
                    }
                } else if (tools[Tool.eraser]) {
                    this.erase(x, y);
                }
            }
        });

        this.canvas.addEventListener("touchmove", e => {
            // if (!permissionDraw)
            return false
            var rect = this.canvas.getBoundingClientRect();
            var x = e.touches[0].clientX - rect.left;
            var y = e.touches[0].clientY - rect.top;
            x = Math.floor(this.width * x / this.canvas.clientWidth);
            y = Math.floor(this.height * y / this.canvas.clientHeight);
            if (tools[Tool.pen]) {
                var p = new Point(x, y);
                if (!p.equals(this.previous_point)) {
                    this.previous_point = p;
                    this.draw(p.x, p.y);
                }
            } else if (tools[Tool.eraser]) {
                this.erase(x, y);
            }
        })

        this.canvas.addEventListener("mousedown", e => {

            // this.previous_point = new Point(undefined,undefined)
            // this.active = false
        });
        this.canvas.addEventListener("click", e => {
            var rect = this.canvas.getBoundingClientRect();

            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;

            var vm = this
            if (scale !== 1 && permissionDraw) {
                permissionDraw = false
                // var v = setInterval(function () {
                //
                //     if (scale > 1) {
                //         scale -= 0.1;
                //         if (scale < 1) scale = 1
                //     } else if (scale < 1) {
                //         scale += 0.1;
                //         if (scale > 1) scale = 1
                //     }
                //     canvasE.style.zoom = scale
                //     if (scale === 1) {
                //         clearInterval(v)
                //     }
                // }, 20)
                scale = 1
                canvasE.style.transform = 'scale('+scale+')'
                // scrollToC(x, y)

            }

            // Scroll the element


            this.active = false
            if (!permissionDraw) return false


            this.previous_point = new Point(undefined, undefined)
            if (this.previous_point.x !== undefined) {
                return; // Don't re-paint the last point in a streak
            }

            // this.canvas.style.transform="scale(1)"

            x = Math.floor(this.width * x / this.canvas.clientWidth);
            y = Math.floor(this.height * y / this.canvas.clientHeight);

            this.previous_point = new Point(x, y);
            this.draw(x, y);

        });
    }

    draw(x, y, count) {
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
            this.ctx.globalAlpha = $('#range_alpha').val() / 100;
            this.data[x][y] = this.color;
            this.ctx.fillRect(Math.floor(x * (this.w / this.width)), Math.floor(y * (this.h / this.height)), Math.floor(this.w / this.width), Math.floor(this.h / this.height));
            saveToBD(x, y, this.color, this.ctx.globalAlpha)
        }
    }

    otherDraw(x, y, color, alpha) {
        board.previous_point = new Point(x, y);
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
            this.data[x][y] = this.color;
            this.ctx.globalAlpha = alpha;
            this.ctx.fillStyle = "rgba(" + color[0] + "," + color[1] + "," + color[2] + "," + color[3] + ")";
            this.ctx.fillRect(Math.floor(x * (this.w / this.width)), Math.floor(y * (this.h / this.height)), Math.floor(this.w / this.width), Math.floor(this.h / this.height));

        }
        this.setcolor(this.color)
    }

    erase(x, y) {
        var temp = this.color;
        var tga = this.ctx.globalAlpha;
        this.setcolor([255, 255, 255, 255]);
        this.draw(x, y);
        this.setcolor(temp);
        this.ctx.globalAlpha = tga;
    }

    setcolor(color) {
        this.color = color;
        this.ctx.fillStyle = "rgba(" + color[0] + "," + color[1] + "," + color[2] + "," + color[3] + ")";
        document.getElementById("color-selected").style.background = "rgba(" + color[0] + "," + color[1] + "," + color[2] + "," + color[3] + ")";
    }

    setmode(i) {
        tools = [false, false, false, false, false, false];
        tools[i] = true;
        document.querySelectorAll("#toolbar .item").forEach((x, i) => {
            if (tools[i]) x.style.backgroundColor = "grey";
            else x.style.backgroundColor = "";
        })
    }

    save() {
        this.canvas.toBlob(function (blob) {
            var url = URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.download = 'canvas.png';
            link.href = url;
            link.click();
        })
    }

    clear() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.w, this.h);
        this.data = [...Array(this.width)].map(e => Array(this.height).fill([255, 255, 255, 255]));
        this.setcolor(this.color);
        this.setmode(Tool.pen);
    }

    addFrame(data = null) {
        var img = new Image();
        img.src = data || this.canvas.toDataURL();
        this.frames.push([img, this.data.map(inner => inner.slice())]);
    }

    deleteFrame(f) {
        this.frames.splice(f, 1);
    }

    loadFrame(f) {
        this.clear();
        var img = this.frames[f][1];
        var tmp_color = this.color;
        var tmp_alpha = this.ctx.globalAlpha;
        this.ctx.globalAlpha = 1;
        var i, j;
        for (i = 0; i < this.width; i++) {
            for (j = 0; j < this.height; j++) {
                this.setcolor(img[i][j]);
                this.draw(i, j);
            }
        }
        this.setcolor(tmp_color);
        this.ctx.globalAlpha = tmp_alpha;
    }

    renderGIF() {
        this.frames.forEach(frame => {
            gif.addFrame(frame[0], {
                copy: true,
                delay: 100
            });
        });
        gif.render();
    }

    undo() {
        this.clear();
        this.redo_arr.push(this.steps.pop());
        var step;
        this.steps.forEach(step => {
            this.setcolor(step[2]);
            this.ctx.globalAlpha = step[3];
            this.draw(step[0], step[1], true);
        });
    }

    redo() {
        this.steps.push(this.redo_arr.pop());
        var step;
        this.steps.forEach(step => {
            this.setcolor(step[2]);
            this.ctx.globalAlpha = step[3];
            this.draw(step[0], step[1], true);
        });
    }

    saveInLocal() {
        /*var a = this.frames.map(frame=> [frame[0].src,frame[1]]);
        var f =  JSON.stringify(a);*/
        var d = {
            'colors': window.colors,
            'currColor': this.color,
            'width': this.width,
            'height': this.height,
            'url': this.canvas.toDataURL(),
            'steps': this.steps,
            'redo_arr': this.redo_arr,
            'dim': window.dim,
        }
        localStorage.setItem('pc-canvas-data', JSON.stringify(d));
    }

    addImage() {
        var _this = this;
        var fp = document.createElement("input");
        fp.type = "file";
        fp.click();
        fp.onchange = function (e) {
            var reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = function () {
                var uimg = new Image();
                uimg.src = reader.result;
                uimg.width = _this.w;
                uimg.height = _this.h;
                uimg.onload = function () {
                    var pxc = document.createElement("canvas");
                    pxc.width = _this.w;
                    pxc.height = _this.h;
                    var pxctx = pxc.getContext("2d");
                    pxctx.drawImage(uimg, 0, 0, _this.w, _this.h);
                    var i, j;
                    for (i = 0; i < _this.width; i++) {
                        for (j = 0; j < _this.height; j++) {
                            var ctr = 0;
                            var avg = [0, 0, 0, 0];
                            var pix = pxctx.getImageData(10 * i, 10 * j, 10, 10).data;
                            pix.forEach((x, k) => {
                                avg[k % 4] += x;
                                if (k % 4 == 0) ctr++;
                            });
                            avg = avg.map(x => ~~(x / ctr));
                            _this.setcolor(avg);
                            _this.draw(i, j);
                        }
                    }
                }
            }
        }
    }
}

class Popup {
    constructor(s) {
        this.s = s;
        document.querySelector(this.s).style.display = "block";
        document.querySelector(this.s).style.transform = "translate(-50%,-50%) scale(1,1)";
    }

    close() {
        document.querySelector(this.s).style.transform = "translate(-50%,-50%) scale(0,0)";
    }
}

class Frames {
    static open() {
        document.querySelector("#frames").style.display = "block";
        document.querySelector("#frames").style.transform = "translate(-50%,-50%) scale(1,1)";
        document.querySelector("#frames").focus();
        document.querySelector("#frames #gallery").innerHTML = "";
        for (var frame of board.frames) document.querySelector("#frames #gallery").appendChild(frame[0]);
        document.querySelectorAll("#frames #gallery img").forEach((x, i) => {
            x.onclick = (e) => {
                board.loadFrame(i);
                Frames.close();
            };
            x.oncontextmenu = (e) => {
                e.preventDefault();
                var del_confirmation = confirm("Delete?");
                if (del_confirmation) {
                    board.deleteFrame(i);
                    Frames.open();
                }
            };
        });
    }

    static close() {
        document.querySelector("#frames").style.transform = "translate(-50%,-50%) scale(0,0)";
    }
}

function start() {
    var canvasData = localStorage.getItem('pc-canvas-data');
    if (canvasData) {
        data = JSON.parse(canvasData);
        window.colors = data.colors;
        if (window.board == undefined) {
            window.board = new Canvas(data.width, data.height);
        }

        // var img = new Image();
        // img.setAttribute('src', data.url);
        // img.addEventListener("load", function () {
        //     window.board.ctx.drawImage(img, 0, 0);
        // });
        /*
        window.board.frames = JSON.parse(data.frames).map(frame=>{
          var img = new Image();
          img.src = frame[0]
          return [img, frame[1]]
        });

        for(var f in data.frames){
          var c = document.createElement('canvas');
          c.width = data.width;
          c.height = data.height;
          var c_ctx = c.getContext('2d');
          c_ctx.drawImage(f[0], 0, 0);
          window.board.addFrame(c.toDataURL());
        }
       */

        // window.board.steps = data.steps;
        // window.board.redo_arr = data.redo_arr;
        // window.board.setcolor(data.currColor);
        // window.gif = new GIF({
        //     workers: 2,
        //     quality: 10,
        //     width: 10 * window.board.width,
        //     height: 10 * window.board.height
        // });
        // window.gif.on('finished', function (blob) {
        //     var url = URL.createObjectURL(blob);
        //     var link = document.createElement('a');
        //     link.download = 'canvas.gif';
        //     link.href = url;
        //     link.click();
        // });
    } else {
        newProject();
    }
    document.querySelector("#palette").innerHTML = colors.map(x => `<span class="item" style="background-color: rgb(${x[0]},${x[1]},${x[2]})" onclick="board.setcolor([${x}]);act(this);" oncontextmenu="board.setcolor([${x}],prompt('Transparency(0-1)?'));act(this);"></span>`).join("\n");

    document.querySelector("#palette").addEventListener("contextmenu", e => e.preventDefault());
}

function newProject() {
    document.querySelector(".menu").style.display = "none";
    localStorage.removeItem('pc-canvas-data');
    window.dim = new Popup("#popup");
    window.colors = [
        [0, 0, 0, 255],
        [127, 127, 127, 255],
        [136, 0, 21, 255],
        [237, 28, 36, 255],
        [255, 127, 39, 255],
        [255, 242, 0, 255],
        [34, 177, 36, 255],
        [0, 162, 232, 255],
        [63, 72, 204, 255],
        [163, 73, 164, 255],
        [255, 255, 255, 255],
        [195, 195, 195, 255],
        [185, 122, 87, 255],
        [255, 174, 201, 255],
        [255, 201, 14, 255],
        [239, 228, 176, 255],
        [181, 230, 29, 255],
        [153, 217, 234, 255],
        [112, 146, 190, 255],
        [200, 191, 231, 255]
    ];
}

function filler(x, y, cc) {
    if (x >= 0 && x < board.width && y >= 0 && y < board.height) {
        if (JSON.stringify(board.data[x][y]) == JSON.stringify(cc) && JSON.stringify(board.data[x][y]) != JSON.stringify(board.color)) {
            board.draw(x, y);
            filler(x + 1, y, cc);
            filler(x, y + 1, cc);
            filler(x - 1, y, cc);
            filler(x, y - 1, cc);
        }
    }
}

function act(clr) {
    document.querySelectorAll("#palette .item").forEach(x => x.style.boxShadow = "");
    clr.style.boxShadow = "rgb(0 0 0 / 50%) 0px 0px 4px 0px";
}

// window.onbeforeunload = function () {
//     board.saveInLocal();
//     return "Data will be lost if you leave the page, are you sure?";
// };

var scope = {
    scope: './'
};


// var x = 0
// setInterval(function () {
//     board.setcolor([136, 0, 21, 255])
//     board.ctx.globalAlpha=0.2
//
//     board.previous_point = new Point(x, 1);
//     board.draw(x, 1);
//     x++
//     },2000)

function getPixel() {
    $.getJSON("https://teetup.iran.liara.run/api/getPixelBase", function (d) {
        var l = d.length
        var x = 0
        var time = 100 / l
        console.log(l)

        $.each(d, function (k, v) {
            board.otherDraw(v.x, v.y, JSON.parse(v.color), v.alpha);
        })
        //
        // var timer = setInterval(function () {
        //     var v = d[x];
        //
        //     board.otherDraw(v.x, v.y, JSON.parse(v.color), v.alpha);
        //     x++;
        //     if (x == l - 1)
        //     {
        //         clearInterval(timer)
        //         $('.loading').hide()
        //     }
        // }, 0)
        $('.loading').hide()
    })
}

$.getJSON("https://teetup.iran.liara.run/api/getPixely", function (v) {
    data.width = v.width
    data.height = v.height
    window.colors = data.colors = [
        [0, 0, 0, 255],
        [127, 127, 127, 255],
        [136, 0, 21, 255],
        [237, 28, 36, 255],
        [255, 127, 39, 255],
        [255, 242, 0, 255],
        [34, 177, 36, 255],
        [0, 162, 232, 255],
        [63, 72, 204, 255],
        [163, 73, 164, 255],
        [255, 255, 255, 255],
        [195, 195, 195, 255],
        [185, 122, 87, 255],
        [255, 174, 201, 255],
        [255, 201, 14, 255],
        [239, 228, 176, 255],
        [181, 230, 29, 255],
        [153, 217, 234, 255],
        [112, 146, 190, 255],
        [200, 191, 231, 255]
    ];
    if (window.board == undefined) {
        window.board = new Canvas(data.width, data.height);
    }

    document.querySelector("#palette").innerHTML = colors.map(x => `<span class="item" style="background-color: rgb(${x[0]},${x[1]},${x[2]})" onclick="board.setcolor([${x}]);act(this);" oncontextmenu="board.setcolor([${x}]);act(this);board.ctx.globalAlpha=+prompt('Transparency(0-1)?')"></span>`).join("\n");
    document.querySelector("#palette").addEventListener("contextmenu", e => e.preventDefault());
    scrollTo("container")

    getPixel()
})

var lastTime = "n";
function saveToBD(x, y, color, alpha) {
lastTime = Date.now();
    console.log(lastTime)
    $.ajax({
        url: 'https://teetup.iran.liara.run/api/setPixel?x='+x+'&y='+y+'&color='+JSON.stringify(color)+'&alpha='+alpha+'&time='+lastTime,
        method: 'get',
        success: function (r) {
        }
    })
}

window.onerror = function (){
    location.reload()
}

var pusher = new Pusher("ALacTeLEiNho", {
    forceTLS: true,
    wsHost: 'push-teetup.iran.liara.run',
    wsPort: 443,
    disableStats: true,
});

var channel = pusher.subscribe("pixely");

channel.bind("getPixel", (data) => {
    console.log(data)
    if(lastTime!=data.time)
    board.otherDraw(data.x, data.y, JSON.parse(data.color), data.alpha);
});
