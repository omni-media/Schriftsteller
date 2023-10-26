class BaseImageModel():

    def __int__(self):
        self.generator = None

    def prepare(self, *args, **kwargs):
        pass

    def generate(self, start_text="", *args, **kwargs):
        return self.generator(start_text).images[0]
