
from .BaseImageModel import BaseImageModel
from diffusers import (
    StableDiffusionPipeline,
    EulerDiscreteScheduler
)
from book.scripts.util import get_cache_dir_path


class OpenJourneyImageModel(BaseImageModel):
    name = "prompthero/openjourney-v4"

    def __init__(self):
        self.generator = None

    def prepare(self):
        self.generator = StableDiffusionPipeline.from_pretrained("prompthero/openjourney-v4",cache_dir=get_cache_dir_path())
        #self.generator.scheduler = EulerDiscreteScheduler.from_config(self.generator.scheduler.config)



