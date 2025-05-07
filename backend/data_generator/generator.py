import random
import csv

class Generator:
    """
    This class serves as a data generator, extracting values from .csv files and loading it into memory to be queried by methods provided.
    """
    def __init__(self, input_file, count_field="none"):
        """
        Generator initializer, it loads the .csv file into memory.
        @param input_file: path to .csv file
        @param count_field: name of the field used to determine the probability of extraction (only supported by some datasets)
        """
        # parse data and fill the internal data store
        print(f"Reading {input_file}...")
        with open(input_file, mode='r', encoding='utf-8') as file:
            csv_file=csv.DictReader(file)
            self.values=list(csv_file)
        self.count_sum=0
        self.count_field=count_field
        if self.count_field == "none":
            print("Skipping initializing the roulette distribution algorithm.")
        else:
            print(f"Initializing the roulette distribution algorithm based on {count_field} field...")
            try:
                for value in self.values:
                    self.count_sum += int(value[count_field])
            except ValueError:
                print("Error in initializing roulette distribution algorithm. Falling back to default algorithm...")
                self.count_sum = 0
        print(f"Dataset {input_file} initialized!\n")


    def generate_value(self, field_name):
        """
        Method used to extract a random value from the loaded dataset.
        @param field_name: name of the field to extract the value from. It can be a list and in that case function returns a dictionary.
        """
        data_ptr = 0
        if self.count_sum == 0:
            data_ptr = random.randint(0, len(self.values) - 1)
        else:
            # a simple algorithm of weighted roulette
            chop = random.randint(0, self.count_sum - 1)
            for value in self.values:
                chop -= int(value[self.count_field])
                if chop > 0:
                    data_ptr += 1
                else:
                    break
        # check is it a list or not. If it is a list, return a dictionary (for place generation). If not, return a string value (for name and surname generation).
        if isinstance(field_name, list):
            response = {}
            value = self.values[data_ptr]
            for name in field_name:
                if name in self.values[data_ptr]:
                    response[name]=self.values[data_ptr][name]
            return response
        else:
            return self.values[data_ptr][field_name]
