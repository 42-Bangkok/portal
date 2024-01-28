"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { TPost, TTag } from "@/lib/db/appforum";
import TextareaAutosize from "react-textarea-autosize";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Skeleton } from "@/components/ui/skeleton";
import MultipleSelector from "@/components/multiselect";

import { createPost, CreatePostSchema, TCreatePost } from "@/lib/db/appforum";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-[300px]" />
});

export const PostCreateEditor = (props: { tags: TTag[] }) => {
  const { tags } = props;

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
