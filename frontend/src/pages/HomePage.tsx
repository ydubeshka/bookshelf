import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { BookList, type Book } from "@/components/BookList.tsx";

export default function HomePage() {
  const { data: books = [], isLoading } = useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: async () => {
      const response = await api.get("/books");
      return response.data;
    },
  });
  if (isLoading) return <h1>loading...</h1>;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Book Catalog</h1>
        <p className="text-muted-foreground">Discover your next great read.</p>
      </div>

      <BookList books={books} />
    </div>
  );
}
