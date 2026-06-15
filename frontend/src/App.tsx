import { AppRouter } from "@/providers/router";
import { QueryProvider } from "@/providers/query.tsx";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <QueryProvider>
      <AppRouter />
      <Toaster/>
    </QueryProvider>
  );
}
