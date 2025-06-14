from datetime import datetime
from calendar import isleap
from data_generator.generator import Generator
import random

class Person:
    # these should be initialized only once in the program lifetime
    print("Initializing Person data sets...")
    NAME_GENERATOR_MALE = Generator("data_generator/data/names_male.csv", "count")
    NAME_GENERATOR_FEMALE = Generator("data_generator/data/names_female.csv", "count")
    SURNAME_GENERATOR_MALE = Generator("data_generator/data/surnames_male.csv", "count")
    SURNAME_GENERATOR_FEMALE = Generator("data_generator/data/surnames_female.csv", "count")
    PLACE_GENERATOR = Generator("data_generator/data/places.csv")
    print("Person data initialized!")

    def __init__(self):
        # generate data
        if bool(random.getrandbits(1)):
            self.gender = "male"
        else:
            self.gender = "female"
        self.names = []
        self.surnames = []
        self.birth_date = Person.generate_random_birthdate()
        self.PESEL = Person.generate_pesel_number(self.birth_date, self.gender)

        self.place = self.PLACE_GENERATOR.generate_value(["locality", "municipality", "county", "voivodeship"])

    def get_name(self,retries=15):
        """
        get_name: Generates a new name and adds it to the list of names.
        If the name already exists and the list has fewer than 10 names, it tries again.
        If there are already 10 or more names, it accepts duplicates.
        If there are more than 15 attempts to generate it stops to prevent infinite loops
        :return: A new name as a string.
        """
        if self.gender == "male":
            name = self.NAME_GENERATOR_MALE.generate_value("name")
        else:
            name = self.NAME_GENERATOR_FEMALE.generate_value("name")
        if name in self.names and len(self.names) < 10:
            if retries > 0:
                return self.get_name(retries=retries-1)
        self.names.append(name)
        return name

    def get_surname(self,retries=15):
        """
        get_surname: Generates a new surname and adds it to the list of surnames.
        If the surname already exists and the list has fewer than 10 names, it tries again.
        If there are already 10 or more surnames, it accepts duplicates.
        If there are more than 15 attempts to generate it stops to prevent infinite loops
        :return: A new surname as a string.
        """
        if self.gender == "male":
            surname = self.SURNAME_GENERATOR_MALE.generate_value("surname")
        else:
            surname = self.SURNAME_GENERATOR_FEMALE.generate_value("surname")
        if surname in self.surnames and len(self.surnames) < 10:
            if retries > 0:
                return self.get_surname(retries=retries-1)
        self.surnames.append(surname)
        return surname

    @staticmethod
    def generate_random_birthdate():
        """
        generate_random_birthdate: generates a correct and random date of birth based on gaussian curve
        :return: date in datetime date format
        """
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

        # leap-year validation
        if birth_month in {1,3,5,7,8,10,12}:
            birth_day = random.randint(1, 31)
        elif birth_month == 2:
            if isleap(birth_year):
                birth_day = random.randint(1, 29)
            else:
                birth_day = random.randint(1, 28)
        else:
            birth_day = random.randint(1, 30)

        try:
            birth_date = datetime(birth_year, birth_month, birth_day).date()
            return birth_date
        except ValueError:
            print(f"Error occurred while generating a date! Data:{birth_year}-{birth_month}-{birth_day}. Attempting to regenerate...")
            return Person.generate_random_birthdate()

    @staticmethod
    def generate_pesel_number(date_for_pesel, gender):
        """
        generate_pesel_number: generates a correct pesel number based on given date and gender
        :param date_for_pesel: date for PESEL generation in datetime date format
        :param gender: gender for PESEL generation as string "male" or "female"
        :return: PESEL number as string with 11 letters
        """
        pesel_number = ""
        # numbers 1-2 : extract number 00-99 from year
        pesel_number=str(date_for_pesel.year)[2:]
        # numbers 3-4 : extract month and add (+00 for 1900-1999 and +20 for 2000-2099)
        month_value = 0
        if date_for_pesel.year >= 2000:
            month_value+=20
        month_value+=date_for_pesel.month
        if month_value < 10:
            pesel_number += "0"
        pesel_number += str(month_value)
        # numbers 5-6 : day of the month
        if date_for_pesel.day < 10:
            pesel_number += "0"
        pesel_number += str(date_for_pesel.day)
        # numbers 7-9 : random part from 000 to 999
        for i in range(3):
            pesel_number += str(random.randint(0,9))
        # number 10 : (even number and 0 for female) and (odd number for male)
        if gender == "male":
            numbers = [1,3,5,7,9]
        else:
            numbers = [0,2,4,6,8]
        pesel_number += str(random.choice(numbers))
        # number 11 : checksum
        checsum_multipliers = [1,3,7,9,1,3,7,9,1,3]
        checksum = 0
        for x, y in zip(pesel_number, checsum_multipliers):
            checksum += (int(x) * y)
        checksum = checksum % 10
        if checksum != 0:
            checksum = 10 - checksum  
        pesel_number+=str(checksum)
        
        return pesel_number
