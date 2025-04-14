from django.urls import path
from . import views


urlpatterns = [
    # endpoint returning list off data types
    path('api/types/', views.view_defined_field_types),
    # endpoint returing data set of specified data
    path('api/data/', views.view_data_set),
]
