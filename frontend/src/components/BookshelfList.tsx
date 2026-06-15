import { BookshelfRow } from "./BookshelfRow";
import type { UserBook } from "@/types/types.ts";

interface BookshelfListProps {
  items: UserBook[];
  onStatusChange: (bookId: number, newStatus: UserBook["status"]) => void;
  onRatingChange: (bookId: number, newRating: UserBook["rating"]) => void;
  onRemove: (bookId: number) => void;
}

const STATUS_CONFIG = [
  { key: "reading", label: "Сейчас читаю" },
  { key: "to_read", label: "Хочу прочитать" },
  { key: "read", label: "Прочитано" },
] as const;

export function BookshelfList({
  items,
  onStatusChange,
  onRatingChange,
  onRemove,
}: BookshelfListProps) {
  const groupedItems = items.reduce(
    (acc, item) => {
      if (!acc[item.status]) acc[item.status] = [];
      acc[item.status].push(item);
      return acc;
    },
    {} as Record<UserBook["status"], UserBook[]>
  );

  if (items.length === 0) {
    return (
      <div className="text-muted-foreground py-12 text-center">
        Your shelf is empty. Please add book to your bookshelf
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {STATUS_CONFIG.map(({ key, label }) => {
        const categoryItems = groupedItems[key as UserBook["status"]] || [];
        if (categoryItems.length === 0) return null;

        return (
          <div key={key} className="space-y-4">
            <div className="flex items-center gap-3 border-b pb-2">
              <h2 className="text-2xl font-bold tracking-tight">{label}</h2>
              <span className="bg-primary/10 text-primary flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium">
                {categoryItems.length}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {categoryItems.map((item) => (
                <BookshelfRow
                  key={item.id}
                  item={item}
                  onStatusChange={onStatusChange}
                  onRatingChange={onRatingChange}
                  onRemove={onRemove}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
