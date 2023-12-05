import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Link } from "react-router-dom";
import { login } from "../../api";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const formSchema = z.object({
    email: z.string().email({
      message: "Veuillez entrer une adresse valide",
    }),
    password: z
      .string()
      .min(8)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        {
          message:
            "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un symbole.",
        }
      ),
  });

  const loginForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    if (login) {
      toast({
        title: "Votre accès est autorisé",
        description: `Bienvenue ${loginForm.getValues("email")}`,
        variant: "success",
      });
      loginForm.reset();

      try {
        login(values).then((token: any) => {
          const access_token = token.access_token;
          console.log("valeurs user", token.access_token);
          localStorage.setItem("token", access_token);
        });
        navigate("/dashboard");
      } catch (error) {
        console.log(error);
      }
    } else {
      toast({
        title: "Votre accès est refusé",
        description: "Veuillez vérifer vos identifiants",
        variant: "destructive",
      });
      loginForm.reset();
    }
    console.log(values);
  }
  return (
    <>
      <div>
        <h2 className="h2 font-bold uppercase">Connectez-vous</h2>
      </div>
      <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(onSubmit)} className="w-1/2">
          <FormField
            control={loginForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white"
                    type="text"
                    placeholder="exemple@gmail.com"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white"
                    type="text"
                    placeholder="motdepasse"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="btns flex flex-col justify-around h-28 sm:flex-row sm:justify-between sm:items-center py-2">
            <Button type="submit">Valider</Button>
            <Button type="button">
              <Link to={"/register"}>Inscrivez-vous</Link>
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default Login;
