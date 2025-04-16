from datetime import datetime

from data_generator.generator import Generator
import random
class Person:
    # these should be initialized only once in the program lifetime
    print("Initializing Person data sets...")
    NAME_GENERATOR_MALE = Generator("names_male.csv")
    NAME_GENERATOR_FEMALE = Generator("names_female.csv")
    SURNAME_GENERATOR_MALE = Generator("surnames_male.csv")
    SURNAME_GENERATOR_FEMALE = Generator("surnames_female.csv")
    print("Person data initialized!")

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
        self.birth_date = Person.generate_random_birthdate()
        # TODO: PESEL generation
        self.PESEL = "123456789"

    @staticmethod
    def generate_random_birthdate():
        """todo: documentation"""
        age_average = 41.9
        age_std_deviation = 18.0

        current_date = datetime.today()
        age_deviation = random.gauss(mu=0, sigma=age_std_deviation)

        birth_year = int(current_date.year - age_average - age_deviation)

        # value validation
        if birth_year < current_date.year - 120:
            birth_year = current_date.year - 120
        elif birth_year > current_date.year - 10:
            birth_year = current_date.year - 10

        birth_month = random.randint(1, 12)
        birth_day = random.randint(1, 28)  # good enough

        try:
            birth_date = datetime(birth_year, birth_month, birth_day).date()
            return birth_date
        except ValueError:
            print(f"Error occurred while generating a date! Data:{birth_year}-{birth_month}-{birth_day}. Attempting to regenerate...")
            return Person.generate_random_birthdate()

