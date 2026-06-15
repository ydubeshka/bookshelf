import { api } from "@/lib/api.ts";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BookshelfList } from "@/components/BookshelfList";
import type { UserBook } from "@/types/types.ts";

export default function BookshelfPage() {
  const queryClient = useQueryClient();

  const { data: books = [], isLoading } = useQuery<UserBook[]>({
    queryKey: ["bookshelf"],
    queryFn: async () => {
      const response = await api.get("/bookshelf");
      return response.data;
    },
  });

  const updateBookMutation = useMutation({
    mutationFn: async ({ bookId, updates }: { bookId: number; updates: Partial<UserBook> }) => {
      const response = await api.patch(`/bookshelf/${bookId}`, updates);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookshelf"] });
    },
  });

  const removeBookMutation = useMutation({
    mutationFn: async (bookId: number) => {
      await api.delete(`/bookshelf/${bookId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookshelf"] });
    },
  });

  const handleStatusChange = (bookId: number, newStatus: UserBook["status"]) => {
    updateBookMutation.mutate({ bookId, updates: { status: newStatus } });
  };

  const handleRatingChange = (bookId: number, newRating: UserBook["rating"]) => {
    updateBookMutation.mutate({ bookId, updates: { rating: newRating } });
  };

  const handleRemove = (bookId: number) => {
    if (window.confirm("Are you sure you want to remove this book from your shelf?")) {
      removeBookMutation.mutate(bookId);
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl py-12 text-center text-xl">Loading your bookshelf...</div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Bookshelf</h1>
        <p className="text-muted-foreground mt-2">Manage your reading progress and ratings.</p>
      </div>

      <BookshelfList
        items={books}
        onStatusChange={handleStatusChange}
        onRatingChange={handleRatingChange}
        onRemove={handleRemove}
      />
    </div>
  );
}
