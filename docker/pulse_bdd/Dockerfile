FROM debian:latest


RUN apt-get update -yq && apt-get install -y python3
RUN apt-get install pip3 -y
CMD pip3 install redis
RUN mkdir data
ADD script.py /data/script.py
RUN cd data
WORKDIR /data

ENTRYPOINT [ "python", "script.py" ] 

VOLUME /data



