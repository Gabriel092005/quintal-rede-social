import { api } from "@/lib/axios";

interface SignUpRequest {
  email: string;
  phone: string | undefined;
}

export async function Authenticate({ email, phone }: SignUpRequest) {
  try {

    const response = await api.post("/sessions",{email,phone});
    return response.data;

  } catch (error) {
    console.error("Erro ao registrar:", error);
    throw error;
  }
}
