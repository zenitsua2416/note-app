import { render, screen } from "@testing-library/react";

import { Each } from "./Each";

describe("Each component", () => {
  it("renders a list of items using the render function", () => {
    const items = ["apple", "banana", "cherry"];

    render(
      <Each
        of={items}
        render={(item, index) => (
          <div data-testid="fruit" key={index}>
            {index + 1}. {item}
          </div>
        )}
      />,
    );

    const renderedItems = screen.getAllByTestId("fruit");
    expect(renderedItems).toHaveLength(items.length);

    expect(renderedItems[0]).toHaveTextContent("1. apple");
    expect(renderedItems[1]).toHaveTextContent("2. banana");
    expect(renderedItems[2]).toHaveTextContent("3. cherry");
  });

  it("handles empty arrays without crashing", () => {
    const { container } = render(
      <Each of={[]} render={(item, index) => <div key={index}>{item}</div>} />,
    );

    expect(container).toBeEmptyDOMElement();
  });
});
