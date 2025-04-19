from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from data_generator.person import Person

import random 
# Create your views here.



@api_view(['GET'])
def view_defined_field_types(request):
    available_types=["id", "name", "surname", "pesel_number", "gender", "birth_date", "locality", "municipality", "county", "voivodeship"]
    return Response({"available_types": available_types}, status=200)


@api_view(['POST'])
def view_data_set(request):

    response = []

    for i in range(request.data["amount"]):  # generate as many specimen as "amount" dictates
        row = {}
        human = Person()
        for data_type in request.data["types"]:
            row[data_type["name"]] = extract_value(data_type["type"], human, i)
        response.append(row)
    return Response(response,status=200)


def extract_value(data_type, human=None, id=0):
    """
    extract_value extracts the value from given objects as requested by the data_type
    :param data_type: type of data to extract from provided objects
    :param human: object representing a human
    :param id: incrementing id for humans in set
    :return: extracted value in string form
    """

    match data_type:
        # extract data from the human and use it to fill the appropriate fields
        case "id":
            return id
        case "name":
            return human.get_name()
        case "surname":
            return human.get_surname()
        case "pesel_number":
            return human.PESEL
        case "birth_date":
            return human.birth_date
        case "gender":
            return human.gender
        case "locality":
            return human.place["locality"]
        case "municipality":
            return human.place["municipality"]
        case "county":
            return human.place["county"]
        case "voivodeship":
            return human.place["voivodeship"]
        case _:
            return None

