import asyncio
from src.database.database import async_sessionmaker

from src.modules.users.model import User
from src.modules.authors.model import Author
from src.modules.books.model import Book
from src.modules.bookshelf.model import UserBook

AUTHORS_DATA = [
    # Co-authors (6 people)
    {"first_name": "Neil", "last_name": "Gaiman"},
    {"first_name": "Terry", "last_name": "Pratchett"},
    {"first_name": "Stephen", "last_name": "King"},
    {"first_name": "Peter", "last_name": "Straub"},
    {"first_name": "Arkady", "last_name": "Strugatsky"},
    {"first_name": "Boris", "last_name": "Strugatsky"},
    # Solo authors
    {"first_name": "J.K.", "last_name": "Rowling"},
    {"first_name": "J.R.R.", "last_name": "Tolkien"},
    {"first_name": "George", "last_name": "Orwell"},
    {"first_name": "Ray", "last_name": "Bradbury"},
    {"first_name": "Isaac", "last_name": "Asimov"},
    {"first_name": "Arthur C.", "last_name": "Clarke"},
    {"first_name": "Frank", "last_name": "Herbert"},
    {"first_name": "Agatha", "last_name": "Christie"},
    {"first_name": "Fyodor", "last_name": "Dostoevsky"},
    {"first_name": "Leo", "last_name": "Tolstoy"},
    {"first_name": "Jane", "last_name": "Austen"},
    {"first_name": "Mark", "last_name": "Twain"},
    {"first_name": "Ernest", "last_name": "Hemingway"},
    {"first_name": "F. Scott", "last_name": "Fitzgerald"},
]

BOOKS_DATA = [
    # --- 3 BOOKS WITH 2 AUTHORS ---
    {
        "title": "Good Omens",
        "description": "An angel and a demon team up to prevent the apocalypse.",
        "genre": "Fantasy", "published_year": 1990,
        "author_names": [("Neil", "Gaiman"), ("Terry", "Pratchett")],
        "cover_url": "https://ecsmedia.pl/cdn-cgi/image/format=avif,/c/good-omens-b-iext197432680.jpg"
    },
    {
        "title": "The Talisman",
        "description": "A boy travels to a parallel world to save his mother.",
        "genre": "Horror", "published_year": 1984,
        "author_names": [("Stephen", "King"), ("Peter", "Straub")],
        "cover_url": "https://www.hachette.co.uk/wp-content/uploads/2019/01/hbg-title-the-talisman-189.jpg?resize=440,675"
    },
    {
        "title": "Roadside Picnic",
        "description": "Stalker Redrick Schuhart illegally sneaks into the Visitation Zone.",
        "genre": "Sci-Fi", "published_year": 1972,
        "author_names": [("Arkady", "Strugatsky"), ("Boris", "Strugatsky")],
        "cover_url": "https://m.media-amazon.com/images/I/71C2ywH8NuL._SL1400_.jpg"
    },
    # --- 17 BOOKS WITH 1 AUTHOR ---
    {
        "title": "Harry Potter and the Sorcerer's Stone",
        "description": "A boy learns he is a wizard.",
        "genre": "Fantasy", "published_year": 1997,
        "author_names": [("J.K.", "Rowling")],
        "cover_url": "https://i.archi.ru/i/350286.jpg"
    },
    {
        "title": "The Lord of the Rings: The Fellowship of the Ring",
        "description": "The beginning of a great quest to destroy the One Ring.",
        "genre": "Fantasy", "published_year": 1954,
        "author_names": [("J.R.R.", "Tolkien")],
        "cover_url": "https://m.media-amazon.com/images/I/81NJTjH8EcL._SL1500_.jpg"
    },
    {
        "title": "1984",
        "description": "A dystopia about a totalitarian society and Big Brother.",
        "genre": "Dystopia", "published_year": 1949,
        "author_names": [("George", "Orwell")],
        "cover_url": "https://m.media-amazon.com/images/I/61HkdyBpKOL._SL1200_.jpg"
    },
    {
        "title": "Fahrenheit 451",
        "description": "A world where firemen burn books.",
        "genre": "Dystopia", "published_year": 1953,
        "author_names": [("Ray", "Bradbury")],
        "cover_url": "https://m.media-amazon.com/images/I/61sKsbPb5GL._SL1500_.jpg"
    },
    {
        "title": "Foundation",
        "description": "A scientist creates a plan to save humanity after the fall of the Galactic Empire.",
        "genre": "Sci-Fi", "published_year": 1951,
        "author_names": [("Isaac", "Asimov")],
        "cover_url": "https://m.media-amazon.com/images/I/81J4LjdqQFL._SL1500_.jpg"
    },
    {
        "title": "2001: A Space Odyssey",
        "description": "An expedition to Saturn and a conflict with the AI HAL 9000.",
        "genre": "Sci-Fi", "published_year": 1968,
        "author_names": [("Arthur C.", "Clarke")],
        "cover_url": "https://m.media-amazon.com/images/I/71v0Uz2n2GL._SL1500_.jpg"
    },
    {
        "title": "Dune",
        "description": "Political struggle for the planet Arrakis and control over the spice.",
        "genre": "Sci-Fi", "published_year": 1965,
        "author_names": [("Frank", "Herbert")],
        "cover_url": "https://m.media-amazon.com/images/I/81Ua99CURsL._SL1500_.jpg"
    },
    {
        "title": "Murder on the Orient Express",
        "description": "Hercule Poirot investigates a murder on the famous train.",
        "genre": "Mystery", "published_year": 1934,
        "author_names": [("Agatha", "Christie")],
        "cover_url": "https://bonito.pl/cache/5/f8b27a4-murder-on-the-orient_800.webp"
    },
    {
        "title": "Crime and Punishment",
        "description": "The story of Rodion Raskolnikov and his agonizing search for justification.",
        "genre": "Classic", "published_year": 1866,
        "author_names": [("Fyodor", "Dostoevsky")],
        "cover_url": "https://cdn.kobo.com/book-images/2293d740-178e-4da1-a849-b11d6308fbaa/353/569/90/False/crime-and-punishment-35.jpg"
    },
    {
        "title": "War and Peace",
        "description": "An epic canvas of Russia during the Napoleonic wars.",
        "genre": "Classic", "published_year": 1869,
        "author_names": [("Leo", "Tolstoy")],
        "cover_url": "https://www.worldofbooks.com/cdn/shop/files/0199589143.jpg?v=1751037846&width=493"
    },
    {
        "title": "Pride and Prejudice",
        "description": "The love story of Elizabeth Bennet and Mr. Darcy.",
        "genre": "Romance", "published_year": 1813,
        "author_names": [("Jane", "Austen")],
        "cover_url": "https://m.media-amazon.com/images/I/81a3sr-RgdL._SY425_.jpg"
    },
    {
        "title": "The Adventures of Tom Sawyer",
        "description": "The life and adventures of a mischievous boy on the banks of the Mississippi.",
        "genre": "Adventure", "published_year": 1876,
        "author_names": [("Mark", "Twain")],
        "cover_url": "https://cdn.swiatksiazki.pl/media/catalog/product/x/4/x499907183404.jpg?store=default&image-type=large"
    },
    {
        "title": "The Old Man and the Sea",
        "description": "An old Cuban fisherman's struggle with a giant marlin.",
        "genre": "Novella", "published_year": 1952,
        "author_names": [("Ernest", "Hemingway")],
        "cover_url": "https://cdn2.penguin.com.au/covers/original/9780099273967.jpg"
    },
    {
        "title": "The Great Gatsby",
        "description": "A story of wealth, love, and the American Dream in the Jazz Age.",
        "genre": "Classic", "published_year": 1925,
        "author_names": [("F. Scott", "Fitzgerald")],
        "cover_url": "https://m.media-amazon.com/images/I/41C6QxeWpyL._SY445_SX342_ML2_.jpg"
    },
    {
        "title": "The Shining",
        "description": "A family stays for the winter in an isolated hotel haunted by evil forces.",
        "genre": "Horror", "published_year": 1977,
        "author_names": [("Stephen", "King")],
        "cover_url": "https://m.media-amazon.com/images/I/41vkFzHWR7L._SY445_SX342_ML2_.jpg"
    },
    {
        "title": "The Dead Zone",
        "description": "A teacher wakes up from a coma with the gift of clairvoyance.",
        "genre": "Thriller", "published_year": 1979,
        "author_names": [("Stephen", "King")],
        "cover_url": "https://www.worldofbooks.com/cdn/shop/files/1501144502.jpg?v=1750989725&width=493"
    },
    {
        "title": "It",
        "description": "A group of children confronts an ancient evil in the form of a clown.",
        "genre": "Horror", "published_year": 1986,
        "author_names": [("Stephen", "King")],
        "cover_url": "https://m.media-amazon.com/images/I/71zwC11HuKL._SY466_.jpg"
    }
]


async def seed_data():
    print("Starting database population...")

    async with async_sessionmaker() as session:
        author_objects = {}
        for a_data in AUTHORS_DATA:
            author = Author(
                first_name=a_data["first_name"],
                last_name=a_data["last_name"]
            )
            session.add(author)
            author_objects[(a_data["first_name"], a_data["last_name"])] = author

        await session.commit()
        print(f"Successfully added {len(AUTHORS_DATA)} authors.")

        for b_data in BOOKS_DATA:
            book = Book(
                title=b_data["title"],
                description=b_data["description"],
                genre=b_data["genre"],
                published_year=b_data["published_year"],
                cover_url=b_data.get("cover_url")
            )

            for author_key in b_data["author_names"]:
                author_obj = author_objects.get(author_key)
                if author_obj:
                    book.authors.append(author_obj)

            session.add(book)

        await session.commit()
        print(f"Successfully added {len(BOOKS_DATA)} books, author relations established!")


if __name__ == "__main__":
    asyncio.run(seed_data())