#!/usr/bin/env python3
# Prepare the data

def get_input_dict():
    steps = set() # Set of steps
    with open("puzzleinput.txt", "r") as file:
        contents = file.readlines()
        steps = set([x for x in ''.join(contents).split(" ") if len(x) == 1])
        step_dependencies = {key: list("") for key in steps} # Main dictionary with each steps requirements
        for line in contents:
            line = line.split(" ")
            step_dependencies[line[-3]].append(line[1]) # Populate the dependency section
    return step_dependencies  
 
step_dependencies = get_input_dict()

def remove_step_from_dependencies(step_dependencies, step_to_remove):
    for step, dependency in step_dependencies.items():
        try:
            dependency.remove(step_to_remove)
        except:  
            pass # Errors don't matter 
    return step_dependencies

# Part 1
execution_order = ""
execution_size = len(step_dependencies)
while True:
    for step, dependency in sorted(step_dependencies.copy().items()):
        if len(dependency) == 0: 
            execution_order += step
            del step_dependencies[step]
            step_dependencies = remove_step_from_dependencies(step_dependencies, step)
            break # Start the loop again, to force alphabetical order
    if execution_size == len(execution_order):  
        break # Done

print("Part 1 answer: ", execution_order)

### Part 2
step_dependencies = get_input_dict()
execution_order = ""
executions_waiting = "" # No free workers
executions_underway = {} # Workers working on this
current_time = 0
free_workers = 5

while True:
    """ The worker is a mere function. 
    'The worker puts his life into the object; but now it no longer belongs to him,
     it belongs to the object.' - Karl Marx """
    for step,dependency in sorted(step_dependencies.copy().items()):
        if len(dependency) == 0:
                executions_waiting += step
                del step_dependencies[step]

    # Loop through the queue and assign workers if available
    for step in executions_waiting:
        if free_workers:
            free_workers -= 1
            executions_waiting = sorted(executions_waiting, reverse = True)
            executions_underway[executions_waiting.pop()] = current_time-1 # Start time

    # Check if steps have been completed yet. If not, there will be hell to pay for those elves
    for step, start_time in executions_underway.copy().items():
        completion_time = start_time + 60 + ord(step)-64
        if current_time == completion_time:
            execution_order += step
            del executions_underway[step]
            step_dependencies = remove_step_from_dependencies(step_dependencies, step) 
            free_workers += 1
            
    current_time += 1
    if execution_size == len(execution_order):
        break
    
print("These lazy elves took", current_time, "seconds to finish")
print("Execution order: ", execution_order)