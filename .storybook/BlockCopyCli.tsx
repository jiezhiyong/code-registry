"use client";

import { useEffect, useState } from "react";
import { useOf, Source } from "@storybook/addon-docs/blocks";

export const BlockCopyCli = ({ of }: { of?: any }) => {
  const resolvedOf = useOf(of || "meta", ["meta"]);

  const [commandStr, setCommandStr] = useState<string>("");

  useEffect(() => {
    if (resolvedOf.type === "meta") {
      const str = resolvedOf.preparedMeta?.id?.split("-")[1];
      setCommandStr(`pnpm dlx shadcn@latest add @tcsk/${str}`);
    }
  }, [resolvedOf]);

  return (
    <>
      <strong>Install with CLI</strong>
      <Source code={commandStr} language="bash" dark={true} />
    </>
  );
};
