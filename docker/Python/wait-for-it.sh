#!/bin/bash

host="mysql"
port="3306"

while ! nc -z $host $port; do
  sleep 0.1
done
