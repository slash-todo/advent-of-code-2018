crate_ids = []
with open("checksums.txt", "r") as file:
    for line in file:
        crate_ids += [line.replace("\n", "")]


def get_letter_reoccurences(item, number):
    occurences = 0
    for i in item:
        if item.count(i) == number:
            occurences = 1
    return occurences

def generate_checksum(id_list):
    duplicates = 0
    triplicates = 0
    for item in id_list:
        duplicates += get_letter_reoccurences(item, 2)
        triplicates += get_letter_reoccurences(item, 3)
    checksum = duplicates * triplicates
    return checksum 

output = generate_checksum(crate_ids)
print(output)  

import difflib
def similar_ids(id_list):
    for firstID in id_list:
        for secondID in id_list:
            output_item = [li for li in difflib.ndiff(firstID, secondID) if li[0] != ' ']
            if len(output_item) == 2:
                return  (firstID, secondID, output_item)


output = similar_ids(crate_ids)
print(output)  