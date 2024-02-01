#!/bin/bash
# Listen Device Online Status
# 获取 MongoDB 的 IP 地址
MONGO_IP=$(getent hosts mongo | awk '{ print $1 }')

export MONGO_HOST="$MONGO_IP"
export MONGO_PORT="27017"
export MONGO_DB="ncs"
export MONGO_USERNAME="sinew"
export MONGO_PASSWORD="sinew3612"

#while true; do
#sleep 20
/usr/local/bin/python /cron/app/monitor.py
#done
exit 0
