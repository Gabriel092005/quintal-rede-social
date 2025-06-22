import { Button } from "@/components/ui/button";
import { DialogContent } from "@/components/ui/dialog";


export function Sair(){
    return(
         <DialogContent>
             <span>Tens Certeza que desejas sair?</span>
             <div className="gap-2 flex">
               <Button>Sim</Button>
               <Button>Não</Button>
             </div>
         </DialogContent>
    )
}