const NEIGHBOURS : Array<number[]> = []
for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
        if ((x, y) == (0, 0)) {
            continue
        }
        NEIGHBOURS.push([x, y])
    }
}


class Main {
    grid: number[][]
    size: number[]
    cell_size: number[]

    constructor (fill: number, size: number[], cell_size: number[]) {
        this.size = size
        this.cell_size = cell_size

        // initialize grid
        this.grid = []
        for (let y = 0; y < size[1]; y++) {
            let row = []
            for (let x = 0; x < size[0]; x++) {
                if (randint(0, 99) < fill) {
                    row.push(1)
                }
                else {
                    row.push(0)
                }
            }
            this.grid.push(row)
        }
    }

    is_inside_grid(x: number, y: number) {
        if (x < 0) { return false }
        if (x >= this.size[0]) { return false }
        if (y < 0) { return false }
        if (y >= this.size[1]) { return false }
        return true
    }

    neighbours (x: number, y: number) {
        let n = 0
        for (let offset of NEIGHBOURS) {
            if (this.is_inside_grid(x + offset[0], y + offset[1])) {
                n += this.grid[y + offset[1]][x + offset[0]]
            }
        }
        return n
    }
    
    get_new_cell_state(x: number, y: number) {
        let alive: boolean = this.grid[y][x] == 1 ? true : false
        let n = this.neighbours(x, y)

        let new_state = 0

        if (alive) {
            if (n == 2 || n == 3) { new_state = 1 }
        }
        else {
            if (n == 3) { new_state == 1 }
        }

        return new_state
    }

    update_grid () {
        let new_grid = this.grid

        for (let x = 0; x < this.size[0]; x++) {
            for (let y = 0; y < this.size[1]; y++) {
                let new_state = this.get_new_cell_state(x, y)
                new_grid[y][x] = new_state
            }
        }

        this.grid = new_grid
    }

    render () {
        for (let x = 0; x < this.size[0]; x++) {
            for (let y  = 0; y < this.size[1]; y++) {
                let rx = x * this.cell_size[0]
                let ry = y * this.cell_size[1]
                matrix.rectangle(rx, ry, rx + this.cell_size[0], ry + this.cell_size[1])
            }
        }

        matrix.displayMatrix()
    }

    run () {
        while (true) {
            this.update_grid()
            this.render()
        }
    }
}


const main: Main = new Main(0.3, [10, 10], [8, 8])
main.run()