"""
URL configuration for myproject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from accounts import views


urlpatterns = [
    path('admin/', admin.site.urls),
   # path('accounts/', include('accounts.urls')),
    path('register/', views.register_user, name='register'),
    path("login/",views.login_view, name="api_login"),
    path("logout/",views.logout_view, name="api_logout"),
    path("session/",views.session_view, name="api_session"),
    path("whoami/",views.whoami_view, name="api_whoami"),
    path("testCreation/",views.createTest_view, name="api_createTest"),
    path('tests/', views.get_test_titles, name='get_test_titles'),
    path("getmembers/",views.getmembers , name = "getmembers_view"),
    path('addStudentinclass/', views.saveStudentInClass_view, name='saveStudentInClass'),
    path("recentTestForStudent/", views.getRecentTestsForStudent, name='getrecentTestView'),
    path("getTestQuestions/",views.getTestQuestions,name="getTestQuestions")
]
