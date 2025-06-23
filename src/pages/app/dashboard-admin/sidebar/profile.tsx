import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, House, Mail } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { Me } from "@/api/profile";

export function Profile(){
    const {data:profile} = useQuery({
        queryKey:['me'],
        queryFn:Me
    })
    if(!profile){
        return
    }

    return(
                <div className="flex flex-col items-center">
                   <div className="m-2">
                    <Dialog>
                        <DialogTrigger>
                                 <Avatar className="h-12 w-12 dark:text-black ">       
                               <AvatarImage src={`http://localhost:3333/uploads/${profile.image_path}`} />
                  <AvatarFallback>US</AvatarFallback>   {/* só aparece se a imagem falhar */}
                   </Avatar>
                        </DialogTrigger>
                        <DialogContent className="w-[26rem] p-2">
                           <img     src={`http://localhost:3333/uploads/${profile.image_path}`}
    alt="Imagem do usuário em tamanho grande"
    className="rounded-lg"/>
                        </DialogContent>
                    </Dialog>
                   </div>
                   <DropdownMenu>
                    <DropdownMenuTrigger>
                         <div className="flex items-center justify-center  space-x-1">
                    <span className="text-zinc-800 dark:text-white font-bold text-xs uppercase">
                        {profile.nome}
                       </span>
                    <ChevronDown  size={12} />
                  </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                             <Mail/>
                             <span>{profile.email}</span>
                        </DropdownMenuItem>
                         <DropdownMenuItem>
                             <House/>
                             <span>Viana,Luanda</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                   </DropdownMenu>
                 </div>
    )
}