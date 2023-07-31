import os, datetime, time
import requests, json, pymongo


# 全域變數 - DB
myclient = pymongo.MongoClient("mongodb://sinew:sinew3612@34.81.61.172:27018/")  ##IP需要修改
mydb = myclient["ncs"]

Threshold = 20 # 判斷設備開關的臨界值
tempo = 5  #每 n 秒裝置傳送訊息一次

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
def getDeviceCMD(devid):
    #myclient = pymongo.MongoClient("mongodb://sinew:sinew3612@34.81.61.172:27018/")  ##IP需要修改
    #mydb = myclient["ncs"]
    mycol = mydb["cmd"]

    myquery = {"id": devid}
    query_data = mycol.find_one(myquery)
    #doc = next(query_data) ## 取出一筆
    mycol1 = mydb["equipment_set"]
    myquery1 = {"index": query_data['equipment_index']} #equipment_index
    query_data1 = mycol1.find_one(myquery1)
    payload = equipmentConfig(query_data['equipment_index'], query_data['action'], 'request')

    mydict = {
               "status": "ok",
               "baudrate": query_data1['baudrate'],
               "partity": query_data1['partity'],
               "code": payload['code'],
             }
    
    return mydict


# 取出裝置名稱
# param: 以字串方式傳輸"Device ID"
def getDeviceInfo(devid, type):
    #myclient = pymongo.MongoClient("mongodb://sinew:sinew3612@34.81.61.172:27018/")  ##IP需要修改
    #mydb = myclient["ncs"]
    mycol = mydb["register"]

    query1 = {"id": devid}
    query1_data = mycol.find_one(query1)

    if type == 'name':
        data = query1_data['name']
    else:
        data = query1_data['equipment_set']

    return data


# 更新裝置連線時間
# param: 以字串方式傳輸"Device ID"
def updateOnlineTime(devid):
    mycol = mydb["register"]
    # 連線時間
    now = datetime.datetime.now()

    query1 = {"id": devid}
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
    #print(filtered_list)
    if len(filtered_list) == 0:
        return None
    else:
        return filtered_list[0]


# 紀錄和刪除裝置要下達命令
# param: 以字串方式傳輸"Device ID"
def processDeviceCMD(devid, ack):
    #myclient = pymongo.MongoClient("mongodb://sinew:sinew3612@34.81.61.172:27018/")  ##IP需要修改
    #mydb = myclient["ncs"]
    mycol = mydb["log"]
    # 現在時間
    now = datetime.datetime.now()
    date_time = now.strftime("%Y-%m-%d %H:%M:%S")
    try:
        dev_name = getDeviceInfo(devid, 'name') # 裝置名稱
        index = getDeviceInfo(devid, 'equipment_set') # 對應的設備表
        #print(index)
        payload = equipmentConfig(index, ack, 'response')
        ## 產出訊息
        if payload == None:
            message = "回應碼執行"+ack
        else:
            message = "設備"+payload['commit']

        # 寫入Log紀錄
        mydict = {
                   "datetime": date_time,
                   "role": "device",
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
                    'equipment_set': '',
                }
        x = mycol.insert_one(mydict)

        return "sucess"
    except:
        return "failed"


# 紀錄裝置 power meter
# param: 以JSON方式傳輸 request_data
def recordPowerMeter(json_data):
    request_data = json.loads(json_data)

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
                    'wh1': request_data['wh1'],
                 }
        x = mycol.insert_one(mydict)

        return "sucess"
    except:
        return "failed"


# 轉換成 wh
# param: 以符點數 瓦特
def convertWh(w):
    wh = w/3600;
    #wh = round(wh, 3)

    return wh


# 統計使用時數和用電量
# param: 以JSON方式傳輸 request_data
def statistics(json_data):
    request_data = json.loads(json_data)
    
    if request_data['pw1'] > Threshold:  # 設備有開啟時
        mycol = mydb["statistics"]
        # 今日日期
        today = datetime.date.today()
        myquery = {"id": request_data['id'], "date": str(today) }
        count = mycol.count_documents(myquery)
   
        #print( convertWh(request_data['pw1']) )
        if count == 0:
            #print('new')
            mydict = {
                        'date': str(today),
                        'id': request_data['id'],
                        'usage': 0,
                        'wh': 0
                     }
            mycol.insert_one(mydict)
        else:
            #print('update')
            query_data = mycol.find_one(myquery)
            #new_usage = query_data['usage'] + round(tempo/60, 3)
            new_usage = query_data['usage'] + tempo/60
            new_wh = query_data['wh'] + convertWh(request_data['pw1'])
            print(new_usage)
            print(new_wh)
            #query1 = {"id": request_data['id']}
            newvalues = { "$set": {"usage": round(new_usage, 3), "wh": round(new_wh, 3)}}
            #newvalues = {"$set": {"usage": new_usage, "wh": new_wh}}
            mycol.update_one(myquery, newvalues)
        


# 取得裝置統計
# param: 以字串方式傳輸"Device ID"
def getStatistics(devid):
    mycol = mydb["statistics"]

    myquery = myquery = {"id": devid}
    query_data = mycol.find(myquery)

    data = []
    for x in query_data:
        stack = {
                  "date": x['date'],
                  "id": x['id'],
                  "usage": x['usage'],
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
def process(json_data):
    request_data = json.loads(json_data)
    keylist = list(request_data.keys())

    if keylist.count('232ack') == 0 and checkDeviceIDreg(request_data['id'], "register") != 0: # 接收裝置回傳Power Meter
        insert = recordPowerMeter(json.dumps(request_data))
        # 更新連線時間
        updateOnlineTime(request_data['id'])
        # 統計
        statistics(json.dumps(request_data)) ## here 

        # 查詢控制命令
        if countCMD(request_data['id'])  > 0:
            #print('has command')
            data = getDeviceCMD(request_data['id']) ## 回傳為 物件 型態
                    
            return data
        else:
            return {"status": "ok"}
    elif keylist.count('232ack') != 0 and checkDeviceIDreg(request_data['id'], "register") != 0: # 接收裝置回傳設備的訊息
        processDeviceCMD( request_data['id'], request_data['232ack'] )
        return {"status": "ok"}
    elif checkDeviceIDreg(request_data['id'], "first") == 0: # 沒有在裝置註冊表
        status = recordRegister(request_data['id']) ## 新增裝置表紀錄
        return {"status": "error", "commit":"unregister"}
    else: # 有在裝置註冊表, 但user 沒有做註冊
        return {"status": "error", "commit":"unregister"}