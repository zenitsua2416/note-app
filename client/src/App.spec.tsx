import { render, screen, fireEvent } from "@testing-library/react";

import App from "./App";
import Provider from "./Provider";

describe("App", () => {
  test("renders correctly", () => {
    render(
      <Provider>
        <App />
      </Provider>,
    );

    const heading = screen.getByRole("heading", {
      name: "My Simple Vite App⭐",
      level: 1,
    });
    expect(heading).toBeInTheDocument();

    const button = screen.getByRole("button", { name: /count is \d+/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    fireEvent.click(button);
    expect(button).toHaveTextContent("Count is 2");
  });
});
