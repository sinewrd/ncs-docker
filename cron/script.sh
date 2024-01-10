#!/bin/bash

sleep 20
# 在这里可以使用环境变量
#echo "Cron job is running at $(date)"
#echo "MongoDB host: $MONGO_HOST"

# 获取 MongoDB 的 IP 地址
MONGO_IP=$(getent hosts mongo | awk '{ print $1 }')
echo "MongoDB IP: $MONGO_IP"


export MONGO_HOST="$MONGO_IP"
export MONGO_PORT=27017
export MONGO_DB="ncs"
export MONGO_USERNAME="sinew"
export MONGO_PASSWORD="sinew3612"

/usr/local/bin/python /cron/app/python_script.py
