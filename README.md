# Mockatron
Just a Mock Server

**Prepare**

Create database schema

`$ docker-compose run web python manage.py makemigrations`

`$ docker-compose run web python manage.py migrate`

Add user admin

`$ docker-compose run web python manage.py createsuperuser`

**Run**

`$ docker-compose up`
