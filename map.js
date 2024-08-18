class Map {
    constructor() {
        this.position = [50, 50];
        this.direction = 'south';
    }

    reset() {
        this.position = [50, 50];
        this.direction = 'south';
    }

    turn(direction) {
        const directions = ['south', 'east', 'north', 'west'];
        const index = directions.indexOf(this.direction);

        if (direction === 'left') {
            this.direction = directions[(index + 1) % 4];
        } else if (direction === 'right') {
            this.direction = directions[(index + 3) % 4];
        }
    }

    step() {
        switch (this.direction) {
            case 'south':
                this.position[0] -= 1;
                break;
            case 'east':
                this.position[1] += 1;
                break;
            case 'north':
                this.position[0] += 1;
                break;
            case 'west':
                this.position[1] -= 1;
                break;
        }
        
        // check boundaries
        if (this.position[0] < 0 || this.position[0] > 100 || this.position[1] < 0 || this.position[1] > 100) {
            console.log('You have fallen off the map. You will respawn at start.');
            this.reset();
        }
    }

    get() {
        let states = [];
        if (this.position[0] < 30) {
            states.push('water');
            if (Math.random() < 0.1) {
                states.push('bottle');
            }
        } else if (this.position[0] >= 94 && this.position[1] >= 94) {
            if (this.position[0] === 94 || this.position[1] === 94) {
                if (this.position[0] === 94 && this.position[1] === 97) {
                    states.push('house door');
                } else {
                    states.push('house wall');
                }
            } else {
                states.push('inside house');
            }
        }
        return states;
    }
}
