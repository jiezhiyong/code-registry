import { subtitle, title } from "./primitives";
import { siteConfig } from "./siteConfig";

import { GithubIcon } from "@/app/components/Icons";
import { Button } from "@/registry/ui/button";
import { button as buttonStyles } from "@/registry/ui/button/theme";
import { Link } from "@/registry/ui/link";

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
        <Button color="primary" radius="full" variant="shadow">
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
