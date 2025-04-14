from data_generator.generator import Generator
import random
class Person:
    # these should be initialized only once in the program lifetime
    print("Initializing data...")
    NAME_GENERATOR_MALE = Generator("names_male.csv")
    NAME_GENERATOR_FEMALE = Generator("names_female.csv")
    SURNAME_GENERATOR_MALE = Generator("surnames_male.csv")
    SURNAME_GENERATOR_FEMALE = Generator("surnames_female.csv")
    print("Data initialized!")

    def __init__(self):
        # generate data
        if bool(random.getrandbits(1)):
            self.gender = "male"
            self.name = self.NAME_GENERATOR_MALE.generate_value()
            self.surname = self.SURNAME_GENERATOR_MALE.generate_value()
        else:
            self.gender = "female"
            self.name = self.NAME_GENERATOR_FEMALE.generate_value()
            self.surname = self.SURNAME_GENERATOR_FEMALE.generate_value()

        self.PESEL = "123456789"

