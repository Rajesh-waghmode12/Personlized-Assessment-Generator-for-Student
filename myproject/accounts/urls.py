from django.urls import path
from django.shortcuts import render
from . import views

urlpatterns = [
    path('register/', views.register_user, name='api_register'),
    path("login/",views.login_view, name="api_login"),
    path("logout/",views.logout_view, name="api_logout"),
    path("session/",views.session_view, name="api_session"),
    path("whoami/",views.whoami_view, name="api_whoami"),
    path("testCreation/",views.createTest_view, name="api_createTest"),
    path('tests/', views.get_test_titles, name='get_test_titles')
]