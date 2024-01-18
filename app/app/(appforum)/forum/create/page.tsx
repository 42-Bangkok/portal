"use client";

import React from "react";
import { PostEditor } from "../../_components/post-editor";
// import MDEditor from "@uiw/react-md-editor";

export default function CreatePostPage() {
  return (
    <>
      <PostEditor
        tags={[
          {
            id: "1",
            label: "HELLOWORLD",
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString()
          }
        ]}
      />
    </>
  );
}
