import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { NOTE_ROUTE } from "@/constants";
import { Note as INote } from "@/types";

import { Note } from "./Note.component";

describe("Note Component", () => {
  const mockNote: INote = {
    id: "1",
    title: "Test Note",
    notes: "This is a test note. It has some content. It is used for testing.",
    user_id: "u1",
    in_trash: false,
    created_at: new Date().toISOString(),
  };

  it("renders the note title and link correctly", () => {
    render(<Note {...mockNote} />, {
      wrapper: MemoryRouter,
    });

    // Check that the title is rendered
    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading).toHaveTextContent(mockNote.title);

    // Check that the link has the correct href
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", NOTE_ROUTE(mockNote.id));
  });

  it("renders the description", () => {
    render(<Note {...mockNote} />, {
      wrapper: MemoryRouter,
    });

    // Check the description is rendered
    const description = screen.getByRole("paragraph");
    expect(description).toHaveTextContent(mockNote.notes as string);
  });
});
