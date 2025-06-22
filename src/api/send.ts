import { api } from "@/lib/axios";


interface SendMessagesReques{
    content:string
}

    export async function SendMessages({content}:SendMessagesReques){
          await api.post('/send',{content})
    }