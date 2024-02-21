#!/bin/bash

# 指定要讀取的文本檔案
file_path="ntp.txt"

if [ -f "$file_path" ] ; then
    # 使用 cat 讀取整個檔案的內容
    file_contents=$(cat "$file_path")

    # 顯示檔案內容
    echo "File Contents:"
    echo "$file_contents"
fi


# 检查是否以超级用户权限运行
if [ "$EUID" -ne 0 ]; then
    echo "This script must be run as root."
    exit 1
fi


if [ "$file_contents" == 1 ]; then
    # 執行時間校正
    timedatectl set-ntp true
else
    timedatectl set-ntp false
    set_date=$(date +'%Y-%m-%d')
    #echo "$set_date"
    set_time=$(date +"%T")
    now="$set_date $set_time"
    timedatectl set-time "$now"
    #echo "$now"
fi


# 刪除檔案
#if [ -f "$file_path" ] ; then
#    rm "$file_path"
#fi
