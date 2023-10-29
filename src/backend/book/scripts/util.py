from django.conf import settings
import os


def get_cache_dir_path():
    return os.path.join(settings.BASE_DIR, 'hf_cache/')
