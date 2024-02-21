import os
#from flask import Flask, render_template, request, send_from_directory, jsonify, url_for, redirect, flash
from flask import Flask, request, jsonify, render_template, send_from_directory, url_for, redirect, flash, send_file
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
#from flask_cors import CORS
#from flasgger import Swagger, swag_from
from devicefunc import processDeviceCMD, process, getStatistics
from webfunc import setControlCode, setDeviceBind, execCommand, deleteEquipment, updateEquipment, deleteDeviceReg, updateDeviceReg, queryEquipment, queryDevice, getRawData, SatisticsUsage, statisticsDevice, statisticsDevice1, statisticsDevice2, getGroupList, queryGroupDevice, queryGroupDevice1, getZoneList, statisticsEquipment, createZone, updateZone, deleteZone, createGroup, updateGroup, deleteGroup, statisticsGroup, getAccountList, createAccount, updateAccount, deleteAccount, vaildAccount, queryLogRecord, vaildUsername, recordLog, getAnalysisData, queryLogRecord1, filterhLog, getFilterLogData, getFilterAccountData, getFilterZoneData, getFilterGroupData, getFilterEquipmentData, getFilterDeviceData, baseConfigSetData, getBaseConfig, getGroupIDList, queryEquipmentList, getZoneIDList, queryGroupDevice2, sendSendTime, getSysTimeZoneList, getSystemSetTime, queryGroupDeviceTest, getRawDataTest

import os, datetime, time
import requests, json, pymongo, socket
#import pandas as pd
#import numpy as np

# 全域變數 - DB
mongo_host = os.environ.get('MONGO_HOST')
mongo_port = int(os.environ.get('MONGO_PORT'))
mongo_db = os.environ.get('MONGO_DB')
mongo_username = os.environ.get('MONGO_USERNAME')
mongo_password = os.environ.get('MONGO_PASSWORD')
datetime_threshold = int(os.environ.get('DateTimeThreshold'))

myclient = pymongo.MongoClient(
                host=mongo_host,
                port=mongo_port,
                username=mongo_username,
                password=mongo_password,
            )
mydb = myclient[mongo_db]
users_collection = mydb['account']  # 請替換為你的使用者集合名稱

app = Flask(__name__)
app.secret_key = 'sinew3612'
#CORS(app)
#app.config["DEBUG"] = True
log_folder = "static/images/logo/"
# 設定 Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)


# 定義 User 類，這將用於表示使用者對象
class User(UserMixin):
    def __init__(self, user_id):
        self.id = user_id

@login_manager.user_loader
def load_user(user_id):
    user_obj = users_collection.find_one({"username": user_id})
    if user_obj:
        return User(user_id)
    return None


# 2023.12.20 修改。修正未驗証時轉向Login
@login_manager.unauthorized_handler
def unauthorized_callback():
    return redirect(url_for('login'))


# 2023.12.19 修改。轉向Login
@app.route('/')
def hello():
    ip_addr = request.remote_addr
    return redirect(url_for('login'))
    #return "Hello World!, <h1> Your IP address is:"+ip_addr


@app.route('/client',methods=['GET'])
def client():
    ip_addr = request.environ['REMOTE_ADDR']
    return '<h1> Your IP address is:' + ip_addr


@app.route('/client1',methods=['GET'])
def proxy_client():
    ip_addr = request.environ.get('HTTP_X_FORWARDED_FOR', request.remote_addr)
    return '<h1> Your IP address is:' + ip_addr   


@app.route('/client2',methods=['GET'])
def get_proxy_client():
    ip_addr = request.headers.get('X-Real-IP')
    return '<h1> Your IP address is:' + ip_addr    


# power meter Data 裝置接收的資料
# 2023.08.17 修改
# 2023.11.24 修改。新增 Get IP Address
# @app.route('/device/power_meter',methods=['POST'])
@app.route('/ncs900l', methods=['POST'])
def receiveSensorData():
    # keylist = list(request_data.keys())
    # print(request_data)
    if request.is_json:
        request_data = request.get_json()
        # response_data = process(json.dumps(request_data))
        ip_addr = request.headers.get('X-Real-IP')
        response_data = process(request_data, ip_addr)
        # print(type(response_data))

        # return json.dumps(response_data)
        return jsonify(response_data)
    else:
        return jsonify({"status": "error", "commit": "The Post Data is not jsonData type"})


"""
# get Device usage and power statistics
# 舊版。先mark
@app.route('/get/device/<string:devid>',methods=['GET'])
def getStatisticsData(devid): 
    response_data = getStatistics(devid)

    return jsonify(response_data)
"""


# get Device raw Data
@app.route('/get/datainfo', methods=['POST'])
def getDeviceRawDataData():
    if request.is_json:
        # response_data = getStatistics(devid)
        request_data = request.get_json()
        response_data = getRawData(request_data)

        return jsonify(response_data)
    else:
        return jsonify({"status": "error", "commit": "The Post Data is not jsonData type"})


# 以下是Web 使用的API

# 查詢裝置統計
# 2023.08.28 新增
# 2023.09.23 新增日期判斷
# 2023.09.25 新增裝置
@app.route('/get/statistics', methods=['GET'])
@app.route('/get/statistics/<string:devid>/<string:start>/<string:end>', methods=['GET'])
@app.route('/get/statistics/<string:devid>', methods=['GET'])
def searchSatisticsDevice(devid=None, start=None, end=None):
    if devid:
        value = devid
    else:
        value = 'all'

    today = datetime.date.today()
    # 起始日期
    if start:
        startdate = start
    else:
        startdate = str(today)

    # 結束日期
    if end:
        endate = end
    else:
        endate = str(today)
    # print(startdate)
    # print(endate)
    response_data = SatisticsUsage(value, startdate, endate)

    return jsonify(response_data)


# 查詢設備控制碼
# 2023.08.24 新增
@app.route('/equipmentcode', methods=['GET'])
@app.route('/equipmentcode/<int:index>', methods=['GET'])
def searchEquipment(index=None):
    # print(index)
    if index:
        value = index
    else:
        value = 0

    response_data = queryEquipment(value)

    return jsonify(response_data)



# 2023.12.26 新增
# 2023.12.27 修正。修改index 預設值
@app.route('/equipmentcodelist', methods=['GET'])
@app.route('/equipmentcodelist/<string:index>', methods=['GET'])
def searchEquipmentList(index=None):
    # print(index)
    if index and index != "0":
        value = index
    else:
        value = "all"

    response_data = queryEquipmentList(value)

    return jsonify(response_data)


# 新增各廠牌電視控制碼
# 2023.08.17 修改
@app.route('/set/equipmentcode', methods=['POST'])
def setEquipmentCode():
    if request.is_json:
        request_data = request.get_json()
        # response_data = setControlCode(json.dumps(request_data))
        response_data = setControlCode(request_data)

        return jsonify(response_data)
    else:
        return jsonify({"status": "error", "commit": "The setting Fail"})


# 刪除各廠牌電視控制碼
# 2023.08.21 新增
@app.route('/delete/equipmentcode/<int:index>', methods=['DELETE'])
def delEquipment(index):
    response_data = deleteEquipment(index)

    return jsonify(response_data)


# 更新各廠牌電視控制碼
# 2023.08.21 新增
@app.route('/update/equipmentcode/<int:index>', methods=['PUT'])
def updEquipment(index):
    if request.is_json:
        request_data = request.get_json()

        response_data = updateEquipment(request_data, index)

        return jsonify(response_data)
    else:
        return jsonify({"status": "error", "commit": "The setting Fail"})


# 查詢裝置清單
# 2023.08.24 新增
@app.route('/device', methods=['GET'])
@app.route('/device/<string:devid>', methods=['GET'])
def searchDevice(devid=None):
    if devid:
        value = devid
    else:
        value = 'all'

    response_data = queryDevice(value)
    return jsonify(response_data)


# 裝置註冊綁定
# 2023.08.17 修改
@app.route('/device/bind', methods=['POST'])
def deviceRegister():
    if request.is_json:
        request_data = request.get_json()
        # print(request_data)
        # response_data = setDeviceBind(json.dumps(request_data))
        response_data = setDeviceBind(request_data)
        # print(response_data)
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
# 2023.12.07 修改。傳送userID。Log紀錄用的
@app.route('/device/delete/<string:devid>', methods=['DELETE'])
def delDeviceReg(devid):
    if request.is_json:
        request_data = request.get_json()
        response_data = deleteDeviceReg(devid, request_data['username'])

        return jsonify(response_data)
    else:
        return jsonify(response_data)


# 更新裝置資訊
# 2023.08.22 新增
# 2023.08.24 修改更新欄位。 名稱, 是否
@app.route('/device/update/<string:devid>', methods=['PATCH'])
def updDeviceReg(devid):
    if request.is_json:
        request_data = request.get_json()

        # response_data = updateDeviceReg(request_data['equipment_index'], devid)
        response_data = updateDeviceReg(request_data, devid)
        return jsonify(response_data)
    else:
        return jsonify({"status": "error", "commit": "The setting Fail"})


# 登入
# 2023.09.12 新增登入機制
# 2023.12.07 修改訊息
@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('DashboardList1'))

    if request.method == 'POST':
        # if current_user.is_authenticated:
        #     return redirect(url_for('photoGallery', category=1))
        username = request.values['username']
        password = request.values['pass']
        user = users_collection.find_one({"username": username, "password": password})
        # print(user['index'])
        # obj_data = vaildUsername(username, password)
        # if request.values['username'] == "sinew" and request.values['pass'] == "sinew":
        # if obj_data['data']['total'] > 0:
        if user:
            user = User(username)
            login_user(user)
            payload = {
                "role": "user",
                "id": username,
                #"msg": "Login success",
                "msg": "Login",
                "category": 1
            }
            recordLog(payload)

            return redirect(url_for('DashboardList1'))

        payload = {
            "role": "user",
            "id": username,
            "msg": "Login failed",
            "category": 1
        }
        recordLog(payload)
        flash('Error!')
        #flash('Wrong username or password!')

    return render_template('index1.html')


# 登出
# 2023.11.07 新增登出機制
# 2023.12.07 修改訊息
@app.route('/logout')
@login_required
def user_logout():
    payload = {
        "role": "user",
        "id": current_user.id,
        #"msg": "Logout success",
        "msg": "Logout",
        "category": 1
    }
    recordLog(payload)
    logout_user()

    return render_template('index1.html')


# Dashboard頁面
# 2023.09.12 新增Dashboard
# 2023.12.26 暫時移除
"""
@app.route('/dashboard', methods=['GET'])
@app.route('/dashboard/<int:gid>', methods=['GET'])
@login_required
def DashboardList(gid=None):
    if gid:
        value = gid
    else:
        value = 0

    # print(value)
    statistics = statisticsDevice(value)  # 統計數量, 回傳值為字典型態
    group_list = getGroupList(0)  # 群組列表, 回傳值為字典型態

    item = {
        "group": value,
        "total": statistics['total'],
        "open": statistics['opencount'],
        "close": statistics['closecount'],
        "conn": statistics['conncount'],
        "disconn": statistics['disconncount'],
        "grouplist": group_list['group'],
        # "userId": user_id
    }

    return render_template('dashboard.html', data=item)
"""

# Dashboard頁面。外銷
# 2023.09.12 新增Dashboard
# 2023.12.07 更新。修改standby。
# 2023.12.28 更新。修改group List。
@app.route('/dashboard1', methods=['GET'])
@app.route('/dashboard1/<int:zone_id>', methods=['GET'])
@login_required
def DashboardList1(zone_id=None):
    # print(current_user.id)

    if zone_id:
        value = zone_id
    else:
        value = 0

    # print(value)
    statistics = statisticsDevice1(value)  # 統計數量, 回傳值為字典型態
    # print(statistics)
    #group_list = getGroupList(0)  # 群組列表, 回傳值為字典型態
    group_list = getGroupIDList('all')  # 群組列表, 回傳值為字典型態
    LocalTime = time.asctime(time.localtime(time.time()))

    item = {
        "group": value,
        "total": statistics['total'],
        "open": statistics['opencount'],
        "close": statistics['closecount'],
        "conn": statistics['conncount'],
        "standby": statistics['closecount'],
        "disconn": statistics['disconncount'],
        "grouplist": group_list['group'],
        "nowTime": LocalTime,
        "userId": current_user.id
    }

    return render_template('dashboard1.html', data=item)


# Dashboard頁面。外銷
# 2023.09.12 新增Dashboard
# 2023.12.27 修正。 Group List Index 改為ObjectID
@app.route('/register/device1', methods=['GET'])
@app.route('/register/device1/<int:zone_id>', methods=['GET'])
@login_required
def DeviceList1(zone_id=None):
    if zone_id:
        value = zone_id
    else:
        value = 0

    # print(value)
    statistics = statisticsDevice2(value)  # 統計數量, 回傳值為字典型態
    # print(statistics)
    # group_list = getGroupList(0)  # 群組列表, 回傳值為字典型態
    group_list = getGroupIDList('all')  # 群組列表, 回傳值為字典型態。2023.12.27 修正。
    LocalTime = time.asctime(time.localtime(time.time()))

    item = {
        "group": value,
        "total": statistics['total'],
        "reg": statistics['reg'],
        "unreg": statistics['unreg'],
        # "conn": statistics['conncount'],
        # "disconn": statistics['disconncount'],
        "grouplist": group_list['group'],
        "nowTime": LocalTime,
        "userId": current_user.id
    }

    return render_template('device1.html', data=item)


# 查詢裝置清單
# 2023.09.14 新增。群組查詢
@app.route('/device/group', methods=['GET'])
@app.route('/device/group/<int:gid>', methods=['GET'])
def searchGroupDevice(gid=None):
    if gid:
        value = gid
    else:
        value = 0

    # print(value)
    response_data = queryGroupDevice(value)
    return jsonify(response_data)


# 查詢裝置清單
# 2023.10.25 新增。群組查詢
# 2023.10.31 更新。群組查詢。
# 2023.12.26 修正。修改Index 值。修改取ObjectID
# 2023.12.27 修正。
@app.route('/device/zone/<string:type>', methods=['GET'])
@app.route('/device/zone/<string:type>/<string:gid>', methods=['GET'])
def searchZoneDevice(gid=None, type=None):
    value = ''
    if gid:
       value = gid
    else:
       value = "all"

    #response_data = queryGroupDevice1(value, type)
    response_data = queryGroupDevice2(value, type)
    #print(response_data)
    return jsonify(response_data)


# device 頁面
# 2023.09.22 新增
"""
@app.route('/register/device', methods=['GET'])
@login_required
def DeviceList():
    group_list = getGroupList(0)  # 群組列表, 回傳值為字典型態
    # print(group_list)
    item = {
        "grouplist": group_list['group'],
        # "userId": user_id
    }
    return render_template('device.html', data=item)
"""

# Equipment 頁面
# 2023.09.22 新增
"""
@app.route('/equipment', methods=['GET'])
def EquipmentSet():
    group_list = getGroupList(0)  # 群組列表, 回傳值為字典型態
    item = {
        "grouplist": group_list['group']
        # "userId": user_id
    }
    return render_template('equipment.html', data=item)
"""

# Equipment 頁面
# 2023.10.31 新增
@app.route('/equipment1', methods=['GET'])
@login_required
def EquipmentSet1():
    statistics = statisticsEquipment()
    LocalTime = time.asctime(time.localtime(time.time()))

    item = {
        "total": statistics['total'],
        "nowTime": LocalTime
        # "userId": user_id
    }

    return render_template('equipment1.html', data=item)


# Zone 頁面
# 2023.10.31 新增
@app.route('/manage/zone', methods=['GET'])
@login_required
def ZoneSet1():
    statistics = statisticsGroup('zone')
    LocalTime = time.asctime(time.localtime(time.time()))

    item = {
        "total": statistics['total'],
        "nowTime": LocalTime
        # "userId": user_id
    }

    return render_template('zone.html', data=item)


# Zone 頁面
# 2023.10.31 新增
@app.route('/manage/group', methods=['GET'])
@login_required
def GroupSet1():
    statistics = statisticsGroup('group')
    LocalTime = time.asctime(time.localtime(time.time()))

    item = {
        "total": statistics['total'],
        "nowTime": LocalTime
        # "userId": user_id
    }

    return render_template('group.html', data=item)


# Zone 頁面
# 2023.10.31 新增
@app.route('/manage/account', methods=['GET'])
@login_required
def AccountSet1():
    statistics = statisticsGroup('account')
    LocalTime = time.asctime(time.localtime(time.time()))

    item = {
        "total": statistics['total'],
        "nowTime": LocalTime
        # "userId": user_id
    }

    return render_template('account.html', data=item)


# 查詢群組
# 2023.10.25 新增
@app.route('/group', methods=['GET'])
@app.route('/group/<int:gid>', methods=['GET'])
def queryGroupList(gid=None):
    if gid:
        value = gid
    else:
        value = 0

    response_data = getGroupList(value)  # 群組列表, 回傳值為字典型態

    return jsonify(response_data)


# 2023.12.26 修正。修改Index 值。修改取ObjectID
# 2023.12.27
@app.route('/grouplist' ,methods=['GET'])
@app.route('/grouplist/<string:gid>' ,methods=['GET'])
def queryGroupList1(gid=None):
    if gid and gid != "0":
       value = gid
    else:
       value = "all"

    response_data = getGroupIDList(value)  # 群組列表, 回傳值為字典型態

    return jsonify(response_data)



# 查詢帳號 -
# 2023.11.03 新增
# param: uid
@app.route('/account', methods=['GET'])
@app.route('/account/<int:uid>', methods=['GET'])
def queryAccountList(uid=None):
    if uid:
        value = uid
    else:
        value = 0

    response_data = getAccountList(value)  # 群組列表, 回傳值為字典型態

    return jsonify(response_data)


# 查詢帳號 -
# 2023.11.04 新增
# 2023.12.26 修正。
# param: username
@app.route('/checkaccount/<string:username>', methods=['GET'])
def vaildregAccount(username=None):
    if username:
        value = username
    else:
        value = 0

    response_data = vaildAccount(value)  # 群組列表, 回傳值為字典型態

    return jsonify(response_data)


# 查詢Zone
# 2023.10.25 新增
@app.route('/zone', methods=['GET'])
@app.route('/zone/<int:gid>', methods=['GET'])
def queryZoneList(gid=None):
    if gid:
        value = gid
    else:
        value = 0

    response_data = getZoneList(value)  # 群組列表, 回傳值為字典型態

    return jsonify(response_data)


# 2023.12.26 修正。修改Index 值。修改取ObjectID
# 2023.12.26 修正。字串格式
# 2023.12.27 修正。字串格式
@app.route('/zonelist', methods=['GET'])
@app.route('/zonelist/<string:gid>', methods=['GET'])
def queryZoneList1(gid=None):
    if gid and gid != "0":
        value = gid
    else:
        value = "all"

    response_data = getZoneIDList(value)  # 群組列表, 回傳值為字典型態

    return jsonify(response_data)


# 新增Zone
# 2023.10.31 新增
@app.route('/set/zone', methods=['POST'])
def setZone():
    if request.is_json:
        request_data = request.get_json()
        # response_data = setControlCode(json.dumps(request_data))
        # response_data = setControlCode(request_data)
        response_data = createZone(request_data)

        return jsonify(response_data)
    else:
        return jsonify({"status": "error", "commit": "The Data dosen't created Fail"})


# 新增 Group
# 2023.11.01 新增
@app.route('/set/group', methods=['POST'])
def setGroup():
    if request.is_json:
        request_data = request.get_json()
        # response_data = setControlCode(json.dumps(request_data))
        # response_data = setControlCode(request_data)
        response_data = createGroup(request_data)

        return jsonify(response_data)
    else:
        return jsonify({"status": "error", "commit": "The Data dosen't created Fail"})


# 更新Zone
# 2023.11.01 新增
@app.route('/update/zone/<int:index>', methods=['PUT'])
def updZone(index):
    if request.is_json:
        request_data = request.get_json()

        response_data = updateZone(request_data, index)

        return jsonify(response_data)
    else:
        return jsonify({"status": "error", "commit": "The setting Fail"})


# 更新Group
# 2023.11.01 新增
@app.route('/update/group/<int:index>', methods=['PUT'])
def updGroup(index):
    if request.is_json:
        request_data = request.get_json()
        # print(index)
        # print(request_data)
        response_data = updateGroup(request_data, index)

        return jsonify(response_data)
    else:
        return jsonify({"status": "error", "commit": "The setting Fail"})


# 刪除Zone
# 2023.11.01 新增
@app.route('/delete/zone/<int:index>', methods=['DELETE'])
def delZone(index):
    response_data = deleteZone(index)

    return jsonify(response_data)


# 刪除Group
# 2023.11.01 新增
@app.route('/delete/group/<int:index>', methods=['DELETE'])
def delGroup(index):
    response_data = deleteGroup(index)

    return jsonify(response_data)


# 新增 Account
# 2023.11.03 新增
@app.route('/set/account', methods=['POST'])
def setAccount():
    if request.is_json:
        request_data = request.get_json()
        # response_data = setControlCode(json.dumps(request_data))
        # response_data = setControlCode(request_data)
        response_data = createAccount(request_data)

        return jsonify(response_data)
    else:
        return jsonify({"status": "error", "commit": "The Data dosen't created Fail"})


# 更新帳號
# 2023.11.01 新增
@app.route('/update/account/<int:index>', methods=['PUT'])
def updAccount(index):
    if request.is_json:
        request_data = request.get_json()

        response_data = updateAccount(request_data, index)

        return jsonify(response_data)
    else:
        return jsonify({"status": "error", "commit": "The setting Fail"})


# 刪除帳號
# 2023.11.01 新增
@app.route('/delete/account/<int:index>', methods=['DELETE'])
def delAccount(index):
    response_data = deleteAccount(index)

    return jsonify(response_data)


# 分析 analysis
# 2023.11.08 新增
# 2023.12.28 修改Group function 。取出ObjectID
@app.route('/analysis', methods=['GET'])
@app.route('/analysis/<int:zone>', methods=['GET'])
@app.route('/analysis/<int:zone>/<int:group>', methods=['GET'])
@login_required
def Analysis(zone=None, group=None):
    if zone:
        value = zone
    else:
        value = 0

    if group:
        value1 = group
    else:
        value1 = 0

    #group_list = getGroupList(0)  # 群組列表, 回傳值為字典型態
    group_list = getGroupIDList("0")  # 群組列表, 回傳值為字典型態
    LocalTime = time.asctime(time.localtime(time.time()))

    item = {
        "zone": value,
        "group": value1,
        "grouplist": group_list['group'],
        "nowTime": LocalTime,
        # "userId": user_id
    }

    return render_template('analysis.html', data=item)


# 取出 analysis Data
# 2023.11.09 新增
@app.route('/get/analysisdata', methods=['POST'])
def getAnalysisDataset():
    if request.is_json:
        request_data = request.get_json()
        # response_data = setControlCode(json.dumps(request_data))
        # response_data = setControlCode(request_data)
        response_data = getAnalysisData(request_data)

        return jsonify(response_data)
    else:
        return jsonify({"status": "error", "commit": "The Data dosen't created Fail"})



# Log 紀錄
# 2023.11.06 新增。Log查詢
@app.route('/logdataset',methods=['GET'])
def queryLog():
    response_data = queryLogRecord()

    return jsonify(response_data)


# Log 紀錄
# 2023.11.07 新增。Log 頁面
@app.route('/log',methods=['GET'])
@login_required
def showLogPage():
    statistics = statisticsGroup('log')
    LocalTime = time.asctime(time.localtime(time.time()))

    item = {
        "total": statistics['total'],
        "nowTime": LocalTime
        # "userId": user_id
    }

    return render_template('log.html', data=item)


# 匯出 Log 紀錄
@app.route('/log/export',methods=['GET'])
def exportLog():
    #response_data = queryLogRecord()
    response_data1 = queryLogRecord1()
    #print( response_data1 )
    # 使用 Flask 的 send_file 函数发送文件
    return send_file('./media/'+response_data1+'.xlsx', as_attachment=True)


# Log 條件搜尋
# 2023.11.30新增
# 2023.12.01新增
@app.route('/get/log',methods=['GET'])
@app.route('/get/log/<string:start>/<string:end>',methods=['GET'])
def searchLog(start=None, end=None):
    #now = datetime.datetime.now()
    #today = now.strftime("%Y-%m-%d")
    today = datetime.date.today()
    #print(today)
    # 起始日期
    startdate = ''
    if start:
        startdate = start
    else:
        startdate = str(today)

    # 結束日期
    endate = ''
    if end:
        #endate = end
        ## 結束時間
        date_object = datetime.datetime.strptime(end, '%Y-%m-%d').date()  ## 轉成<class 'datetime.date'>
        endate = date_object + datetime.timedelta(days=1)
        endate = str(endate)
    else:
        endate = today + datetime.timedelta(days=1)
        endate = str(endate)
        #endate = str(today + datetime.timedelta(days=1))

    response_data = filterhLog(startdate, endate)
    return jsonify(response_data)


# 2023.12.01新增
@app.route('/filter/log', methods=['POST'])
def getLogDataset():
    if request.is_json:
        request_data = request.get_json()
        # response_data = setControlCode(json.dumps(request_data))
        #response_data = setControlCode(request_data)
        response_data = getFilterLogData(request_data)

        return jsonify(response_data)
    else:
        return jsonify({"status": "error", "commit": "The Data dosen't created Fail"})


# 搜尋帳號
# 2023.12.04新增
@app.route('/search/account', methods=['POST'])
def getAccountDataset():
    if request.is_json:
        request_data = request.get_json()
        # response_data = setControlCode(json.dumps(request_data))
        #response_data = setControlCode(request_data)
        response_data = getFilterAccountData(request_data)

        return jsonify(response_data)
    else:
        return jsonify({"status": "error", "commit": "The Data dosen't created Fail"})


# 搜尋Zone
# 2023.12.04新增
@app.route('/filter/zone', methods=['POST'])
def filterZoneDataset():
    if request.is_json:
        request_data = request.get_json()
        # response_data = setControlCode(json.dumps(request_data))
        #response_data = setControlCode(request_data)
        response_data = getFilterZoneData(request_data)

        return jsonify(response_data)
    else:
        return jsonify({"status": "error", "commit": "The Data dosen't created Fail"})


# 搜尋 Group
# 2023.12.04新增
@app.route('/filter/group', methods=['POST'])
def filterGroupDataset():
    if request.is_json:
        request_data = request.get_json()
        # response_data = setControlCode(json.dumps(request_data))
        #response_data = setControlCode(request_data)
        response_data = getFilterGroupData(request_data)

        return jsonify(response_data)
    else:
        return jsonify({"status": "error", "commit": "The Data dosen't created Fail"})



# 搜尋設備
# 2023.12.04新增
@app.route('/filter/equipment', methods=['POST'])
def filterEquipmentDataset():
    if request.is_json:
        request_data = request.get_json()
        # response_data = setControlCode(json.dumps(request_data))
        #response_data = setControlCode(request_data)
        response_data = getFilterEquipmentData(request_data)

        return jsonify(response_data)
    else:
        return jsonify({"status": "error", "commit": "The Data dosen't created Fail"})



# 搜尋裝置
# 2023.12.04新增
@app.route('/filter/device', methods=['POST'])
def filterDeviceDataset():
    if request.is_json:
        request_data = request.get_json()
        # response_data = setControlCode(json.dumps(request_data))
        #response_data = setControlCode(request_data)
        response_data = getFilterDeviceData(request_data)

        return jsonify(response_data)
    else:
        return jsonify({"status": "error", "commit": "The Data dosen't created Fail"})


# Configuration 頁面
# 2023.12.05 新增
# 2023.12.06 新增。套用Collection "config" 基礎設定
@app.route('/configuration', methods=['GET'])
def configSet():
    #statistics = statisticsGroup('zone')
    base = getBaseConfig()
    #print(base)
    LocalTime = time.asctime(time.localtime(time.time()))

    item = {
        #"total": statistics['total'],
        "nowTime": LocalTime,
        "title": base['config']['title'],
        "fileName": base['config']['fileName']
        # "userId": user_id
    }

    return render_template('configuration.html', data=item)


# 上傳設定檔
# 2023.12.05 新增
@app.route('/uploadSetData', methods=['POST'])
def uploadFile():
    if 'fileupload' in request.files:
        # 檢查目錄是否存在
        if os.path.isdir(log_folder) == False:
            os.mkdir(log_folder)

        SaveFile = request.files['fileupload']
        SaveFile.save(log_folder+SaveFile.filename)
        # 現在時間
        now = datetime.datetime.now()
        date_time = now.strftime("%Y%m%d%H%M%S")
        # 使用 os.path.splitext() 取得基本名称和副檔名
        base_name, extension = os.path.splitext(log_folder+SaveFile.filename)
        new_file_path = date_time+extension
        # 使用 os.rename() 更改文件名
        os.rename(log_folder+SaveFile.filename, log_folder+new_file_path)
        # 寫入資料庫
        response_data = baseConfigSetData(request.values['title'], new_file_path)

        return jsonify({"status": "ok"})
    else:
        # 更新標題
        # 寫入資料庫
        response_data = baseConfigSetData(request.values['title'], "None")
        return jsonify({"status": "ok"})



# 定時輪詢系統時間
# 2024.01.17 新增
# 2024.01.25 增加本地時間戳
#@app.route('/getnowtime', methods=['GET'])
@app.route('/getnowtime/<float:float_params>', methods=['GET'])
def getSystemDateTime(float_params):
    #def getSystemDateTime():
    LocalTime = time.asctime(time.localtime(time.time()))
    # 伺服器時間
    timestatus = ''
    now = datetime.datetime.now()
    nowDateTime = now.timestamp()
    gap = round(abs(float_params - nowDateTime))
    #print(gap)
    if gap < datetime_threshold:
        timestatus = "ok"
    else:
        timestatus = "error"

    datatime = {
                "nowTime": LocalTime,
                "timeStatus": timestatus
                }

    return jsonify(datatime)



# 設定主機系統時間
# 2024.02.05 新增
@app.route('/setime', methods=['POST'])
def setHostTime():
    if request.is_json:
        request_data = request.get_json()
        # response_data = setControlCode(json.dumps(request_data))
        # response_data = setControlCode(request_data)
        response_data = sendSendTime(request_data)

        return jsonify(response_data)
    else:
        return jsonify({"status": "error", "commit": "The Data dosen't created Fail"})


# 取出 TimeZone List
# 2024.02.06 新增
@app.route('/timezone', methods=['GET'])
def getTimeZoneList():
    response_data = getSysTimeZoneList()

    return jsonify(response_data)



# 取出 System Time
# 2024.02.06 新增
@app.route('/getsystime', methods=['GET'])
def getSystemTime():
    response_data = getSystemSetTime()

    return jsonify(response_data)



if __name__ == '__main__':
    app.run(host='0.0.0.0')
