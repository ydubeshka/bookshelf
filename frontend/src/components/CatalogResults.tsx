import { api } from "@/lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { BookList } from "./BookList";
import { Button } from "@/components/ui/button";
import type { Book } from "@/types/types";

interface CatalogResultsProps {
  searchQuery: string;
  genre: string;
  page: number;
  setPage: (page: number) => void;
}

export function CatalogResults({ searchQuery, genre, page, setPage }: CatalogResultsProps) {
  const LIMIT = 9;
  const skip = (page - 1) * LIMIT;

  const { data: books } = useSuspenseQuery<Book[]>({
    queryKey: ["books", searchQuery, genre, page],
    queryFn: async () => {
      const response = await api.get("/books", {
        params: {
          search: searchQuery || undefined,
          genre: genre === "all" ? undefined : genre,
          skip: skip,
          limit: LIMIT,
        },
      });
      return response.data;
    },
  });

  const hasNextPage = books.length === LIMIT;

  if (books.length === 0 && page === 1) {
    return (
      <div className="text-muted-foreground py-12 text-center">
        Can't find any book with "{searchQuery} name."
      </div>
    );
  }

  if (books.length === 0 && page > 1) {
    return (
      <div className="text-muted-foreground space-y-4 py-12 text-center">
        <p>Больше книг в каталоге нет.</p>
        <Button variant="outline" onClick={() => setPage(page - 1)}>
          Go back
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <BookList books={books} />

      {(page > 1 || hasNextPage) && (
        <div className="flex items-center justify-center space-x-4">
          <Button variant="outline" disabled={page === 1} onClick={() => setPage(page - 1)}>
            Back
          </Button>
          <span className="text-muted-foreground text-sm font-medium">Page {page}</span>
          <Button variant="outline" disabled={!hasNextPage} onClick={() => setPage(page + 1)}>
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
