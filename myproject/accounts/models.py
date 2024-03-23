from datetime import timezone
from django.db import models

# Create your models here.
from django.contrib.auth.models import User
# Create your models here.

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    TEACHER = 1
    STUDENT = 2
    ROLE_CHOICES = (
        (TEACHER, 'Teacher'),
        (STUDENT, 'Student'),
    )
    role = models.PositiveSmallIntegerField(choices=ROLE_CHOICES, default=STUDENT)
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["email"]
    groups = models.ManyToManyField('auth.Group', related_name='customuser_set', blank=True)
    user_permissions = models.ManyToManyField('auth.Permission', related_name='customuser_set', blank=True)
    def __str__(self):
        return self.email


class Teacher(models.Model):
    user_profile = models.OneToOneField(UserProfile, on_delete=models.CASCADE, related_name='teacher',default=1)
    mobile_no = models.CharField(max_length=20, verbose_name='Mobile Number')
    teacher_id = models.AutoField(primary_key=True)
    full_name = models.CharField(max_length=100, verbose_name='Full Name')
    profile_photo = models.ImageField(upload_to='teacher_photos/', verbose_name='Profile Photo',blank=True,null=True)
    subject_name = models.CharField(max_length=100, verbose_name='Subject')
    dob = models.DateField(verbose_name='Date of Birth',null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]
    

class Student(models.Model):
    user_profile = models.OneToOneField(UserProfile, on_delete=models.CASCADE, related_name='student',default=1)
    student_id = models.AutoField(primary_key=True)
    mobile_no = models.CharField(max_length=20, verbose_name='Mobile Number')
    full_name = models.CharField(max_length=100, verbose_name='Full Name')
    profile_photo = models.ImageField(upload_to='teacher_photos/', verbose_name='Profile Photo',blank=True,null=True)
    subject_name = models.CharField(max_length=100, verbose_name='Subject',null=True, blank=True)
    dob = models.DateField(verbose_name='Date of Birth',null=True, blank=True)
    class_id = models.IntegerField(default=None, null=True, blank=True)
    parent_id = models.IntegerField(default=None, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]

class Assignment(models.Model):
    assignment_id = models.AutoField(primary_key=True)
    Teacher_id = models.IntegerField()
    title = models.CharField(max_length=255)
    assignment_json = models.JSONField()
    total_marks = models.IntegerField()
    modified_at = models.DateTimeField(auto_now = True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    class_id = models.IntegerField(null=True)

class StudentsClass(models.Model):
    sid = models.AutoField(primary_key=True)
    sname = models.CharField(max_length=255, unique=False)
    smobile = models.CharField(max_length=20, unique=False)
    semail = models.EmailField(unique=False)
    Teacher_id = models.IntegerField(unique = False)
    join_date = models.DateTimeField(auto_now = True)
    release_date = models.DateTimeField(auto_now_add=True)


class AnswerSheet(models.Model):
    answersheet_id = models.AutoField(primary_key=True)
    Student_id = models.IntegerField()
    test_id = models.IntegerField(max_length=255)
    answersheet_json = models.JSONField()
    achieved_marks = models.IntegerField()
    total_marks = models.IntegerField()
    result_generated = models.TextField()
    modified_at = models.DateTimeField(auto_now = True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    class_id = models.IntegerField(null=True)