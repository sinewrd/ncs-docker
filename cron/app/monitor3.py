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

now = datetime.datetime.now()


# 判斷是否有Collection
# param: 以字串方式傳輸"collection name"
def checkExistCollection(colname):
    # 列出所有集合的名称
    collist = mydb.list_collection_names()

    if colname in collist:
        return "exist"
    else:
        return "no_exist"


# Log紀錄
# param: 以JSON方式傳輸 request_data
# 2023.08.17 修改
def recordLog(json_data):
    # request_data = json.loads(json_data)
    request_data = json_data
    mycol = mydb["log"]
    # 現在時間    
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



# 清除Log紀錄
def clearLog():    
    # 取得前三個月的時間
    #one_hour_ago = now - timedelta(hours=2160) ## 24 * 90
    #Threshold = str(one_hour_ago).split(' ')
    timeString = str(datetime.datetime(now.year, now.month, 1) - timedelta(days=1))[:10]
    timeString = timeString+" 00:00:00"
    struct_time = datetime.datetime.strptime(timeString, "%Y-%m-%d %H:%M:%S") # 轉成時間元組
    timestamp_specified = datetime.datetime.timestamp(struct_time)

    mycollection = mydb["log"] # 數据
    myquery = {"datetime": {"$lt":timestamp_specified}} ## 條件
    result = mycollection.delete_many(myquery)
    # Log 紀錄
    payload = {
        "role": "system",
        "id": "cron",
        "msg": "Execute clear log record",
        "category": 4
    }
    recordLog(payload)

    return "sucess"


# 清除Raw Data紀錄
def clearPowerMeter():
    # 取得前一天前的時間
    today = datetime.date.today()    
    #one_day_ago = now - timedelta(days=1) ## 24 * 90
    yesterday = today - timedelta(days=1)
    timeString = str(yesterday)+" 00:00:00"
    struct_time = datetime.datetime.strptime(timeString, "%Y-%m-%d %H:%M:%S") # 轉成時間元組
    timestamp_specified = datetime.datetime.timestamp(struct_time)

    mycollection = mydb["power_meter"] # 數据
    myquery = {"datetime": {"$lt": timestamp_specified}} ## 條件
    result = mycollection.delete_many(myquery)
    # Log 紀錄
    payload = {
        "role": "system",
        "id": "cron",
        "msg": "Execute clear raw data record",
        "category": 4
    }
    recordLog(payload)

    return "sucess"


# 主程式
def main():
    is_exist = checkExistCollection("account")
    # 判斷帳號 collection 是否存在
    if is_exist != "exist":
        mycol = mydb["account"]
        mydict = {
               "index": 1,
               "username": "sinew",
               "password": "sinew"
            }
        mycol.insert_one(mydict)
        print('create account collection\n')
    else:
        print('account collection exist\n')    
        
    
    is_exist_1 = checkExistCollection("zone")
    # 判斷Zone collection 是否存在
    if is_exist_1 != "exist":
        mycol1 = mydb["zone"]       
        ## 批次新增
        mylist = [
          { "index": 1, "zone": "Building 1"},
          { "index": 2, "zone": "Building 2"},
          { "index": 3, "zone": "Building 3"},
          { "index": 4, "zone": "Building 4"},
          { "index": 5, "zone": "Building 5"},
          { "index": 6, "zone": "Building 6"}
        ]
        mycol1.insert_many(mylist)
        print('create zone collection\n')
    else:
        print('zone collection exist\n')    


    is_exist_2 = checkExistCollection("group")
    # 判斷Zone collection 是否存在
    if is_exist_2 != "exist":  
        mycol2 = mydb["group"]
        ## 批次新增
        mylist2 = [
          { "index": 1, "name": "Group 1"},
          { "index": 2, "name": "Group 2"},
          { "index": 3, "name": "Group 3"},
          { "index": 4, "name": "Group 4"},
          { "index": 5, "name": "Group 5"},
          { "index": 6, "name": "Group 6"}
        ]
        mycol2.insert_many(mylist2)
        print('create group collection\n')
    else:
        print('group collection exist\n')        

    
    # 清除Log紀錄    
    clearLog()
    # 清除Raw Data紀錄    
    clearPowerMeter()

if __name__ == '__main__':
    main()