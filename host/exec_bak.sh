#!/bin/bash

# 指定要讀取的文本檔案
file_path="datetime.txt"

# 使用 cat 讀取整個檔案的內容
file_contents=$(cat "$file_path")

# 顯示檔案內容
#echo "File Contents:"
#echo "$file_contents"

# 指定新的系統時間
#new_time="$file_contents"

# 使用 date 命令設置系統時間
sudo date --set="$new_time"

# 顯示設置後的系統時間
echo "系統時間已設置為：$(date)"
