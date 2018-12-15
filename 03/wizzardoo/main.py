claims = []

class Claim:
    def __init__(self, claim_id, offsetH, offsetW, height, width):
        self.id = claim_id
        self.offsetH = offsetH
        self.offsetW = offsetW
        self.height = height
        self.width = width
        self.overlapping = False


rightmost_edge = 0
bottommost_edge = 0

with open("puzzleinput.txt", "r") as file:
    for line in file:
        claim = line.replace("\n", "") # Remove newlines
        claim = claim.split(" ")

        offsetH = int( claim[2].split(",")[0] ) # Example format: 910,975:
        offsetW = int( claim[2].split(",")[1][:-1] ) # This last [:-1] is just to chop off the :

        width = int( claim[3].split("x")[0] )# Example format 27x23
        height = int( claim[3].split("x")[1] )

        # While we are doing this we may as well get the max size of our grid
        right_edge = offsetW + width
        bottom_edge = offsetH + height
        if right_edge > rightmost_edge:
            rightmost_edge = right_edge
        if bottom_edge > bottommost_edge:
            bottommost_edge = bottom_edge

        new_claim = Claim(claim[0], offsetH, offsetW, width, height )
        claims += [new_claim]

print(claims[200].id) # Yep 
print(rightmost_edge)
print(bottommost_edge)

grid = []
for n in range(0, rightmost_edge):
    grid += [[0] * bottommost_edge]


print(len(grid))
print(len(grid[2]))
# In theory we should now have a grid 1013 x 1005 large

print("--------------------")
# Onto the meat.
inches_overshot = 0
for claim in claims:
    for nw in range(claim.offsetH, claim.offsetH + claim.height):
        for nh in range(claim.offsetW, claim.offsetW + claim.width):
            grid[nw][nh] += 1
            if grid[nw][nh] > 1:
                inches_overshot += 1
                claim.overlapping = True

inches_overshot = 0


for claim in claims:
    for nw in range(claim.offsetH, claim.offsetH + claim.height):
        for nh in range(claim.offsetW, claim.offsetW + claim.width):
            grid[nw][nh] += 1
            if grid[nw][nh] > 2:
                inches_overshot += 1
                claim.overlapping = True

for claim in claims:
    if not claim.overlapping:
        print("Part 2: ", claim.id)

overlapping_claims = 0
for w in grid:
    for h in w:
        if h > 1:
            overlapping_claims += 1
            
print("Number of overlapping claims: ", overlapping_claims) 
print("---------------")