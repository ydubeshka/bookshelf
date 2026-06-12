import { useState, Suspense } from "react";
import { SearchBar } from "@/components/SearchBar";
import { BookListSkeleton } from "@/components/BookListSkeleton";
import { CatalogResults } from "@/components/CatalogResults";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [genre, setGenre] = useState("all");
  const [page, setPage] = useState(1);

  const handleSearch = (newQuery: string) => {
    setSearchQuery(newQuery);
    setPage(1);
  };

  const handleGenreChange = (newGenre: string) => {
    setGenre(newGenre);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Book Catalog</h1>
          <p className="text-muted-foreground">Discover your next great read.</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Select value={genre} onValueChange={handleGenreChange}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Выберите жанр" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All genres</SelectItem>
              <SelectItem value="Fantasy">Fantasy</SelectItem>
              <SelectItem value="Sci-Fi">Sci-Fi</SelectItem>
              <SelectItem value="Horror">Horror</SelectItem>
              <SelectItem value="Classic">Classic</SelectItem>
              <SelectItem value="Dystopia">Dystopia</SelectItem>
              <SelectItem value="Mystery">Mystery</SelectItem>
              <SelectItem value="Romance">Romance</SelectItem>
              <SelectItem value="Adventure">Adventure</SelectItem>
              <SelectItem value="Thriller">Thriller</SelectItem>
            </SelectContent>
          </Select>

          <SearchBar initialValue={searchQuery} onSearch={handleSearch} />
        </div>
      </div>

      <Suspense fallback={<BookListSkeleton />}>
        <CatalogResults
          searchQuery={searchQuery}
          genre={genre} // 🌟 Передаем жанр вниз
          page={page}
          setPage={setPage}
        />
      </Suspense>
    </div>
  );
}
