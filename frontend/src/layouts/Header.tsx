import { Link } from "react-router-dom";
import { UserNav } from "@/components/UserNav";

export default function Header() {
    return (
        <header className="bg-background/95 sticky top-0 z-50 w-full border-b backdrop-blur-sm">
        <div className="container mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4">
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-2 text-xl font-bold tracking-tight">
              📚 Bookshelf
            </Link>
            <nav className="flex items-center space-x-4 text-sm font-medium">
              <Link to="/" className="hover:text-foreground/80 text-foreground transition-colors">
                Catalog
              </Link>
              <Link
                to="/bookshelf"
                className="hover:text-foreground/80 text-foreground/60 transition-colors"
              >
                My Shelf
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <UserNav />
          </div>
        </div>
      </header>
    )
}