FROM redis:latest

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3.5 \
    python3-pip
RUN pip3 install redis
RUN pip3 install paho-mqtt

RUN mkdir data
ADD publisher.py /data/publisher.py
RUN cd data
WORKDIR /data

ENTRYPOINT [ "python3", "publisher.py" ]


EXPOSE 6379


