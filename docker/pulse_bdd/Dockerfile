FROM debian:latest

RUN apt-get update && apt-get install -y --no-install-recommends \
    iputils-ping \
    python \
    python3-pip

RUN pip install redis
RUN pip install paho-mqtt
RUN mkdir data
ADD script.py /data/script.py
ADD filter_script.py /data/filter_script.py
RUN cd data
WORKDIR /data

ENTRYPOINT ["python3", "script.py" ,"-p"]

EXPOSE 7080
