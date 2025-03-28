import json

#funktion zum lesen einer datei
def read_file(filename) :
	with open(filename, "r") as file:
		return json.loads(file.read())

#eine liste für den inhalt aller dateien und eine für die namen aller teammitglieder
content_merged = []
team_members = ["Timmy_Bauer", "Christian_Stremel", "Tim_Fastert"]

#hier werden alle drei jsons eingelesen und deren inhalt wird in der entsprechenden liste gespeichert
for team_member in team_members:
	content_merged.append(read_file(team_member + ".json"))

#hier wird der name der finalen datei generiert, indem die namen aus der liste entsprechend zusammengefügt werden
final_filename = str("Team_")

for name in team_members:
	final_filename += str(name.split("_")[0])
	if name != team_members[-1]:
		final_filename += "_"

final_filename+=".json"

#fertige datei wird ausgegeben und erstellt
print(content_merged)

with open(final_filename, "w") as file:
	json.dump(content_merged, file, indent=4)
