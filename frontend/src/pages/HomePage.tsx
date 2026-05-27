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

export default function HomePage() {
  const dummyBooks = [1, 2, 3, 4, 5, 6];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Book Catalog</h1>
        <p className="text-muted-foreground">Discover your next great read.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {dummyBooks.map((book) => (
          <Card
            key={book}
            className="bg-card/50 border-muted/50 hover:bg-card hover:border-border flex flex-col backdrop-blur-sm transition-all"
          >
            <CardHeader>
              <CardTitle>Awesome Book {book}</CardTitle>
              <CardDescription>Author Name</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-muted-foreground line-clamp-3 text-sm">
                This is a short description of the book. Once we connect the backend, real
                descriptions will appear here.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to={`/books/${book}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
