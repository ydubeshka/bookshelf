import { Link, Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="bg-background relative flex min-h-screen flex-col font-sans antialiased">
      {/* Шапка сайта */}
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
          <div>
            <Link to="/login" className="text-sm font-medium hover:underline">
              Log In
            </Link>
          </div>
        </div>
      </header>

      {/* Основной контент страницы (сюда вставляются наши Pages) */}
      <main className="container mx-auto max-w-screen-2xl flex-1 px-4 py-6">
        <Outlet />
      </main>

      {/* Подвал */}
      <footer className="bg-muted/40 mt-auto border-t py-6">
        <div className="container mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-4 px-4 md:flex-row">
          <p className="text-muted-foreground text-center text-sm leading-loose md:text-left">
            &copy; {new Date().getFullYear()} Bookshelf App. Built with React & FastAPI.
          </p>
        </div>
      </footer>
    </div>
  );
}
