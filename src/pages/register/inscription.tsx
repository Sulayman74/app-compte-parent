import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { useForm } from "react-hook-form";
import { useToast } from "../../components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

const Inscription = () => {
  const { toast } = useToast();

  const formSchema = z.object({
    firstname: z.string().min(2).max(50),
    lastname: z.string().min(2).max(50),
    email: z.string().email({
      message: "Veuillez entrer une adresse valide",
    }),
    description: z.string().max(200).optional(),
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

  const registerForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      description: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (registerForm.formState.isValid) {
      toast({
        title: "hello, vous êtes bien enregistré ",
        description: `Bienvenue ${registerForm.getValues("firstname")}`,
      });
    }
    registerForm.reset();
    console.log(values);
  }

  return (
    <section className="container flex flex-col h-screen bg-green-500 justify-around items-center">
      <div>
        <p className="h2"> Enregistrez-vous</p>
      </div>
      <Form {...registerForm}>
        <form
          onSubmit={registerForm.handleSubmit(onSubmit)}
          className="w-full bg-slate-100 sm:w-1/2 shadow-black shadow-md rounded-sm p-4">
          <FormField
            control={registerForm.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Firstname</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Entrez votre prénom"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Lastname</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Entrez votre nom"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="exemple@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Cet email sera votre identifiant
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="motdepasse" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="mt-2" type="submit">
            Valider
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default Inscription;
