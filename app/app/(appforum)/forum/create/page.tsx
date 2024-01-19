import React, { Suspense } from "react";
import { PostEditor } from "../../_components/post-editor";

export default function CreatePostPage() {
  return (
    <Suspense fallback={<PostEditor.skeleton />}>
      <PostEditor />
    </Suspense>
  );
}
