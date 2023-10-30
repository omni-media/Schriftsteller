from book.modelClasses.OpenJourneyImageModel import OpenJourneyImageModel


def make_image(prompt):
    return generate_image(prompt, OpenJourneyImageModel())


def generate_image(prompt, model):
    model.prepare()
    return model.generate(prompt)
