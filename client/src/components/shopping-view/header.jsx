import { HousePlug, LogOut, Menu, ShoppingCart, UserCog, Plus, Minus, ChevronDown, ChevronUp } from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";


function MenuItems({ items, isMobile, toggleProducts, isProductsOpen }) {
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {items.map((menuItem) => {
        if (menuItem.label === "Products") {
          if (isMobile) {
            // Mobile: expandable section for Products
            return (
              <div key={menuItem.id} className="flex flex-col gap-2">
                <button
                  onClick={toggleProducts}
                  className="flex items-center gap-2 text-sm font-medium cursor-pointer"
                >
                  {isProductsOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  {menuItem.label}
                </button>
                {isProductsOpen && (
                  <div className="pl-4">
                    {menuItem.subItems.map((subItem) => (
                      <Link to={subItem.path} key={subItem.id}>
                        <Label className="text-sm font-medium cursor-pointer block p-2">
                          {subItem.label}
                        </Label>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          } else {

            return (
              <div key={menuItem.id} className="relative group">
                <button
                  className="flex items-center gap-2 text-sm font-medium cursor-pointer"
                >
                  {menuItem.label}
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
                </button>
                <div className="absolute left-1/2 top-full hidden group-hover:flex flex-col gap-2 py-2 px-4 bg-white shadow-md z-10 transform -translate-x-1/2">
                  {menuItem.subItems.map((subItem) => (
                    <Link to={subItem.path} key={subItem.id} className="text-sm text-gray-700">
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              </div>
            );
          }
        }

        // Other menu items (not "Products")
        return (
          <Link to={menuItem.path} key={menuItem.id}>
            <Label className="text-sm font-medium cursor-pointer">
              {menuItem.label}
            </Label>
          </Link>
        );
      })}
    </nav>
  );
}


function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Button variant="outline" size="icon" className="relative">
        <ShoppingCart className="w-6 h-6" />
        <span className="sr-only">User cart</span>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.firstName[0].toUpperCase() + user.lastName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.firstName + " " + user.lastName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 1024);
  };

  const toggleProducts = () => {
    setIsProductsOpen((prev) => !prev);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          <HousePlug className="h-6 w-6" />
          <span className="font-bold">Ecommerce</span>
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems items={shoppingViewHeaderMenuItems} isMobile={isMobile} toggleProducts={toggleProducts} isProductsOpen={isProductsOpen} />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>

        <div className="hidden lg:block">
          <MenuItems items={shoppingViewHeaderMenuItems} isMobile={isMobile} toggleProducts={toggleProducts} isProductsOpen={isProductsOpen} />
        </div>

        {isAuthenticated && (
          <div className="hidden lg:block">
            <HeaderRightContent />
          </div>
        )}
      </div>
    </header>
  );
}

export default ShoppingHeader;
