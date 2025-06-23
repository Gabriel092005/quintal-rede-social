import { Authenticate } from "@/api/Sign-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const signInForm = z.object({
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().optional(),
});

type SignInForm = z.infer<typeof signInForm>;

export function SignIn() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>();

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: Authenticate,
  });

  async function signIn(data: SignInForm) {
    const { email, phone } = data;

    try {
      await authenticate({ email, phone });
      navigate("/home");
    } catch (error) {
      toast.error("Algo deu errado. Verifique os dados e tente novamente.");
      console.error(error);
    }
  }

  return (
    <>
      <Helmet title="Login" />

      <div className="min-h-screen flex items-center justify-center bg-muted px-4">
        <div className="w-full max-w-lg bg-white p-10 rounded-2xl shadow-xl border border-zinc-200 space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-zinc-900">LOGIN</h1>
            <p className="mt-2 text-base text-muted-foreground">
              Entre com seu e-mail para acessar seu painel
            </p>
          </div>

          <form onSubmit={handleSubmit(signIn)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-medium">
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="exemplo@email.com"
                {...register("email")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="font-medium">
                Telefone (opcional)
              </Label>
              <Input
                id="phone"
                placeholder="(+244) 912-345-678"
                {...register("phone")}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full text-base py-6"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader className="w-5 h-5 animate-spin" />
                  Acessando...
                </span>
              ) : (
                "Acessar Painel"
              )}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Ainda não tem uma conta?
              <NavLink
                to="/sign-up"
                className="ml-1 underline hover:text-emerald-600 transition-colors"
              >
                Criar agora
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
