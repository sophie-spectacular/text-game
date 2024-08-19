import numpy as np
from map import Map

def __main__():
    map = Map()

    print('start')
    while True:
        msg = input('$ ')
        if msg == 'step':
            map.step()
        print(map.position, map.direction)
        print(response)