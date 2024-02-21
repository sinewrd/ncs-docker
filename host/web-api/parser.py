import os, json

filePath = "info.txt"

cmd = "timedatectl >"+filePath
os.system(cmd)

# Using readlines()
file1 = open(filePath, 'r')
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
print(json.dumps(payload))


""" 
count = 0
# Strips the newline character
for line in Lines:    
    print("Line{}: {}".format(count, line.strip()))
    count += 1
"""

os.remove(filePath)    