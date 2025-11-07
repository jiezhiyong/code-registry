import { render } from "@testing-library/react";
import * as React from "react";

import { Form } from "@/registry/ui";

describe("Form", () => {
  it("should render correctly", () => {
    const wrapper = render(<Form />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLFormElement>();

    render(<Form ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});
