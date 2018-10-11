FROM ubuntu:18.04

RUN apt-get update -y && \
    apt-get install -y python-pip python3 python-dev build-essential

# We copy just the requirements.txt first to leverage Docker cache
COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip install -r requirements.txt

COPY . /app

ENTRYPOINT [ "python"]

EXPOSE 5000

CMD ["app.py" ]