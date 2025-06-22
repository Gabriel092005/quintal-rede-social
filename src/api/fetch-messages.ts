import { api } from "@/lib/axios";

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


    export async function FetchMessages(){
         const response  = await api.get<MessagesResponse[]>('/list')
         return response.data
    }