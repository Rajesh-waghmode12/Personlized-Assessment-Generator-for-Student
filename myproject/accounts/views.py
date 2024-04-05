from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import UserProfile, Teacher, Student , Assignment , StudentsClass , AnswerSheet
from django.contrib.auth.models import User
from django.db import transaction
import json
from django.http import JsonResponse
from django.contrib.auth import authenticate,login, logout
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST
from django.db.models import Subquery

import google.generativeai as genai

@api_view(['POST'])
@transaction.atomic
def register_user(request):
    email = request.data.get('email')
    password = request.data.get('password')
    mobile = request.data.get('mobile')
    role = request.data.get('role')
    full_name = request.data.get('name')
    #print(email, mobile, role, full_name)

    if not email or not password:
        return JsonResponse({'error': 'Email and password are required.'}, status=400)

    # Create a new user
    user = User.objects.create_user(username=email, email=email, password=password)

    # Create a UserProfile instance
    user_profile = UserProfile.objects.create(user=user, email=email, role=role, full_name=full_name)

    # Depending on the role, create either Teacher or Student instance
    #print(role)
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
    
    #print(full_name)

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
    #print("in the teacher function")
    try:
        teacher = Teacher.objects.create(user_profile=user_profile, mobile_no=mobile, full_name=full_name)
        teacher.save()
        return teacher
    except Exception as e:
        # Log or handle the exception as needed
        return None

@transaction.atomic
def create_student(user_profile, mobile, full_name):
    #print("in the student function")
    try:
        student = Student.objects.create(user_profile=user_profile, mobile_no=mobile, full_name=full_name)
        student.save()
        return student
    except Exception as e:
        # Log or handle the exception as needed
        return None
    
@transaction.atomic
def createTest_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        title = data.get('title')
        totalmarks = (int)(data.get('totalmarks'))
        test = data.get('test')
        
        teacher = Teacher.objects.get(full_name=username)
        teacher_id = teacher.teacher_id
        #print(teacher_id)

        # print("username",username)
        # print("title",title)
        # print("totalmarks",totalmarks)
        # print(test)
        # print("teacher id",teacher_id)
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
        username = request.GET.get('username')
        teacher = Teacher.objects.get(full_name=username)
        teacher_id = teacher.teacher_id
        #test_titles = Assignment.objects.values_list('title', flat=True)
        test_titles = Assignment.objects.filter(Teacher_id=teacher_id).values_list('title', flat=True)
        test_titles_list = list(test_titles)
        return JsonResponse({"test_titles": test_titles_list}, status=200)
    else:
        return JsonResponse({"error": "Only GET requests are allowed"}, status=405)

def getmembers(request):
    if request.method == 'GET':
        username = request.GET.get('username')
        teacher = Teacher.objects.get(full_name=username)
        teacher_id = teacher.teacher_id
        #test_titles = Assignment.objects.values_list('title', flat=True)
        members = StudentsClass.objects.filter(Teacher_id=teacher_id).values_list('sname', flat=True)
        member_list = list(members)
        return JsonResponse({"member_list": member_list}, status=200)
    else:
        return JsonResponse({"error": "Only GET requests are allowed"}, status=405)
    
def saveStudentInClass_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        name = data.get('name')
        mobile = data.get('mobile')
        email = data.get('email')
        username = data.get('username')
        teacher = Teacher.objects.get(full_name=username)
        teacher_id = teacher.teacher_id
        #print(name,email,mobile, "teacher usernme-",username, teacher_id)
        try:
            addStudent = StudentsClass.objects.create(
                sname = name, 
                smobile = mobile,
                semail = email,
                Teacher_id = teacher_id
            )
            addStudent.save()

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

        return JsonResponse({"message": "Data received successfully"}, status=200)

def getRecentTestsForStudent(request):
    if request.method == 'GET':
        username = request.GET.get('username')
        #print(username)
        students_classes = StudentsClass.objects.filter(sname=username)
        unique_teacher_ids = students_classes.values_list('Teacher_id', flat=True).distinct()
        # for id in unique_teacher_ids:
        #     print(id)
        #assignments = Assignment.objects.filter(Teacher_id__in=unique_teacher_ids)

        not_attempted_assignments = Assignment.objects.exclude(
            assignment_id__in=Subquery(
                AnswerSheet.objects.values('test_id').distinct()
            )
        ).filter(Teacher_id__in=unique_teacher_ids)
        #print(not_attempted_assignments)
        unique_titles_list = list(not_attempted_assignments.values_list('title', flat=True))
        unique_test_ids = list(not_attempted_assignments.values_list('assignment_id', flat=True))

        print(unique_titles_list)
        print(unique_test_ids)
        #unique_titles = assignments.values_list('title', flat=True).distinct()
        # unique_ids = assignments.values_list('assignment_id', flat=True).distinct()
        # unique_titles = Assignment.objects.filter(assignment_id__in=unique_ids).values_list('title', flat=True)
        
        # unique_titles_list = list(unique_titles)
        # unique_test_ids = list(unique_ids)

        # for title, id in zip(unique_titles, unique_ids):
        #     print(title, " ", id)
        # for id in uniques_test_ids:
        #     print(id)

        return JsonResponse({"unique_titles_list": unique_titles_list,"unique_ids":unique_test_ids }, status=200)
    else:
        return JsonResponse({"error": "Only GET requests are allowed"}, status=405)

def getTestQuestions(request):
    if request.method == 'GET':
        id = request.GET.get('id')
        #print(id)
        allQuestions = Assignment.objects.filter(assignment_id = id).values('assignment_json')
        title = Assignment.objects.filter(assignment_id = id).values('title')
        allQuestions_list = list(allQuestions)
        title_value = list(title)

        # Print the list of JSON objects
        # print("Assignment JSON:")
        # print(allQuestions_list)
        return JsonResponse({"allTestQuestions": allQuestions_list, "title":title_value}, status=200)
    else:
        return JsonResponse({"error": "Only GET requests are allowed"}, status=405)
    
def answersheetSubmitView(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        sname = data.get('studentName')
        print(sname)
        student = Student.objects.get(full_name=sname)
        sid = student.student_id
        print(sid)
        testId = data.get('testId')
        testTitle = data.get('testTitle')
        testQues = Assignment.objects.filter(assignment_id = testId).values('assignment_json')
        #test_questions = testQues[0]['assignment_json']
        test_questions = list(testQues)[0]['assignment_json']
        answer_sheet = data.get('answersheet')
        #print(testId)
        #print(test_questions)
        #print(answer_sheet)

      

        total_marks = 0
        marks_achieved = 0
        incorrect_questions = []
        for question_index, question in enumerate(test_questions):
                correct_answer = question['correct']
                selected_answer = answer_sheet[str(question_index)]['selectedOption']

                if correct_answer == selected_answer:
                    marks_achieved += int(question['mark'])  # Convert mark to integer
                else:
                    incorrect_questions.append(question)

                total_marks += int(question['mark'])

        questions = []
        if len(incorrect_questions) == 0:
            for que in test_questions:
                questions.append(que['question'])
        else:
            for que in incorrect_questions:
                questions.append(que['question'])
        
        API_KEY = "AIzaSyCDdkwbmzlOyLhkhwuH_ovi2KQNYrl2xPg"

        genai.configure(api_key=API_KEY)
        model = genai.GenerativeModel('gemini-pro')
        prompt = "I would like you to act as my teacher and create assessment test for my students. I will provide you some reference questions and {testTitle} as a starting point. Can you suggest some homework and assessment for student?"
        messages = [{'role':'user', 'parts': [prompt] + questions}]
        response = model.generate_content(messages)

        try:
            answersheet = AnswerSheet.objects.create(
               Student_id = sid,
               test_id = testId,
               answersheet_json = answer_sheet,
               achieved_marks = marks_achieved,
               total_marks = total_marks,
               result_generated = response.text
            )
            answersheet.save()
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
        

        return JsonResponse({'total_marks': total_marks,'marks_achieved': marks_achieved,'testTitle':testTitle,"homework":response.text}, status=200)
    else:
        return JsonResponse({"error": "error occured while submitting"}, status=405)
    
def getAttemptedTests(request):
    if request.method == 'GET':
        username = request.GET.get('username')
        student = Student.objects.get(full_name=username)
        sid = student.student_id
        print(sid)
        testIds = AnswerSheet.objects.filter(Student_id = sid).values('test_id').distinct()
        test_titles = Assignment.objects.filter(assignment_id__in=testIds).values('assignment_id', 'title')

        test_titles_list = list(test_titles)  # Convert queryset to list of dictionaries
        print(test_titles_list)
        # testIds_list = list(testIds)  # Convert queryset to list of dictionaries
        # print(testIds_list)

        return JsonResponse({'test': test_titles_list}, status=200)
    else:
        return JsonResponse({"error": "error occured while submitting"}, status=405)
    
def getAnswersView(request):
    if request.method == 'GET':
        assignmentid = request.GET.get('id')
        susername = request.GET.get("username")

        student = Student.objects.get(full_name=susername)
        sid = student.student_id

        test = Assignment.objects.get(assignment_id=assignmentid)
        answer_sheet = AnswerSheet.objects.get(Student_id=sid, test_id=assignmentid)
        test_title = test.title
        achieved_marks = answer_sheet.achieved_marks
        total_marks = answer_sheet.total_marks
        homework = answer_sheet.result_generated
        
        return JsonResponse({'testTitle': test_title, 'achievedMarks':achieved_marks,'totalMarks':total_marks, 'resultRenegated':homework}, status=200)
    else:
        return JsonResponse({"error": "error occured while submitting"}, status=405)