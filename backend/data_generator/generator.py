import random


class Generator:
    def __init__(self, input_file):
        # parse data and fill the internal data store
        print(f"Reading {input_file}...")
        self.values = ["value1", "value2"]
        self.iterator = 0
        print(f"Dataset {input_file} initialized!")

    def generate_value(self):
        self.iterator = random.randint(0, len(self.values) - 1)
        return self.values[self.iterator]
