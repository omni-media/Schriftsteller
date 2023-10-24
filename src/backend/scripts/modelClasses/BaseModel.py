from abc import ABC, abstractmethod


class BaseModel(ABC):

    @abstractmethod
    def prepare(self, *args, **kwargs):
        pass

    @abstractmethod
    def generate(self, start_text="", length=1024, *args, **kwargs):
        pass

    def remove_n_chars(self, text, n):
        return text[(n - 1):]
