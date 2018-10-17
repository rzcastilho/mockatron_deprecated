"""mockatron URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import include, url
from django.contrib import admin
from django.contrib.staticfiles.storage import staticfiles_storage
from django.views.generic.base import RedirectView

urlpatterns = [
    url(r'^favicon.ico$', RedirectView.as_view(url=staticfiles_storage.url('static/favicon.ico'), permanent=False), name="favicon"),
    url(r'^mockatron/admin/', admin.site.urls),
    url(r'^mockatron/api/', include('mockatron_api.urls')),
    url(r'^', include('mockatron_core.urls'))
]
