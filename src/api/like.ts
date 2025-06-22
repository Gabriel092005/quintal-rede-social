import { api } from "@/lib/axios"


interface ReactRequest{
    postId:number
    react:number
}

export async function React({postId,react}:ReactRequest) {
    await api.post('/react', {postId,react})
}