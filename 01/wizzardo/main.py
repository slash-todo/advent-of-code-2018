frequency_list = []
with open("puzzleinput.txt", "r") as file:
    for line in file:
        frequency_list += [line.replace("\n", "")]
    
total = 0
for change in frequency_list:
    if change[0] == "-":
        total -= int(change[1:])
    else:
        total += int(change[1:])

print("Final frequency is: ", total)

# second part

frequencies = []
total = 0
run = True
while run:
    for change in frequency_list:
        if change[0] == "-":
            total -= int(change[1:])
        else:
            total += int(change[1:])
        if int(total) in frequencies:
            print("First repeat..." , total)
            run = False
            break
        frequencies += [int(total)]

#print(frequencies)

  