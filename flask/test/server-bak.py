#from flask import Flask, render_template, request, send_from_directory, jsonify, url_for, redirect, flash
from flask import Flask, request, jsonify
#from flask_cors import CORS
#from flasgger import Swagger, swag_from
from devicefunc import processDeviceCMD, process, getStatistics

import os, datetime, time
import requests, json, pymongo
#import pandas as pd
#import numpy as np


app = Flask(__name__)
app.config["DEBUG"] = True

@app.route('/')
def hello():
    return "Hello World!"


## power meter Data 裝置接收的資料
@app.route('/device/power_meter',methods=['POST'])
def receiveSensorData():
    request_data = request.get_json()
    #keylist = list(request_data.keys())
    #print(request_data)
    if request.is_json:
       response_data = process(json.dumps(request_data))

       return jsonify(response_data)
    else:
        return jsonify({"status": "error", "commit": "The Post Data is not jsonData type"})


# get Device usage and power statistics
@app.route('/get/device/<string:devid>',methods=['GET'])
def getStatisticsData(devid): 
    response_data = getStatistics(devid)

    return jsonify(response_data)




## 以下測試
# get lastest Data
@app.route('/get/device/power_meter',methods=['GET'])
def getSensorData():
    # 資料庫
    myclient = pymongo.MongoClient("mongodb://sinew:sinew3612@34.81.61.172:27018/")  ##IP需要修改
    mydb = myclient["ncs"]
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
