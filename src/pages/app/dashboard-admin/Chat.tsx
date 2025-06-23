import { Card,CardDescription,CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil, Send,Trash2,  } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FetchMessages } from "@/api/fetch-messages";
import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { ptBR } from "date-fns/locale";
import {useAutoAnimate} from '@formkit/auto-animate/react'
import { z } from "zod";
import { useForm } from "react-hook-form";
import { SendMessages } from "@/api/send";
import { Me } from "@/api/profile";
import { getInialts } from "@/lib/utils";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuContent} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/theme/theme-toggle";
import { useRef } from "react";

export interface MessagesResponse{
    id: number;
    content: string;
    created_at: Date;
    isMe: boolean;
    userId: number;
    	user: {
			email: string,
			nome: string
			image_path: string | null,
			role: string
        }
		
}[]

export function Chat() {
    
  const [post, setPost] = useState<MessagesResponse[]>([])
  const {data:Messages, refetch } = useQuery({queryKey:['sms'], queryFn:FetchMessages})
   const {data:profile} = useQuery({
          queryKey:['me'],
          queryFn:Me
      })
  
   const [parent] = useAutoAnimate()
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null); // <-- ref para última mensagem

   const sendMessagesBodySchema  = z.object({
      content:z.string()
   })
   type SendMessagesBodyProps = z.infer<typeof sendMessagesBodySchema>

   const {register, reset, handleSubmit} = useForm<SendMessagesBodyProps>()
   const {mutateAsync:send} = useMutation({
    mutationFn:SendMessages
   })

   async function handeSendMessages(data:SendMessagesBodyProps) {
        const {content} = data
       send({
         content
       })
       reset()
   }
  useEffect(()=>{
    socket.on("messages", (data)=>{
       setPost(data)
    })
    return () => {
    socket.off("messages");
  };
  },[])

    useEffect(()=>{
      refetch()
  },[post])

  useEffect(() => {
  if (endOfMessagesRef.current) {
    endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
  }
}, [Messages]);
   
  if(!Messages){
    return
  }

      if(!profile){
          return
      }

  return (
<div className="h-screen w-full flex ">
  <Card className="flex flex-col max-h-[90%] w-full  shadow-md rounded-none bg-white dark:bg-zinc-900 border-none">
    
    <CardHeader className="bg-zinc-100 dark:bg-zinc-800">
      <CardTitle className="text-xl font-bold text-zinc-800 dark:text-white">
         <div className="flex items-center justify-between"> 
           <div>
             <span>QUINTAL</span>
           </div>
           <div>
             <header>
                  <div className="mt-4 flex justify-end">
                    <ModeToggle />
                  </div>
             </header>
           </div>
         </div>
      </CardTitle>
      <CardDescription>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui hic quo ea.</CardDescription>
    </CardHeader>

    <Separator />

    {/* Lista de mensagens com scroll ativado */}
       <div className="flex-1 overflow-y-auto px-4 py-2 bg-white dark:bg-zinc-900 space-y-4" ref={parent}>
  {Messages.map((msg) => (
    <div
      key={msg.id}
      className={`flex items-start gap-3 ${
        msg.isMe === true ? "justify-end" : "justify-start"
      }`}
    >
      {msg.userId !== profile.id && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="h-8 w-8 shadow-sm">
              <AvatarImage src={`http://localhost:3333/uploads/${msg.user.image_path}`} />
              <AvatarFallback>{getInialts(msg.user.nome)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex items-center flex-col w-52 gap-1">
            <img className="h-72 w-72" src={`http://localhost:3333/uploads/${msg.user.image_path}`} />
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      <div className="flex flex-col max-w-[90%]">
        <div
          className={`py-2 px-4 text-sm break-words text-wrap shadow-sm ${
            msg.userId === profile.id
              ? "bg-blue-500 text-white rounded-tl-lg rounded-tr-lg rounded-br-lg rounded-bl-xlself-end"
              : "bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-white rounded-tr-lg rounded-br-lg rounded-tl-xl rounded-bl-xl"
          }`}
        >
          {msg.content}
        </div>
        <span className="dark:text-muted-foreground text-[10px]">
          {formatDistanceToNow(new Date(msg.created_at), { locale: ptBR })}
        </span>
      </div>
      {msg.userId === profile.id && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="h-8 w-8 shadow-sm">
              <AvatarImage src={`http://localhost:3333/uploads/${msg.user.image_path}`} />
              <AvatarFallback>{getInialts(msg.user.nome)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex items-center flex-col w-52 gap-1">
            <img className="h-72 w-72" src={`http://localhost:3333/uploads/${msg.user.image_path}`} />
            <div className="flex items-center gap-20 justify-between">
              <span className="text-xs tracking-tighter text-nowrap">{msg.user.nome}</span>
              <Trash2 color="red" size={14} />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  ))}

  {/* 🔽 Elemento invisível no fim da lista */}
  <div ref={endOfMessagesRef} />
</div>

    <Separator />

    {/* Input fixo na base */}
    <form className="bg-zinc-100 dark:bg-zinc-800 flex items-center gap-2 p-3 " onSubmit={handleSubmit(handeSendMessages)}>
      <Input
        placeholder="Escreva sua mensagem..."
        required
        {...register('content')}
        className="flex-1 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400 px-4 py-2"
      />
      <Button size="icon" className="rounded-full bg-blue-500 hover:bg-blue-600">
        <Send className="h-4 w-4 text-white" />
      </Button>
    </form>
  </Card>
</div>

  );
}
