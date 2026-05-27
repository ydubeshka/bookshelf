import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";

export default function BookshelfPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Bookshelf</h1>
        <p className="text-muted-foreground mt-2">Manage your reading progress and ratings.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Card className="bg-card/50 border-muted/50 flex flex-col items-center justify-between p-6 sm:flex-row">
          <div className="space-y-1 text-center sm:text-left">
            <CardTitle className="text-xl">Awesome Book 1</CardTitle>
            <p className="text-muted-foreground text-sm font-medium">
              Status: Reading • Rating: 5/5
            </p>
          </div>
          <div className="mt-4 flex w-full gap-2 sm:mt-0 sm:w-auto">
            <Button variant="secondary" className="flex-1 sm:flex-none">
              Update
            </Button>
            <Button variant="destructive" className="flex-1 sm:flex-none">
              Remove
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
