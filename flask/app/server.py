#from flask import Flask, render_template, request, send_from_directory, jsonify, url_for, redirect, flash
from flask import Flask, request, jsonify
#from flask_cors import CORS
#from flasgger import Swagger, swag_from

import os, datetime, time
import requests, json, pymongo
#import pandas as pd
#import numpy as np


app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello World!"

## Sensor Data
@app.route('/device/sensor',methods=['POST'])
def receiveSensorData():
    request_data = request.get_json()
    print(request_data)
    # 資料庫
    myclient = pymongo.MongoClient("mongodb://sinew:sinew3612@mongo:27017/")  ##IP需要修改
    mydb = myclient["ncs_500a"]
    mycol = mydb["sensor"]
    ## 現在連線時間
    now = datetime.datetime.today()
    date_time = now.strftime("%Y-%m-%d %H:%M:%S")
    ## 重組Data Payload
    data_payload = {
            'datetime': date_time,
            'id': request_data['id'],
            'pw1': request_data['pw1'],
            'cu1': request_data['cu1'],
            'wh1': request_data['wh1'],
           }

    x = mycol.insert_one(data_payload)
    return jsonify({"status": "ok"})


## get lastest Data
@app.route('/get/device/sensor',methods=['GET'])
def getSensorData():
    # 資料庫
    myclient = pymongo.MongoClient("mongodb://sinew:sinew3612@mongo:27017/")  ##IP需要修改
    mydb = myclient["ncs_500a"]
    mycol = mydb["sensor"]

    # 使用 sort 方法進行排序
    sorted_data = mycol.find().sort('datetime', -1)
    doc = next(sorted_data)
    print( type(doc) )
    data = {
             'datetime': doc['datetime'],
             'id': doc['id'],
             'pw1': doc['pw1'],
             'cu1': doc['cu1'],
             'wh1': doc['wh1']
           }
    return jsonify( data )


if __name__ == '__main__':
    app.run(host='0.0.0.0')
