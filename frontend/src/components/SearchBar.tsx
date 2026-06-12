import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  initialValue: string;
  onSearch: (value: string) => void;
}

export function SearchBar({ initialValue, onSearch }: SearchBarProps) {
  const [inputValue, setInputValue] = useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(inputValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue, onSearch]);

  return (
    <div className="relative w-full max-w-md">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Search className="text-muted-foreground h-5 w-5" />
      </div>
      <Input
        type="text"
        placeholder="Search books..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="pl-10"
      />
    </div>
  );
}
