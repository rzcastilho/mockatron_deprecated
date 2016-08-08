from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.cache import cache

from .models import *

def invalidate_cache_by_provider(provider):
    cache.delete(provider.hash())
    for f in provider.filters.all():
        cache.delete(f.hash())

@receiver(post_save, sender=Agent)
def invalidate_cache_by_agent(sender, **kwargs):
    invalidate_cache_by_provider(kwargs['instance'])

@receiver(post_save, sender=Operation)
def invalidate_cache_by_operation(sender, **kwargs):
    invalidate_cache_by_provider(kwargs['instance'])

@receiver(post_save, sender=Response)
def invalidate_cache_by_response(sender, **kwargs):
    if kwargs['instance'].agent != None:
        invalidate_cache_by_provider(kwargs['instance'].agent)
    if kwargs['instance'].operation != None:
        invalidate_cache_by_provider(kwargs['instance'].operation)

@receiver(post_save, sender=Filter)
def invalidate_cache_by_filter(sender, **kwargs):
    cache.delete(kwargs['instance'].hash())

def invalidate_cache_by_condition(condition):
    cache.delete(condition.filter.hash())

@receiver(post_save, sender=RequestCondition)
def invalidate_cache_by_request_condition(sender, **kwargs):
    if not kwargs['created']:
        invalidate_cache_by_condition(kwargs['instance'])

@receiver(post_save, sender=ResponseCondition)
def invalidate_cache_by_request_condition(sender, **kwargs):
    if not kwargs['created']:
        invalidate_cache_by_condition(kwargs['instance'])
