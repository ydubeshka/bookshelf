import Footer from "./Footer.tsx";
import Header from "./Header.tsx";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="bg-background relative flex min-h-screen flex-col font-sans antialiased">
      <Header />

      <main className="container mx-auto flex-1 px-4 py-4">
        <Outlet />
      </main>

      <Footer/>
    </div>
  );
}

import Header from "./Header.tsx";
import { Outlet } from "react-router-dom";


export default function MainLayout() {
  return (
    <div className="bg-background relative flex min-h-screen flex-col font-sans antialiased overflow-auto">
      <Header />

      <main className="container mx-auto flex-1 px-4 py-4 pt-20 overflow-y-auto">
        <Outlet />
      </main>

      <Footer/>
    </div>
  );
}
