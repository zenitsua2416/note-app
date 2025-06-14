import { Link } from "react-router-dom";

import { Divider } from "@heroui/react";

import { ROUTES } from "@/constants";
import { Note as NoteProps } from "@/types";

/**
 * The Note preview component for displaying a note in a note grid.
 *
 * @component
 */
export const Note = ({ id, title, notes: content }: NoteProps) => (
  <div className="bg-default-200/50 hover:bg-default-200/75 relative inline-block cursor-pointer self-stretch rounded-lg py-4">
    {/* Card Header */}
    <div className="flex items-center px-4">
      <Link to={ROUTES.NOTE_ROUTE(id)}>
        <span className="absolute inset-0"></span>
        <h3 className="text-default-800 line-clamp-1 text-ellipsis text-lg font-semibold">
          {title}
        </h3>
      </Link>
    </div>
    <Divider className="my-2" />

    {/* Card Body */}
    <div className="px-4">
      <p className="text-default-500 line-clamp-3 text-sm">{content}</p>
    </div>
  </div>
);
