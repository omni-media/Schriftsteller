import os
import random


def map_files(path):
    text_dict = {}
    for file_name in os.listdir(path):
        try:
            with open(path + "/" + file_name) as file:
                lines = [line.rstrip() for line in file]
            text_dict[file_name] = lines
        except Exception as e:
            print(e)
    return text_dict

def load_combinations(path):
    with open(path) as file:
        lines = [line.rstrip() for line in file]
    return lines

class RandomTextGenerator:

    def __init__(self,text_path,combinations_path):
        self.text_dict = map_files(text_path)
        self.combinations = load_combinations(combinations_path)

    def generate_sentence(self):
        combination = self.combinations[
            random.randint(0,len(self.combinations)-1)
                           ]
        sentence = ""
        for word in combination.split():
            if word[0] == "@":
                text_list = self.text_dict[word[1:]]
                word = text_list[
                    random.randint(0,len(text_list)-1)
                ]
            sentence += word + " "
        return sentence
    
