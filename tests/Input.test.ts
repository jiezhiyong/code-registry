import { test, expect } from "vitest";
import { composeStories } from "@storybook/nextjs-vite";

import * as stories from "../stories/ui/Input.stories";

const { NumberThrowError } = composeStories(stories);

test("Number Input throws error", async () => {
  await expect(NumberThrowError.run()).rejects.toThrowError(
    "Number Input's defaultValue is not a number."
  );
});
