import random
import csv

class Generator:
    """
    This class serves as a data generator, extracting values from .csv files and loading it into memory to be queried by methods provided.
    """
    def __init__(self, input_file):
        """
        Generator initializer, it loads the .csv file into memory.
        @param input_file: path to .csv file
        """
        # parse data and fill the internal data store
        print(f"Reading {input_file}...")
        with open(input_file, mode='r') as file:
            csv_file=csv.DictReader(file)
            self.values=list(csv_file)
        print(f"Dataset {input_file} initialized!")

    def generate_value(self, field_name, count_field):
        """
        Method used to extract a random value from the loaded dataset.
        @param field_name: name of the field to extract the value from
        @param count_field: name of the field used to determine the probability of extraction (only supported by some datasets)
        """
        data_ptr = 0
        if count_field is None:
            data_ptr = random.randint(0, len(self.values) - 1)
        else:
            # a simple algorithm of weighted roulette
            count_sum = 0
            for value in self.values:
                count_sum += int(value[count_field])

            chop = random.randint(0, count_sum - 1)
            for value in self.values:
                chop -= int(value[count_field])
                if chop > 0:
                    data_ptr += 1
                else:
                    break
        return self.values[data_ptr][field_name]
