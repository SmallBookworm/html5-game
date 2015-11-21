/**
 * Created by peng on 15/11/19.
 */
function BoardRenderer(context, modle) {
    this._ctx = context;
    this._modle = modle;

    this._cols = modle.getCols();
    this._rows = modle.getRows();

    this._x = 0;
    this._y = 0;

    this._width = 0;
    this._height = 0;

    this._cellSize = 0;
}
var _p = BoardRenderer.prototype;
//注意下面两个函数画图默认在坐标轴原点
_p._drawBackground = function () {
    var ctx = this._ctx;

    var gradient = ctx.createLinearGradient(0, 0, 0, this._height);
    gradient.addColorStop(0, "#fffbb3");
    gradient.addColorStop(1, "#f6f6b2");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, this._width, this._height);

    var co = this._width / 6;
    ctx.strokeStyle = "#dad7ac";
    ctx.fillStyle = "#f6f6b2";
    ctx.beginPath();
    ctx.moveTo(co, this._height);
    ctx.bezierCurveTo(this._width + co * 3, -co, -co * 3, -co, this._width - co, this._height);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(co, 0);
    ctx.bezierCurveTo(this._width + co * 3, this._height + co, -co * 3, this._height + co, this._width - co, 0);
    ctx.fill();
};

_p._drawGrid = function () {
    var ctx = this._ctx;
    ctx.beginPath();
    e_grid(ctx, 0.5, 0.5, this._cellSize, this._rows+1, this._cols+1);
    ctx.strokeStyle = "#ccc";
    ctx.stroke();
};

_p.drawToken = function (cellX, cellY) {
    var ctx = this._ctx;
    var cellsize = this._cellSize;
    var tokenType = this._modle.getPiece(cellX, cellY);
    if (!tokenType)
        return;
    var colorCode = "black";
    switch (tokenType) {
        case BoardModel.RED:
            colorCode = "red";
            break;
        case BoardModel.GREEN:
            colorCode = "green";
            break;
    }
    var x = this._x + (cellX + 0.5) * cellsize;
    var y = this._y + (cellY + 0.5) * cellsize;
    var radius = cellsize * 0.4;
    var gradientX = x + cellsize * 0.1;
    var gradientY = y - cellsize * 0.1;
    var gradient = ctx.createRadialGradient(
        gradientX, gradientY, cellsize * 0.1,
        gradientX, gradientY, radius * 1.2);
    gradient.addColorStop(0, "yellow");
    gradient.addColorStop(1, colorCode);
    ctx.fillStyle = gradient;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
    ctx.fill();
};
_p.repaint = function () {
    this._ctx.save();
    this._ctx.translate(this._x, this._y);
    this._drawBackground();
    this._drawGrid();
    this._ctx.restore();

    for (var i = 0; i < this._cols; i++) {
        for (var j = 0; j < this._rows; j++) {
            this.drawToken(i, j);
        }
    }
};
_p.setSize=function(x,y,cellSize){
    this._x=x;
    this._y=y;
    this._cellSize=cellSize;
    this._width=this._cellSize*this._cols;
    this._height=this._cellSize*this._rows;
};