FROM redis:latest

RUN apt-get update && apt-get install -y --no-install-recommends \
    iputils-ping \
    python \
    python3-pip


RUN pip install redis
RUN pip install paho-mqtt
RUN mkdir data
ADD publisher.py ./data/publisher.py
RUN cd data
WORKDIR /data

CMD ["python3","-u","publisher.py"]


EXPOSE 6379


