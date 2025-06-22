import { api } from "@/lib/axios";

export interface PostsResponse {
  id: number;
  content: string;
  image_path: string | null;
  react: number;
  created_at: Date;
  _count: {
    React: number;
  };
  userId: number;
  users: {
    nome: string;
    email: string;
    image_path: string | null;
  };
  Comment: {
    id: number;
    content: string;
    postsId: number;
    users: {
      id: number;
      image_path: string | null;
      nome: string;
      email: string;
      phone: string | null;
      isAlive: boolean;
	  created_at:string
    };
  }[];
}

interface PostsRequestProps {
  query?: string | null;
}

export async function FetchPosts({ query }: PostsRequestProps) {
  const response = await api.get<PostsResponse[]>('/search/', {
    params: { query },
  });
  return response.data;
}
