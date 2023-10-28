FROM python:3.10
RUN mkdir code
COPY requirements.txt /code
RUN pip install -r /code/requirements.txt

WORKDIR /code
#CMD [ "python", "./manage.py","runserver","0.0.0.0:8000" ]