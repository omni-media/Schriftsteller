# Example of usage
import random

from transformers import pipeline
import json
import torch
from book.scripts.modelClasses.GenrePranavModel import GenrePranavModel
from book.scripts.modelClasses.FairseqNerysModel import FairseqNerysModel
from book.scripts.RandomTextGenerator import RandomTextGenerator
from book.scripts.modelClasses.OpenJourneyImageModel import OpenJourneyImageModel
from book.scripts.util import get_cache_dir_path
import datetime


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


def generate_book(model_class_instance, chapters=4, **kwargs):
    model_class_instance.prepare()
    x = datetime.datetime.now()
    book_dict = {
        'title': RandomTextGenerator("book/scripts/txt", "book/scripts/combinations/title").generate_sentence(),
        'author': model_class_instance.name,
        'genre': model_class_instance.genre,
        'publish_date': str(x.year) + "-" + str(x.month) + "-" + str(x.day),
        'chapters': []

    }
    for i in range(chapters):
        chapter_heading = book_dict['title'] + " chapter " + str(i + 1)
        start_text = chapter_heading
        if i > 0:
            last_chapter = book_dict['chapters'][i - 1]['content']
            last_chars = int(len(last_chapter) / 4)
            start_text = last_chapter[-last_chars:]
        book_dict['chapters'].append(
            generate_dict_chapter(
                chapter_heading,
                model_class_instance.generate(start_text=start_text)
            )
        )

    book_dict['description'] = generate_summary(book_dict['chapters'][0]['content'])

    return book_dict


def make_book(**kwargs):
    models = {
        'fairseq': FairseqNerysModel(),
        'pranav': GenrePranavModel()
    }
    model = models['pranav']
    if 'model' in kwargs:
        model = models[kwargs.get('model')]
    chapters = random.randint(2, 7)
    return generate_book(model, chapters=chapters, **kwargs)
