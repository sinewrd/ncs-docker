import os, datetime, time
import requests, json, pymongo, re

from datetime import timedelta
import pandas as pd
from bson.objectid import ObjectId # 2023.12.26 新增

# 全域變數 - DB
mongo_host = os.environ.get('MONGO_HOST')
mongo_port = int(os.environ.get('MONGO_PORT'))
mongo_db = os.environ.get('MONGO_DB')
mongo_username = os.environ.get('MONGO_USERNAME')
mongo_password = os.environ.get('MONGO_PASSWORD')

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
# 2023.10.31 更新。增加判斷collection
def getEquipmentIndex(type):
    if type == "equipment":
        mycol = mydb["equipment_set"]
    elif type == "zone":
        mycol = mydb["zone"]
    elif type == "group":
        mycol = mydb["group"]
    elif type == "account":
        mycol = mydb["account"]

    dataset = mycol.find({}).sort('index', -1)
    query_data = next(dataset)

    return query_data['index']


# 取出裝置Power Meter
# param: 以JSON方式傳輸 request_data
# 2023.08.24 新增
# 2023.09.18 更新。增加判斷是否傳送開始和結束時間
# 2023.09.23 新增。取出裝置統計值
# 2023.09.25 更新。只取出Raw Data
# 2023.09.25 更新。移除conn_status 和 equipment_status
def getRawData(json_data):
    request_data = json_data
    keylist = list(request_data.keys())

    mycol = mydb["power_meter"]

    nowDateTime = datetime.datetime.now()
    nowdatetime = nowDateTime.timestamp()  # 現在時間戳記
    print(nowdatetime)
    # now = datetime.now()
    prevhours = nowDateTime - timedelta(hours=1)  # 1變數
    print(prevhours.timestamp())

    myquery = {"id": request_data['id'], "datetime": {"$lte": nowdatetime, "$gte": prevhours.timestamp()}}
    mydoc = mycol.find(myquery)
    Data = []
    for x in mydoc:
        struct_time = time.localtime(x['datetime'])  # 轉成時間元組
        timeString = time.strftime("%Y-%m-%d %H:%M:%S", struct_time)  # 轉成字串
        item = {
            'datetime': timeString,
            'pw1': x['pw1'],
            'cu1': x['cu1'],
            'wh1': x['wh1']
        }
        Data.append(item)

    dataset = {'dataset': Data}  # 正式
    # dataset = {'dataset': Data, 'conn_status': query_data['conn_status'], 'equipment_status': query_data['equipment_status']} # 正式
    return dataset


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


# 查詢裝置統計
# param: 以字串方式傳輸"devid" DeviceID
# 2023.08.28 新增
def SatisticsUsage(devid, start, end):
    mycol = mydb["statistics_device_day"]

    if devid == 'all':
        mydoc = mycol.find()
    else:
        myquery = {"id": devid, "date": {"$lte": end, "$gte": start}}
        mydoc = mycol.find(myquery)

    Data = []
    for x in mydoc:
        item = {
            'date': x['date'],
            'id': x['id'],
            'usage': x['usage'],
            'addwh': round(x['addwh'] / 1000, 2)
        }
        Data.append(item)

    dataset = {'dataset': Data}
    return dataset


# 查詢設備控制碼
# param: 以整數方式傳輸"Index"索引值
# 2023.08.24 新增
def queryEquipment(index):
    mycol = mydb["equipment_set"]
    # print(index)
    if index == 0:
        mydoc = mycol.find()
    else:
        myquery = {"index": index}
        mydoc = mycol.find(myquery)

    Data = []
    for x in mydoc:
        item = {
            'index': x['index'],
            'brand': x['brand'],
            'model': x['model'],
            'baudrate': x['baudrate'],
            'config': x['config'],
            'setting': x['setting'],
            #'response': x['response']
        }
        Data.append(item)

    # count = mycol.count_documents(mycol.find({}))
    dataset = {'dataset': Data}
    return dataset


# 查詢設備控制碼
# param: 以整數方式傳輸"Index"索引值
# 2023.08.24 新增
def queryEquipment(index):
    mycol = mydb["equipment_set"]
    # print(index)
    if index == 0:
        mydoc = mycol.find()
    else:
        myquery = {"index": index}
        # objInstance = ObjectId(index)
        # myquery = {"_id": objInstance}
        mydoc = mycol.find(myquery)

    Data = []
    for x in mydoc:
        # objInstance = ObjectId(x['_id'])
        item = {
            'index': x['index'],
            # 'index': str(objInstance),
            'brand': x['brand'],
            'model': x['model'],
            'baudrate': x['baudrate'],
            'config': x['config'],
            'setting': x['setting'],
            # 'response': x['response']
        }
        Data.append(item)

    # count = mycol.count_documents(mycol.find({}))
    dataset = {'dataset': Data}
    return dataset


# 2023.12.26 修正。修改Index 值。修改取ObjectID
# 2023.12.27 修正。字串格式
# 2023.12.28 修正。字串格式
# param : index 是ObjectID
def queryEquipmentList(index):
    mycol = mydb["equipment_set"]
    # print(index)
    if index == "all" or index == "0":
        mydoc = mycol.find()
    else:
        #myquery = {"index": index}
        objInstance = ObjectId(index)
        myquery = {"_id": objInstance}
        mydoc = mycol.find(myquery)

    Data = []
    for x in mydoc:
        objInstance = ObjectId(x['_id'])
        item = {
            #'index': x['index'],
            'index': str(objInstance),
            'brand': x['brand'],
            'model': x['model'],
            'baudrate': x['baudrate'],
            'config': x['config'],
            'setting': x['setting'],
            # 'response': x['response']
        }
        Data.append(item)

    # count = mycol.count_documents(mycol.find({}))
    dataset = {'dataset': Data}
    return dataset


# 新增各廠牌電視控制碼
# param: 以JSON方式傳輸 request_data
# 2023.08.17 修改
# 2023.08.21 修改。新增輸出 Index 索引值
# 2023.11.20 修改。拿掉response
# 2023.12.22 修正。Equipment 全都沒有的時候
def setControlCode(json_data):
    # request_data = json.loads(json_data)
    request_data = json_data
    mycol = mydb["equipment_set"]
    # 判斷是否有Collection
    is_exist = checkExistCollection("equipment_set")

    myquery = {}
    count = mycol.count_documents(myquery)

    if is_exist == "exist" and count != 0:
        get_Index = getEquipmentIndex('equipment')
        new_index = get_Index + 1
    else:
        new_index = 1

    mydict = {
        "index": new_index,
        "brand": request_data['brand'],
        "model": request_data['model'],
        "baudrate": request_data['baudrate'],
        "config": request_data['config'],
        "setting": request_data['setting'],
        #"response": request_data['response']
    }

    x = mycol.insert_one(mydict)
    statistics = statisticsEquipment()
    return {"status": "ok", "index": new_index, "total": statistics['total']}


# 新增Zone
# param: 以JSON方式傳輸 request_data
# 2023.10.31 新增
# 2023.12.22 修正。Zone 全都沒有的時候
def createZone(json_data):
    mycol = mydb["zone"]
    is_exist = checkExistCollection("zone")

    myquery = {}
    count = mycol.count_documents(myquery)

    if is_exist == "exist" and count != 0:
        get_Index = getEquipmentIndex('zone')
        new_index = get_Index + 1
    else:
        new_index = 1

    mydict = {
        "index": new_index,
        "zone": json_data['name']
    }

    x = mycol.insert_one(mydict)
    return {"status": "ok", "index": new_index}


# 新增Group
# param: 以JSON方式傳輸 request_data
# 2023.10.31 新增
# 2023.12.22 修正。Group 全都沒有的時候
def createGroup(json_data):
    mycol = mydb["group"]
    is_exist = checkExistCollection("group")

    myquery = {}
    count = mycol.count_documents(myquery)

    if is_exist == "exist" and count != 0:
        get_Index = getEquipmentIndex('group')
        new_index = get_Index + 1
    else:
        new_index = 1

    mydict = {
        "index": new_index,
        "name": json_data['name']
    }

    x = mycol.insert_one(mydict)
    return {"status": "ok", "index": new_index}


# 更新Zone
# param: 以整數方式傳輸"Index"索引值和JSON方式傳輸 request_data
# 2023.10.31 新增
def updateZone(json_data, index):
    mycol = mydb["zone"]

    myquery = {"index": index}
    count = mycol.count_documents(myquery)

    if count != 0:
        newvalues = {"$set": json_data}
        mycol.update_one(myquery, newvalues)

        return {"status": "ok"}
    else:
        return {"status": "error", "commit": "dose't find index key!"}


# 更新Zone
# param: 以整數方式傳輸"Index"索引值和JSON方式傳輸 request_data
# 2023.10.31 新增
def updateGroup(json_data, index):
    mycol = mydb["group"]

    myquery = {"index": index}
    count = mycol.count_documents(myquery)

    if count != 0:
        newvalues = {"$set": json_data}
        mycol.update_one(myquery, newvalues)

        return {"status": "ok"}
    else:
        return {"status": "error", "commit": "dose't find index key!"}


# 刪除Zone
# param: 以整數方式傳輸"Index"索引值
# 2023.08.21 新增
def deleteZone(index):
    mycol = mydb["zone"]

    myquery = {"index": index}
    mycol.delete_one(myquery)

    return {"status": "ok"}


# 刪除Zone
# param: 以整數方式傳輸"Index"索引值
# 2023.08.21 新增
def deleteGroup(index):
    mycol = mydb["group"]

    myquery = {"index": index}
    mycol.delete_one(myquery)

    return {"status": "ok"}


# 刪除設備管理
# param: 以整數方式傳輸"Index"索引值
# 2023.08.21 新增
def deleteEquipment(index):
    mycol = mydb["equipment_set"]

    myquery = {"index": index}
    mycol.delete_one(myquery)

    statistics = statisticsEquipment()
    return {"status": "ok", "total": statistics['total']}


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

        statistics = statisticsEquipment()
        return {"status": "ok", "total": statistics['total']}
    else:
        return {"status": "error", "commit": "dose't find index key!"}


# 裝置綁定。目前設定最高權限可以做註冊綁定
# param: 以JSON方式傳輸 request_data
# 2023.08.17 修改
# 2023.10.02 修改
# 2023.11.01 新增。輸出裝置管理統計
# 2023.12.07/08 修改訊息
def setDeviceBind(json_data):
    # request_data = json.loads(json_data)
    request_data = json_data
    # print(request_data)
    mycol = mydb["register"]

    try:
        query1 = {"id": request_data['id']}
        # 更新
        """
        if request_data['name'] != "":
            newvalues = { "$set": { "name": request_data['name'], "active":1, "equipment_index":request_data['equipment_index'] } }
        else:
        """
        newvalues = {
            "$set": {"active": 1, "name": request_data['name'], "equipment_index": request_data['equipment_index'],
                     "zone_id": request_data['zone_id'], "group_id": request_data['group_id']}}
        mycol.update_one(query1, newvalues)

        # 統計
        statistics = statisticsDevice2(0)  # 統計數量, 回傳值為字典型態
        # paire Equipment
        Equipment = queryEquipment(request_data['equipment_index'])
        # 產生Log紀錄
        if request_data['equipment_index'] == 0:
            msg = request_data['id'] + " is connected, but not paired any equipments."
        else:
            if request_data['type'] == "reg":
                # msg = request_data['id']+" is connected。"
                msg = request_data['id'] + " is paired with " + Equipment['dataset'][0]['brand'] + " " + \
                      Equipment['dataset'][0]['model']
            else:
                msg = request_data['id'] + " is updated。"
            # msg = "(" + request_data['id'] + ") The Device Updated Completed。"
        payload = {
            "role": "user",
            "id": request_data['username'],
            "msg": msg,
            "category": 2
        }
        # recordLog(json.dumps(payload))
        recordLog(payload)

        return {"status": "ok", "total": statistics['total'], "reg": statistics['reg'], "unreg": statistics['unreg']}
    except:
        return {"status": "error", "commit": "The data was created fail"}


# 刪除註冊管理
# param: 以字串方式傳輸deviceid
# 2023.08.21 新增
# 2023.12.07 新增Log紀錄
def deleteDeviceReg(devid, username):
    mycol = mydb["register"]

    myquery = {"id": devid}
    mycol.delete_one(myquery)
    # Log紀錄
    payload = {
        "role": "user",
        "id": username,
        "msg": "The Device - "+devid+" was deleted!",
        "category": 2
    }
    recordLog(payload)

    # 統計
    statistics = statisticsDevice2(0)  # 統計數量, 回傳值為字典型態
    return {"status": "ok", "total": statistics['total'], "reg": statistics['reg'], "unreg": statistics['unreg']}


# 更新註冊管理。這邊常變更設備綁定
# param: 以JSON方式傳輸 request_data
# 2023.08.22 新增
# 2023.08.24 修改更新欄位
def updateDeviceReg(json_data, devid):
    mycol = mydb["register"]
    myquery = {"id": devid}
    count = mycol.count_documents(myquery)

    if count != 0:
        # newvalues = {"$set":{"name":json_data['name'], "active":json_data['active'], "equipment_index":json_data['equipment_index']}}
        newvalues = {"$set": json_data}
        mycol.update_one(myquery, newvalues)

        return {"status": "ok"}
    else:
        return {"status": "error", "commit": "dose't find index key!"}


# 查詢裝置搭配的設備
# 2023.09.16 新增
# 2023.12.28 新增配置條件
def checkEquipmentBind(devid):
    mycol = mydb["register"]

    myquery = {"id": devid, "active": 1}  # 2023.09.20 增加判斷是否有綁定
    query_data = mycol.find_one(myquery)

    if query_data['equipment_index'] != "0" and query_data['equipment_index'] != 0:
        mycol1 = mydb["equipment_set"]
        #myquery1 = {"index": query_data['equipment_index']}
        objInstance = ObjectId(query_data['equipment_index'])
        myquery1 = {"_id": objInstance}
        count = mycol1.count_documents(myquery1)

        if count > 0:
            # if count > 0:
            return True
        else:
            return False
    else:
        return False


# 下達裝置命令
# param: 以JSON方式傳輸 request_data
# 2023.08.17 新增
# 2023.09.16 新增驗証是否有設備綁定
# 2023.09.20 新增 Log紀錄表
# 2023.12.28 修改Equipment Index 值。改為Object ID
def execCommand(dict_data):
    mycol = mydb["cmd"]

    try:
        request_data = dict_data
        #print(dict_data)
        if checkEquipmentBind(dict_data['id']) == True:
            dict_data_1 = {"id": dict_data['id'], "action": dict_data['action'], "set": dict_data['set']}
            mycol.insert_one(dict_data_1)
            equipment_index = getDeviceInfo(dict_data['id'], 'equipment')
            Equipment = queryEquipmentList(equipment_index)
            # Equipment = queryEquipment(equipment_index)
            # Log
            if dict_data['action'] == 'on':
                message = Equipment['dataset'][0]['brand'] + " " + Equipment['dataset'][0]['model'] + " power on"
                # message = "The Equipment was startup with device -"+dict_data['id']
            else:
                message = Equipment['dataset'][0]['brand'] + " " + Equipment['dataset'][0]['model'] + " power off"
                # message = "The Equipment was showdown with device -"+dict_data['id']

            dict_data_msg = {
                'id': dict_data['username'],
                'role': 'user',
                'msg': message,
                'category': 3
            }
            recordLog(dict_data_msg)
            return {"status": "ok"}
        else:
            dict_data_msg = {
                'id': dict_data['id'],
                'role': 'user',
                'msg': 'The device is not paired with a equipment',
                'category': 3
            }
            recordLog(dict_data_msg)
            return {"status": "error", "commit": "The device is not paired with a equipment"}
    except:
        dict_data_msg = {
            'id': dict_data['id'],
            'role': 'unknow',
            'msg': 'commit": "The device not registered',
            'category': 3
        }
        recordLog(dict_data_msg)
        return {"status": "error", "commit": "The device not registered"}


# 查詢裝置
# param: 以字串方式傳輸"deviceID"
# 2023.08.24 新增
def queryDevice(devid):
    mycol = mydb["register"]
    # print(index)
    if devid == "all":
        mydoc = mycol.find()
    else:
        myquery = {"id": devid}
        mydoc = mycol.find(myquery)

    Data = []
    for x in mydoc:
        if "group_id" in x:
            groupId = x['group_id']
        else:
            groupId = 0

        item = {
            'id': x['id'],
            'name': x['name'],
            'active': x['active'],
            # 'active': x['active'],
            'conn_time': x['conn_time'],
            'equipment_index': x['equipment_index'],
            'group_id': groupId,
            'zone_id': x['zone_id']
        }
        Data.append(item)

    dataset = {'dataset': Data}
    return dataset


# 查詢裝置狀態統計
# param: 以整數方式傳輸"gid"
# 2023.09.14 新增
def statisticsDevice(gid):
    mycol = mydb["register"]
    # 統計
    if gid == 0:
        myquery = {"active": 1}
    else:
        myquery = {"group_id": gid, "active": 1}
    total = mycol.count_documents(myquery)
    # 設備開
    if gid == 0:
        myquery1 = {"conn_status": "on", "equipment_status": "on", "active": 1}
    else:
        myquery1 = {"group_id": gid, "conn_status": "on", "equipment_status": "on", "active": 1}

    opencount = mycol.count_documents(myquery1)
    # 設備關
    if gid == 0:
        myquery2 = {"conn_status": "on", "equipment_status": "off", "active": 1}
        # myquery2 = {"$or":[{"equipment_status":{"$exists": False}}, {"equipment_status":"off"}], "active": 1}
        # myquery2 = {"equipment_status": "off", "active": 1}
    else:
        myquery2 = {"conn_status": "on", "equipment_status": "off", "active": 1, "group_id": gid}
        # myquery2 = {"$or":[{"equipment_status":{"$exists": False}}, {"equipment_status":"off"}], "active": 1, "group_id":gid}
        # myquery2 = {"group_id":gid, "equipment_status": "off", "active": 1}

    closecount = mycol.count_documents(myquery2)
    # 連線
    if gid == 0:
        myquery3 = {"conn_status": "on", "active": 1}
    else:
        myquery3 = {"group_id": gid, "conn_status": "on", "active": 1}

    conncount = mycol.count_documents(myquery3)
    # 離線
    if gid == 0:
        myquery4 = {"$or": [{"conn_status": {"$exists": False}}, {"conn_status": "off"}], "active": 1}
        # myquery4 = {"conn_status": "on"}
    else:
        myquery4 = {"$or": [{"conn_status": {"$exists": False}}, {"conn_status": "off"}], "active": 1, "group_id": gid}
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


# 查詢裝置狀態統計
# param: 以整數方式傳輸"zone_id"
# 2023.10.24 新增
# 2023.12.07 更新。修改設備關統計
def statisticsDevice1(zone_id):
    mycol = mydb["register"]
    # 統計
    if zone_id == 0:
        myquery = {"active": 1}
    else:
        myquery = {"zone_id": zone_id, "active": 1}
    total = mycol.count_documents(myquery)
    # 設備開
    if zone_id == 0:
        myquery1 = {"conn_status": "on", "equipment_status": "on", "active": 1}
    else:
        myquery1 = {"zone_id": zone_id, "conn_status": "on", "equipment_status": "on", "active": 1}

    opencount = mycol.count_documents(myquery1)
    # 設備關
    if zone_id == 0:
        # myquery2 = {"conn_status": "on", "equipment_status": "off", "active": 1}
        myquery2 = {"$or":[{"equipment_status":{"$exists": False}}, {"equipment_status":"off"}], "conn_status": "on", "active": 1}
        # myquery2 = {"equipment_status": "off", "active": 1}
    else:
        # myquery2 = {"conn_status": "on", "equipment_status": "off", "active": 1, "zone_id": zone_id}
        myquery2 = {"$or":[{"equipment_status":{"$exists": False}}, {"equipment_status":"off"}], "conn_status": "on", "active": 1, "zone_id": zone_id}
        # myquery2 = {"group_id":gid, "equipment_status": "off", "active": 1}

    closecount = mycol.count_documents(myquery2)
    # 連線
    if zone_id == 0:
        myquery3 = {"conn_status": "on", "active": 1}
    else:
        myquery3 = {"zone_id": zone_id, "conn_status": "on", "active": 1}

    conncount = mycol.count_documents(myquery3)
    # 離線
    if zone_id == 0:
        myquery4 = {"$or": [{"conn_status": {"$exists": False}}, {"conn_status": "off"}], "active": 1}
        # myquery4 = {"conn_status": "on"}
    else:
        myquery4 = {"$or": [{"conn_status": {"$exists": False}}, {"conn_status": "off"}], "active": 1,
                    "zone_id": zone_id}
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


# 查詢裝置狀態統計 - 頁面
# param: 以整數方式傳輸"zone_id"
# 2023.10.30 新增
def statisticsDevice2(zone_id):
    mycol = mydb["register"]
    # 統計
    if zone_id == 0:
        myquery = {}
    else:
        myquery = {"zone_id": zone_id}
    total = mycol.count_documents(myquery)
    # register
    if zone_id == 0:
        myquery1 = {"active": 1}
    else:
        myquery1 = {"zone_id": zone_id, "active": 1}

    reg = mycol.count_documents(myquery1)
    # unregister
    if zone_id == 0:
        myquery2 = {"active": 0}
    else:
        myquery2 = {"zone_id": zone_id, "active": 0}

    unreg = mycol.count_documents(myquery2)
    data = {
        "total": total,
        "reg": reg,
        "unreg": unreg,
    }

    return data


# 查詢設備統計 - 頁面
# 2023.10.31 新增
def statisticsEquipment():
    mycol = mydb["equipment_set"]

    myquery = {}
    total = mycol.count_documents(myquery)
    data = {
        "total": total
    }

    return data


# 查詢Zone/Group統計 - 頁面
# 2023.11.02 新增
def statisticsGroup(type):
    if type == "zone":
        mycol = mydb["zone"]
    elif type == "group":
        mycol = mydb["group"]
    elif type == "account":
        mycol = mydb["account"]
    elif type == "log":
        mycol = mydb["log"]

    myquery = {}
    total = mycol.count_documents(myquery)
    data = {
        "total": total
    }

    return data


# 查詢群組列表
# 2023.09.13 新增
# 2023.10.25 修改有加入參數
def getGroupList(gid):
    mycol = mydb["group"]

    if gid == 0:
        mydoc = mycol.find()
    else:
        myquery = {"index": gid}
        mydoc = mycol.find(myquery)

    Data = []
    for x in mydoc:
        item = {
            'index': x['index'],
            'name': x['name']
        }
        Data.append(item)

    dataset = {'group': Data}
    return dataset



# 2023.12.26 修正。修改Index 值。修改取ObjectID
# 2023.12.27/28 修正。修改gid 預設值
def getGroupIDList(gid):
    mycol = mydb["group"]
    #print(gid)
    if gid == "all" or gid == "0":
        mydoc = mycol.find()
    else:
        #myquery = {"index": gid}
        objInstance = ObjectId(gid)
        myquery = {"_id": objInstance}
        mydoc = mycol.find(myquery)

    Data =[]
    for x in mydoc:
        objInstance = ObjectId(x['_id'])
        item = {
                 #'index': x['index'],
                 'index': str(objInstance),
                 'name': x['name']
               }
        Data.append(item)

    dataset = {'group': Data}
    return dataset



# 查詢群組列表
# 2023.09.13 新增
# 2023.11.03 新增
# 2023.12.01 修改。移除nickname
# 2023.12.22 修正。不顯示"sinew"帳號
def getAccountList(uid):
    mycol = mydb["account"]

    if uid == 0:
        myquery = {"username": {"$not": {"$regex": "sinew"}}}
    else:
        #objInstance = ObjectId(uid)
        #myquery = {"_id": objInstance}
        myquery = {"index": uid}

    mydoc = mycol.find(myquery)

    Data = []
    for x in mydoc:
        item = {
            'index': x['index'],
            'username': x['username'],
            #'name': x['name'],
            'password': x['password']
        }
        Data.append(item)

    dataset = {'account': Data}
    return dataset


# Vaild Username
# 查詢Zone/Group統計 - 頁面
# 2023.11.02 新增
def vaildAccount(username):
    mycol = mydb["account"]

    myquery = {"username": username}
    total = mycol.count_documents(myquery)
    data = {
        "total": total
    }

    return data


# 新增帳號
# 2023.11.03 新增
# 2023.12.01 修改。移除nickname
def createAccount(json_data):
    mycol = mydb["account"]

    is_exist = checkExistCollection("account")
    print(is_exist)
    if is_exist == "exist":
        get_Index = getEquipmentIndex('account')
        new_index = get_Index + 1
    else:
        new_index = 1

    mydict = {
        "index": new_index,
        "username": json_data['username'],
        #"name": json_data['name'],
        "password": json_data['password']
    }
    x = mycol.insert_one(mydict)
    return {"status": "ok", "index": new_index}


# 更新Account
# param: 以整數方式傳輸"Index"索引值和JSON方式傳輸 request_data
# 2023.11.03 新增
def updateAccount(json_data, index):
    mycol = mydb["account"]

    myquery = {"index": index}
    #objInstance = ObjectId(index)
    #myquery = {"_id": objInstance}
    count = mycol.count_documents(myquery)

    if count != 0:
        newvalues = {"$set": json_data}
        mycol.update_one(myquery, newvalues)

        return {"status": "ok"}
    else:
        return {"status": "error", "commit": "dose't find index key!"}


# 刪除Zone
# param: 以整數方式傳輸"Index"索引值
# 2023.08.21 新增
def deleteAccount(index):
    mycol = mydb["account"]

    myquery = {"index": index}
    #objInstance = ObjectId(index)
    #myquery = {"_id": objInstance}
    mycol.delete_one(myquery)

    return {"status": "ok"}


# 查詢群組列表
# 2023.09.13 新增
# 2023.10.25 修改有加入參數
def getZoneList(gid):
    mycol = mydb["zone"]

    if gid == 0:
        mydoc = mycol.find()
    else:
        myquery = {"index": gid}
        #objInstance = ObjectId(uid)
        #myquery = {"_id": objInstance}
        mydoc = mycol.find(myquery)

    Data = []
    for x in mydoc:
        #objInstance = ObjectId(x['_id'])
        item = {
            'index': x['index'],
            'zone': x['zone']
        }
        Data.append(item)

    dataset = {'group': Data}
    return dataset


# 2023.12.26 修正。修改Index 值。修改取ObjectID
# 2023.12.26 修正。字串格式
# 2023.12.27/28 修正。字串格式
def getZoneIDList(gid):
    mycol = mydb["zone"]
    #print(gid)
    if gid == "all" or gid == "0":
        mydoc = mycol.find()
    else:
        objInstance = ObjectId(gid)
        myquery = {"_id": objInstance}
        #myquery = {"index": gid}
        mydoc = mycol.find(myquery)

    Data =[]
    for x in mydoc:
        objInstance1 = ObjectId(x['_id'])
        item = {
                 #'index': x['index'],
                 'index': str(objInstance1),
                 'zone': x['zone']
               }
        Data.append(item)

    dataset = {'group': Data}
    return dataset


# 查詢裝置
# param: 以字串方式傳輸"Groupid"
# 2023.09.14 新增
def queryGroupDevice(gid):
    mycol = mydb["register"]
    # print(index)
    if gid == 0:
        myquery = {"active": 1}
        mydoc = mycol.find(myquery)
    else:
        myquery = {"group_id": gid, "active": 1}
        mydoc = mycol.find(myquery)

    Data = []
    for x in mydoc:
        keylist = list(x.keys())
        # 連線狀態
        if keylist.count('conn_status') != 0 and x['conn_status'] == "on":  # Power Meter
            conn_status = "on"
        else:
            conn_status = "off"

        # 設備狀態
        if keylist.count('equipment_status') != 0 and x['equipment_status'] == "on":  # Power Meter
            equipment_status = "on"
        else:
            equipment_status = "off"

        # if keylist.count('group_id') != 0:
        if "group_id" in x:
            groupId = x['group_id']
        else:
            groupId = 0

        item = {
            'id': x['id'],
            'name': x['name'],
            # 'active': act_status,
            'active': x['active'],
            'conn_status': conn_status,
            'equipment_status': equipment_status,
            'equipment_index': x['equipment_index'],
            'group_id': groupId
        }
        Data.append(item)

    dataset = {'dataset': Data}
    return dataset


# 查詢裝置
# param: 以字串方式傳輸"Zoneid", 字串方式傳輸"type": dashboard/device
# 2023.10.25 新增
# 2023.10.31 更新。群組查詢。
# 2023.11.27 更新。新增ip。
# 2023.11.29 更新。新增群組名稱。
# 2023.12.07 更新。修改standby。
def queryGroupDevice1(gid, type):
    mycol = mydb["register"]
    # print(index)
    if gid == 0:
        if type == 'dashboard':
            myquery = {"active": 1}
        else:
            myquery = {}
        mydoc = mycol.find(myquery)
    else:
        if type == 'dashboard':
            myquery = {"zone_id": gid, "active": 1}
        else:
            myquery = {"zone_id": gid}
        mydoc = mycol.find(myquery)

    Data = []
    for x in mydoc:
        keylist = list(x.keys())
        # 連線狀態
        if keylist.count('conn_status') != 0 and x['conn_status'] == "on":  # Power Meter
            conn_status = "on"
        else:
            conn_status = "off"

        # 設備狀態
        if keylist.count('equipment_status') != 0 and x['equipment_status'] == "on":  # Power Meter
            equipment_status = "on"
        else:
            equipment_status = "off"

        # if keylist.count('group_id') != 0:
        # Zone
        zoneName =''
        if "zone_id" in x:
            groupId = x['zone_id']
            z_name = getZoneList(int(groupId))
            if groupId != 0 and len(z_name['group']) != 0:
                zoneName = z_name['group'][0]['zone']
            else:
                zoneName = 'none'
        else:
            groupId = 0
            zoneName = 'none'

        # Group
        groupName = ''
        if "group_id" in x:
            g_name = getGroupList(x['group_id'])
            if x['group_id'] != 0 and len(g_name['group']) != 0:
                groupName = g_name['group'][0]['name']
            else:
                groupName = 'none'
        else:
            groupName = 'none'

        #print( x['equipment_index'] )
        # Equipment
        Equipment = queryEquipment(x['equipment_index'])
        equipmentName = ''
        if x['equipment_index'] != 0 and len(Equipment['dataset']) != 0:
            equipmentName = Equipment['dataset'][0]['brand'] + ' - ' +Equipment['dataset'][0]['model']
        else:
            equipmentName = 'none'

        # IP
        if "ip" in x:
            ip = x['ip']
        else:
            ip = "0.0.0.0"

        item = {
            'id': x['id'],
            'name': x['name'],
            # 'active': act_status,
            'active': x['active'],
            'conn_status': conn_status,
            'equipment_status': equipment_status,
            'equipment_index': x['equipment_index'],
            'equipment_name': equipmentName,
            'zone_id': groupId,
            'zone_name': zoneName,
            'group_id': x['group_id'],
            'group_name': groupName,
            'ip': ip
        }
        Data.append(item)

    if type == 'dashboard':
        # 統計數量, 回傳值為字典型態
        statistics = statisticsDevice1(gid)
        dataset = {'dataset': Data,
                   "total": statistics['total'],
                   "open": statistics['opencount'],
                   "close": statistics['closecount'],
                   "conn": statistics['conncount'],
                   "standby": statistics['closecount'],
                   "disconn": statistics['disconncount']}
    else:
        dataset = {'dataset': Data}
    return dataset
"""
def queryGroupDevice1(gid, type):
    mycol = mydb["register"]
    # print(index)
    if gid == 0:
        if type == 'dashboard':
            myquery = {"active": 1}
        else:
            myquery = {}
        mydoc = mycol.find(myquery)
    else:
        if type == 'dashboard':
            myquery = {"zone_id": gid, "active": 1}
        else:
            myquery = {"zone_id": gid}
        mydoc = mycol.find(myquery)

    Data = []
    for x in mydoc:
        keylist = list(x.keys())
        # 連線狀態
        if keylist.count('conn_status') != 0 and x['conn_status'] == "on":  # Power Meter
            conn_status = "on"
        else:
            conn_status = "off"

        # 設備狀態
        if keylist.count('equipment_status') != 0 and x['equipment_status'] == "on":  # Power Meter
            equipment_status = "on"
        else:
            equipment_status = "off"

        # if keylist.count('group_id') != 0:
        if "zone_id" in x:
            groupId = x['zone_id']
        else:
            groupId = 0

        if "ip" in x:
            ip = x['ip']
        else:
            ip = "0.0.0.0"

        item = {
            'id': x['id'],
            'name': x['name'],
            # 'active': act_status,
            'active': x['active'],
            'conn_status': conn_status,
            'equipment_status': equipment_status,
            'equipment_index': x['equipment_index'],
            'zone_id': groupId,
            'group_id': x['group_id'],
            'ip': ip
        }
        Data.append(item)

    dataset = {'dataset': Data}
    return dataset
"""

# 2023.12.27/28 修正。修改Index 值。修改取ObjectID
# 2024.01.02 新增輸出時間
def queryGroupDevice2(gid, type):
    mycol = mydb["register"]

    if type == "device" and gid == "all":
        myquery = {}
    elif type == "dashboard" and gid == "all":
        myquery = {"active": 1}
    elif type == "device" and gid != "all":
        myquery = {"zone_id": gid}
    elif type == "dashboard" and gid != "all":
        myquery = {"zone_id": gid, "active": 1}

    mydoc = mycol.find(myquery)

    Data = []
    for x in mydoc:
        # print(x)
        keylist = list(x.keys())
        # 連線狀態
        if keylist.count('conn_status') != 0 and x['conn_status'] == "on":  # Power Meter
            conn_status = "on"
        else:
            conn_status = "off"

        # 設備狀態
        if keylist.count('equipment_status') != 0 and x['equipment_status'] == "on":  # Power Meter
            equipment_status = "on"
        else:
            equipment_status = "off"

        # if keylist.count('group_id') != 0:
        #groupId = x['zone_id']
        # Zone
        zoneName = ''
        if "zone_id" in x:
            if x['zone_id'] != 0:
                groupId = x['zone_id']
            else:
                groupId = "all"
            # z_name = getZoneList(int(groupId))
            z_name = getZoneIDList(groupId)
            if x['zone_id'] != 0 and x['zone_id'] != "0" and len(z_name['group']) != 0:
                zoneName = z_name['group'][0]['zone']
            else:
                zoneName = 'none'
        else:
            groupId = 0
            zoneName = 'none'

        # Group
        groupName = ''
        if "group_id" in x:
            # g_name = getGroupList(x['group_id'])
            if x['group_id'] != 0:
                g_name = getGroupIDList(x['group_id'])
            else:
                g_name = getGroupIDList('all')

            if x['group_id'] != 0 and x['group_id'] != "0" and len(g_name['group']) != 0:
                groupName = g_name['group'][0]['name']
            else:
                groupName = 'none'
        else:
            groupName = 'none'

        # print( x['equipment_index'] )
        # Equipment
        # Equipment = queryEquipment(x['equipment_index'])
        if x['equipment_index'] != 0:
            Equipment = queryEquipmentList(x['equipment_index'])
        else:
            Equipment = queryEquipmentList('all')
        equipmentName = ''
        if x['equipment_index'] != 0 and x['equipment_index'] != "0" and len(Equipment['dataset']) != 0:
            equipmentName = Equipment['dataset'][0]['brand'] + ' - ' + Equipment['dataset'][0]['model']
        else:
            equipmentName = 'none'

        # IP
        if "ip" in x:
            ip = x['ip']
        else:
            ip = "unknow"

        item = {
            'id': x['id'],
            'name': x['name'],
            # 'active': act_status,
            'active': x['active'],
            'conn_status': conn_status,
            'equipment_status': equipment_status,
            'equipment_index': x['equipment_index'],
            'equipment_name': equipmentName,
            'zone_id': x['zone_id'],
            'zone_name': zoneName,
            'group_id': x['group_id'],
            'group_name': groupName,
            'ip': ip
        }
        Data.append(item)

    if type == 'dashboard':
        if gid == 'all':
            gid = 0
        else:
            gid = gid

        # 統計數量, 回傳值為字典型態
        statistics = statisticsDevice1(gid)
        LocalTime = time.asctime(time.localtime(time.time()))
        # print(statistics)
        dataset = {'dataset': Data,
                   "total": statistics['total'],
                   "open": statistics['opencount'],
                   "close": statistics['closecount'],
                   "conn": statistics['conncount'],
                   "standby": statistics['closecount'],
                   'nowTime': LocalTime,
                   # "standby": int(statistics['opencount'])+int(statistics['closecount']),
                   "disconn": statistics['disconncount']}
    else:
        dataset = {'dataset': Data}
    return dataset


# 查詢裝置
# param: 以字串方式傳輸"Groupid"
# 2023.09.16 測試
def queryGroupDeviceTest(gid):
    with open('static/data/device.json') as json_file:
        data = json.load(json_file)

        if gid == 0:
            filtered_list = data
        else:
            filtered_list = [
                dictionary for dictionary in data
                if dictionary['group_id'] == gid
            ]

        Data = []
        for i in filtered_list:
            item = {
                'id': i['id'],
                'name': i['name'],
                'conn_status': i['conn_status'],
                'equipment_status': i['equipment_status']
            }

            Data.append(item)

        return Data


# 取出裝置Power Meter
# param: 以JSON方式傳輸 request_data
# 2023.08.24 新增
# 2023.09.18 測試資料
def getRawDataTest(json_data):
    request_data = json_data
    """
    keylist = list(request_data.keys())

    if keylist.count('start') != 0 and keylist.count('end') != 0:
        fromDate_str = request_data['start'] + ":00"
        endDate_str = request_data['end'] + ":00"
    else:
        # 現在時間
        now = datetime.datetime.now()
        fromDate = now - datetime.timedelta(hours=-1)
        fromDate_date = fromDate.strftime("%Y-%m-%d %H")
        fromDate_str = str(fromDate_date) + ":00:00"
        endDate_date = now.strftime("%Y-%m-%d %H")
        endDate_str = str(endDate_date) + ":00:00"
    """
    with open('static/data/power_meter.json') as json_file:
        data = json.load(json_file)

        filtered_list = [
            dictionary for dictionary in data
            if dictionary['id'] == "0004A33F0DF1"
        ]
        # print(len(filtered_list))
        # print(filtered_list[0]['pw1'])
        Data = []
        for i in range(12):
            item = {
                'pw1': filtered_list[i]['pw1'],
                'cu1': filtered_list[i]['cu1'],
            }
            Data.append(item)

        # 這邊要取出現在的總耗電量和使用時數。未做
        dict_dataset = {'dataset': Data, 'wh': 80.5, 'usage': 17.5, 'conn_status': 'on', 'equipment_status': 'on'}
        return dict_dataset


# 取出Log紀錄
def queryLogRecord():
    mycol = mydb["log"]

    myquery = {}
    mydoc = mycol.find(myquery).sort('datetime', -1)
    Data = []
    for x in mydoc:
        if "id" in x:
            Id = x['id']
        else:
            Id = x['name']

        if "msg" in x:
            msg = x['msg']
        else:
            msg = x['message']
        # struct_time = time.localtime(x['datetime'])  # 轉成時間元組
        # timeString = time.strftime("%Y-%m-%d %H:%M:%S", struct_time)  # 轉成字串
        item = {
            'datetime': x['datetime'],
            'role': x['role'],
            'id': Id,
            'msg': msg
        }
        Data.append(item)

    dataset = {'dataset': Data}  # 正式
    # dataset = {'dataset': Data, 'conn_status': query_data['conn_status'], 'equipment_status': query_data['equipment_status']} # 正式
    return dataset


# 驗証登入
# 2023.11.06 新增
def vaildUsername(username, passwd):
    mycol = mydb["account"]

    myquery = {"username": username, "password": passwd}
    count = mycol.count_documents(myquery)

    data = {
        "total": count
    }

    return {"status": "ok", "data": data}


# 統計總量
# 2023.11.10 新增
def mainCalculate(list_data, first, last, today):
    # print(list_data)
    total_addwh = 0
    total_usage = 0
    today_addwh = 0
    today_usage = 0
    for x in list_data:
        # 統計總量
        Statistics_total = calcTotalStatistics(x['id'], first, last)
        # print(Statistics_total)
        total_addwh += Statistics_total['addwh']
        total_usage += Statistics_total['usage']
        # 統計今日
        Statistics_today = calcTotalStatistics(x['id'], today, today)
        # print(Statistics_total)
        today_addwh += Statistics_today['addwh']
        today_usage += Statistics_today['usage']

    return [total_addwh, total_usage, today_addwh, today_usage]



# 統計總量 - 以Zone區來計算
# 2024.01.04 新增
def mainCalculateGroup(id, first, last, today, type):
    total_addwh = 0
    total_usage = 0
    today_addwh = 0
    today_usage = 0

    if type == "zone":
        mycol = mydb["statistics_zone_day"]  # Zone
    elif type == "group":
        mycol = mydb["statistics_group_day"]  # Group
    else:
        return False

    myquery = {"id": id, "date": {"$gte": first, "$lte": last}}

    mydoc = mycol.find(myquery)
    count = mycol.count_documents(myquery)
    if count != 0:
        df = pd.DataFrame(list(mydoc))
        total_usage = sum(list(df['usage']))
        total_addwh = sum(list(df['addwh']))
    # 以下計算今日
    myquery1 = {"id": id, "date": today}
    #myquery1 = {"id": zone_id, "date": {"$gte": today, "$lte": today}}
    mydoc1 = mycol.find(myquery1)
    count1 = mycol.count_documents(myquery1)
    if count1 != 0:
        mydoc1 = mycol.find_one(myquery1)
        today_usage = mydoc1['usage']
        today_addwh = mydoc1['addwh']
        #df1 = pd.DataFrame(list(mydoc1))
        #today_usage = sum(list(df1['usage']))
        #today_addwh = sum(list(df['addwh']))

    return [total_addwh, total_usage, today_addwh, today_usage]



# 統計總量 - 以Zone區來計算
# 2024.01.04 新增
def mainCalculateAll(first, last, today):
    total_addwh = 0
    total_usage = 0
    today_addwh = 0
    today_usage = 0

    mycol = mydb["statistics_zone_day"]  # 註冊表
    myquery = {"date": {"$gte": first, "$lte": last}}

    mydoc = mycol.find(myquery)
    count = mycol.count_documents(myquery)
    if count != 0:
        df = pd.DataFrame(list(mydoc))
        total_usage = sum(list(df['usage']))
        total_addwh = sum(list(df['addwh']))
    # 以下計算今日
    myquery1 = {"date": today}
    mydoc1 = mycol.find(myquery1)
    count1 = mycol.count_documents(myquery1)
    if count1 != 0:
        mydoc1 = mycol.find(myquery1)
        df1 = pd.DataFrame(list(mydoc1))
        today_usage = sum(list(df1['usage']))
        today_addwh = sum(list(df['addwh']))

    return [total_addwh, total_usage, today_addwh, today_usage]


# 統計總量
# 2023.11.10 新增
# 2024.01.04 修改數值。因為從網頁輸出有取出四捨五入整數
def calcTotalStatistics(id, start, end):
    total_usage = 0
    total_addwh = 0

    mycol = mydb["statistics_device_day"]  # 統計表
    try:
        # myquery1 = {'id': id, "date": {"$regex": re.compile(r"^"+month+"*") }}
        myquery1 = {'id': id, "date": {"$gte": start, "$lte": end}}
        mydoc2 = mycol.find(myquery1)
        count = mycol.count_documents(myquery1)
        if count != 0:
            # 統計
            df = pd.DataFrame(list(mydoc2))
            # print(df)
            total_usage += sum(list(df['usage']))
            total_addwh += sum(list(df['addwh']))
            #total_usage += round(sum(list(df['usage'])) / 3600, 2)
            #total_addwh += round(sum(list(df['addwh'])) / 1000, 2)

        dataset = {'usage': total_usage, 'addwh': total_addwh}

        return dataset
    except:
        print(id + ' not find any dataset')


# 取用電量值
def getaddwh(id, date):
    mycol = mydb["statistics_device_day"]  # 統計表
    try:
        myquery1 = {'id': id, "date": date}
        count = mycol.count_documents(myquery1)
        if count != 0:
            mydoc2 = mycol.find_one(myquery1)

            return mydoc2['addwh']
    except:
        print(id + ' not find any dataset')


# 用電量統計
# 2023.11.10 新增
# 2024.01.05 修改由 Zone / Group 計算
def getMonthStatistics1(id, date, type):
    total_addwh =0
    if type == "zone":
        mycol = mydb["statistics_zone_day"]
    else:
        mycol = mydb["statistics_group_day"]

    try:
        myquery = {'id': id, "date": date}
        count = mycol.count_documents(myquery)
        if count != 0:
            mydoc = mycol.find_one(myquery)
            total_addwh = mydoc['addwh']
    except:
        print(id+' not find any dataset')

    return total_addwh


# 日期範圍的統計
# 2023.11.10 新增
# 2024.01.05 修改從 statistics_zone_day / statistics_group_day
# param: zone_id, firstdate, lastdate, type(zone/group)
def monthCalculate(id, first, last, type):
    d1 = datetime.datetime.strptime(first, "%Y-%m-%d")
    d2 = datetime.datetime.strptime(last, "%Y-%m-%d")

    delta = d2 - d1
    date1 = first
    #print("Days between:", delta.days)
    dataset =[]
    for i in range(delta.days+1):
        #print(date1)
        date_object = datetime.datetime.strptime(date1, '%Y-%m-%d').date() # 轉成<class 'datetime.date'>
        #print(str(date_object))
        value = getMonthStatistics1(id, date1, type)
        #print(value)
        item = {
                  "date": date1,
                  "addwh": value
                }
        dataset.append(item)
        endate = date_object + datetime.timedelta(days=1)
        date1 = str(endate)

    #print(dataset)
    return dataset


# 取出各區域裝置ID
def getfilterID(zone):
    mycol = mydb["register"]  # 註冊表

    myquery = {'zone_id': zone}  # Zone
    mydoc1 = mycol.find(myquery)
    list_data = list(mydoc1)

    return list_data


# 取出各區域ID
def getZoneInfo():
    mycol = mydb["zone"]  # 註冊表

    myquery = {}
    mydoc1 = mycol.find(myquery)
    list_data = list(mydoc1)

    return list_data


def queryCalculate(id):
    mycol = mydb["statistics_device_day"]  # 統計表
    try:
        myquery1 = {'id': id}
        count = mycol.count_documents(myquery1)
        if count != 0:
            mydoc2 = mycol.find(myquery1)
            # 統計
            df = pd.DataFrame(list(mydoc2))
            # print(df)
            total_addwh = round(sum(list(df['addwh'])) / 1000, 2)
        else:
            total_addwh = 0

        return total_addwh
    except:
        print(id + ' not find any dataset')


# 計算區域的值
# 2024.01.04 更新計算
# param : id: zoneId, 當月, 第一天和最後一天
def CalculateValue(id, firstdate, lastdate):
    #print(list_data)
    total =0
    mycol = mydb["statistics_zone_day"]  # 區域統計表
    myquery = {"id": id, "date": {"$gte": firstdate, "$lte": lastdate}}
    mydoc = mycol.find(myquery)
    count = mycol.count_documents(myquery)
    if count != 0:
        df = pd.DataFrame(list(mydoc))
        total = sum(list(df['addwh']))

    return total


# 計算各區統計
# 2023.12.28 更新。使用 ObjectID
# 2024.01.04 更新。取出Zone統計；並且計算群組當月的計算
# param : zone data, 當月, 第一天和最後一天
def zoneCalculate(list_data, firstdate, lastdate):
    #print(list_data)
    dataset = []
    for x in list_data:
        #print(x['index'])
        objInstance = ObjectId(x['_id'])
        zoneId = str(objInstance)
        #filterId = getfilterID(x['index'])
        value = CalculateValue(zoneId, firstdate, lastdate)  # 本月每日的統計
        item = {
                  'id': zoneId,
                  'name': x['zone'],
                  'addwh': value
                }
        #print(item)
        dataset.append(item)

    return dataset


# 取出分析資料
# 2023.11.09 新增
# 2023.12.19 更新。變更輸出排序
# 2023.12.28 更新。更新zone 和 Group 資料型別
# 2024.01.04 更新。修改計算方式。因為有統計 Zone 和群組的統計
def getAnalysisData(json_data):
    # print(json_data)
    request_data = json_data
    keylist = list(request_data.keys())
    #mycol = mydb["register"]  # 註冊表
    # global
    total_usage = 0
    total_addwh = 0
    today_usage = 0
    today_addwh = 0
    """
    myquery = ''
    if request_data['zone'] == 0 and request_data['group'] == 0:
        myquery = {}  # Zone
    elif request_data['zone'] != 0 and request_data['group'] == 0:
        myquery = {'zone_id': request_data['zone']}
    elif request_data['zone'] == 0 and request_data['group'] != 0:
        myquery = {'group_id': request_data['group']}
    elif request_data['zone'] != 0 and request_data['group'] != 0:
        myquery = {'zone_id': request_data['zone'], 'group_id': request_data['group']}

    mydoc1 = mycol.find(myquery)
    list_data = list(mydoc1)
    """
    getZone = getZoneInfo()  # Zone 列表
    #calculate = mainCalculate(list_data, request_data['firstday'], request_data['lastday'],request_data['today'])  # 統計。[總用電量, 總使用時數, 今日用電量, 今日總時數]
    getDataset = ''

    if keylist.count('group') == 0:
        calculate1 = mainCalculateGroup(request_data['zone'], request_data['firstday'], request_data['lastday'],
                                        request_data['today'], 'zone')  # 統計(修正)。[總用電量, 總使用時數, 今日用電量, 今日總時數]
        getDataset = monthCalculate(request_data['zone'], request_data['firstday'], request_data['lastday'],
                                    'zone')  # 本月每日的統計
    elif keylist.count('zone') == 0:
        calculate1 = mainCalculateGroup(request_data['group'], request_data['firstday'], request_data['lastday'],
                                        request_data['today'], 'group')  # 統計(修正)。[總用電量, 總使用時數, 今日用電量, 今日總時數]
        getDataset = monthCalculate(request_data['group'], request_data['firstday'], request_data['lastday'],
                                    'group')  # 本月每日的統計
    elif request_data['zone'] == 0 and request_data['group'] == 0:
        calculate1 = mainCalculateAll(request_data['firstday'], request_data['lastday'],
                                      request_data['today'])  # 統計(修正)。[總用電量, 總使用時數, 今日用電量, 今日總時數]
        getDataset = zoneCalculate(getZone, request_data['firstday'], request_data['lastday'])

    # print(getDataset)
    dataset = {'total_usage': round(calculate1[1]/3600, 2), 'total_addwh': round(calculate1[0]/1000, 2), 'today_usage': round(calculate1[3]/3600, 2), 'today_addwh': round(calculate1[2]/1000, 2), 'dataset': getDataset}
    return dataset


# 取出Log紀錄 - 匯出
def queryLogRecord1():
    mycol = mydb["log"]

    myquery = {}
    mydoc = mycol.find(myquery).sort('datetime', -1)
    df = pd.DataFrame(list(mydoc))
    log_data = pd.DataFrame({
        'Time': list(df['datetime']),
        'User': list(df['id']),
        'Record': list(df['msg']),
    })
    # 現在時間
    now = datetime.datetime.now()
    date_time = now.strftime("%Y%m%d%H%M")
    fileName = 'log_'+date_time
    #fileName = 'log'
    log_data.to_excel(r'./media/'+fileName+'.xlsx', index=False)

    return fileName


# 取出Log紀錄
# 2023.11.30 新增
# param: 以字串方式傳輸"start"起始日期, "end"結束日期
def filterhLog(start, end):
    mycol = mydb["log"]
    myquery = {"datetime": {"$lte": end, "$gte": start}}
    mydoc = mycol.find(myquery)

    Data = []
    for x in mydoc:
        item = {
            'datetime': x['datetime'],
            'id': x['id'],
            'msg': x['msg']
        }
        Data.append(item)

    dataset = {'dataset': Data}

    return dataset



# 2023.12.01 新增 - POST 取得Log Data
def getFilterLogData(json_data):
    request_data = json_data
    mycol = mydb["log"]

    today = datetime.date.today()
    # print(today)
    # 起始日期
    startdate = ''
    if request_data['start']:
        startdate = request_data['start']
    else:
        startdate = str(today)

    # 結束日期
    endate = ''
    if request_data['end']:
        # endate = end
        ## 結束時間
        date_object = datetime.datetime.strptime(request_data['end'], '%Y-%m-%d').date()  ## 轉成<class 'datetime.date'>
        endate = date_object + datetime.timedelta(days=1)
        endate = str(endate)
    else:
        endate = today + datetime.timedelta(days=1)
        endate = str(endate)
        # endate = str(today + datetime.timedelta(days=1))

    if request_data['id'] == '':
        myquery = {"datetime": {"$lte": endate, "$gte": startdate}}
    else:
        myquery = {"datetime": {"$lte": endate, "$gte": startdate}, "id": {"$regex": re.compile(r"^.*"+request_data['id']+".*")} }

    mydoc = mycol.find(myquery)

    Data = []
    for x in mydoc:
        item = {
            'datetime': x['datetime'],
            'id': x['id'],
            'msg': x['msg']
        }
        Data.append(item)

    dataset = {'dataset': Data}

    return dataset


# 2023.12.04 新增 - POST 取得Account Data
def getFilterAccountData(json_data):
    request_data = json_data

    mycol = mydb["account"]

    if request_data['id'] == '':
        myquery = {}
    else:
        myquery = {"username": {"$regex": re.compile(r"^.*" + request_data['id'] + ".*")}}

    mydoc = mycol.find(myquery)
    Data = []
    for x in mydoc:
        item = {
            'index': x['index'],
            'username': x['username'],
            # 'name': x['name'],
            'password': x['password']
        }
        Data.append(item)

    dataset = {'account': Data}
    return dataset


# 2023.12.04 新增 - POST 取得Zone Data
def getFilterZoneData(json_data):
    request_data = json_data

    mycol = mydb["zone"]

    if request_data['zone'] == '':
        myquery = {}
    else:
        myquery = {"zone": {"$regex": re.compile(r"^.*" + request_data['zone'] + ".*")}}

    mydoc = mycol.find(myquery)
    Data = []
    for x in mydoc:
        item = {
            'index': x['index'],
            'zone': x['zone']
        }
        Data.append(item)

    dataset = {'group': Data}
    return dataset


# 2023.12.04 新增 - POST 搜尋取得Group Data
def getFilterGroupData(json_data):
    request_data = json_data

    mycol = mydb["group"]

    if request_data['name'] == '':
        myquery = {}
    else:
        myquery = {"name": {"$regex": re.compile(r"^.*" + request_data['name'] + ".*")}}

    mydoc = mycol.find(myquery)
    Data = []
    for x in mydoc:
        item = {
            'index': x['index'],
            'name': x['name']
        }
        Data.append(item)

    dataset = {'group': Data}
    return dataset


# 2023.12.04 新增 - POST 搜尋取得Equipment Data
def getFilterEquipmentData(json_data):
    request_data = json_data
    mycol = mydb["equipment_set"]

    if request_data['brand'] == '' and request_data['model'] == '':
        myquery = {}
    elif request_data['brand'] != '' and request_data['model'] == '':
        myquery = {"brand": {"$regex": re.compile(r"^.*" + request_data['brand'] + ".*")}}
    elif request_data['brand'] == '' and request_data['model'] != '':
        myquery = {"model": {"$regex": re.compile(r"^.*" + request_data['model'] + ".*")}}
    elif request_data['brand'] != '' and request_data['model'] != '':
        myquery = {"brand": {"$regex": re.compile(r"^.*" + request_data['brand'] + ".*")}, "model": {"$regex": re.compile(r"^.*" + request_data['model'] + ".*")}}
        #myquery = {"name": {"$regex": re.compile(r"^.*" + request_data['name'] + ".*")}}

    mydoc = mycol.find(myquery)
    Data = []
    for x in mydoc:
        item = {
            'index': x['index'],
            'brand': x['brand'],
            'model': x['model'],
            'baudrate': x['baudrate'],
            'config': x['config'],
            'setting': x['setting'],
            # 'response': x['response']
        }
        Data.append(item)

    dataset = {'dataset': Data}
    return dataset


# 2023.12.04 新增 - POST 搜尋取得Device Data
def getFilterDeviceData(json_data):
    request_data = json_data

    mycol = mydb["register"]

    if request_data['name'] == '':
        myquery = {}
    else:
        myquery = {"name": {"$regex": re.compile(r"^.*" + request_data['name'] + ".*")}}

    mydoc = mycol.find(myquery)

    Data = []
    for x in mydoc:
        keylist = list(x.keys())
        # 連線狀態
        if keylist.count('conn_status') != 0 and x['conn_status'] == "on":  # Power Meter
            conn_status = "on"
        else:
            conn_status = "off"

        # 設備狀態
        if keylist.count('equipment_status') != 0 and x['equipment_status'] == "on":  # Power Meter
            equipment_status = "on"
        else:
            equipment_status = "off"

        # if keylist.count('group_id') != 0:
        # Zone
        zoneName = ''
        if "zone_id" in x:
            groupId = x['zone_id']
            z_name = getZoneList(int(groupId))
            if groupId != 0:
                zoneName = z_name['group'][0]['zone']
            else:
                zoneName = 'no zone'
        else:
            groupId = 0
            zoneName = 'no zone'

        # Group
        groupName = ''
        if "group_id" in x:
            g_name = getGroupList(x['group_id'])
            if x['group_id'] != 0:
                groupName = g_name['group'][0]['name']
            else:
                groupName = 'no group'
        else:
            groupName = 'no group'

        equipmentName = ''
        if x['equipment_index'] != 0:
            Equipment = queryEquipment(x['equipment_index'])
            equipmentName = Equipment['dataset'][0]['brand'] + ' - ' + Equipment['dataset'][0]['model']
        else:
            equipmentName = 'No Equipment'

        # IP
        if "ip" in x:
            ip = x['ip']
        else:
            ip = "0.0.0.0"

        item = {
            'id': x['id'],
            'name': x['name'],
            # 'active': act_status,
            'active': x['active'],
            'conn_status': conn_status,
            'equipment_status': equipment_status,
            'equipment_index': x['equipment_index'],
            'equipment_name': equipmentName,
            'zone_id': groupId,
            'zone_name': zoneName,
            'group_id': x['group_id'],
            'group_name': groupName,
            'ip': ip
        }
        Data.append(item)

    dataset = {'dataset': Data}
    return dataset



# 2023.12.05 新增 - 系統基本設定檔
def baseConfigSetData(title, fileName):
    mycol = mydb["config"]

    myquery = {}
    count = mycol.count_documents(myquery)

    if count == 0:
        # create
        if fileName != "None":
            file_name = fileName
        else:
            file_name = "None"

        mydict = {
            "index": 1,
            "title": title,
            "fileName": file_name
        }

        x = mycol.insert_one(mydict)

        return {"status": "ok", "commit": "Created 'config' Collection!"}
    else:
        # update
        query1 = {"index": 1}
        if fileName != "None":
            newvalues = {"$set": {"title": title, "fileName": fileName}}
        else:
            newvalues = {"$set": {"title": title}}

        mycol.update_one(query1, newvalues)

        return {"status": "ok", "commit": "Updated 'config' Collection!"}


# 2023.12.06 新增 - 取得系統基本設定檔
def getBaseConfig():
    mycol = mydb["config"]

    myquery = {}
    query_data = mycol.find_one(myquery)

    item = {
        'index': query_data['index'],
        'title': query_data['title'],
        # 'active': act_status,
        'fileName': query_data['fileName']
    }

    dataset = {'config': item}
    return dataset


# 取出裝置資訊
# 2023.12.08 新增
# 2023.12.29/30 更新。新加入判斷 zone 和 Group equipment_status conn_status
def getDeviceInfo(devid, type):
    mycol = mydb["register"]

    query1 = {"id": devid}
    query1_data = mycol.find_one(query1)

    if type == 'name':
        data = query1_data['name']
    elif type == 'zone':
        data = query1_data['zone_id']
    elif type == 'group':
        data = query1_data['group_id']
    elif type == 'equipment_status':
        data = query1_data['equipment_status']
    elif type == 'conn_status':
        data = query1_data['conn_status']
    else:
        data = query1_data['equipment_index']

    return data