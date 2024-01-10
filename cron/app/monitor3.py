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


# 判斷是否有Collection
# param: 以字串方式傳輸"collection name"
def checkExistCollection(colname):
    # 列出所有集合的名称
    collist = mydb.list_collection_names()

    if colname in collist:
        return "exist"
    else:
        return "no_exist"


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

if __name__ == '__main__':
    main()