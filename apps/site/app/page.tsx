import { icons } from "frimaicons";
import { IconBrowser } from "@/components/icon-browser";
import { InstallCommand } from "@/components/install-command";

export default function Home() {
  return (
    <>
      <section className="py-14 sm:py-20">
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Every company logo, one package.
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted">
          {icons.length} brand icons as SVG and React components, from Lagos to Manila. Free to use, each with its
          source linked.
        </p>
        <div className="mt-8">
          <InstallCommand />
        </div>
      </section>
      <IconBrowser />
    </>
  );
}
