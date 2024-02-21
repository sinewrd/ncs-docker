import os, datetime, time, json
from flask import Flask, request, jsonify, render_template, send_from_directory, url_for, redirect, flash, send_file
from flask_cors import CORS

app = Flask(__name__)
app.config["DEBUG"] = True
CORS(app)

filePath = "timezonelist.txt"
filePath1 = "systime.txt"

@app.route("/")
def hello():
    return "Hello, World!"


# 設定Time
# 2024.01.31 新增
@app.route('/setime', methods=['POST'])
def setHostTime():
    if request.is_json:
        request_data = request.get_json()

        if "timezone" in request_data:
            cmd = "timedatectl set-timezone \""+request_data['timezone']+"\""
            os.system(cmd)

        
        if request_data['syn'] == "yes":
            cmd = "timedatectl set-ntp true"
            os.system(cmd)

            return jsonify({"status": "ok"})
        elif request_data['syn'] == "no":
            cmd = "timedatectl set-ntp false"
            os.system(cmd) 
            cmd1 = "timedatectl set-time \""+request_data['datetime']+"\""
            os.system(cmd1)

            return jsonify({"status": "ok"})
        else:
            return jsonify({"status": "error", "message": "The data structure is incomplete"})           
    else:
        return jsonify({"status": "error", "commit": "The Post Data is not jsonData type"})    
    


# 取出Timezone List
# 2024.02.06 新增
@app.route('/timezonelist', methods=['GET'])
def getTimeZoneList():
    cmd = "timedatectl list-timezones >"+filePath
    os.system(cmd)


    # Using readlines()
    file1 = open(filePath, 'r')
    Lines = file1.readlines()


    Data =[]
    count = 0
    # Strips the newline character
    for line in Lines:
        item = {'zone': line.strip()}
        Data.append(item)
        #print("Line{}: {}".format(count, line.strip()))
        #count += 1

    dataset = {'data':Data}
    os.remove(filePath)

    return jsonify({"status": "ok", 'data': Data})



# 取出系統時間設定值
# 2024.02.06 新增
@app.route('/getsystemtime', methods=['GET'])
def getSystemTime():
    cmd = "timedatectl >"+filePath1
    os.system(cmd)

    # Using readlines()
    file1 = open(filePath1, 'r')
    Lines = file1.readlines()

    datetime = Lines[0].split(" ")
    timezone = Lines[3].split(" ")
    sync = Lines[4].split(" ")

    payload = {
                "date": datetime[18],
                "time": datetime[19],
                "timezone": timezone[18],
                "sync": sync[3].strip()
            }

    os.remove(filePath1)
    return jsonify({"status": "ok", 'data': payload})        


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5050)   