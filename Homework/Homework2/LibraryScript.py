import json
import tkinter as tk
from tkinter import filedialog


class Library:
    lib_default_filename = "Library.json"  # Standard Name für die Bibliothek
    library = {}


    @staticmethod
    def save_library():
        filename = filedialog.asksaveasfilename(defaultextension=".json", filetypes=[("JSON files", "*.json")],
                                                initialfile=Library.lib_default_filename)
        if filename:
            with open(filename, "w") as file:
                json.dump(Library.library, file, indent=4)
            print(f"Library saved to {filename}")

    @staticmethod
    def load_library():
        # Öffnet den Dateiexplorer und lädt eine Datei
        filename = filedialog.askopenfilename(filetypes=[("JSON files", "*.json")])
        if filename:
            try:
                with open(filename, "r") as file:
                    Library.library = json.load(file)
                print(f"Library loaded from {filename}")
            except Exception as e:
                print(f"Failed to load library: {e}")

    @staticmethod
    def add_book_window():
        add_window = tk.Toplevel()
        add_window.title("Add Book")

        tk.Label(add_window, text="Author:").pack()
        author_entry = tk.Entry(add_window)
        author_entry.pack()

        tk.Label(add_window, text="Title:").pack()
        title_entry = tk.Entry(add_window)
        title_entry.pack()

        tk.Label(add_window, text="Year:").pack()
        year_entry = tk.Entry(add_window)
        year_entry.pack()

        def add_book():
            author = author_entry.get()
            title = title_entry.get()
            year = year_entry.get()
            new_book = {"author": author, "title": title, "year": year}

            # Wenn es noch keine Bibliothek gibt, wird sie erstellt
            if not Library.library:
                Library.library = {}

            Library.library[title] = new_book
            add_window.destroy()

        tk.Button(add_window, text="Add", command=add_book).pack()

    @staticmethod
    def del_book_window():
        # Neues Fenster für das Löschen eines Buches
        del_window = tk.Toplevel()
        del_window.title("Delete Book")

        tk.Label(del_window, text="Enter Book Title to Delete:").pack()
        title_entry = tk.Entry(del_window)
        title_entry.pack()

        def delete_book():
            title = title_entry.get()
            if title in Library.library:
                del Library.library[title]
                del_window.destroy()
            else:
                del_window2 = tk.Toplevel()
                tk.Label(del_window2, text="Book title not found").pack()

        tk.Button(del_window, text="Delete", command=delete_book).pack()

    @staticmethod
    def show_lib():
        # Bibliothek anzeigen
        for book in Library.library.values():
            print(f"Title: {book['title']}, Author: {book['author']}, Year: {book['year']}")

    @staticmethod
    def show_lib_window():
        # Neues Fenster für die Anzeige der Bibliothek
        show_window = tk.Toplevel()
        show_window.title("Library")

        text = tk.Text(show_window, height=15, width=50)
        text.pack()

        for book in Library.library.values():
            text.insert(tk.END, f"Title: {book['title']}, Author: {book['author']}, Year: {book['year']}\n")

        text.config(state=tk.DISABLED)


# Hauptfenster
root = tk.Tk()
root.geometry("400x300")
root.title("Library Editor")

# Buttons für die verschiedenen Aktionen
buttonadd = tk.Button(root, text="Add Book", width=50, command=Library.add_book_window)
buttondel = tk.Button(root, text="Delete Book", width=50, command=Library.del_book_window)
buttonshow = tk.Button(root, text="Show Library", width=50, command=Library.show_lib_window)
buttonsave = tk.Button(root, text="Save Library", width=50, command=Library.save_library)
buttonload = tk.Button(root, text="Load Library", width=50, command=Library.load_library)
buttonquit = tk.Button(root, text="Quit", width=50, command=root.quit)

# Buttons packen
buttonadd.pack(pady=10)
buttondel.pack(pady=10)
buttonshow.pack(pady=10)
buttonsave.pack(pady=10)
buttonload.pack(pady=10)
buttonquit.pack(pady=10)

root.mainloop()
