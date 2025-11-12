"use client";

import { Source, useOf } from "@storybook/addon-docs/blocks";
import React, { useEffect, useState } from "react";
import { OpenInV0Button } from "../components/OpenInV0Button";

export const BlockCopyCli = ({ of }: { of?: any }) => {
  const resolvedOf = useOf(of || "meta", ["meta"]);

  const [name, setName] = useState<string>("");
  const [commandStr, setCommandStr] = useState<string>("");

  useEffect(() => {
    if (resolvedOf.type === "meta") {
      const str = resolvedOf.preparedMeta?.id?.split("-")[1];
      setName(str);
      setCommandStr(`npx shadcn@latest add @tcsk/${str}`);
    }
  }, [resolvedOf]);

  return (
    <>
      <div className="flex items-center gap-3">
        <h3 className="m-0!">Install with CLI</h3>
        <OpenInV0Button name={name} className="w-fit" />
      </div>
      <Source code={commandStr} language="bash" dark={true} />
    </>
  );
};
