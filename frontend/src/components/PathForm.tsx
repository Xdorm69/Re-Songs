"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";

// 🧠 Define Zod schema
const formSchema = z.object({
  path: z.string().min(1, "Path is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function PathForm() {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      path: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    router.push("/songs?path=" + values.path); 
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="path"
          render={({ field }) => (
            <FormItem>
              <FormLabel>File Path</FormLabel>
              <FormControl>
                <Input placeholder="/your/path/here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Submit Path
        </Button>
      </form>
    </Form>
  );
}
