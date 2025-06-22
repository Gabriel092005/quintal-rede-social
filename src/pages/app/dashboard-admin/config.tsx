import { Bold, Italic, Link, List, ListOrdered, Mail, Settings, Trash2, Users } from "lucide-react"
import { ModeToggle } from "@/components/theme/theme-toggle"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function Configurations(){

    return(
        <div className=" flex flex-col pt-14 lg:ml-44 -ml-10 lg:w-[40rem] justify-center ">
            <header className="flex items-center">
                    <div className="flex items-baseline lg:gap-72 gap-32 ">
                <div className="flex flex-col justify-between">
                  <div className="flex items-center">
                    <Settings size={24}/>
                     <strong>
                    <h1 className="lg:text-3xl text-xl">
                      Configurações
                    </h1>
                   </strong>
                  </div>
                     <span className="text-muted-foreground text-xs">Controle toda a plataforma e faca ajustes</span>
                    </div>
              <div className="flex gap-2">
                 <ModeToggle/>
                 <Dialog>
                 <DialogTrigger>
               <Button variant="destructive" className="hidden">
                  Limpar Armazenamento
                 <Trash2/>
              
               </Button>
               </DialogTrigger>
                        </Dialog>
              </div>
                </div>
            </header>
            <Separator orientation="horizontal" className="m-2"/>
            <div className="flex  justify-between">
                <div className="flex flex-col">
                <span>Informações Pessoais</span>
                <span className="text-muted-foreground">Lorem ipsum dolor ente!.</span>
                </div>
                <div className="flex gap-3 ">
                    <Button variant="success">Salvar</Button>
                    <Button variant="destructive">Cancelar</Button>
                </div>
            </div>
            <div className="flex flex-col pt-6 w-full">
                <div>
                 <div className="flex gap-2">
                    <div className="flex">
                    <Users size={13}/>
                    <Label htmlFor="name">Nome:</Label>
                    </div>
                 <Input id="name" className="dark:bg-black" defaultValue="Gabriel"/>
                 <Input id="name"className="dark:bg-black" defaultValue="Cavala"/>
                 </div>
                </div>
            </div>
            <Separator orientation="horizontal" className="m-6"/>
            <div className="flex flex-col pt-1 w-full">
                <div>
                 <div className="flex gap-2">
                    <div className="flex items-center gap-1">
                    <Mail size={14}/>
                    <Label className="text-nowrap" htmlFor="name">E-mail:</Label>  
                    </div>
                 <Input  id="name" className="dark:bg-black" defaultValue="Ex:gabrielcavala@gmail.com"/>
                 </div>
                </div>
            </div>
            <Separator orientation="horizontal" className="m-6"/>
            <div className="flex flex-col pt-1 w-full">
                <div>
                 <div className="flex gap-2">
                    <div className="flex items-center gap-1">
                    <Label className="text-nowrap" htmlFor="name">Country:</Label>  
                    </div>  
                 <Select>
  <SelectTrigger className=" text-white dark:bg-black ">
    <SelectValue placeholder="Selecione o país" />
  </SelectTrigger>

  <SelectContent className="dark:bg-black text-white">
    <SelectItem value="angola">Angola</SelectItem>
    <SelectItem value="Portugal">Portugal</SelectItem>
    <SelectItem value="Namibia">Namíbia</SelectItem>
  </SelectContent>
</Select>
<Select>
  <SelectTrigger className=" text-white dark:bg-black ">
    <SelectValue placeholder="Selecione o país" />
  </SelectTrigger>

  <SelectContent className="dark:bg-black text-white">
    <SelectItem value="angola">Angola</SelectItem>
    <SelectItem value="Portugal">Portugal</SelectItem>
    <SelectItem value="Namibia">Namíbia</SelectItem>
  </SelectContent>
</Select>


                 </div>
                </div>
                <Separator orientation="horizontal" className="m-6"/>
            <div className="flex flex-col pt-1 w-full">
                <div>
                 <div className="flex gap-2">
                    <div className="flex items-center gap-1">
                    <Label className="text-nowrap" htmlFor="name">Bio</Label>  
                    </div>
                    <div className="space-y-3">
                  <div className="grid gap-3  grid-cols-2">
                  <div className="flex items-center gap-1">
                  <button type="button" className="  p-2 hover:bg-zinc-50 rounded-full" >
                  <Bold className="w-5 h-5 text-zinc-500"strokeWidth={3}/>
                 </button>
                  <button type="button" className="  p-2 hover:bg-zinc-50 rounded-full" >
                  <Italic className="w-5 h-5 text-zinc-500"strokeWidth={3}/>
                 </button>  
                 <button type="button" className="  p-2 hover:bg-zinc-50 rounded-full" >
                  <Link className="w-5 h-5 text-zinc-500"strokeWidth={3}/>
                 </button>
                 <button type="button" className="  p-2 hover:bg-zinc-50 rounded-full" >
                  <List className="w-5 h-5 text-zinc-500"strokeWidth={3}/>
                 </button>
                 <button type="button" className="  p-2 hover:bg-zinc-50 rounded-full" >
                  <ListOrdered className="w-5 h-5 text-zinc-500"strokeWidth={3}/>
                 </button>
                  </div>
                  </div>
                <textarea className="dark:bg-black" placeholder="Escreva aqui sua Biografia"/>
                </div>
                 </div>
                </div>
            </div>
            </div>
            
        </div>
    )
}