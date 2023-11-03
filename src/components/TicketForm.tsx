"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TicketSchema } from "@/lib/types";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useRouter } from "next/navigation";
import { ReloadTicket, ReloadTickets } from "@/app/actions/ticket-form";
import { Ticket } from "@/models/ticket";

interface TicketFormProps {
  values?: Ticket;
}

export default function TicketForm({ values }: TicketFormProps) {
  const updateMode = values == null ? false : true;
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof TicketSchema>>({
    resolver: zodResolver(TicketSchema),
    defaultValues: values,
  });

  async function onSubmit(data: z.infer<typeof TicketSchema>) {
    let response: Response;
    if (updateMode) {
      response = await fetch("/api/ticket/" + data.id, {
        next: { tags: ["ticket"], revalidate: 3600 },
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        // response status is not 2xx
        toast({
          title: "Error:",
          description: "Editing form failed!",
        });
        return;
      }
    } else {
      response = await fetch("/api/ticket", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        // response status is not 2xx
        toast({
          title: "Error:",
          description: "Submitting form failed!",
        });
        return;
      }
    }

    const responseData = await response.json();

    if (responseData.errors) {
      const errors = responseData.errors;

      if (errors.title) {
        form.setError("title", {
          type: "server",
          message: errors.title,
        });
      } else if (errors.description) {
        form.setError("description", {
          type: "server",
          message: errors.description,
        });
      } else if (errors.priority) {
        form.setError("priority", {
          type: "server",
          message: errors.priority,
        });
      } else if (errors.category) {
        form.setError("category", {
          type: "server",
          message: errors.category,
        });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong!",
        });
      }
    } else {
      if (updateMode) {
        toast({
          title: "Ticket Updated!",
          description: "Ticket is updated in DB",
        });
        ReloadTicket();
      } else {
        toast({
          title: "Ticket Created!",
          description: "Ticket is save in DB",
        });
        ReloadTickets();
      }
      form.reset();

      router.push("/");
    }
  }

  function onCancel() {
    form.reset();
    router.push("/");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="title" {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Type your message here." {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Hardware Problem">
                    Hardware Problem
                  </SelectItem>
                  <SelectItem value="Software Problem">
                    Software Problem
                  </SelectItem>
                  <SelectItem value="Application Development">
                    Application Development
                  </SelectItem>
                  <SelectItem value="Project">Project</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Choose right category.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Priority</FormLabel>
              <FormControl>
                <RadioGroup
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                  className="flex space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="1" />
                    </FormControl>
                    <FormLabel className="font-normal">1</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="2" />
                    </FormControl>
                    <FormLabel className="font-normal">2</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="3" />
                    </FormControl>
                    <FormLabel className="font-normal">3</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="4" />
                    </FormControl>
                    <FormLabel className="font-normal">4</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="5" />
                    </FormControl>
                    <FormLabel className="font-normal">5</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex">
          <Button type="submit">Submit</Button>
          <Button
            variant="destructive"
            type="reset"
            onClick={onCancel}
            className="ml-1"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
