class Point {
    constructor(id, x, y, field) {
        this.field = field;
        this.id = id;
        this.x = x;
        this.y = y;
    }

    get gridCords() {
        return { x: this.x, y: this.y };
    }

    get indexCord() {
        return this.y * this.field.width + this.x;
    }
}

module.exports = Point;
