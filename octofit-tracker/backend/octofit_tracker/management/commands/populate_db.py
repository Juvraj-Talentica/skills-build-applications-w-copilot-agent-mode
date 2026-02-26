from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from octofit_tracker.models import Team, Activity, Leaderboard, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        User = get_user_model()
        # Delete all data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create Teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Create Users
        tony = User.objects.create_user(username='ironman', email='tony@marvel.com', password='password', team=marvel)
        steve = User.objects.create_user(username='captainamerica', email='steve@marvel.com', password='password', team=marvel)
        bruce = User.objects.create_user(username='hulk', email='bruce@marvel.com', password='password', team=marvel)
        clark = User.objects.create_user(username='superman', email='clark@dc.com', password='password', team=dc)
        brucew = User.objects.create_user(username='batman', email='bruce@dc.com', password='password', team=dc)
        diana = User.objects.create_user(username='wonderwoman', email='diana@dc.com', password='password', team=dc)

        # Create Activities
        Activity.objects.create(user=tony, type='run', duration=30)
        Activity.objects.create(user=steve, type='cycle', duration=45)
        Activity.objects.create(user=bruce, type='swim', duration=60)
        Activity.objects.create(user=clark, type='fly', duration=120)
        Activity.objects.create(user=brucew, type='drive', duration=50)
        Activity.objects.create(user=diana, type='jump', duration=40)

        # Create Workouts
        Workout.objects.create(name='Morning Cardio', description='Cardio for all')
        Workout.objects.create(name='Strength Training', description='Strength for all')

        # Create Leaderboard
        Leaderboard.objects.create(user=tony, score=100)
        Leaderboard.objects.create(user=clark, score=120)
        Leaderboard.objects.create(user=steve, score=90)
        Leaderboard.objects.create(user=brucew, score=110)
        Leaderboard.objects.create(user=bruce, score=80)
        Leaderboard.objects.create(user=diana, score=95)

        self.stdout.write(self.style.SUCCESS('Database populated with test data.'))
