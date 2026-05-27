import { Button } from "@/components/ui/button";
import { useParams, Link } from "react-router-dom";

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <Button variant="outline" asChild className="text-muted-foreground">
        <Link to="/">← Back to Catalog</Link>
      </Button>

      <div className="flex flex-col gap-8 md:flex-row lg:gap-12">
        <div className="bg-muted/30 border-muted/50 flex aspect-[2/3] w-full items-center justify-center rounded-xl border md:w-1/3">
          <span className="text-muted-foreground font-medium">No Cover</span>
        </div>

        <div className="mt-4 flex-1 space-y-6 md:mt-0">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Awesome Book {id}</h1>
            <p className="text-muted-foreground mt-2 text-xl">Author Name • 2024</p>
          </div>

          <div className="flex items-center gap-4">
            <span className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-xs font-semibold tracking-wider uppercase">
              Sci-Fi
            </span>
          </div>

          <p className="text-foreground/80 text-lg leading-relaxed">
            Here goes the long and detailed description of the book. When we connect the backend,
            this will be populated with real data. For now, it's just a placeholder text to show how
            the layout looks.
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
