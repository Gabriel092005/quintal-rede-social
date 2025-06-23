import { api } from "@/lib/axios";

interface SignUpRequest {
  email: string;
  phone: string | undefined;
}

export async function Authenticate({ email, phone }: SignUpRequest) {
  try {

    const response = await api.post("/sessions",{email,phone});

    const  token  = response.data.token
    
    document.cookie = `token=${token}; Secure; SameSite=Lax; Path=/`;
    return response.data;

    

  } catch (error) {
    console.error("Erro ao registrar:", error);
    throw error;
  }
}
