export interface Author {
  first_name: string;
  last_name: string;
}

type Status = 'read' | 'reading' | 'to_read';
type Rating = 1 | 2 | 3 | 4 | 5 | null;

export interface Book {
  id: number;
  title: string;
  description: string;
  genre: string;
  published_year: number;
  cover_url?: string | null;
  authors: Author[];
}

export interface UserBook {
  book: Book;
  id: number;
  book_id: number;
  rating: Rating;
  status: Status;
}