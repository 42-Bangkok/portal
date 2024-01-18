"use client";
import { TPost, TTag } from "@/lib/db/appforum";
import dynamic from "next/dynamic";
import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createPost, CreatePostSchema, TCreatePost } from "@/lib/db/appforum";
import { toast } from "sonner";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import MultipleSelector from "@/components/multiselect";
import { ErrorBird } from "../error-bird";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-[300px]" />
});

export const PostEditor = (props: { tags: TTag[] }) => {
  const { tags } = props;
  const [open, setOpen] = React.useState(false);
  const form = useForm<TCreatePost>({
    resolver: zodResolver(CreatePostSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
      isAnonymous: false
    }
  });

  const handleSubmit = async (values: TCreatePost) => {
    const error = await createPost(values);
    if (error) {
      toast.error("Error creating post");
    } else {
      toast.success("Post created");
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="container flex flex-col gap-3"
        >
          <FormField
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TextareaAutosize
                    autoFocus
                    id="title"
                    onChange={field.onChange}
                    placeholder="Post title"
                    className="w-full overflow-hidden text-4xl font-bold bg-transparent appearance-none resize-none focus:outline-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <MultipleSelector
                    // @ts-ignore
                    defaultOptions={tags}
                    placeholder="add tag"
                    emptyIndicator={
                      <p className="text-lg leading-10 text-center text-gray-600 dark:text-gray-400">
                        no results found.
                      </p>
                    }
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <MDEditor
                    style={{ width: "100%" }}
                    value={form.getValues().content}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between w-full">
            <Link href="/forum">
              <Button variant={"outline"} type="button">
                Cancel
              </Button>
            </Link>
            <div className="space-x-2">
              <Button
                type="button"
                onClick={() => form.reset()}
                variant={"destructive"}
              >
                Reset
              </Button>
              <Button type="submit">Create Post</Button>
            </div>
          </div>
        </form>
      </Form>
      {/* <MDEditor.Markdown source={value} /> */}
    </>
  );
};

// <Command>
//   <CommandInput placeholder="Search tag..." />
//   <CommandEmpty>No tag found.</CommandEmpty>
//   <CommandGroup>
//     {tags
//       .filter(
//         (tag) =>
//           !field.value.find((t) => {
//             console.log(field.value);
//             return t?.label === tag.label;
//           })
//       )
//       .map((tag) => (
//         <CommandItem
//           key={tag.label}
//           value={tag.label}
//           onSelect={(currentValue) => {
//             console.log(currentValue);
//             field.onChange([
//               ...field.value,
//               tags.find(
//                 (tag) => tag.label === currentValue
//               )
//             ]);
//           }}
//         >
//           {tag.label}
//         </CommandItem>
//       ))}
//   </CommandGroup>
// </Command>;
