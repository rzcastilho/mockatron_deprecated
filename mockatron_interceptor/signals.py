from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.cache import cache

from .models import Agent
from .models import MockResponse

import hashlib

@receiver(post_save, sender=MockResponse)
def invalidate_cache(sender, **kwargs):
    print('--> invalidate_cache: ' + str(kwargs['instance'].agent))
    cache.delete(hashlib.md5(str(kwargs['instance'].agent).encode('utf-8')).hexdigest())
