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
import { CalendarIcon } from "@radix-ui/react-icons";
import { useContext, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { UrlsContext } from "@/contexts/UrlsContext";
import axios from "axios";
import { VITE_BASE_URL } from "@/lib/const";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  original: z.string().url(),
  expiresAt: z.string().optional(),
  password: z.string().optional(),
  custom: z.string().max(10).optional(),
});

export function UrlForm() {
  const { urls, setUrls } = useContext(UrlsContext);
  const [isExpireOpen, setIsExpireOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [isCustomOpen, setIsCustomOpen] = useState(false);
  const [date, setDate] = useState<Date>();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      original: "",
      expiresAt: "",
      password: "",
      custom: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const payload = {
        url: values.original,
        expiresAt: isExpireOpen ? values.expiresAt : "",
        password: isPasswordOpen ? values.password : "",
        custom: isCustomOpen ? values.custom : "",
      };

      const response = await axios.post(`${VITE_BASE_URL}/urls`, payload);
      const data = response.data.data;
      setUrls([data, ...urls]);
    } catch (error: any) {
      toast({
        title: "Failed to shorten the URL",
        description: error.response.data.message,
        variant: "error",
      });
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
            name="original"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="h-[50px] md:text-xl text-sm"
                    placeholder="Shorten a link here..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Collapsible
            open={isExpireOpen}
            onOpenChange={setIsExpireOpen}
            className="h-12 md:w-1/2 w-3/4 flex flex-row items-center justify-between space-y-2"
          >
            <div className=" items-center justify-between space-x-4 px-4">
              <CollapsibleTrigger asChild>
                <div className="flex items-center space-x-2">
                  <Switch
                    onCheckedChange={setIsExpireOpen}
                    id="expiry-date-toggle"
                  />
                  <Label htmlFor="expiry-date-toggle">Expiry date</Label>
                </div>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="md:w-3/5 w-full space-y-2">
              <FormField
                control={form.control}
                name="expiresAt"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              " justify-start text-left font-normal",
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
            className="h-12 md:w-1/2  flex flex-row items-center justify-between space-y-2"
          >
            <div className=" items-center justify-between space-x-4 px-4">
              <CollapsibleTrigger asChild>
                <div className="flex items-center space-x-2">
                  <Switch
                    disabled
                    onCheckedChange={setIsPasswordOpen}
                    id="password-toggle"
                  />
                  <Label htmlFor="password-toggle">Password</Label>
                </div>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="w-3/5 space-y-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Set password here..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CollapsibleContent>
          </Collapsible>

          <Collapsible
            open={isCustomOpen}
            onOpenChange={setIsCustomOpen}
            className="h-12 md:w-1/2 flex flex-row items-center justify-between space-y-2"
          >
            <div className=" items-center justify-between space-x-4 px-4">
              <CollapsibleTrigger asChild>
                <div className="flex items-center space-x-2">
                  <Switch
                    onCheckedChange={setIsCustomOpen}
                    id="custom-toggle"
                  />
                  <Label htmlFor="custom-toggle">Custom Code</Label>
                </div>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="w-3/5 space-y-2">
              <FormField
                control={form.control}
                name="custom"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormControl>
                      <Input
                        placeholder="Custom your short code here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="absolute right-[-250px] top-0" />
                  </FormItem>
                )}
              />
            </CollapsibleContent>
          </Collapsible>
        </div>
        <Button
          className="md:w-1/6 w-1/5 h-[50px] md:text-xl text-xs"
          type="submit"
        >
          Shorten it!
        </Button>
      </form>
    </Form>
  );
}
