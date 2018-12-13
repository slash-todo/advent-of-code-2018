#!/usr/bin/env python3

# Prepare the data
steps = set() # Set of steps
with open("puzzleinput.txt", "r") as file:
    contents = file.readlines()
    for line in contents:  # Pretty sure this could be a one liner
        dependency = line.split(" ")[-3]
        step = line.split(" ")[1]
        steps.add(dependency)
        steps.add(step)
    step_dependencies = {key: list("") for key in steps} # Main dictionary with each steps requirements
    for line in contents:
        dependency = line.split(" ")[1]
        step = line.split(" ")[-3]
        step_dependencies[step].append(dependency) # Populate the dependency section

pt2 = step_dependencies.copy()
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
        break

print("Part 1 answer: ", execution_order)

def Test_Driven_Development_Dot_Exe(execution_order):
    if "GKCNPTVHIRYDUJMSXFBQLOAEWZ" == execution_order:
        print("Good job!")
    else:
        print("You fucked it.")

Test_Driven_Development_Dot_Exe(execution_order)

