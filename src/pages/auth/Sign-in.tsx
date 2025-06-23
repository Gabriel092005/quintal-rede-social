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
  email: z.string(),
  phone: z.string().optional(),
});

type SignInForm = z.infer<typeof signInForm>;

export function SignIn() {

  const navigate = useNavigate();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignInForm>({});

   const {mutateAsync:authenticate} = useMutation({
    mutationFn:Authenticate
   })

  async function signIn(data:SignInForm) {
      const {email,phone} = data

       try {

        await  authenticate({email,phone})

          navigate('/home')

       } catch (error) {
          toast.error('alguma coisa deu errado')
       }
  }
  return (
    <>
      <Helmet title="Login" />
 
      <div className="p-8">
        <div className="w-[350px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Acessar Painel</h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe pelo seu painel
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(signIn)} >
            <div className="space-y-2">
              <Label className="font-semibold" htmlFor="e-mail">E-mail</Label>
              <Input id="bi" placeholder="E-mail" {...register("email")} />
            </div>
            <div className="space-y-2">
              <Label className="font-semibold" htmlFor="phone">Telefone</Label>
              <Input id="phone" placeholder="Phone" {...register("phone")} />
            </div>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              Acessar Painel 
              {isSubmitting && (
                <div>
                  <Loader className="animate-spin"></Loader>
                </div>
              )}
            </Button>
               <NavLink to="/sign-up">
                    <Button variant="link" >
                    <span className="underline text-muted-foreground">Se,não tiver uma clique aqui para criar sua conta </span>
                    </Button>
               </NavLink>
        
          </form>
        </div>
      </div>
    </>
  );
}

