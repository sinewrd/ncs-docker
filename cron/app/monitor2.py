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



# Log紀錄
# param: 以JSON方式傳輸 request_data
# 2023.08.17 修改
def recordLog(json_data):
    # request_data = json.loads(json_data)
    request_data = json_data
    mycol = mydb["log"]
    # 現在時間
    now = datetime.datetime.now()
    date_time = now.strftime("%Y-%m-%d %H:%M:%S")

    mydict = {
        "datetime": str(date_time),
        "role": request_data['role'],
        "id": request_data['id'],
        "msg": request_data['msg'],
        "category": request_data['category']
    }

    x = mycol.insert_one(mydict)
    return "sucess"



# 主程式
def main():
    ## 現在時間
    #nowdt = datetime.datetime.now()
    today = datetime.date.today()
    #print('現在時間:', nowdt)
    # 取得前一天前的時間
    #one_week_ago = nowdt - timedelta(days=1) ## 24 * 90
    yesterday = today - timedelta(days=1)
    timeString = str(yesterday)+" 00:00:00"
    struct_time = datetime.datetime.strptime(timeString, "%Y-%m-%d %H:%M:%S") # 轉成時間元組
    timestamp_specified = datetime.datetime.timestamp(struct_time)
    #Threshold = str(one_hour_ago).split(' ')

    mycollection = mydb["power_meter"] # 數据
    myquery = {"datetime": {"$lt":timestamp_specified}} ## 條件
    result = mycollection.delete_many(myquery)

    today = datetime.date.today()
    # Log 紀錄
    payload = {
        "role": "system",
        "id": "cron",
        "msg": "Execute clear raw data record",
        "category": 4
    }
    recordLog(payload)

    print(today)

if __name__ == '__main__':
    main()