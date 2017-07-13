# Mockatron

A Simple Mock Server

### Prepare

**Create database schema**

```shell
$ docker-compose run web python manage.py makemigrations mockatron_core
$ docker-compose run web python manage.py migrate
```

**Add admin user**

```shell
$ docker-compose run web python manage.py createsuperuser
```

### Run

```shell
$ docker-compose up
```

### Configuration

[DJango UI - http://localhost:8000/mockatron/admin/](http://localhost:8000/mockatron/admin/)

[AngularJS UI - http://localhost/mockatron-gui/](http://localhost/mockatron-gui/)
