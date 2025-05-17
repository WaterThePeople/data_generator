from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from data_generator.person import Person
from data_generator.text_generator import TextGenerator
import random

# text generator initialisation
txt_gen_pt = TextGenerator("data_generator/data/pantadeusz.txt")

@api_view(['GET'])
def view_defined_field_types(request):
    """
    view_defined_field_types: Generate http response for given http request. Response contains all available data types for data generation.
    :param request: Not necessary in this version.
    :return: Http response with all available data types in response body. In response body it is a dictionary with list.
    """
    # available_types=["id", "name", "surname", "pesel_number", "gender", "birth_date", "locality", "municipality", "county", "voivodeship", "paragraph"]
    available_types=[{"id" : ["start_value"]}, {"name": []}, {"surname": []}, {"pesel_number": []}, {"gender": []}, {"birth_date": []}, {"locality": []}, {"municipality": []}, {"county": []}, {"voivodeship": []}, {"paragraph": []}, {"key": ["min","max"]}]

    return Response({"available_types": available_types}, status=200)


@api_view(['POST'])
def view_data_set(request):
    """
    view_data_set: Generate http response for given http request. Response contains data set depends on values in given request's body.
    :param request: Contains in its body how many specimens should be generated and which types of data returned specimens should contain. Request body is specified in API.
    :return: Http response with a list of specimens with chosen data types in response body. In response body it is a list of dictionaries.
    """
    response = []
    id = 0
    id_init = True
    for i in range(request.data["amount"]):  # generate as many specimen as "amount" dictates
        row = {}
        human = Person()
        for data_type in request.data["types"]:
            if data_type["type"] == "id":
                if id_init:
                    if "start_value" in data_type:
                        id =  int(data_type["start_value"])
                    else:
                        id = 0
                    id_init = False
                row[data_type["name"]] =  id
                id +=1
            elif data_type["type"] == "key":
                if "min" in data_type and "max" in data_type:
                    row[data_type["name"]] = random.randint(data_type["min"],data_type["max"])
                else:
                    row[data_type["name"]] = 1
            else:
                row[data_type["name"]] = extract_value(data_type["type"], human)
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
        case "paragraph":
            return txt_gen_pt.get_random_paragraph()
        case "key":
            return 0
        case _:
            return None

