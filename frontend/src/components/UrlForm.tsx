import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Calendar } from "./ui/calendar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { CalendarIcon, CaretSortIcon } from "@radix-ui/react-icons";
import { useContext, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { UrlsContext } from "@/contexts/UrlsContext";
import axios from "axios";
import { SERVER_URL } from "@/lib/const";
import { url } from "inspector";

const formSchema = z.object({
  original: z.string().url(),
  expiresAt: z.string().optional(),
  password: z.string().optional(),
});

export function UrlForm(
  {
    //   handleSubmit,
    // }: {
    //   handleSubmit: (values: any) => Promise<void>;
  }
) {
  const [isExpireOpen, setIsExpireOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const { urls, setUrls } = useContext(UrlsContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      original: "",
      // expiresAt: `${new Date().toISOString()}`,
      expiresAt: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      const response = await axios.post(`${SERVER_URL}/urls`, {
        url: values.original,
        // expiresAt: values.expiresAt,
        // password: values.password,
      });
      const data = response.data.data;
      setUrls([...urls, data]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 row-auto"
      >
        <FormField
          control={form.control}
          name="original"
          render={({ field }) => (
            <FormItem className="w-3/4">
              {/* <FormLabel>Username</FormLabel> */}
              <FormControl>
                <Input placeholder="Shorten a link here..." {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <Collapsible
          open={isExpireOpen}
          onOpenChange={setIsExpireOpen}
          className="flex flex-row w-[350px] space-y-2"
        >
          <div className=" items-center justify-between space-x-4 px-4">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <CaretSortIcon className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
              {/* <div className="flex items-center space-x-2">
                <Switch id="airplane-mode" />
                <Label htmlFor="airplane-mode">Airplane Mode</Label>
              </div> */}
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="space-y-2">
            <FormField
              control={form.control}
              name="expiresAt"
              render={({ field }) => (
                // <FormItem className="flex-row rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
                <FormItem className="w-3/4">
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(date) => {
                            setDate(date);
                            form.setValue(
                              "expiresAt",
                              date ? date.toISOString() : ""
                            );
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CollapsibleContent>
        </Collapsible>

        <Collapsible
          open={isPasswordOpen}
          onOpenChange={setIsPasswordOpen}
          className="flex flex-row w-[350px] space-y-2"
        >
          <div className=" items-center justify-between space-x-4 px-4">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <CaretSortIcon className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
              {/* <div className="flex items-center space-x-2">
                <Switch id="airplane-mode" />
                <Label htmlFor="airplane-mode">Airplane Mode</Label>
              </div> */}
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="space-y-2">
            <FormField
              control={form.control}
              name="expiresAt"
              render={({ field }) => (
                <FormField
                  control={form.control}
                  // disabled={false}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-3/4">
                      {/* <FormLabel>Password</FormLabel> */}
                      <FormControl>
                        <Input placeholder="sd" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            />
          </CollapsibleContent>
        </Collapsible>
        <Button type="submit">Shorten it!</Button>
      </form>
    </Form>
  );
}
