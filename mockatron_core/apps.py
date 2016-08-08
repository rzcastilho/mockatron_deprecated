from django.apps import AppConfig

class MockatronCoreConfig(AppConfig):
    name = 'mockatron_core'
    def ready(self):
        import mockatron_core.signals
