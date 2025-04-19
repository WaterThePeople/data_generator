import random
import csv

class Generator:
    def __init__(self, input_file):
        # parse data and fill the internal data store
        print(f"Reading {input_file}...")
        with open(input_file, mode='r') as file:
            csv_file=csv.DictReader(file)
            self.values=list(csv_file)
        self.iterator = 0
        print(f"Dataset {input_file} initialized!")

    def generate_value(self, field_name):
        if field_name is None:
            field_name = str(self.values[0].keys().get(0))
        self.iterator = random.randint(0, len(self.values) - 1)
        return self.values[self.iterator][field_name]
