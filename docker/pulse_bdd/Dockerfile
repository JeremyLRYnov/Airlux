FROM debian:latest


RUN apt-get update -yq && apt-get install -y --no-install-recommends python

RUN mkdir data
ADD script.py /data/script.py
RUN cd data
WORKDIR /data

ENTRYPOINT [ "python", "script.py" ] 

VOLUME /data



