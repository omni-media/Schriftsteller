# Example of usage
from transformers import pipeline
from RandomTextGenerator import *
import json
import torch


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


def generate_book(chapters=4):
    story_gen = pipeline("text-generation", "pranavpsv/gpt2-genre-story-generator")
    book_dict = {
        'title': RandomTextGenerator("./txt", "./combinations/title").generate_sentence(),
        'author': 'pranavpsv/gpt2-genre-story-generator',
        'chapters': []
    }
    for i in range(chapters):
        chapter_heading = book_dict['title'] + " chapter " + str(i + 1)
        book_dict['chapters'].append(
            generate_dict_chapter(
                chapter_heading,
                story_gen("<BOS> <drama> " + chapter_heading, max_length=1024)[0]["generated_text"]
            )
        )

    book_dict['description'] = generate_summary(book_dict['chapters'][0]['content'])

    return book_dict


def make_book(*args, **kwargs):
    json_book = json.dumps(generate_book(), indent=2)
    with open("sample_book.json", "w") as outfile:
        outfile.write(json_book)


make_book()





