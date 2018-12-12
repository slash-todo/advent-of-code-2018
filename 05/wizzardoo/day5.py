reagents = ""
with open("puzzleinput.txt", "r") as file:
    reagents = file.read()
 
# So, my thinking here is that we could search through left to right for a match.
# If a match is found, obliterate it, and then check it's left and right neighbours
# I think, that this will mean it only needs to be looped over once, and that should be pretty 
# alright performance wise
# Although I do have some misgivings about immutable strings and garbage collection

def is_match(x, y):
    if x.lower() == y.lower() and x != y: # Abort here if they are the same letter, or identical.
        if x.islower != y.isupper() or x.isupper() != y.islower(): # They have opposite case
                return True
    return False

def main(reagents):
    l_index = 0
    while l_index < len(reagents)-1: 
        is_matching = is_match(reagents[l_index], reagents[l_index+1])        
        if is_matching:
            if l_index == 0:
                reagents = reagents[l_index+2:] # First item 
                l_index += 1 
            else: # Remove the collpased section from string, and move back one index
                reagents = reagents[:l_index] + reagents[l_index+2:]
                l_index -= 3
        l_index += 1 
    return reagents

# Working out why it needs to be run twice would be nice.
reagents = main(reagents)
reagents = main(reagents) 


# Part 2
size_per_letter = {}
smallest = 50000
for letter in range(ord('a'), ord('z')+1):
    reduced_reagent = reagents.replace(chr(letter).lower(), "").replace(chr(letter).upper(), "")
    reduced_reagent = main(reduced_reagent)
    if len(reduced_reagent) < smallest:
        smallest = len(reduced_reagent)
print("Smallest: ", smallest)