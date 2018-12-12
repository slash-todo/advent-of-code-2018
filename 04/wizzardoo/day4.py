class Guard:
    def __init__(self, guard_id):
        self.id = guard_id
        self.activity = [0] * 60 # Represents their cumulative 60 minutes
        self.sleep_times = {} # Not in use yet    
        self.time_asleep = 0
        
puzzleinput = [] 
with open("puzzleinput.txt", "r") as file:
    for line in file:
        puzzleinput += [line.replace("\n", "")]

# Entries arent in order
ordered_puzzleinput = sorted(puzzleinput, key = lambda x: x[1:17])


guards = []
asleep_time = None # Let's assume a guard always goes to sleep before they wake up
asleep_minute = None # The minute they fell asleep.
import arrow 
# Alright so python maintainers decided that pre 1900 dates should be dodgy so using arrow. Datetime is a pain in the arse.

for note in ordered_puzzleinput:
    time = arrow.get( note[1:17], 'YYYY-MM-DD HH:mm')
    minute = note[15:17]
    if "#" in note:
        # Bit of a faff here, but if there is a #, a new guard log is starting. We either make a new guard, or check if it is in our previously
        # created "guards" list.
        guard_id = note.split(" ")[-3][1:]
        guard = list(filter(lambda x: x.id == guard_id, guards)) # Return a list of guards where the id equals the current guard on duty.
        if len(guard) == 0: # new guard
            guard = Guard(guard_id) # create guard
        else:
            guard = guard[0] # Get old guard
        guards += [guard]
    if "falls asleep" in note:
        asleep_time = time
        asleep_minute = int(minute)
    if "wakes up" in note:
        sleep_duration = time - asleep_time
        sleep_duration = int(sleep_duration.total_seconds() / 60)
        guard.time_asleep += sleep_duration
        for n in range(0, sleep_duration-1 ): # for each minute asleep, add 1 to each guards 60 entry list
            guard.activity[asleep_minute+n-1] += 1 

# What is the meaning of life? Who is the most asleep guard?
# All this and more below
most_asleep_guard = None
most_asleep_time = 0
for guard in guards:
    if most_asleep_time < guard.time_asleep:
        most_asleep_time = guard.time_asleep
        most_asleep_guard = guard

# Now that we have the most asleep guard....

print("Most asleep guard: #", most_asleep_guard.id)
print("time spent sleeping (total): ", most_asleep_guard.time_asleep)
print("Unreadable activity chart: ", most_asleep_guard.activity) # Fuck

most_sleepy_minute = None
time_asleep_on_minute = 0
for n in range(0, len(most_asleep_guard.activity)):
    if time_asleep_on_minute < most_asleep_guard.activity[n]:
        print(n+1)
        most_sleepy_minute = n+1
        time_asleep_on_minute = most_asleep_guard.activity[n]

    #39 x 2953
print("Part 1 | Minute most asleep: ", most_sleepy_minute, " | Time asleep on that minute : ", time_asleep_on_minute)
print("Answer: ", int(most_asleep_guard.id) * most_sleepy_minute)

# Part two answer...
most_sleepy_minute = None
most_times_asleep = 0
most_sleepy_guard = None
for guard in guards:
    for minute in range(0, len(guard.activity)):
        if most_times_asleep < guard.activity[minute]:
            most_sleepy_guard = guard
            most_times_asleep = guard.activity[minute]
            most_sleepy_minute = minute+1 

print("Part 2. Guard: ", most_sleepy_guard.id, " | most times asleep: ", most_times_asleep, " | Most sleepy minute: " , most_sleepy_minute)
print("Answer : ", int(most_sleepy_guard.id) * most_sleepy_minute)