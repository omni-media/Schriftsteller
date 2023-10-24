from transformers import pipeline
from .BaseModel import BaseModel


class GenrePranavModel(BaseModel):
    name = "pranavpsv/gpt2-genre-story-generator"

    def __init__(self):
        self.story_gen = None

    def prepare(self):
        self.story_gen = pipeline("text-generation", "pranavpsv/gpt2-genre-story-generator")

    def generate(self, start_text="", length=1024):
        return self.story_gen("<BOS> <drama> " + start_text, max_length=1024)[0]["generated_text"]
