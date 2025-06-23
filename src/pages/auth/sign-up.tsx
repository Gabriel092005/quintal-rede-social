import { Register } from "@/api/sign-up";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useMutation } from "@tanstack/react-query";
import { Loader, MessageCircleCodeIcon } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const signInForm = z.object({
  nome: z.string(),
  email: z.string(),
  phone: z.string().optional(),
});

type SignInForm = z.infer<typeof signInForm>;

export function SignUp() {
  const navigate = useNavigate();
  const [image_path, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<SignInForm>();

  const { mutateAsync: create } = useMutation({
    mutationFn: Register,
  });

  async function handleSignIn(data: SignInForm) {
    try {
      const { email, nome, phone } = data;

          await create({
        email,
        image_path,
        nome,
        phone,
      });

      toast.success("Usuário cadastrado com sucesso");
      navigate('/');

      reset();
      setSelectedFile(null);
    } catch (error) {
      toast.error("Oops! Algo deu errado.");
      console.log(error);
    }
  }

  return (
    <>
      <Helmet title="Criar Conta" />
      <div className="min-h-screen flex items-center justify-center bg-muted dark:bg-zinc-800 px-4">
        <div className="w-full max-w-md bg-white dark:bg-zinc-900 p-8 rounded-2xl dark:border-none shadow-xl border border-zinc-200">
          <div className="text-center  flex flex-col items-center">
               <div className="flex text-lg items-center text-muted">
                <MessageCircleCodeIcon className="text-blue-500"/>
               <span className="font-sm text-lg text-blue-500">Quintal</span>
              </div>
            <h1 className="text-3xl font-bold text-zinc-900">Criar Conta</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Acompanhe tudo pelo seu painel pessoal
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-5">
            <div>
              <Label htmlFor="name" className="">
                Nome
              </Label>
              <Input
                id="name"
                          className="dark:bg-zinc-800 dark:border-none focus:no-underline"  
                placeholder="Seu nome completo"
                {...register("nome")}
              />
            </div>

            <div>
              <Label htmlFor="email" className="font-medium">
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="exemplo@email.com"
                className="dark:bg-zinc-800 dark:border-none focus:no-underline"  
                {...register("email")}
              />
            </div>

            <div>
              <Label htmlFor="phone" className="font-medium">
                Telefone
              </Label>
              <Input
                id="phone"
                placeholder="(+244) 912-345-678"
                {...register("phone")}
              className="dark:bg-zinc-800 dark:border-none focus:no-underline"  
              />
            </div>

            <div>
              <Label htmlFor="photo" className="font-medium">
                Foto de Perfil
              </Label>
              <Input
              
                id="photo"
                type="file"
                accept="image/*"
                className="cursor-pointer  dark:bg-zinc-800 dark:border-none focus:no-underline  file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-emerald-100 file:text-emerald-700 hover:file:bg-emerald-200"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setSelectedFile(file);
                }}
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <span className="flex items-center gap-2 justify-center">
                  <Loader className="w-4 h-4 animate-spin" />
                  Criando conta...
                </span>
              ) : (
                "Criar conta"
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Já tem uma conta?
              <NavLink
                to="/sign-in"
                className="ml-1 underline hover:text-emerald-600 transition-colors"
              >
                Faça login
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
