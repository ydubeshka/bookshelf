import { AppRouter } from "@/providers/router";
import { QueryProvider } from "@/providers/query.tsx";

export default function App() {
  return (
    <QueryProvider>
      <AppRouter />
    </QueryProvider>
  );
}
