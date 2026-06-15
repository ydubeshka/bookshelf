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
import type { Book } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api.ts";
import { BookmarkPlus, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface BookListProps {
  books: Book[];
}

export function BookList({ books }: BookListProps) {
  const queryClient = useQueryClient();

  const addToShelfMutation = useMutation({
    mutationFn: async (bookId: number) => {
      const response = await api.post("/bookshelf/", { book_id: bookId, status: "to_read" });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookshelf"] });
      toast.success("Book successfully added!", {
        description: "Now you can see the book on your bookshelf",
      });
    },
    onError: (error: any) => {
      if (error.response?.status === 400) {
        toast.warning("Already added", {
          description: "This book could not be added.",
        });
      } else {
        toast.error("Server failed.", {
          description: "Can't add this book. Try again later.",
        });
      }
    },
  });

  const handleAddToShelf = (bookId: number) => {
    const isAuthenticated = !!localStorage.getItem("access_token");

    if (!isAuthenticated) {
      toast.error("Access denied", {
        description: "Please log in to add books to your shelf.",
      });
      return;
    }

    addToShelfMutation.mutate(bookId);
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => {
        const isAddingThisBook =
          addToShelfMutation.isPending && addToShelfMutation.variables === book.id;

        return (
          <Card
            key={book.id}
            className="bg-card/50 border-muted/50 hover:bg-card hover:border-border flex flex-col overflow-hidden backdrop-blur-sm transition-all"
          >
            <div className="flex items-center justify-center p-6">
              {book.cover_url ? (
                <img
                  src={book.cover_url}
                  alt={`Обложка ${book.title}`}
                  className="h-48 w-32 rounded object-cover shadow-md transition-transform hover:scale-105"
                />
              ) : (
                <div className="bg-muted text-muted-foreground flex h-48 w-32 items-center justify-center rounded p-2 text-center text-sm shadow-inner">
                  No cover
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
                  : "Unknown author"}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex-1 space-y-2">
              <p className="text-primary text-sm font-medium">
                {book.genre} • {book.published_year}
              </p>
            </CardContent>

            <CardFooter className="flex gap-2">
              <Button asChild variant="secondary" className="flex-3">
                <Link to={`/books/${book.id}`}>Details</Link>
              </Button>

              <Button
                className="flex-1"
                onClick={() => handleAddToShelf(book.id)}
                disabled={isAddingThisBook}
              >
                {isAddingThisBook ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <BookmarkPlus className="mr-2 h-4 w-4" />
                )}
                Shelf
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
