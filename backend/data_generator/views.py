from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response

import random 
# Create your views here.


@api_view(['GET'])
def viewDefinedFieldTypes(request):
    avilable_types=["name", "surname", "pesel_number", "city"]
    return Response({"avilable_types": avilable_types}, status=200)


@api_view(['POST'])
def viewDataSet(request):

    response = []

    for i in range(request.data["amount"]):  # generete specimens as many as "amount" says
        new_specimen = {}
        for type in request.data["types"]:
            new_specimen[type["name"]] = generate_value(type["type"])
        response.append(new_specimen)
    return Response(response,status=200)


def generate_value(type):
    match type:
        case "name":
            return "Maciek"
        case "surname":
            return "Jakiś"
        case "pesel_number":
            return random.randint(10000000000, 99999999999)
        case "city":
            return "Wrocław"
        case _:
            return None

