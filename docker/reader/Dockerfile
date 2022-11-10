FROM debian:latest

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3.5 \
    python3-pip \
    && \
    apt-get clean && \  
    rm -rf /var/lib/apt/lists/*

RUN pip3 install redis
RUN mkdir data
ADD reader.py ./data/reader.py
RUN cd data
WORKDIR /data

ENTRYPOINT [ "python3" , "reader.py" ]
