FROM redis:latest

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3.5 \
    python3-pip
RUN pip3 install paho-mqtt

EXPOSE 6379

