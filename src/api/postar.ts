import { api } from "@/lib/axios"


interface PostarRequest{
    content:string
    image_path:File|null
}

export async function Postar({content,image_path}:PostarRequest){
  const formData = new FormData();

  formData.append("content", content);
  if (image_path) formData.append("image", image_path); // o campo precisa ter o mesmo nome usado no backend

  try {
    const response = await api.post("/postar", formData, {
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