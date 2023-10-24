# Example of usage
from transformers import pipeline
from RandomTextGenerator import *
import json
import torch
from modelClasses.GenrePranavModel import GenrePranavModel


def generate_summary(text):
    hf_name = "pszemraj/led-base-book-summary"
    summarizer = pipeline(
        "summarization",
        hf_name,
        device=0 if torch.cuda.is_available() else -1,

    )
    result = summarizer(
        text,
        min_length=20,
        max_length=150,
        no_repeat_ngram_size=3,
        encoder_no_repeat_ngram_size=3,
        repetition_penalty=3.5,
        num_beams=4,
        do_sample=False,
        early_stopping=True,
    )
    return result[0]['summary_text']


def generate_dict_chapter(heading, content):
    return {
        "heading": heading,
        "content": content
    }


def generate_book(model_class_instance, chapters=4):
    model_class_instance.prepare()
    book_dict = {
        'title': RandomTextGenerator("./txt", "./combinations/title").generate_sentence(),
        'author': model_class_instance.name,
        'chapters': []
    }
    for i in range(chapters):
        chapter_heading = book_dict['title'] + " chapter " + str(i + 1)
        start_text = chapter_heading
        if i > 0:
            last_chapter = book_dict['chapters'][i-1]['content']
            last_chars = int(len(last_chapter)/3)
            start_text = last_chapter[-last_chars:]
        book_dict['chapters'].append(
            generate_dict_chapter(
                chapter_heading,
                model_class_instance.generate(start_text=start_text)
            )
        )

    book_dict['description'] = generate_summary(book_dict['chapters'][0]['content'])

    return book_dict


def make_book(*args, **kwargs):
    model = GenrePranavModel()
    json_book = json.dumps(generate_book(model,chapters=2), indent=2)
    with open("sample_book.json", "w") as outfile:
        outfile.write(json_book)


make_book()
