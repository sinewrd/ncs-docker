import os, datetime, time, socket
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

time_threshold = 60 #判斷裝置是否連線

# 裝置連線狀態
# param: 以字串方式傳輸"deviceID"
def onlineStatus(devid):
    mycol = mydb["register"]

    myquery = {"id": devid}
    query_data = mycol.find_one(myquery)
    # 執行時間
    now = datetime.datetime.now()
    date_time = now.strftime("%Y-%m-%d %H:%M:%S")
    print(date_time)
    if now.timestamp() - query_data['conn_time'] > time_threshold:
        # 更新連線狀態
        newvalues = { "$set": { "conn_status": "off" } }
    else:
        newvalues = { "$set": { "conn_status": "on" } }

    mycol.update_one(myquery, newvalues)

    return "sucess"
    

# 主程式
# 取出裝置有被啟動
def main():
    mycol = mydb["register"]

    myquery = {"active": 1}
    mydoc = mycol.find(myquery)

    for x in mydoc:
        onlineStatus(x['id'])

    return "sucess"


if __name__ == '__main__':
    main()