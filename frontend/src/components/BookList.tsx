import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

export interface Author {
  first_name: string;
  last_name: string;
}

export interface Book {
  id: number;
  title: string;
  description: string;
  genre: string;
  published_year: number;
  cover_url?: string | null;
  authors: Author[];
}

interface BookListProps {
  books: Book[];
}

export function BookList({ books }: BookListProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <Card
          key={book.id}
          className="bg-card/50 border-muted/50 hover:bg-card hover:border-border flex flex-col overflow-hidden backdrop-blur-sm transition-all"
        >
          <div className=" flex items-center justify-center p-6">
            {book.cover_url ? (
              <img
                src={book.cover_url}
                alt={`Обложка ${book.title}`}
                className="h-48 w-32 rounded object-cover shadow-md transition-transform hover:scale-105"
              />
            ) : (
              <div className="bg-muted text-muted-foreground flex h-48 w-32 items-center justify-center rounded p-2 text-center text-sm shadow-inner">
                Нет обложки
              </div>
            )}
          </div>

          <CardHeader>
            <div className="min-h-[3rem]">
              <CardTitle className="line-clamp-2">{book.title}</CardTitle>
            </div>
            <CardDescription className="mt-1 truncate">
              {book.authors?.length > 0
                ? book.authors.map((a) => `${a.first_name} ${a.last_name}`).join(", ")
                : "Неизвестный автор"}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex-1 space-y-2">
            <p className="text-primary text-sm font-medium">
              {book.genre} • {book.published_year}
            </p>
          </CardContent>

          <CardFooter>
            <Button asChild className="w-full">
              <Link to={`/books/${book.id}`}>View Details</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
