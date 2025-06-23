
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ChevronDown,HandHeart,MessageCircle,Search, Send, Trash2} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { Chat } from "./Chat";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { NewPost } from "./newPost";
import { socket } from "@/lib/socket";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FetchPosts, PostsResponse } from "@/api/fetch-posts";
import { getInialts } from "@/lib/utils";
import { React } from "@/api/like";;
import { commentar } from "@/api/commentar";
import { Me } from "@/api/profile";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";

export function DashBoardAdmin() {
  const [searchParams, SetSearchParams] = useSearchParams()
  const [newComments, setNewComments] = useState<Record<number, string>>({});
  const [post, setPost] = useState<PostsResponse[]>([])

  const {data:posts, refetch} = useQuery({
    queryFn:()=>FetchPosts({query:query}),
    queryKey:['post']
  })
  const { mutateAsync:EnviarCommentario } = useMutation({
    mutationFn:commentar
  });
   
     const query = searchParams.get("query")

   function handleSearchUsers(e:string){
    console.log(e)
        SetSearchParams((state)=>{  
           if(e){
              searchParams.set('query', e)
           }
           else{
            searchParams.delete('query')
           }
           return state
        })
        window.scrollTo({ top: 0, behavior: 'smooth' });
   }

 


  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('');

  const handleAddComment = (postId: number) => {
    const text = newComments[postId]?.trim();
    console.log(text)
    if (!text) return;
    EnviarCommentario({content:text,postsId:postId })
    
    refetch()
  };

   const [parent] = useAutoAnimate()


  const {mutateAsync:reagir} = useMutation({
    mutationFn:React
  })
  useEffect(()=>{
    socket.on("posts", (data)=>{
       setPost(data)
    })
   
     return () => {
    socket.off("posts");
  };
  

  },[])

  console.log(posts)

    useEffect(()=>{
      refetch()
  },[post,query])

  async function HandleReact(data:any) {
       reagir({postId:data,react:1})
    
  }
     const {data:profile} = useQuery({
          queryKey:['me'],
          queryFn:Me
      })
      if(!profile){
          return
      }

  if(!posts){
    return
  }
  return (
    <>
  <div className="flex h-screen  ">
  <div className="lg:flex lg:flex-col lg:flex-1 lg:ml-40 lg:p-4 flex flex-col flex-1 -ml-16 mt-9 p-4">
      <header className="lg:flex lg:items-center lg:justify-center lg:mb-4   flex items-center   ">
                <div className="lg:flex flex dark:bg-zinc-900 p-5  lg:gap-32 lg:items-center">
                  <div className="lg:flex lg:flex-col flex flex-col lg:ml-1">
                     <h1 className="lg:text-2xl tracking-tight font-bold text-xl">#FEED</h1>
                   <div className="flex  items-center gap-1">
                     <span className="text-zinc-700 text-xs text-nowrap">Publicações recentes</span>
                     <ChevronDown className="text-zinc-700 text-xs" size={8}></ChevronDown>
                   </div>
                  </div>
                   <div>
                    <Dialog>
                       <DialogTrigger>
      <button

      
  className="
    relative overflow-hidden 
    px-4 py-2 sm:px-6 sm:py-2     /* menor padding no mobile */
    w-auto sm:w-auto                /* largura automática */
    max-w-xs sm:max-w-none          /* limita largura no mobile */
    rounded-lg
    text-white font-semibold 
    transition-all duration-300
    bg-gradient-to-r from-blue-500 to-blue-300
    lg:ml-0 ml-32
  "
>

  
<span
  className="
    absolute inset-0 
    hidden sm:inline
    before:absolute before:inset-y-0 before:-translate-x-full before:-translate-y-1/2
    before:transform before:rotate-45
    before:w-8 before:h-36
    before:bg-white before:opacity-20
    before:transition-all before:duration-500
    hover:before:translate-x-full
    text-nowrap
    ml-20
  "
></span>

 <span className="text-nowrap"> Criar novo post</span>
</button>

                       </DialogTrigger>
                       <NewPost/>
                    </Dialog>
                   </div>
                </div>

              </header>
              <div className="flex lg:items-center mt-4">
              <div className="relative lg:w-full lg:flex lg:items-center lg:justify-center w-full">
   
    <Input 
    onChange={(e)=>handleSearchUsers(e.target.value)} 
    placeholder="Pesquisar..."
    className="lg:pl-10 lg:pr-4 dark:border-bottom lg:w-96 pl-10 dark:bg-black w-full  "  />
     <Search
      size={16} 
      className="absolute left-4 lg:left-10 top-1/2 -translate-y-1/2 text-zinc-400" />
  </div>
                  
              </div> 

 <div
    className="
      overflow-y-auto 
      max-h-[calc(100vh-1rem)] 
      space-y-4 
      p-4
      
    
      lg:m-2
    "
  >
    {/* só vai rolar aqui dentro quando tiver MUITO conteúdo */}
<div className="space-y-8">
      {posts.map(item => (
        <div key={item.id} className="bg-slate-50 dark:bg-zinc-900 p-6 rounded-md w-96">
          <header className="flex items-center mb-4">
            <Dialog >
              <DialogTrigger asChild>
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage src={`https://quintal-backend-224.onrender.com/uploads/${item.users.image_path}`} />
                  <AvatarFallback>{getInitials(item.users.nome)}</AvatarFallback>
                </Avatar>
              </DialogTrigger>
              <DialogContent  className="sm:max-w-[400px] dark:bg-zinc-900 dark:border-none  ">
                <DialogHeader>
                  <DialogTitle>Perfil do Usuário</DialogTitle>
                  <DialogDescription>Veja os detalhes do perfil abaixo.</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center ">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={`https://quintal-backend-224.onrender.com/uploads/${item.users.image_path}`} />
                    <AvatarFallback>{getInitials(item.users.nome)}</AvatarFallback>
                  </Avatar>
                  <div className="text-center space-y-1">
                    <p className="font-semibold text-lg dark:text-white">{item.users.nome}</p>
                    <p className="text-sm text-muted-foreground">{item.users.email}</p>
                    <span>Lorem ipsum dolor sit am odit!</span>
                  </div>
                  <div className="flex items-center gap-3 justify-center">
                    <div>
                        <span className="font-bold">123</span>
                    </div>
                     <div>
                         <span className="font-bold">123</span>
                    </div>
                     <div>
                         <span className="font-bold">123</span>
                    </div>
                  
                  </div>
                  <div className="flex gap-3">
                     <div className="flex">
                      <Button variant={"ghost"}>Editar perfil</Button>
                    </div> <div>
                      <Button variant={"ghost"}>Editar perfil</Button>
                    </div>
                    <div>
                      <Button variant={"ghost"}>
                        <Send/>
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <div className="flex items-center">
              <div className="flex flex-col m-3">
                <div className="flex justify-between gap-32">
                  <span className="text-xs font-bold text-nowrap">{item.users.nome}</span>
                </div>
                <span className="text-[8px] font-bold text-zinc-500">{item.users.email}</span>
              </div>
            </div>
          </header>
          <div className="flex flex-col">
            <img src={`https://quintal-backend-224.onrender.com/uploads/${item.image_path}`} alt="" />
            <span className="text-xs text-wrap uppercase mt-2">{item.content}</span>
          <div className="flex items-baseline justify-between">
              <div className="flex gap-1 mt-4 ">
              <div className="flex">
                {item._count.React === 0 ? (
                  <div className="flex cursor-pointer" onClick={() => HandleReact(item.id)}>
                    <HandHeart className="text-yellow-500" size={15} />
                  </div>
                ) : (
                  <div className="flex cursor-pointer" onClick={() => HandleReact(item.id)}>
                    <span className="text-xs text-yellow-500">{item._count.React}</span>
                    <HandHeart className="text-yellow-500" size={15} />
                  </div>
                )}
              </div>
              <div className="flex">
                <Trash2 className="text-red-500" size={15} onClick={() => alert(`Deletar post ${item.id}`)} />
              </div>

            </div>
             <div>
              <span className="dark:text-muted-foreground text-nowrap text-[10px]">{formatDistanceToNow(new Date(item.created_at), { locale: ptBR , addSuffix:true })}</span>
              
             </div>
          </div>

          </div>

          {/* Comentários */}
          <div className="mt-6">
            <h4 className="text-sm font-semibold mb-2">Comentários</h4>
            <div className="space-y-2 max-h-32 overflow-y-auto mb-3" ref={parent} >
              {item.Comment.length> 0 ? (
                item.Comment.map(c => (
                  <div key={c.id} className="p-2 bg-white dark:bg-zinc-800 rounded" >
                    <div className="flex items-center gap-2">
                  <div
                   className={`rounded-full transition-all duration-150 ${
                      c.users.isAlive ? 'border-2 border-emerald-300 dark:border-emerald-500' : ''
                       }`}
                         >

                        <Avatar className="h-7  w-7">
                          <AvatarImage className="" src={`https://quintal-backend-224.onrender.com/uploads/${c.users.image_path}`} />
                          <AvatarFallback className="tracking-tight font-bold dark:text-zinc-500 dark:bg-emerald-100">{getInialts(profile.nome)}</AvatarFallback>
                       </Avatar>
                      </div>
                    <div ref={parent}>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-44">
                        <span className="text-xs text-nowrap  ">{c.users.nome}</span>
                          <span>
                          <Trash2  className="text-red-500" size={15}/>
                        </span>
                        </div>
                        <span className="text-xs">{c.content}</span>
                        
                      </div>
                    </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-zinc-500">Nenhum comentário ainda.</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Escreva um comentário..."
                className="flex-1 px-2 py-1 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm"
                value={newComments[item.id] || ''}
                onChange={e => setNewComments({ ...newComments, [item.id]: e.target.value })}
              />
              <button
                className="px-3 py-1 bg-blue-500 text-white text-sm rounded flex items-baseline"
                onClick={() => handleAddComment(item.id)}
              >
                <MessageCircle size={14}/>
                <span>comentar</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
 </div>
  <div className="w-full lg:w-[550px] hidden lg:block m-5">
        <Chat/>
 </div>
 
 </div>

    </>
  )
}