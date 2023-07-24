NCS-500A Docker 環境建置

版本: v1.0.0

說明:

透過nginx 80 Port 轉向到 Flask 5000 Port

======================================================

修改日期: 2023-07-24

版本: v1.1.0

說明:

1. 修改 Flask Dockerfile。
   
   (系統時區和時間校正問題)

2. server.py 新增資料加入連線時間


3. server.py 新增 查詢最後一筆資料。

   uri : /get/device/sensor