import json
import tkinter
from tkinter import *
root = Tk()
root.title("Library Editor")
button = tkinter.Button(root, text="Add Book", width=25, command=root.destroy)
button.pack()
root.mainloop()

class Library:

    lib_default_filename = "library.json"
    fh = open(lib_default_filename,"r")
    library = json.load(fh)
    fh.close()


    def load_library():
        print("Which Library you want to load?")
        chosenlib = input()
        with open (chosenlib , "r") as loaded_lib:
            library = loaded_lib.read()

    def add_book():
        new_book = {}
        new_book["author"] = input("author: ")
        new_book["title"] = input("title: ")
        new_book["year"] = input("year: ")
        library[new_book["title"]] = new_book
        with open("library.json", "w") as outfile:
            json.dump(library, outfile, indent=4)

    def del_book():
        print("Please insert the Title of the Book you want to delete:")
        deltitle = input()
        with (open("library.json", "r") as file):
            data = json.load(file)
        if deltitle in data:
            del data[deltitle]
        with open("library.json", "w") as file:
            json.dump(data, file, indent=4)


    def show_lib():
        print(library)

}