
import { NavItem } from "../main-navigation/NavItem";
import { Profile } from "./profile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function SideBar() {
  return (
    <>
    
      {/* Sidebar fixa em telas md+ */}
      <div
        className="fixed top-0   hidden md:fixed md:inset-y-0 md:left-0 md:w-52 filter brightness-125 dark:bg-zinc-950 
        border-r border-zinc-400 border-solid md:flex md:flex-col md:items-center md:p-2"
      >
        
     
        <Profile />
        <NavItem />
      </div>

      {/* Navbar fixa no topo no mobile */}
      <div className="md:hidden fixed top-0 left-0 w-full z-50  border-b px-4 py-2 flex items-center gap-4">
        <Sheet >
          <SheetTrigger>
            <Menu className="w-6 h-6 text-zinc-800 dark:text-white" />
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64  dark:bg-black ">
            <div className="p-4">
              <Profile />
            
            </div>
            <NavItem />
          </SheetContent>
        </Sheet>

        {/* Exemplo de título opcional */}
    
        <span className="text-sm font-semibold text-zinc-800 dark:text-white">Painel</span>
      </div>
    </>
  );
}
