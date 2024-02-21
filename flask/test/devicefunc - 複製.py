import os, datetime, time
import requests, json, pymongo, re

from datetime import timedelta

# 全域變數 - DB
mongo_host = "34.81.61.172"
mongo_port = 27017
mongo_db = "ncs"
mongo_username = "sinew"
mongo_password = "sinew3612"

#myclient = pymongo.MongoClient("mongodb://sinew:sinew3612@mongo:27017/")  ##IP需要修改, Docker版本
#myclient = pymongo.MongoClient("mongodb://sinew:sinew3612@34.81.61.172:27017/")  ##IP需要修改
myclient = pymongo.MongoClient(
                host=mongo_host,
                port=mongo_port,
                username=mongo_username,
                password=mongo_password,
            )

mydb = myclient[mongo_db]
#mydb = myclient["ncs"]

Threshold = 20 # 判斷設備開關的臨界值。
#tempo = 20  #每 n 秒裝置傳送訊息一次。沒有使用到
time_threshold = 60 #判斷裝置是否連線

## 以下是函式 ##
# 計算Count CMD Collection, 確認是否有新的命令
# param: 以字串方式傳輸"Device ID"
def countCMD(devid):
    #myclient = pymongo.MongoClient("mongodb://sinew:sinew3612@34.81.61.172:27018/")  ##IP需要修改
    #mydb = myclient["ncs"]
    mycol = mydb["cmd"]

    myquery = {"id": devid}
    count = mycol.count_documents(myquery)
    
    return count


# 取出裝置要下達命令
# param: 以字串方式傳輸"Device ID"
# 明天修改。here
def getDeviceCMD(devid):
    #myclient = pymongo.MongoClient("mongodb://sinew:sinew3612@34.81.61.172:27018/")  ##IP需要修改
    #mydb = myclient["ncs"]
    mycol = mydb["cmd"]

    myquery = {"id": devid}
    query_data = mycol.find_one(myquery)
    #doc = next(query_data) ## 取出一筆

    if query_data["set"] == "rs232tx":
        mycol1 = mydb["equipment_set"]
        myquery1 = {"index": query_data['equipment_index']} #equipment_index
        query_data1 = mycol1.find_one(myquery1)
        payload = equipmentConfig(query_data['equipment_index'], query_data['action'], 'request')

        mydict = {
                    #"status": "ok",
                    "set": query_data['set'],
                    "baudrate": query_data1['baudrate'],
                    "config": query_data1['config'],
                    "code": payload['code'],
                }
    elif query_data["set"] == "clwh":
        mydict = {
                    "status": "ok",
                    "set": query_data['set'],
                 }

    ## Continued ...
    
    return mydict


# 取出裝置名稱
# param: 以字串方式傳輸"Device ID"
# 2023.08.18 修改
def getDeviceInfo(devid, type):
    #myclient = pymongo.MongoClient("mongodb://sinew:sinew3612@34.81.61.172:27018/")  ##IP需要修改
    #mydb = myclient["ncs"]
    mycol = mydb["register"]

    query1 = {"id": devid}
    query1_data = mycol.find_one(query1)

    if type == 'name':
        data = query1_data['name']
    else:
        data = query1_data['equipment_index']

    return data


# 判斷是否有Collection
# param: 以字串方式傳輸"collection name"
def checkExistCollection(colname):
    # 列出所有集合的名称
    collist = mydb.list_collection_names()

    if colname in collist:
        return "exist"
    else:
        return "no_exist"


# 更新裝置連線時間
# param: 以字串方式傳輸"Device ID"
def updateOnlineTime(devid):
    mycol = mydb["register"]
    # 判斷是否有Collection
    is_exist = checkExistCollection("log")
    
    if is_exist == "exist":
        # 連線時間
        now = datetime.datetime.now()
        query1 = {"id": devid}

        # Log 紀錄。
        query_data = mycol.find_one(query1)
        status = getDeviceOnlineStatus(devid) # 取出裝置最後連線狀態。
        #print(status)
        if now.timestamp() - query_data['conn_time'] > time_threshold:
            #print('裝置斷線中..')
            recordLog("device", devid, "offline")
        elif status == "not":
            #print('裝置連線中..')
            recordLog("device", devid, "online")
            # 更新連線 Timestamp
            newvalues = { "$set": { "conn_time": now.timestamp() } }
            mycol.update_one(query1, newvalues)

    return "sucess"


# 更新裝置連線時間
# param: 以字串方式傳輸"Device ID"
# 修改離線LOG機制, 2023.08.17
def updateOnlineTimev1(devid):
    mycol = mydb["register"]
    # 連線時間
    now = datetime.datetime.now()
    query1 = {"id": devid}

    # 更新連線 Timestamp
    newvalues = { "$set": { "conn_time": now.timestamp() } }
    mycol.update_one(query1, newvalues)

    return "sucess"


# 回應碼搜尋
# param: 以字串方式傳輸"232ack"或者是"name"和index
def equipmentConfig(index, ack, type):
    #myclient = pymongo.MongoClient("mongodb://sinew:sinew3612@34.81.61.172:27018/")  ##IP需要修改
    #mydb = myclient["ncs"]
    mycol = mydb["equipment_set"]

    query1 = {"index": index}
    query1_data = mycol.find_one(query1)
    #print(query1_data['response'])
    if type == "response":    
        filtered_list = [
            dictionary for dictionary in query1_data['response']
            if dictionary['code'] == ack
        ]
    elif type == "request":
        filtered_list = [
            dictionary for dictionary in query1_data['setting']
            if dictionary['name'] == ack
        ]

    if len(filtered_list) == 0:
        return None
    else:
        return filtered_list[0]


# 更新設備狀態
# param: 以字串方式傳輸"Device ID" 和 回應碼狀態
def updEquipmentStatus(devid, status):
    mycol = mydb["register"]
    
    myquery = {"id": devid}
    newvalues = {"$set": {"equipment_status": status}}
    mycol.update_one(myquery, newvalues)
    

# 紀錄和刪除裝置要下達命令
# param: 以字串方式傳輸"Device ID"
# 2023.08.18 修改
def processDeviceCMD(devid, ack):
    #myclient = pymongo.MongoClient("mongodb://sinew:sinew3612@34.81.61.172:27018/")  ##IP需要修改
    #mydb = myclient["ncs"]
    mycol = mydb["log"]
    # 現在時間
    now = datetime.datetime.now()
    date_time = now.strftime("%Y-%m-%d %H:%M:%S")
    try:
        dev_name = getDeviceInfo(devid, 'name') # 裝置名稱
        index = getDeviceInfo(devid, 'equipment_index') # 對應的設備表。修改 here

        payload = equipmentConfig(index, ack, 'response')
        ## 產出訊息
        if payload == None:
            message = "回應碼執行"+ack
        else:
            message = "設備"+payload['commit']
            updEquipmentStatus(devid, payload['name']) # 更新設備狀態

        # 寫入Log紀錄
        mydict = {
                   "datetime": date_time,
                   "role": "device",
                   "name": devid,
                   "message": dev_name+" "+message
                 }

        x = mycol.insert_one(mydict)

        # 刪除命令
        mycol1 = mydb["cmd"]
        myquery = {"id": devid}
        mycol1.delete_one(myquery)

        return "sucess"
    except:
        return "failed"

    
# Log紀錄
# param: 以字串方式傳輸"role", "Device ID / account / cron", "Conditions"
def recordLog(role, name, conditions):
    mycol = mydb["log"]
    # 現在時間
    now = datetime.datetime.now()
    try:
        if role == "device":
            dev_name = getDeviceInfo(name, 'name') # 裝置名稱
            if conditions == "online":
                #print('online')
                date_time = now.strftime("%Y-%m-%d %H:%M:%S")
                msg = "裝置"+dev_name+"開始連線"
            else:
                #print('offline')
                #date_time = getlastOnlineTime(name)+timedelta(seconds=1)
                date_timestamp = getlastOnlineTime(name)
                #print(date_timestamp)
                # 計算一秒後的時間戳
                one_second_later_timestamp = date_timestamp + 1
                struct_time = time.localtime(one_second_later_timestamp) # 轉成時間元組
                date_time = time.strftime("%Y-%m-%d %H:%M:%S", struct_time) # 轉成字串
                msg = "裝置"+dev_name+"離線中"
        
        ## Continued ...
        
        # 寫入Log紀錄
        mydict = {
                   "datetime": date_time,
                   "role": role,
                   "id": name,
                   "message": msg
                 }

        x = mycol.insert_one(mydict)
    except:
        return "failed"


# Log紀錄 - 取出裝置最後連線狀態
# param: 以字串方式傳輸"Device ID"
def getDeviceOnlineStatus(devid):
    mycol = mydb["log"]
    
    query1 = {"id": devid, "message": {"$regex": re.compile(r'線')} }
    #sorted_data = mycol.find_one(query1, sort=[('datetime', -1)])
    sorted_data = mycol.find(query1).sort('datetime', -1)
    query_data = next(sorted_data)
    #print(query_data)
    if "連線" in query_data['message']:
        return "found"
    else:
        return "not"


# 取出最後連線時間
# param: 以字串方式傳輸"Device ID"
def getlastOnlineTime(devid):
    mycol = mydb["register"]
    
    myquery = {"id": devid}
    query_data = mycol.find_one(myquery)
    #print(query_data['conn_time'])
    return query_data['conn_time']


# 裝置註冊表
# param: 以字串方式傳輸"Device ID"
def checkDeviceIDreg(devid, type):
    #myclient = pymongo.MongoClient("mongodb://sinew:sinew3612@34.81.61.172:27018/")  ##IP需要修改
    #mydb = myclient["ncs"]
    mycol = mydb["register"]
    
    if type == "register":
        myquery = {"id": devid, "active":1}
    else:
        myquery = {"id": devid}
    
    count = mycol.count_documents(myquery)

    return count


# 裝置紀錄註冊表
# param: 以字串方式傳輸"Device ID"
# 2023.08.17 修改
def recordRegister(devid):
    #myclient = pymongo.MongoClient("mongodb://sinew:sinew3612@34.81.61.172:27018/")  ##IP需要修改
    #mydb = myclient["ncs"]
    mycol = mydb["register"]

    try:    
        mydict = {
                    'id': devid,
                    'name': devid,
                    'active': 0,
                    'conn_time': 0,
                    'equipment_index': 0
                }
        x = mycol.insert_one(mydict)

        return "sucess"
    except:
        return "failed"


# 紀錄裝置 power meter
# param: 以JSON方式傳輸 request_data
def recordPowerMeter(json_data):
    #request_data = json.loads(json_data)
    request_data = json_data
    # 資料庫
    #myclient = pymongo.MongoClient("mongodb://sinew:sinew3612@34.81.61.172:27018/")  ##IP需要修改
    #mydb = myclient["ncs"]
    mycol = mydb["power_meter"]
    now = datetime.datetime.now()

    try:    
        mydict = {
                    'datetime': now.timestamp(),
                    'id': request_data['id'],
                    'pw1': request_data['pw1'],
                    'cu1': request_data['cu1'],
                    'wh1': round(request_data['wh1']),
                 }
        x = mycol.insert_one(mydict)

        return "sucess"
    except:
        return "failed"


# 取出 power_meter Collection 第二筆資料
# param: 以字串方式傳輸"Device ID"
# return 最新第二筆資料, 回傳資料型態整數
def getPowerMeter(devid):
    mycol = mydb["power_meter"]

    myquery = {"id": devid}
    dataset = mycol.find(myquery).sort('datetime', -1)

    query_data = next(dataset)
    query_data = next(dataset)

    return query_data['wh1']


# 轉換成 wh
# param: 以符點數 瓦特
def calculateWh(now_wh, devid):
    old_wh = getPowerMeter(devid)
    wh = now_wh - old_wh
    #wh = w/3600;
    #wh = round(wh, 3)
    return wh



# 統計使用時數
# param: 以字串方式傳輸"Device ID" 和日期
# 2023.08.18 修改
def statisticsUsage(devid, type):
    mycol = mydb["statistics_today_on_time"]

    today = datetime.date.today()
    myquery = {"id": devid, "date": str(today)}
    count = mycol.count_documents(myquery)
     

    if count == 0: # 第一筆
        now = datetime.datetime.now()
        mydict = {
                    'date': str(today),
                    'id': devid,
                    'usage': 0,
                    'start': round(now.timestamp())
                }
        mycol.insert_one(mydict)
    else:
        query_data = mycol.find_one(myquery)
        
        if type == 'open' and query_data['start'] == 0:
            # 紀錄起始時間
            now = datetime.datetime.now()
            newvalues = { "$set": {"start": round(now.timestamp())}}
            mycol.update_one(myquery, newvalues)
        elif type == 'close' and query_data['start'] != 0:
            # 統計。最後start值要歸零
            now = datetime.datetime.now()
            diff = round(now.timestamp()) - round(query_data['start']) # 回傳值為秒數
            total = query_data['usage'] + diff
            #print(total)
            newvalues = {"$set": {"usage":total, "start": 0}}
            mycol.update_one(myquery, newvalues)


# 統計用電量
# param: 以JSON方式傳輸 request_data
# 2023-08-08 更新統計用電資訊
# 2023-08-18 更新統計用電資訊 v1
def statisticsPw(json_data):
    #request_data = json.loads(json_data)
    request_data = json_data
    
    if request_data['pw1'] > Threshold:  # 設備有開啟時
        # 統計使用時數
        statisticsUsage(request_data['id'], 'open')
    else:
        # 設備關閉
        statisticsUsage(request_data['id'], 'close')
        


# 取得裝置使用時數
# param: 以字串方式傳輸"Device ID" 和 "date"
def getDeviceUsage(devid, date):
    mycol = mydb["statistics_turn_on_time"] # 使用時數

    myquery = {"id": devid, "date":date}
    query_data = mycol.find_one(myquery)

    return query_data['usage']


# 取得裝置統計
# param: 以字串方式傳輸"Device ID"
def getStatistics(devid):
    mycol = mydb["statistics_pw"] # 電力資訊

    myquery = {"id": devid}
    query_data = mycol.find(myquery)

    data = []
    for x in query_data:
        # 取出使用時數
        usage = getDeviceUsage(x['id'], x['date'])
        stack = {
                  "date": x['date'],
                  "id": x['id'],
                  "usage": usage,
                  "wh": x['wh']
                }
        data.append(stack)

    return data


# 判斷式: 處理以下狀態
# 1. 接收Power Meter
# 2. 接收裝置回傳設備的訊息
# 3. 沒有在裝置註冊表
# 4. 有在裝置註冊表, 但user 沒有做註冊
# param: 以JSON方式傳輸 request_data
# 2023.08.17 修改
def process(json_data):
    #request_data = json.loads(json_data)
    request_data = json_data
    keylist = list(request_data.keys())
    #res_status = {"status":"error","commit":"unregister"}

    if keylist.count('232ack') == 0 and checkDeviceIDreg(request_data['id'], "register") != 0: # 接收裝置回傳Power Meter
        #insert = recordPowerMeter(json.dumps(request_data))
        insert = recordPowerMeter(request_data)
        # 更新連線時間
        updateOnlineTimev1(request_data['id'])
        # 統計用電資訊
        #statisticsPw(json.dumps(request_data)) ## 修改 here
        statisticsPw(request_data) ## 修改 here

        # 查詢控制命令
        if countCMD(request_data['id'])  > 0:
            #print('has command')
            data = getDeviceCMD(request_data['id']) ## 回傳為 字典 型態
                    
            return data
        else:
            return {"status":"ok"}
    elif keylist.count('232ack') != 0 and checkDeviceIDreg(request_data['id'], "register") != 0: # 接收裝置回傳設備的訊息
        processDeviceCMD( request_data['id'], request_data['232ack'] )
        return {"status":"ok"}
    elif checkDeviceIDreg(request_data['id'], "first") == 0: # 沒有在裝置註冊表
        status = recordRegister(request_data['id']) ## 新增裝置表紀錄
        #return res_status
        return {"status":"error","commit":"unregister"}
    else: # 有在裝置註冊表, 但user 沒有做註冊
        #return res_status
        return {"status":"error","commit":"unregister"}