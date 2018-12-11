const Point = require('./point.js');

class Field {
    constructor(locations) {
        this.points = this._initLocations(locations);
        this.minX = Math.min(...this.points.map(point => point.x));
        this.minY = Math.min(...this.points.map(point => point.y));
        this.maxX = Math.max(...this.points.map(point => point.x));
        this.maxY = Math.max(...this.points.map(point => point.y));
        this.width = this.maxX - this.minX;
        this.height = this.maxY - this.minY;
        this.grid = new Array(this.width * this.height).fill(null);
        this._plotLocations();
    }

    _initLocations(locations) {
        let ticker = 0;
        return locations.map(point => {
            const arr = point.split(', ');
            return new Point(ticker++, Number(arr[0]), Number(arr[1]), this);
        });
    }

    _plotLocations() {
        const _xyToIndex = (x, y) => {
            return y * this.width + x;
        };
        this.points.forEach(point => {
            this.grid[_xyToIndex(point.x, point.y)] = point;
        });
    }

    _indexToXY(index) {
        const x = index % this.width;
        const y = Math.floor(index / this.width);
        return { x, y };
    }

    _getDistance(a, b) {
        const xDist = Math.abs(a.x - b.x);
        const yDist = Math.abs(a.y - b.y);
        return xDist + yDist;
    }

    _getNearestPoint(position) {
        const lowestDistance = Math.min(
            ...this.points.map(point => this._getDistance(position, point))
        );
        const closest = this.points.filter(
            point => lowestDistance === this._getDistance(position, point)
        );

        return closest.length === 1 ? closest[0] : 'multiple';
    }

    getLargestArea() {
        // check for the closest point in each grid cell
        this.grid.map((cell, index) => {
            if (cell instanceof Point) {
                return cell;
            }
            return this._getNearestPoint(this._indexToXY(index));
        });
        const multiples = this.grid.filter(cell => cell === 'multiple');

        console.log('Multiples: ' + multiples.length);
        this.points.forEach(point => {
            const matches = this.grid.filter(cell => cell === point.id);
            console.log(
                `[${point.id.toString().padStart(2, '0')}] Matches: ${
                    matches.length
                }`
            );
        });
    }
}

module.exports = Field;
