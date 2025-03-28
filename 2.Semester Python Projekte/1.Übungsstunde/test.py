import json
import os
import tkinter as tk
from tkinter import messagebox, simpledialog

class Library:
    def __init__(self, library_path):
        self.library_path = library_path
        if not os.path.exists(library_path):
            os.makedirs(library_path)

    def add_book(self, title, author):
        book = {
            'title': title,
            'author': author
        }
        book_filename = f"{title.replace(' ', '_')}.json"
        book_path = os.path.join(self.library_path, book_filename)
        with open(book_path, 'w') as book_file:
            json.dump(book, book_file)
        print(f"Book '{title}' added to library.")
        messagebox.showinfo("Info", f"Book '{title}' added to library.")

    def delete_book(self, title):
        book_filename = f"{title.replace(' ', '_')}.json"
        book_path = os.path.join(self.library_path, book_filename)
        if os.path.exists(book_path):
            os.remove(book_path)
            print(f"Book '{title}' deleted from library.")
            messagebox.showinfo("Info", f"Book '{title}' deleted from library.")
        else:
            print(f"Book '{title}' not found in library.")
            messagebox.showerror("Error", f"Book '{title}' not found in library.")

    def edit_book(self, old_title, new_title=None, new_author=None):
        old_book_filename = f"{old_title.replace(' ', '_')}.json"
        old_book_path = os.path.join(self.library_path, old_book_filename)
        if os.path.exists(old_book_path):
            with open(old_book_path, 'r') as book_file:
                book = json.load(book_file)
            if new_title:
                book['title'] = new_title
                new_book_filename = f"{new_title.replace(' ', '_')}.json"
            else:
                new_book_filename = old_book_filename
            if new_author:
                book['author'] = new_author
            new_book_path = os.path.join(self.library_path, new_book_filename)
            with open(new_book_path, 'w') as book_file:
                json.dump(book, book_file)
            if new_book_filename != old_book_filename:
                os.remove(old_book_path)
            print(f"Book '{old_title}' edited in library.")
            messagebox.showinfo("Info", f"Book '{old_title}' edited in library.")
        else:
            print(f"Book '{old_title}' not found in library.")
            messagebox.showerror("Error", f"Book '{old_title}' not found in library.")

class LibraryApp:
    def __init__(self, root, library):
        self.library = library
        self.root = root
        self.root.title("Library Management")

        self.add_button = tk.Button(root, text="Add Book", command=self.add_book)
        self.add_button.pack(pady=5)

        self.delete_button = tk.Button(root, text="Delete Book", command=self.delete_book)
        self.delete_button.pack(pady=5)

        self.edit_button = tk.Button(root, text="Edit Book", command=self.edit_book)
        self.edit_button.pack(pady=5)

    def add_book(self):
        title = simpledialog.askstring("Input", "Enter book title:")
        author = simpledialog.askstring("Input", "Enter book author:")
        if title and author:
            self.library.add_book(title, author)

    def delete_book(self):
        title = simpledialog.askstring("Input", "Enter book title to delete:")
        if title:
            self.library.delete_book(title)

    def edit_book(self):
        old_title = simpledialog.askstring("Input", "Enter current book title:")
        new_title = simpledialog.askstring("Input", "Enter new book title (leave blank to keep current):")
        new_author = simpledialog.askstring("Input", "Enter new book author (leave blank to keep current):")
        if old_title:
            self.library.edit_book(old_title, new_title, new_author)

# Example usage
library = Library('library')

root = tk.Tk()
app = LibraryApp(root, library)
root.mainloop()