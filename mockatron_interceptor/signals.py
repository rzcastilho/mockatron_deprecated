from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.cache import cache

from .models import *

def invalidate_cache_provider(provider):
    cache.delete(provider.hash())
    for f in provider.filter_set.all():
        cache.delete(f.hash())

@receiver(post_save, sender=Agent)
def invalidate_cache_by_agent(sender, **kwargs):
    invalidate_cache_provider(kwargs['instance'])

@receiver(post_save, sender=Operation)
def invalidate_cache_by_operation(sender, **kwargs):
    invalidate_cache_provider(kwargs['instance'])

@receiver(post_save, sender=Response)
def invalidate_cache_by_response(sender, **kwargs):
    if kwargs['instance'].agent != None:
        invalidate_cache_provider(kwargs['instance'].agent)
    if kwargs['instance'].operation != None:
        invalidate_cache_provider(kwargs['instance'].operation)


@receiver(post_save, sender=Filter)
def invalidate_cache_by_filter(sender, **kwargs):
    cache.delete(kwargs['instance'].hash())

@receiver(post_save, sender=Condition)
def invalidate_cache_by_condition(sender, **kwargs):
    if not kwargs['created']:
        try:
            cache.delete(kwargs['instance'].request_filter.hash())
        except:
            cache.delete(kwargs['instance'].response_filters.all()[0].hash())
