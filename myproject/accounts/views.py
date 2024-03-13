from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import UserProfile, Teacher, Student , Assignment
from django.contrib.auth.models import User
from django.db import transaction
import json
from django.http import JsonResponse
from django.contrib.auth import authenticate,login, logout
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST

@api_view(['POST'])
@transaction.atomic
def register_user(request):
    email = request.data.get('email')
    password = request.data.get('password')
    mobile = request.data.get('mobile')
    role = request.data.get('role')
    full_name = request.data.get('name')
    print(email, mobile, role, full_name)

    if not email or not password:
        return JsonResponse({'error': 'Email and password are required.'}, status=400)

    # Create a new user
    user = User.objects.create_user(username=email, email=email, password=password)

    # Create a UserProfile instance
    user_profile = UserProfile.objects.create(user=user, email=email, role=role, full_name=full_name)

    # Depending on the role, create either Teacher or Student instance
    print(role)
    if role == '1':
        teacher = create_teacher(user_profile, mobile, full_name)
        if teacher is None:
            return JsonResponse({'error': 'Error creating teacher'}, status=500)
    elif role == '2':
        student = create_student(user_profile, mobile, full_name)
        if student is None:
            return JsonResponse({'error': 'Error creating student'}, status=500)
    return JsonResponse({'message': 'User registered successfully.'}, status=201)

@require_POST
def login_view(request):
    data = json.loads(request.body)
    username = data.get("email")
    password = data.get("password")
    role = data.get("role")

    if username is None or password is None:
        return JsonResponse({"details":"please enter username and password"})

    user = authenticate(username=username, password=password)
    if user is None:
        return JsonResponse({"details":"Invalid Credentials"},status = 400)
    
    loggedin_user = UserProfile.objects.get(user=user)
    full_name = loggedin_user.full_name
    
    print(full_name)

    login(request, user)
    return JsonResponse({"details":"Login Successful","role":role,"username":full_name})

def logout_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({"details":"You are not logged in "},status=400)
    logout(request)
    return JsonResponse({"details":"logged out"})

@ensure_csrf_cookie
def session_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({"isauthenticated":False})
    return JsonResponse({"isauthenticated":True})

def whoami_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({"isauthenticated":False})
    return JsonResponse({"username":request.user.username})

@transaction.atomic
def create_teacher(user_profile, mobile, full_name):
    print(user_profile,mobile,full_name)
    print("in the teacher function")
    try:
        teacher = Teacher.objects.create(user_profile=user_profile, mobile_no=mobile, full_name=full_name)
        teacher.save()
        return teacher
    except Exception as e:
        # Log or handle the exception as needed
        return None

@transaction.atomic
def create_student(user_profile, mobile, full_name):
    print("in the student function")
    try:
        student = Student.objects.create(user_profile=user_profile, mobile_no=mobile, full_name=full_name)
        student.save()
        return student
    except Exception as e:
        # Log or handle the exception as needed
        return None
    
def get_teacher_id(fullname):
    try:
        teacher = Teacher.objects.get(full_name= fullname)  # Assuming 'username' is the field in the Teacher model
        return teacher.teacher_id
    except Teacher.DoesNotExist:
        # Handle the case where the teacher does not exist
        return None
@transaction.atomic
def createTest_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        title = data.get('title')
        totalmarks = (int)(data.get('totalmarks'))
        test = data.get('test')

        teacher_id = get_teacher_id(username)

        print("username",username)
        print("title",title)
        print("totalmarks",totalmarks)
        print(test)
        print("teacher id",teacher_id)
        try:
            assignment = Assignment.objects.create(
                Teacher_id = teacher_id,
                title = title,
                assignment_json = test,
                total_marks = totalmarks
            )
            assignment.save()
            #print(assignment.id)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

        return JsonResponse({"message": "Data received successfully"}, status=200)

    return JsonResponse({"error": "Only POST requests are allowed"}, status=405)


def get_test_titles(request):
    #print("in get_test_titles view")
    if request.method == 'GET':
        test_titles = Assignment.objects.values_list('title', flat=True)
        test_titles_list = list(test_titles)
        return JsonResponse({"test_titles": test_titles_list}, status=200)
    else:
        return JsonResponse({"error": "Only GET requests are allowed"}, status=405)