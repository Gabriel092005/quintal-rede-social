import { Register } from "@/api/sign-up";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useMutation} from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const signInForm = z.object({
  nome: z.string(),
  email: z.string(),
  phone:z.string().optional()
});
type SignInForm = z.infer<typeof signInForm>;

export function SignUp() {
  const navigate = useNavigate();
  const [image_path, setSelectedFile] = useState<File | null>(null);
  
  const { register, handleSubmit, formState: { isSubmitting } , reset } = useForm<SignInForm>({});

  const {mutateAsync:create} = useMutation({
    mutationFn:Register
  })
   async function handleSignIn(data: SignInForm) {
  try {
    const { email, nome, phone } = data;

    // Executa a mutação e espera o resultado
    const result = await create({
      email,
      image_path,
      nome,
      phone
    });

    toast.success("Usuário cadastrado com sucesso");
    
    // Redireciona usando o resultado correto
    navigate(`/home/${result.user.id}`);

    // Limpa o formulário depois
    reset();
    setSelectedFile(null); // opcional, se quiser limpar imagem

  } catch (error) {
    toast.error("Oops! Alguma coisa correu mal");
    console.log(error);
  }
}

  return (
    <>
      <Helmet title="Criar Conta" />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Criar Conta</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Acompanhe tudo pelo seu painel pessoal
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(handleSignIn)}>
            <div>
              <Label htmlFor="name" className="font-medium">Nome</Label>
              <Input id="name" placeholder="Seu nome completo" {...register("nome")} />
            </div>

            <div>
              <Label htmlFor="email" className="font-medium">E-mail</Label>
              <Input id="email" type="email" placeholder="exemplo@email.com" {...register("email")} />
            </div>

            <div>
              <Label htmlFor="phone" className="font-medium">Telefone</Label>
              <Input id="phone" placeholder="(+244) 912-345-678" {...register("phone")} />
            </div>

            <div>
              <Label htmlFor="photo" className="font-medium">Foto de Perfil</Label>
              <Input
                id="photo"
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setSelectedFile(file);
                }}
              />
            </div>

            <Button className="w-full" type="submit" disabled={isSubmitting}>
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
              <NavLink to="/sign-in" className="ml-1 underline hover:text-primary">
                Faça login
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

