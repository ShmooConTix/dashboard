'use client';

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { ws } from "@/lib/state";

const addUserFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  proxy: z.string().optional(),
  client: z.literal("go").or(z.literal("rs")).or(z.literal("ts")),
  ticketCount: z.literal("1").or(z.literal("2")),
});

export function AddUserPopup() {
  const form = useForm<z.infer<typeof addUserFormSchema>>({
    resolver: zodResolver(addUserFormSchema),
    defaultValues: {
      client: "go",
      ticketCount: "2",
    },
  });

  function onSubmit(data: z.infer<typeof addUserFormSchema>) {
    ws.send(JSON.stringify({
      type: "createUser",
      data
    }));
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add user</DialogTitle>
          <DialogDescription>
            Add a user to purchase ShmooCon tickets.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 pb-4">
              <div className="grid grid-cols-5 gap-4">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="grid gap-2 col-span-2">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Sofa King" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="grid gap-2 col-span-3">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="sofa.king@gmail.com" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-4">
                <FormField
                  name="proxy"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel>Proxy</FormLabel>
                      <FormControl>
                        <Input placeholder="192.168.1.1:user:pass" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  name="client"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="grid gap-2 col-span-2">
                      <FormLabel>Client</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="go">Go Client (go)</SelectItem>
                          <SelectItem value="rs">Rust Client (rs)</SelectItem>
                          <SelectItem value="ts">
                            TypeScript Client (ts)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  name="ticketCount"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="grid gap-2 col-span-1">
                      <FormLabel>Ticket Count</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit">Create User</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
