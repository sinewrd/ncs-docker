import os, datetime, time
import requests, json, pymongo, re, random

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

# 判斷是否有Collection
# param: 以字串方式傳輸"collection name"
def checkExistCollection(colname):
    # 列出所有集合的名称
    collist = mydb.list_collection_names()

    if colname in collist:
        return "exist"
    else:
        return "no_exist"


# 取出【equipment_set】 Collection
def getEquipmentIndex():
    mycol = mydb["equipment_set"]

    dataset = mycol.find({}).sort('index', -1)
    query_data = next(dataset)
    
    return query_data['index']


# 取出裝置Power Meter
# param: 以JSON方式傳輸 request_data
# 2023.08.24 新增
def getRawData(json_data):
    request_data = json_data
    mycol = mydb["power_meter"]

    fromDate_str = request_data['start']+" 00:00:00"
    endDate_str = request_data['end']+" 23:59:59"
    # 將日期字串轉換為 datetime 物件
    start_date_object = datetime.datetime.strptime(fromDate_str, "%Y-%m-%d %H:%M:%S")
    end_date_object = datetime.datetime.strptime(endDate_str, "%Y-%m-%d %H:%M:%S")
    # 將 datetime 物件轉換為時間戳
    start_timestamp = start_date_object.timestamp()
    end_timestamp = end_date_object.timestamp()
    print(start_timestamp)
    print(end_timestamp)

    myquery = {"id": request_data['id'], "datetime": {"$lte":  end_timestamp, "$gte": start_timestamp} }
    mydoc = mycol.find(myquery)

    Data =[]
    for x in mydoc:
        item = {
                 'datetime': datetime.datetime.fromtimestamp(x['datetime']).strftime('%Y-%m-%d %H:%M:%S'),
                 'pw1': x['pw1'],
                 'cu1': x['cu1'],
                 'wh1': x['wh1']
               }
        Data.append(item)

    dataset = {'dataset':Data}
    return dataset


# Log紀錄
# param: 以JSON方式傳輸 request_data
# 2023.08.17 修改
def recordLog(json_data):
    #request_data = json.loads(json_data)
    request_data = json_data
    mycol = mydb["log"]
    # 現在時間
    now = datetime.datetime.now()
    date_time = now.strftime("%Y-%m-%d %H:%M:%S")
    
    mydict = {
               "datetime": str(date_time),
               "role": request_data['role'],
               "id": request_data['id'],
               "msg": request_data['msg']
             }
    
    x = mycol.insert_one(mydict)
    return "sucess"


# 查詢裝置統計
# param: 以字串方式傳輸"devid" DeviceID
# 2023.08.28 新增
def SatisticsUsage(devid):
    mycol = mydb["statistics_device_day"]

    if devid == 'all':
        mydoc = mycol.find()
    else:
        myquery = {"id": devid}
        mydoc = mycol.find(myquery)

    Data =[]
    for x in mydoc:
        item = {
                'date': x['date'],
                'id': x['id'],
                'usage': x['usage'],
                'addwh': x['addwh']
            }
        Data.append(item)

    dataset = {'dataset':Data}
    return dataset


# 查詢設備控制碼
# param: 以整數方式傳輸"Index"索引值
# 2023.08.24 新增
def queryEquipment(index):
    mycol = mydb["equipment_set"]
    #print(index)
    if index == 0:
        mydoc = mycol.find()
    else:
        myquery = {"index": index}
        mydoc = mycol.find(myquery)
        
    Data =[]
    for x in mydoc:
        item = {
                 'index': x['index'],
                 'brand': x['brand'],
                 'model': x['model'],
                 'baudrate': x['baudrate'],
                 'config': x['config'],
                 'setting': x['setting'],
                 'response': x['response']
               }
        Data.append(item)

    dataset = {'dataset':Data}
    return dataset


# 新增各廠牌電視控制碼
# param: 以JSON方式傳輸 request_data
# 2023.08.17 修改
# 2023.08.21 修改。新增輸出 Index 索引值
def setControlCode(json_data):
    #request_data = json.loads(json_data)
    request_data = json_data
    mycol = mydb["equipment_set"]
    # 判斷是否有Collection
    is_exist = checkExistCollection("equipment_set")

    if is_exist == "exist":
        get_Index = getEquipmentIndex()
        new_index = get_Index +1
    else:
        new_index =1

    mydict = {
                "index": new_index,
                "brand": request_data['brand'],
                "model": request_data['model'],
                "baudrate": request_data['baudrate'],
                "config": request_data['config'],
                "setting": request_data['setting'],
                "response": request_data['response']
            }

    x = mycol.insert_one(mydict)
    return {"status": "ok", "index":new_index}


# 刪除設備管理
# param: 以整數方式傳輸"Index"索引值
# 2023.08.21 新增
def deleteEquipment(index):
    mycol = mydb["equipment_set"]

    myquery = {"index": index}
    mycol.delete_one(myquery)

    return {"status": "ok"}


# 更新設備管理
# param: 以整數方式傳輸"Index"索引值和JSON方式傳輸 request_data
# 2023.08.21 新增
def updateEquipment(json_data, index):
    mycol = mydb["equipment_set"]

    myquery = {"index": index}
    count = mycol.count_documents(myquery)

    if count != 0:    
        newvalues = {"$set": json_data}
        mycol.update_one(myquery, newvalues)

        return {"status": "ok"}
    else:
        return {"status": "error", "commit":"dose't find index key!"}



# 裝置綁定。目前設定最高權限可以做註冊綁定
# param: 以JSON方式傳輸 request_data
# 2023.08.17 修改
def setDeviceBind(json_data):
    #request_data = json.loads(json_data)
    request_data = json_data
    mycol = mydb["register"]

    try:
        query1 = {"id": request_data['id']}
        # 更新
        if request_data['name'] != "":
            newvalues = { "$set": { "name": request_data['name'], "active":1, "equipment_index":request_data['equipment_index'] } }
        else:
            newvalues = { "$set": { "active":1, "equipment_index":request_data['equipment_index'] } }

        mycol.update_one(query1, newvalues)
        # 產生Log紀錄
        payload = {
                    "role":"user",
                    "id": "admin",
                    "msg": request_data['id']+"已完成裝置綁定。"
                  }
        #recordLog(json.dumps(payload))
        recordLog(payload)

        return {"status": "ok"}
    except:
        return {"status": "error", "commit":"The data was created fail"}



# 刪除註冊管理
# param: 以字串方式傳輸deviceid
# 2023.08.21 新增
def deleteDeviceReg(devid):
    mycol = mydb["register"]

    myquery = {"id": devid}
    mycol.delete_one(myquery)

    return {"status": "ok"}


# 更新註冊管理。這邊常變更設備綁定
# param: 以JSON方式傳輸 request_data
# 2023.08.22 新增
# 2023.08.24 修改更新欄位
def updateDeviceReg(json_data, devid):
    mycol = mydb["register"]
    myquery = {"id": devid}
    count = mycol.count_documents(myquery)

    if count != 0:    
        #newvalues = {"$set":{"name":json_data['name'], "active":json_data['active'], "equipment_index":json_data['equipment_index']}}
        newvalues = {"$set":json_data}
        mycol.update_one(myquery, newvalues)

        return {"status": "ok"}
    else:
        return {"status": "error", "commit":"dose't find index key!"}


# 下達裝置命令
# param: 以JSON方式傳輸 request_data
# 2023.08.17 新增
def execCommand(dict_data):
    mycol = mydb["cmd"]

    try:
        mycol.insert_one(dict_data)

        return {"status": "ok"}
    except:
        return {"status": "error", "commit":"The data was created fail"}


# 查詢裝置
# param: 以字串方式傳輸"deviceID"
# 2023.08.24 新增
def queryDevice(devid):
    mycol = mydb["register"]
    #print(index)
    if devid == "all":
        mydoc = mycol.find()
    else:
        myquery = {"id": devid}
        mydoc = mycol.find(myquery)
        
    Data =[]
    for x in mydoc:
        if x['active'] == 1:
            act_status = "Activate"
        else:
            act_status = "Disable"

        item = {
                 'id': x['id'],
                 'name': x['name'],
                 'active': act_status,
                 #'active': x['active'],
                 'conn_time': x['conn_time'],
                 'equipment_index': x['equipment_index']
               }
        Data.append(item)

    dataset = {'dataset':Data}
    return dataset


# 查詢裝置狀態統計
# param: 以整數方式傳輸"gid"
# 2023.09.14 新增
def statisticsDevice(gid):
    mycol = mydb["register"]
    # 統計
    if gid ==0:
        myquery = {"active": 1}
    else:
        myquery = {"group_id":gid, "active": 1}
    total = mycol.count_documents(myquery)
    # 設備開
    if gid ==0: 
        myquery1 = {"conn_status": "on", "equipment_status": "on", "active": 1}
    else:
        myquery1 = {"group_id":gid, "conn_status": "on", "equipment_status": "on", "active": 1}
        #myquery1 = {"group_id":gid, "equipment_status": "on", "active": 1}

    opencount = mycol.count_documents(myquery1)
    # 設備關
    if gid ==0:
        myquery2 = {"conn_status": "on", "equipment_status":"off", "active": 1}
        # myquery2 = {"$or":[{"equipment_status":{"$exists": False}}, {"equipment_status":"off"}], "active": 1}
        # myquery2 = {"equipment_status": "off", "active": 1}
    else:
        myquery2 = {"conn_status": "on", "equipment_status":"off", "active": 1, "group_id":gid}
        # myquery2 = {"$or":[{"equipment_status":{"$exists": False}}, {"equipment_status":"off"}], "active": 1, "group_id":gid}
        # myquery2 = {"group_id":gid, "equipment_status": "off", "active": 1}

    closecount = mycol.count_documents(myquery2)
    # 連線
    if gid ==0:
        myquery3 = {"conn_status": "on", "active": 1}
    else:
        myquery3 = {"group_id":gid, "conn_status": "on", "active": 1}
    
    conncount = mycol.count_documents(myquery3)
    # 離線
    if gid ==0:
        myquery4 = {"$or":[{"conn_status":{"$exists": False}}, {"conn_status":"off"}], "active": 1}
        #myquery4 = {"conn_status": "on"}
    else:
        myquery4 = {"$or":[{"conn_status":{"$exists": False}}, {"conn_status":"off"}], "active": 1, "group_id":gid}
        # myquery4 = {"group_id":gid, "conn_status": "on"}
    
    disconncount = mycol.count_documents(myquery4)

    data = {
             "total": total,
             "opencount": opencount,
             "closecount": closecount,
             "conncount": conncount,
             "disconncount": disconncount
           }

    return data


# 查詢群組列表
# 2023.09.13 新增
def getGroupList():
    mycol = mydb["group"]

    mydoc = mycol.find()

    Data =[]
    for x in mydoc:
        item = {
                 'g_id': x['g_id'],
                 'name': x['name']
               }
        Data.append(item)

    dataset = {'group':Data}
    return dataset


# 查詢裝置
# param: 以字串方式傳輸"Groupid"
# 2023.09.14 新增
def queryGroupDevice(gid):
    mycol = mydb["register"]
    #print(index)
    if gid == 0:
        myquery = {"active": 1}
        mydoc = mycol.find(myquery)
    else:
        myquery = {"group_id": gid, "active": 1}
        mydoc = mycol.find(myquery)
        
    Data =[]
    for x in mydoc:
        keylist = list(x.keys())
        # 連線狀態
        if keylist.count('conn_status') != 0 and x['conn_status'] == "on": # Power Meter
            conn_status = "on"
        else:
            conn_status = "off"

        # 設備狀態
        if keylist.count('equipment_status') != 0 and x['equipment_status'] == "on": # Power Meter
            equipment_status = "on"
        else:
            equipment_status = "off"

        item = {
                 'id': x['id'],
                 'name': x['name'],
                 #'active': act_status,
                 #'active': x['active'],
                 'conn_status': conn_status,
                 'equipment_status': equipment_status
               }
        Data.append(item)

    dataset = {'dataset':Data}
    return dataset






# 測試 - 查詢裝置
# param: 以整數方式傳輸"num"
# 2023.09.14 新增
def generateDeviceJson(num):
    Data =[]
    for i in range(num):
        active = random.randint(0,1)  # 是否啟動
        now = datetime.datetime.now() # 現在時間 (時間戳)
        equipment_index = random.randint(0,8) # 設備註冊
        
        if len(i) == 1:
            number = "0"+str(i)
        else:
            number = str(i)

        item = {
                "id": "3F0D"+str(i),
                "name": "3F0D"+str(i),
                "conn_status": "on",
                "equipment_status": "off",
                "conn_status": "off"
               }

        Data.append(item)

    with open('', "w") as file:
                 json.dump(item, file)

    dataset = {'status':'ok', 'dataset':Data}

