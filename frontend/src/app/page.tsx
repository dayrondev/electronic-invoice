import { Feature43 } from "@/components/landing/feature";
import { Footer2 } from "@/components/landing/footer";
import { Hero1 } from "@/components/landing/hero";
import Navbar from "@/components/landing/navbar";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 xl:px-0">
      <header>
        <Navbar />
      </header>
      <main className="">
        <Hero1
          heading="Blocks Built With Shadcn & Tailwind"
          description="Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project."
          image={{
            src: "https://www.shadcnblocks.com/images/block/placeholder-1.svg",
            alt: "Hero section demo image showing interface components",
          }}
        />
        <Feature43 />
      </main>
      <footer className="">
        <Footer2 />
      </footer>
    </div>
  );
}
