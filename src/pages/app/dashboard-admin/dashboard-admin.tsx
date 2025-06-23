import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  ChevronDown,
  HandHeart,
  MessageCircle,
  Search,
  Trash2,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { Chat } from "./Chat";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NewPost } from "./newPost";
import { socket } from "@/lib/socket";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FetchPosts, PostsResponse } from "@/api/fetch-posts";
import { getInialts } from "@/lib/utils";
import { React } from "@/api/like";
import { commentar } from "@/api/commentar";
import { Me } from "@/api/profile";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";

export function DashBoardAdmin() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [newComments, setNewComments] = useState<Record<number, string>>({});
  const [post, setPost] = useState<PostsResponse[]>([]);

  const query = searchParams.get("query");

  const { data: posts, refetch } = useQuery({
    queryFn: () => FetchPosts({ query }),
    queryKey: ["post"],
  });

  const { mutateAsync: EnviarCommentario } = useMutation({
    mutationFn: commentar,
  });

  const handleSearchUsers = (e: string) => {
    if (e) {
      searchParams.set("query", e);
    } else {
      searchParams.delete("query");
    }
    setSearchParams(searchParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddComment = async (postId: number) => {
    const text = newComments[postId]?.trim();
    if (!text) return;
    await EnviarCommentario({ content: text, postsId: postId });
    setNewComments((prev) => ({ ...prev, [postId]: "" }));
    refetch();
  };

  const [parent] = useAutoAnimate();

  const { mutateAsync: reagir } = useMutation({
    mutationFn: React,
  });

 useEffect(() => {
  socket.on("posts", (data) => setPost(data));

  return () => {
    socket.off("posts");
  };
}, []);


  useEffect(() => {
    refetch();
  }, [post, query]);

  const { data: profile } = useQuery({
    queryKey: ["me"],
    queryFn: Me,
  });

  if (!profile || !posts) return null;

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
      {/* Left Section */}
      <div className="flex-1 p-4 overflow-auto">
        <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold">#FEED</h1>
            <div className="flex items-center gap-1">
              <span className="text-sm text-muted-foreground">Publicações recentes</span>
              <ChevronDown size={12} className="text-muted-foreground" />
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-blue-300 text-white shadow-md">
                Criar novo post
              </Button>
            </DialogTrigger>
            <NewPost />
          </Dialog>
        </header>

        {/* Search */}
        <div className="relative w-full max-w-md mb-4">
          <Input
            onChange={(e) => handleSearchUsers(e.target.value)}
            placeholder="Pesquisar..."
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
        </div>

        {/* Posts Feed */}
        <div className="space-y-6" ref={parent}>
          {posts.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-zinc-900 shadow-sm rounded-lg p-4 space-y-3"
            >
              {/* Header */}
              <div className="flex items-center gap-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={`https://quintal-backend-224.onrender.com/uploads/${item.users.image_path}`}
                      />
                      <AvatarFallback>{getInialts(item.users.nome)}</AvatarFallback>
                    </Avatar>
                  </DialogTrigger>
                  <DialogContent className="dark:bg-zinc-900">
                    <DialogHeader>
                      <DialogTitle>{item.users.nome}</DialogTitle>
                      <DialogDescription>{item.users.email}</DialogDescription>
                    </DialogHeader>
                    {/* Extra Info Here */}
                  </DialogContent>
                </Dialog>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">{item.users.nome}</span>
                  <span className="text-xs text-muted-foreground">{item.users.email}</span>
                </div>
              </div>

              {/* Post Content */}
              {item.image_path && (
                <img
                  className="w-full rounded object-cover max-h-60"
                  src={`https://quintal-backend-224.onrender.com/uploads/${item.image_path}`}
                  alt="Post"
                />
              )}
              <p className="text-sm text-wrap break-words">{item.content}</p>

              {/* Actions */}
              <div className="flex justify-between text-xs items-center">
                <div className="flex items-center gap-2">
                  <div onClick={() => reagir({ postId: item.id, react: 1 })} className="cursor-pointer flex gap-1">
                    {item._count.React > 0 && <span>{item._count.React}</span>}
                    <HandHeart size={16} className="text-yellow-500" />
                  </div>
                  <Trash2 size={16} className="text-red-500 cursor-pointer" onClick={() => alert(`Deletar post ${item.id}`)} />
                </div>
                <span className="text-muted-foreground">
                  {formatDistanceToNow(new Date(item.created_at), { locale: ptBR, addSuffix: true })}
                </span>
              </div>

              {/* Comentários */}
              <div>
                <h4 className="text-sm font-semibold">Comentários</h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {item.Comment.length > 0 ? (
                    item.Comment.map((c) => (
                      <div key={c.id} className="bg-zinc-100 dark:bg-zinc-800 p-2 rounded">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage
                              src={`https://quintal-backend-224.onrender.com/uploads/${c.users.image_path}`}
                            />
                            <AvatarFallback>{getInialts(c.users.nome)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <span className="text-xs font-semibold">{c.users.nome}</span>
                              <Trash2 size={12} className="text-red-500 cursor-pointer" />
                            </div>
                            <p className="text-xs">{c.content}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-muted-foreground">Nenhum comentário ainda.</p>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Input
                    value={newComments[item.id] || ""}
                    onChange={(e) => setNewComments({ ...newComments, [item.id]: e.target.value })}
                    placeholder="Escreva um comentário..."
                    className="text-xs"
                  />
                  <Button size="sm" onClick={() => handleAddComment(item.id)}>
                    <MessageCircle size={14} className="mr-1" /> comentar
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden lg:block lg:w-[500px] p-4 border-l border-zinc-200 dark:border-zinc-800 overflow-y-auto">
        <Chat />
      </div>
    </div>
  );
}
