import { api } from "@/lib/axios";

interface PropsResponse{
    id: number;
    nome: string;
    email: string;
    phone: string | null;
    created_at: string;
    role: 'MEMBER'|'ADMIN';
    image_path: string | undefined;
    isAlive: boolean;

}


export async function Me(){
     const response  = await api.get<PropsResponse>('/me')
     return response.data
}