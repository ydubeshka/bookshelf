export default function Footer() {
    return (
        <footer className="bg-muted/40 mt-auto border-t py-6">
        <div className="container mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-4 px-4 md:flex-row">
          <p className="text-muted-foreground text-center text-sm leading-loose md:text-left">
            &copy; {new Date().getFullYear()} Bookshelf App. Built with React & FastAPI.
          </p>
        </div>
      </footer>
    )
}