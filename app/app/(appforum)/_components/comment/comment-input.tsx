"use client";

import { AutosizeTextarea } from "@/components/autosize-textarea";
import { LoadingButton } from "@/components/btns/loading-btn";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import {
  TCreateComment,
  createComment,
  CreateCommentSchema
} from "@/lib/db/appforum";
import { zodResolver } from "@hookform/resolvers/zod";
import { cx } from "class-variance-authority";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const CommentInput = (props: { postId: string }) => {
  const [hidden, setHidden] = React.useState(true);

  const router = useRouter();

  const form = useForm<TCreateComment>({
    resolver: zodResolver(CreateCommentSchema),
    defaultValues: {
      content: "",
      isAnonymous: false
    }
  });

  const handleSubmit = async (payload: TCreateComment) => {
    const { data, error } = await createComment(props.postId, payload);
    if (!!error) {
      toast.error("Failed to send comment.");
      return;
    }
    form.reset();
    router.refresh();
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          name="content"
          render={({ field }) => (
            <AutosizeTextarea
              {...field}
              placeholder="be as mean as possible :)"
              onFocus={() => setHidden(false)}
            />
          )}
        />
        <div
          className={cx({
            hidden: hidden,
            "flex justify-end w-full gap-2": true
          })}
        >
          <Button
            onClick={() => setHidden(true)}
            type="button"
            variant={"outline"}
          >
            cancel
          </Button>
          <LoadingButton loading={form.formState.isLoading} type="submit">
            comment
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};
