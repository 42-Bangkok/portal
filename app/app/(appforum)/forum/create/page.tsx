"use client";

import dynamic from "next/dynamic";
import React from "react";
import type { ContextStore } from "@uiw/react-md-editor";
// import MDEditor from "@uiw/react-md-editor";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });
type OnChange = (
  value?: string,
  event?: React.ChangeEvent<HTMLTextAreaElement>,
  state?: ContextStore
) => void;

export default function CreatePostPage() {
  const [value, setValue] = React.useState("**Hello world!!!**");

  const onChange = React.useCallback<OnChange>((val) => {
    setValue(val || "");
  }, []);
  return (
    <>
      <MDEditor style={{ width: "100%" }} value={value} onChange={onChange} />
      {/* <MDEditor.Markdown source={value} /> */}
    </>
  );
}
