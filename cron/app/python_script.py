import os, datetime, time, socket
import requests, json, pymongo, re

from datetime import timedelta

# 全域變數 - DB
mongo_host = os.environ.get('MONGO_HOST')
mongo_port = int(os.environ.get('MONGO_PORT'))
mongo_db = os.environ.get('MONGO_DB')
mongo_username = os.environ.get('MONGO_USERNAME')
mongo_password = os.environ.get('MONGO_PASSWORD')


myclient = pymongo.MongoClient(
                host=mongo_host,
                port=mongo_port,
                username=mongo_username,
                password=mongo_password,
            )

mydb = myclient[mongo_db]



# 主程式
# 取出裝置有被啟動
def main():
    mycol = mydb["register"]

    return "sucess"


if __name__ == '__main__':
    main()
