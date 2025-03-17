import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";

function ShoppingLayout() {
  return (
    <div className="flex flex-col bg-white borde-2 border-red-600 min-h-screen">
      <div className="sticky top-0 z-40 w-full border-b bg-background">
        <ShoppingHeader />
      </div>
      <main className="flex flex-col w-full flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default ShoppingLayout;
