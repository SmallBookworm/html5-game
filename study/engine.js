/**
 * Created by peng on 15/11/16.
 */
/**
 *线路径
 */
function e_line(context, x1, y1, x2, y2) {
    try {
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
    } catch (e) {
        return false;
    }
    return true;
}
/**
 *网格路径
 *@param context canvas的上下文
 * @param x
 * @param y
 * @param cellsize
 * @param horizontalLine 网格横线数量
 * @param verticalLine 网格纵线数量
 * @param lineWidth
 * @param strokeStyle
 * */
function e_grid(context, x, y, cellsize, horizontalLine, verticalLine,lineWidth,strokeStyle) {
    x = x || 0;
    y = y || 0;
    context.lineWidth=lineWidth||1;
    context.strokeStyle=strokeStyle||"#000";
    var y2=y+ cellsize * (horizontalLine-1);
    var x2=x+cellsize * (verticalLine-1);
    for (var i = 0; i < verticalLine; i++) {
        e_line(context, i * cellsize + x, y, i * cellsize +x,y2);
    }
    for (var j = 0; j < horizontalLine; j++) {
        e_line(context, x, j * cellsize +y, x2, j * cellsize +y);
    }
}