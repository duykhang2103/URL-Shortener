import { useToast } from "@/hooks/use-toast";
import { SERVER_URL } from "@/lib/const";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { redirect, useParams } from "react-router-dom";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

const formSchema = z.object({
  password: z.string().optional(),
});

export default function Password() {
  const { toast } = useToast();
  const { code } = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  // useEffect(() => {}, [code]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(`${SERVER_URL}/${code}`, {
        password: values.password,
      });
      if (!response.data.success) {
        toast({
          title: "Failed to shorten the URL",
          description: response.data.message,
          // status: "error",
        });
        return;
      }
      const original = response.data.data;
      redirect(original);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-row justify-between"
      >
        <div className="w-5/6 flex flex-col">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter password here..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
