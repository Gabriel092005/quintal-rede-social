import { Postar } from "@/api/postar";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { Image } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function NewPost() {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const postarBodySchema = z.object({
    content: z.string(),
  });

  type PostarBodyTypes = z.infer<typeof postarBodySchema>;

  const { handleSubmit, register, reset } = useForm<PostarBodyTypes>();
  const { mutateAsync: postar } = useMutation({
    mutationFn: Postar,
  });

  async function handleCreatePost(data: PostarBodyTypes) {
    const { content } = data;
    await postar({
      content,
      image_path: image,
    });
    reset();
    setImage(null);
    setPreviewUrl(null);
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <DialogContent className="bg-zinc-100 dark:bg-zinc-900 rounded-xl shadow-lg dark:border-none">
      <DialogHeader>
        <DialogTitle className="text-lg font-bold text-zinc-800 dark:text-zinc-100">Novo Post</DialogTitle>
        <DialogDescription className="text-sm text-zinc-600 dark:text-zinc-400">
          Compartilhe o que você está pensando com seus amigos.
        </DialogDescription>
      </DialogHeader>

      <form
        onSubmit={handleSubmit(handleCreatePost)}
        className="mt-4 flex flex-col gap-4"
      >
        <textarea
          {...register("content")}
          placeholder="No que você está pensando?"
          className="w-full min-h-[120px] p-3 rounded-md resize-none text-sm bg-white dark:bg-zinc-800 text-zinc-800 dark:text-white border border-zinc-300 dark:border-zinc-700"
        />

        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            className="max-h-48 object-contain rounded border border-zinc-300 dark:border-zinc-700"
          />
        )}

        <div className="flex items-center justify-between gap-2 flex-wrap">
          <label
            htmlFor="imageUpload"
            className="cursor-pointer flex items-center gap-2 px-4 py-2 text-sm text-zinc-600 dark:text-zinc-300 border rounded-md bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition"
          >
            <Image size={16} />
            <span>Selecionar imagem</span>
          </label>

          <Input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          <div className="flex-1 flex justify-end">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md text-sm"
            >
              Publicar
            </Button>
          </div>
        </div>
      </form>

     
    </DialogContent>
  );
}
