import { render, screen } from "@testing-library/react";

import { Note as INote } from "@/types";

import { NoteGrid } from "./NoteGrid.component";

// Mock the Note component
vi.mock("@/components/ui", () => ({
  Note: ({ title }: { title: string }) => <div data-testid="note">{title}</div>,
}));

describe("NoteGrid", () => {
  const notes: INote[] = [
    {
      id: "1",
      title: "First Note",
      notes: "Content A",
      user_id: "u1",
      in_trash: false,
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Second Note",
      notes: "Content B",
      user_id: "u1",
      in_trash: false,
      created_at: new Date().toISOString(),
    },
  ];

  it("renders all notes in the grid", () => {
    render(<NoteGrid notes={notes} />);

    const renderedNotes = screen.getAllByTestId("note");
    expect(renderedNotes).toHaveLength(notes.length);
    expect(renderedNotes[0]).toHaveTextContent("First Note");
    expect(renderedNotes[1]).toHaveTextContent("Second Note");
  });

  it("renders the endChild after notes", () => {
    render(
      <NoteGrid
        notes={notes}
        endChild={<div data-testid="end-child">Load More</div>}
      />,
    );

    expect(screen.getByTestId("end-child")).toBeInTheDocument();
    expect(screen.getByText("Load More")).toBeInTheDocument();
  });

  it("renders nothing when notes are empty, except endChild", () => {
    render(
      <NoteGrid
        notes={[]}
        endChild={<div data-testid="end-child">Empty</div>}
      />,
    );

    expect(screen.queryByTestId("note")).not.toBeInTheDocument();
    expect(screen.getByTestId("end-child")).toBeInTheDocument();
  });
});
