from transformers import pipeline
from .BaseModel import BaseModel


class GenrePranavModel(BaseModel):
    name = "pranavpsv/gpt2-genre-story-generator"

    def __init__(self):
        self.story_gen = None

    def prepare(self):
        self.story_gen = pipeline("text-generation", "pranavpsv/gpt2-genre-story-generator")

    def generate(self, start_text="", length=1024, *args, **kwargs):
        text_args = "<BOS> <drama> "
        text = self.story_gen(text_args + start_text, max_length=1024,min_length=512)[0]["generated_text"]
        return self.remove_n_chars(text,len(start_text)+len(text_args))
