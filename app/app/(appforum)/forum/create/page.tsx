"use client";

import dynamic from "next/dynamic";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createPost } from "../../_actions/posts";
import { TCreatePost } from "../../_actions/schema";
import { toast } from "sonner";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
// import MDEditor from "@uiw/react-md-editor";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-[300px]" />
});

const PostSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 character long.")
    .max(
      500,
      "Title must be less than 500 characters. This is because I don't want to deal with long titles."
    ),
  content: z.string().min(1, "Post must have content. Please write something."),
  tags: z.array(z.string()),
  isAnonymous: z.boolean()
});

export default function CreatePostPage() {
  const form = useForm<TCreatePost>({
    resolver: zodResolver(PostSchema),
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
                  <Input
                    {...field}
                    type="text"
                    className="p-4 text-xl"
                    placeholder="Post Title"
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
}
