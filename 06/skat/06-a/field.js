const Point = require('./point.js');

class Field {
    constructor(locations) {
        this.locations = this._initLocations(locations);
        this.minX = Math.min(...this.locations.map(locale => locale.x));
        this.minY = Math.min(...this.locations.map(locale => locale.y));
        this.maxX = Math.max(...this.locations.map(locale => locale.x));
        this.maxY = Math.max(...this.locations.map(locale => locale.y));
        this.points = this._initPoints(locations);
        this.width = this.maxX - this.minX + 1;
        this.height = this.maxY - this.minY + 1;
        this.grid = new Array(this.width * this.height).fill(null);
        this._plotLocations();
    }

    _initPoints(locations) {
        let ticker = 0;
        return locations.map(point => {
            const arr = point.split(', ');
            return new Point(
                ticker++,
                Number(arr[0]) - this.minX,
                Number(arr[1]) - this.minY,
                this
            );
        });
    }

    _initLocations(locations) {
        return locations.map(locale => {
            const arr = locale.split(', ');
            return { x: Number(arr[0]), y: Number(arr[1]) };
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
        const minDistance = Math.min(
            ...this.points.map(point => this._getDistance(position, point))
        );
        const closest = this.points.filter(
            point => minDistance === this._getDistance(position, point)
        );
        return closest.length === 1 ? closest[0].id : 'multiple';
    }

    getLargestArea() {
        // check for the closest point in each grid cell
        this.grid = this.grid.map((cell, index) => {
            if (cell instanceof Point) {
                return cell;
            }
            return this._getNearestPoint(this._indexToXY(index));
        });
        const _removeInfinitePoints = () => {
            const _getValue = pt => {
                return pt instanceof Point ? pt.id : pt;
            };
            let outerRing = this.grid
                // get a list of each unique value in the outer ring
                // that are not strings (i.e. multiples)
                .filter((cell, index) => {
                    const cords = this._indexToXY(index);
                    return (
                        (cords.y === 0 ||
                            cords.y === this.height - 1 ||
                            cords.x === 0 ||
                            cords.x === this.width - 1) &&
                        typeof cell !== 'string'
                    );
                })
                // filter out the duplicates
                .filter(function(cell, index, self) {
                    return index === self.indexOf(cell);
                })
                // convert everything to numbers, no Points
                .map(cell => {
                    return _getValue(cell);
                });
            const eligiblePoints = this.points
                .filter(pt => {
                    return !outerRing.includes(pt.id);
                })
                .map(pt => pt.id);
            return eligiblePoints;
        };

        const largestArea = Math.max(
            ..._removeInfinitePoints().map(pt => {
                return this.grid.filter(cell => cell === pt).length + 1;
            })
        );
        // eligiblePoints = eligiblePoints.map(pt => {
        //     return pt.id;
        // });
        return largestArea;
    }
}

module.exports = Field;
