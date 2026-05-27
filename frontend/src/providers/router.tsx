import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/HomePage";
import BookDetailPage from "@/pages/BookDetailPage";
import BookshelfPage from "@/pages/BookshelfPage";
import LoginPage from "@/pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/books/:id",
        element: <BookDetailPage />,
      },
      {
        path: "/bookshelf",
        element: <BookshelfPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
