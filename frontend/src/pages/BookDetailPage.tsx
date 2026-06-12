import { Button } from "@/components/ui/button";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

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

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>();

  const {
    data: book,
    isLoading,
    isError,
  } = useQuery<Book>({
    queryKey: ["book", id],
    queryFn: async () => {
      const response = await api.get(`/books/${id}`);
      return response.data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return <div className="py-12 text-center text-xl">Загрузка информации о книге...</div>;
  }

  if (isError || !book) {
    return (
      <div className="space-y-4 py-12 text-center">
        <h2 className="text-2xl font-bold">Книга не найдена</h2>
        <Button asChild>
          <Link to="/">Вернуться в каталог</Link>
        </Button>
      </div>
    );
  }

  const authorNames =
    book.authors?.length > 0
      ? book.authors.map((a) => `${a.first_name} ${a.last_name}`).join(", ")
      : "Неизвестный автор";

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <Button variant="outline" asChild className="text-muted-foreground">
        <Link to="/">← Back to Catalog</Link>
      </Button>

      <div className="flex flex-col gap-8 md:flex-row lg:gap-12">
        <div className="bg-muted/30 border-muted/50 flex aspect-[2/3] w-full items-center justify-center overflow-hidden rounded-xl border shadow-lg md:w-1/3">
          {book.cover_url ? (
            <img
              src={book.cover_url}
              alt={`Обложка ${book.title}`}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <span className="text-muted-foreground font-medium">No Cover</span>
          )}
        </div>

        <div className="mt-4 flex-1 space-y-6 md:mt-0">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">{book.title}</h1>
            <p className="text-muted-foreground mt-2 text-xl">
              {authorNames} {book.published_year && `• ${book.published_year}`}
            </p>
          </div>

          {book.genre && (
            <div className="flex items-center gap-4">
              <span className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-xs font-semibold tracking-wider uppercase">
                {book.genre}
              </span>
            </div>
          )}

          <p className="text-foreground/80 text-lg leading-relaxed">
            {book.description || "Описание для этой книги пока не добавлено."}
          </p>

          <div className="border-muted/50 border-t pt-6">
            <Button size="lg" className="w-full font-semibold sm:w-auto">
              Add to My Shelf
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
