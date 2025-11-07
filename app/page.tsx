import { button as buttonStyles } from "@/registry/ui backup/button/theme";
import { Link } from "@/registry/ui backup/link";

import { GithubIcon } from "@/components/Icons";
import { Button } from "@/registry/ui backup/button";
import { subtitle, title } from "./primitives";
import { siteConfig } from "./siteConfig";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block text-center justify-center">
        <span className={title()}>Make&nbsp;</span>
        <span className={title({ color: "violet" })}>beautiful&nbsp;</span>
        <br />
        <span className={title()}>websites regardless of your design experience.</span>
        <div className={subtitle({ class: "mt-4" })}>Beautiful, fast and modern React UI library.</div>
      </div>

      <div className="flex gap-3">
        <Button variant="shadow" color="primary" radius="full">
          Documentation
        </Button>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>
    </section>
  );
}
