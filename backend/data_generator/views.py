from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from person import Person

import random 
# Create your views here.


@api_view(['GET'])
def viewDefinedFieldTypes(request):
    available_types=["name", "surname", "pesel_number", "city"]
    return Response({"available_types": available_types}, status=200)


@api_view(['POST'])
def viewDataSet(request):

    response = []

    for i in range(request.data["amount"]):  # generate as many specimen as "amount" dictates
        row = {}
        human = Person()
        for data_type in request.data["types"]:
            row[data_type["name"]] = extract_value(data_type["type"], human)
        response.append(row)
    return Response(response,status=200)


def extract_value(data_type, human):

    match data_type:
        # extract data from the human and use it to fill the appropriate fields
        case "name":
            return human.name
        case "surname":
            return human.surname
        case "pesel_number":
            return human.PESEL
        case "city":
            return "Wrocław"
        case _:
            return None

