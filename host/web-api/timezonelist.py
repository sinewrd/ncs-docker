import os, json

filePath = "timezonelist.txt"

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
print(json.dumps(dataset))

os.remove(filePath)   