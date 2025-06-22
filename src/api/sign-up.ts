import { api } from "@/lib/axios";

interface SignUpRequest {
  nome: string;
  email: string;
  phone: string | undefined;
  image_path: File | null;
}

export async function Register({ email, image_path, nome, phone }: SignUpRequest) {
  const formData = new FormData();

  formData.append("nome", nome);
  formData.append("email", email);
  if (phone) formData.append("phone", phone);
  if (image_path) formData.append("image", image_path); // o campo precisa ter o mesmo nome usado no backend

  try {
    const response = await api.post("/users", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao registrar:", error);
    throw error;
  }
}
