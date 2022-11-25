FROM redis:latest

RUN apt-get update && apt-get install -y --no-install-recommends \
    python3.5 \
    python3-pip\
    && \
    apt-get clean && \  
    rm -rf /var/lib/apt/lists/*


ADD publisher.py /

RUN pip3 install redis
RUN pip3 install paho-mqtt

CMD ["python3","-u","publisher.py"]


EXPOSE 6379


