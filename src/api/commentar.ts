import { api } from "@/lib/axios"


interface CommentRequestProps{
    content:string
    postsId:number
}

export async function commentar({content,postsId}:CommentRequestProps){
    try {
          await api.post("/comentar", {content, postsId})
    } catch (error) {
        
    }
    
}