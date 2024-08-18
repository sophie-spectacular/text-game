import numpy as np

class Map:
    def __init__(self):
        self.position = [50, 50]
        self.direction = 'south'

    def turn(self, direction: str):
        if direction == 'left':
            if self.direction == 'south':
                self.direction = 'east'
            elif self.direction == 'east':
                self.direction = 'north'
            elif self.direction == 'north':
                self.direction = 'west'
            elif self.direction == 'west':
                self.direction = 'south'
        elif direction == 'right':
            if self.direction == 'south':
                self.direction = 'west'
            elif self.direction == 'west':
                self.direction = 'north'
            elif self.direction == 'north':
                self.direction = 'east'
            elif self.direction == 'east':
                self.direction = 'south'
    
    def step(self, steps: int = 1):
        if self.direction == 'south':
            self.position[0] -= steps
        elif self.direction == 'east':
            self.position[1] -= steps
        elif self.direction == 'north':
            self.position[0] += steps
        elif self.direction == 'west':
            self.position[1] += steps
        if self.position[0] < 0 or self.position[0] > 100 or self.position[1] < 0 or self.position[0] > 100:
        print('You have fallen off the map. You will respawn at start.')
        self.__init__()

    def get(self):
        states = []
        if self.position[0] < 30:
            states.append('water')
            if not np.random.randint(0, 10):
                states.append('bottle')
        elif self.position[0] >= 94 and self.position[1] >= 94:
            if self.position[0] == 94 or self.position[1] == 94:
                if self.position == [94, 97]:
                    states.append('house door')
                else:
                    states.append('house wall')
            else: states.append('inside house')

        