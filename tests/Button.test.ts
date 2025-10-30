import { test, expect } from "vitest";
import { screen } from "@testing-library/react";
import { composeStories } from "@storybook/nextjs-vite";

// Import all stories and the component annotations from the stories file
import * as stories from "../stories/ui/Button.stories";

// Every component that is returned maps 1:1 with the stories,
// but they already contain all annotations from story, meta, and project levels
const { Primary, Secondary } = composeStories(stories);

test("renders primary button with default args", async () => {
  await Primary.run();
  const buttonElement = screen.getByText("Button");
  expect(buttonElement).not.toBeNull();
});

test("renders primary button with overridden props", async () => {
  // You can override props by passing them in the context argument of the run function
  await Primary.run({ args: { ...Primary.args, children: "Hello world" } });
  const buttonElement = screen.getByText(/Hello world/i);
  expect(buttonElement).not.toBeNull();
});

test("Button snapshot", async () => {
  await Primary.run();
  expect(document.body.firstChild).toMatchSnapshot();
});
