from django.apps import AppConfig

class MockatronInterceptorConfig(AppConfig):
    name = 'mockatron_interceptor'
    def ready(self):
        import mockatron_interceptor.signals
