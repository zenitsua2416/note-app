import { Note as NoteProps } from "@/types";
import { Divider } from "@heroui/react";

export const Note = ({ title, notes: content }: NoteProps) => (
  <div className="bg-default-100/50 hover:bg-default-100 inline-block cursor-pointer rounded-lg py-4">
    {/* Card Header */}
    <div className="flex items-center px-4">
      <h1 className="text-default-800 line-clamp-1 text-ellipsis text-lg font-semibold">
        {title}
      </h1>
    </div>
    <Divider className="my-2" />

    {/* Card Body */}
    <div className="px-4">
      <p className="text-default-500 line-clamp-3 text-sm">{content}</p>
    </div>
  </div>
);
