
import { Outlet } from "react-router-dom";
import Logo from '../../assets/teste.png'
import { MessageCircleCodeIcon, MessageSquare, Mic } from "lucide-react";

export function AuthLayoutPacient(){
  return(
    <div className="lg:min-h-screen lg:grid lg:grid-cols-2 antialiased">
      <div className="lg:justify-between h-full border-r border-foreground/5 lg:bg-slate-100 p-10 text-muted-foreground flex flex-col">
            <div className="flex items-center gap 3 text-lg font-medium text-foreground">
              <div className="flex text-lg items-center text-muted">
                <MessageCircleCodeIcon className="text-blue-500"/>
               <span className="font-sm text-lg text-blue-500">Quintal</span>
              </div>
            </div>
            </div>
          <div className="flex flex-col items-center justify-center">
        <Outlet/>
      </div>
    </div>
  )

}