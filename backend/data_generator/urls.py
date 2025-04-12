from django.urls import path
from . import views


urlpatterns = [
    # endpoint returning list off data types
    path('api/types/', views.viewDefinedFieldTypes),
    # endpoint returing data set of specified data
    path('api/data/', views.viewDataSet),
]
