from transformers import pipeline
from .BaseModel import BaseModel


class FairseqNerysModel(BaseModel):
    name = "KoboldAI/fairseq-dense-13B-Nerys"

    def __init__(self):
        self.generator = None

    def prepare(self):
        self.generator = pipeline("text-generation", "KoboldAI/fairseq-dense-13B-Nerys")

    def generate(self, start_text="", length=1024, *args, **kwargs):
        text = self.generator(start_text, max_length=1024,min_length=512)[0]["generated_text"]
        return self.remove_n_chars(text,len(start_text))
