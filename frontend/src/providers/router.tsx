import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/HomePage";
import BookDetailPage from "@/pages/BookDetailPage";
import BookshelfPage from "@/pages/BookshelfPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage.tsx";
import { ProtectedRoute } from "@/components/ProtectedRoute.tsx";

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
        element: <ProtectedRoute />,
        children: [
          { path: "/bookshelf", element: <BookshelfPage /> },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
