import { Chat } from "./Chat";


export function Community(){
    return(
     <div className="hidden lg:block lg:w-[500px] p-4 border-l border-zinc-200 dark:border-zinc-800 overflow-y-auto">
                <Chat/>
         </div>
    )
}