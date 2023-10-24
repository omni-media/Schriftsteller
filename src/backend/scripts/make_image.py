from modelClasses.OpenJourneyImageModel import OpenJourneyImageModel


def make_image(prompt, model):
    model.prepare()
    return model.generate(prompt)


image = make_image("Spaceship", OpenJourneyImageModel())
image.save("./ship.png")
