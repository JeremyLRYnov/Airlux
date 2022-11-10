FROM debian:latest

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3.5 \
    python3-pip \
    && \
    apt-get clean && \  
    rm -rf /var/lib/apt/lists/*


ADD reader.py ./reader.py

ENTRYPOINT [ "python3" ]
