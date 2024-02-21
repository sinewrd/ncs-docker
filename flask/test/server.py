import os
#from flask import Flask, render_template, request, send_from_directory, jsonify, url_for, redirect, flash
from flask import Flask, request, jsonify, render_template, send_from_directory, url_for, redirect, flash
from flask_cors import CORS
#from flasgger import Swagger, swag_from
from devicefunc import processDeviceCMD, process, getStatistics
from webfunc import setControlCode, setDeviceBind, execCommand, deleteEquipment, updateEquipment, deleteDeviceReg, updateDeviceReg, queryEquipment, queryDevice, getRawData, SatisticsUsage, statisticsDevice, getGroupList, queryGroupDevice

import os, datetime, time
import requests, json, pymongo
#import pandas as pd
#import numpy as np

# 全域變數 - DB
mongo_host = "34.81.61.172"
mongo_port = 27017
mongo_db = "ncs"
mongo_username = "sinew"
mongo_password = "sinew3612"

#myclient = pymongo.MongoClient("mongodb://sinew:sinew3612@"+mongo_host+":"+mongo_port+"/")  ##IP需要修改, Docker版本
#myclient = pymongo.MongoClient("mongodb://sinew:sinew3612@34.81.61.172:27017/")  ##IP需要修改
myclient = pymongo.MongoClient(
                host=mongo_host,
                port=mongo_port,
                username=mongo_username,
                password=mongo_password,
            )
mydb = myclient[mongo_db]
#mydb = myclient["ncs"]

app = Flask(__name__)
app.config["DEBUG"] = True
CORS(app)
#app.config['JSONIFY_PRETTYPRINT_REGULAR'] = False


@app.route('/')
def hello():
    return "Hello World!"

# power meter Data 裝置接收的資料
# 2023.08.17 修改
@app.route('/device/power_meter',methods=['POST'])
def receiveSensorData():
    #keylist = list(request_data.keys())
    #print(request_data)
    if request.is_json:
       request_data = request.get_json()
       #response_data = process(json.dumps(request_data))
       response_data = process(request_data)
       #print(type(response_data))

       #return json.dumps(response_data)
       return jsonify(response_data)
    else:
       return jsonify({"status":"error","commit":"The Post Data is not jsonData type"})

"""
# get Device usage and power statistics
# 舊版。先mark
@app.route('/get/device/<string:devid>',methods=['GET'])
def getStatisticsData(devid): 
    response_data = getStatistics(devid)

    return jsonify(response_data)
"""

# get Device raw Data
@app.route('/get/datainfo',methods=['POST'])
def getDeviceRawDataData():
    if request.is_json:
        #response_data = getStatistics(devid)
        request_data = request.get_json()
        response_data = getRawData(request_data)

        return jsonify(response_data)
    else:
        return jsonify({"status":"error","commit":"The Post Data is not jsonData type"})


# 以下是Web 使用的API

# 查詢裝置統計
# 2023.08.28 新增
@app.route('/get/statistics',methods=['GET'])
@app.route('/get/statistics/<string:devid>',methods=['GET'])
def searchSatisticsDevice(devid=None):
    if devid:
       value = devid
    else:
       value = 'all'

    response_data = SatisticsUsage(value)
    
    return jsonify(response_data)

# 查詢設備控制碼
# 2023.08.24 新增
@app.route('/equipmentcode',methods=['GET'])
@app.route('/equipmentcode/<int:index>',methods=['GET'])
def searchEquipment(index=None):
    #print(index)
    if index:
       value = index
    else:
       value = 0
    
    response_data = queryEquipment(value)

    return jsonify(response_data)


# 新增各廠牌電視控制碼
# 2023.08.17 修改
@app.route('/set/equipmentcode',methods=['POST'])
def setEquipmentCode():
    if request.is_json:
        request_data = request.get_json()
        #response_data = setControlCode(json.dumps(request_data))
        response_data = setControlCode(request_data)
        
        return jsonify(response_data)
    else:
        return jsonify({"status": "error", "commit": "The setting Fail"})


# 刪除各廠牌電視控制碼
# 2023.08.21 新增
@app.route('/delete/equipmentcode/<int:index>',methods=['DELETE'])
def delEquipment(index):
    response_data = deleteEquipment(index)

    return jsonify(response_data)


# 更新各廠牌電視控制碼
# 2023.08.21 新增
@app.route('/update/equipmentcode/<int:index>',methods=['PUT'])
def updEquipment(index):
    if request.is_json:
        request_data = request.get_json()

        response_data = updateEquipment(request_data, index)

        return jsonify(response_data)
    else:
        return jsonify({"status": "error", "commit": "The setting Fail"})



# 查詢裝置清單
# 2023.08.24 新增
@app.route('/device',methods=['GET'])
@app.route('/device/<string:devid>',methods=['GET'])
def searchDevice(devid=None):
    if devid:
       value = devid
    else:
       value = 'all'

    response_data = queryDevice(value)
    return jsonify(response_data)


# 裝置註冊綁定
# 2023.08.17 修改
@app.route('/device/bind',methods=['POST'])
def deviceRegister():
    if request.is_json:
        request_data = request.get_json()
        #response_data = setDeviceBind(json.dumps(request_data))
        response_data = setDeviceBind(request_data)

        return jsonify(response_data)
    else:
        return jsonify({"status": "error", "commit": "The setting Fail"})



# 下達裝置命令
@app.route('/device/cmd', methods=['POST'])
def deviceCommand():
    if request.is_json:
        request_data = request.get_json()
        response_data = execCommand(request_data)

        return jsonify(response_data)
    else:
        return jsonify({"status": "error", "commit": "The setting Fail"})



# 刪除裝置註冊
# 2023.08.21 新增
@app.route('/device/delete/<string:devid>',methods=['DELETE'])
def delDeviceReg(devid):
    response_data = deleteDeviceReg(devid)

    return jsonify(response_data)


# 更新裝置資訊
# 2023.08.22 新增
# 2023.08.24 修改更新欄位。 名稱, 是否
@app.route('/device/update/<string:devid>',methods=['PATCH'])
def updDeviceReg(devid):
    if request.is_json:
        request_data = request.get_json()

        #response_data = updateDeviceReg(request_data['equipment_index'], devid)
        response_data = updateDeviceReg(request_data, devid)
        return jsonify(response_data)
    else:
        return jsonify({"status": "error", "commit": "The setting Fail"})


# 登入
# 2023.09.12 新增登入機制
@app.route('/login', methods=['GET', 'POST'])
def login():
    #if current_user.is_authenticated:
    #    return redirect(url_for('photoGallery', category=1))
    if request.method == 'POST':
        #username = request.values['username']
        #password = request.values['pass']
        #user = users.get(username)
        #if user and user['password'] == password:
        if request.values['username'] == "sinew" and request.values['pass'] == "sinew":
            #user_obj = User()
            #user_obj.id = username
            #login_user(user_obj)
            return redirect(url_for('DashboardList'))
        else:
            return 'Invalid credentials'

    return render_template('index.html')



# Dashboard頁面
# 2023.09.12 新增Dashboard
@app.route('/dashboard',methods=['GET'])
@app.route('/dashboard/<int:gid>', methods=['GET'])
def DashboardList(gid=None):
    if gid:
       value = gid
    else:
       value = 0
    
    print(value)
    statistics = statisticsDevice(value) # 統計數量, 回傳值為字典型態
    group_list = getGroupList()          # 群組列表, 回傳值為字典型態

    item = {
             "group": value,
             "total": statistics['total'],
             "open": statistics['opencount'],
             "close": statistics['closecount'],
             "conn": statistics['conncount'],
             "disconn": statistics['disconncount'],
             "grouplist": group_list['group'],
             #"userId": user_id
           }

    return render_template('dashboard.html', data=item)


# 查詢裝置清單
# 2023.09.14 新增。群組查詢
@app.route('/device/group',methods=['GET'])
@app.route('/device/group/<int:gid>',methods=['GET'])
def searchGroupDevice(gid=None):
    if gid:
       value = gid
    else:
       value = 0

    print(value)
    response_data = queryGroupDevice(value)
    return jsonify(response_data)



## 以下測試
# get lastest Data
@app.route('/get/device/power_meter',methods=['GET'])
def getSensorData():
    # 資料庫
    #myclient = pymongo.MongoClient("mongodb://sinew:sinew3612@34.81.61.172:27018/")  ##IP需要修改
    #mydb = myclient["ncs"]
    mycol = mydb["power_meter"]

    # 使用 sort 方法進行排序
    sorted_data = mycol.find().sort('datetime', -1)
    doc = next(sorted_data) ## 取出一筆
    #print( type(doc) )
    data = {
             'datetime': doc['datetime'],
             'id': doc['id'],
             'pw1': doc['pw1'],
             'cu1': doc['cu1'],
             'wh1': doc['wh1']
           }

    return jsonify(data)


# 模擬裝置通知系統完成
@app.route('/device/notify',methods=['POST'])
def notifyStatus():
    request_data = request.get_json()
    keylist = list(request_data.keys())
    #print(keylist)
    if keylist.count('232ack') == 0: # Power Meter
        print('not found')
    else: # Notify
        #recordDeviceCMD( request_data['id'] ) 
        processDeviceCMD( request_data['id'] )


    return jsonify({"status": "ok"})    


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
