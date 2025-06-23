
import { Outlet } from "react-router-dom";
import { SideBar } from "../app/dashboard-admin/sidebar/Sidebar";


export  function AppLayoutAdmin(){
  return(
    <div className="flex min-h-screen flex-col antialiased ">
         <div className="flex ml-[40px]    flex-1 flex-col ">
          <SideBar/>
        <Outlet/>
      </div>
    </div>
  )

}