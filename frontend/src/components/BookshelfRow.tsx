import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import type { UserBook } from "@/types/types.ts";

interface BookshelfRowProps {
  item: UserBook;
  onStatusChange: (id: number, newStatus: UserBook["status"]) => void;
  onRatingChange: (id: number, newRating: UserBook["rating"]) => void;
  onRemove: (id: number) => void;
}

export function BookshelfRow({
  item,
  onStatusChange,
  onRatingChange,
  onRemove,
}: BookshelfRowProps) {
  const { book, status, rating, book_id } = item;

  return (
    <div className="bg-card/50 border-muted/50 hover:bg-card flex flex-col items-center gap-6 rounded-lg border p-4 transition-colors sm:flex-row">
      <Link to={`/books/${book_id}`} className="shrink-0">
        {book.cover_url ? (
          <img
            src={book.cover_url}
            alt={book.title}
            className="h-24 w-16 rounded object-cover shadow-sm transition-transform hover:scale-105"
          />
        ) : (
          <div className="bg-muted text-muted-foreground flex h-24 w-16 items-center justify-center rounded p-1 text-center text-xs shadow-inner">
            No cover
          </div>
        )}
      </Link>
      <div className="min-w-0 flex-1 space-y-1 text-center sm:text-left">
        <Link to={`/books/${book_id}`} className="hover:underline">
          <h3 className="truncate text-lg font-bold">{book.title}</h3>
        </Link>
        <p className="text-muted-foreground truncate text-sm">
          {book.authors?.length > 0
            ? book.authors.map((a) => `${a.first_name} ${a.last_name}`).join(", ")
            : "Unknown author"}
        </p>
        <p className="text-primary text-xs font-medium">{book.published_year}</p>
      </div>

      <div className="flex shrink-0 flex-wrap items-center justify-center gap-3 sm:justify-end">
        <Select
          value={status}
          onValueChange={(val) => onStatusChange(book_id, val as UserBook["status"])}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="to_read">want to read</SelectItem>
            <SelectItem value="reading">reading</SelectItem>
            <SelectItem value="read">read</SelectItem>
          </SelectContent>
        </Select>

        {status === "read" && (
          <Select
            value={rating ? rating.toString() : "unrated"}
            onValueChange={(val) => onRatingChange(book_id, val === "unrated" ? null : Number(val) as UserBook["rating"])}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unrated">not rated</SelectItem>
              <SelectItem value="5">5 ⭐</SelectItem>
              <SelectItem value="4">4 ⭐</SelectItem>
              <SelectItem value="3">3 ⭐</SelectItem>
              <SelectItem value="2">2 ⭐</SelectItem>
              <SelectItem value="1">1 ⭐</SelectItem>
            </SelectContent>
          </Select>
        )}

        <Button variant="destructive" size="icon" onClick={() => onRemove(book_id)} title="Delete">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
