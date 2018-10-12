FROM python:latest

COPY ./requirements.txt /app/requirements.txt

WORKDIR /app
ENV FLASK_DEBUG = 1
ENV PORT=5000

RUN pip install -r requirements.txt

COPY ./ /app

EXPOSE 5000

CMD ["python","app.py"]

