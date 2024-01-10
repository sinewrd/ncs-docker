import os, datetime, time
import requests, json, pymongo, re

from datetime import timedelta

# 全域變數 - DB
mongo_host = os.environ.get('MONGO_HOST')
mongo_port = int(os.environ.get('MONGO_PORT'))
mongo_db = os.environ.get('MONGO_DB')
mongo_username = os.environ.get('MONGO_USERNAME')
mongo_password = os.environ.get('MONGO_PASSWORD')
"""
mongo_host = "34.81.61.172"
mongo_port = 27017
mongo_db = "ncs"
mongo_username = "sinew"
mongo_password = "sinew3612"
"""

myclient = pymongo.MongoClient(
                host=mongo_host,
                port=mongo_port,
                username=mongo_username,
                password=mongo_password,
            )

mydb = myclient[mongo_db]


# 主程式
def main():
    ## 現在時間
    nowdt = datetime.datetime.now()
    #print('現在時間:', nowdt)
    # 取得前三個月的時間
    one_hour_ago = nowdt - timedelta(hours=2160) ## 24 * 90
    Threshold = str(one_hour_ago).split(' ')

    mycollection = mydb["log"] # 數据
    myquery = {"datetime": {"$lt":Threshold[0]}} ## 條件
    result = mycollection.delete_many(myquery)

    today = datetime.date.today()

    print(today)

if __name__ == '__main__':
    main()