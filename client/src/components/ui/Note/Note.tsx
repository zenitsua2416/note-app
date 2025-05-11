import { Link } from "react-router-dom";

import { Divider } from "@heroui/react";

import { Note as NoteProps } from "@/types";

export const Note = ({ id, title, notes: content }: NoteProps) => (
  <div className="bg-default-200/50 hover:bg-default-200/75 inline-block cursor-pointer rounded-lg py-4">
    {/* Card Header */}
    <div className="flex items-center px-4">
      <Link to={`/note/${id}`}>
        <h1 className="text-default-800 line-clamp-1 text-ellipsis text-lg font-semibold">
          {title}
        </h1>
      </Link>
    </div>
    <Divider className="my-2" />

    {/* Card Body */}
    <div className="px-4">
      <p className="text-default-500 line-clamp-3 text-sm">{content}</p>
    </div>
  </div>
);
