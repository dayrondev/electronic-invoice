import { Menu } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { getSession } from "@/lib/session";
// import { navigationMenuTriggerStyle } from "../ui/navigation-menu";
// import { cn } from "@/lib/utils";
import { signout } from "@/lib/auth";
import { ModeToggle } from "../mode-toggle";

const logo = {
  url: "https://www.shadcnblocks.com",
  src: "https://www.shadcnblocks.com/images/block/block-1.svg",
  alt: "logo",
  title: "Shadcnblocks.com",
};
const Navbar = async () => {
  const session = await getSession();

  return (
    <section className="py-4">
      <div className="">
        <nav className="hidden justify-between md:flex">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <img src={logo.src} className="w-8" alt={logo.alt} />
              <span className="text-lg font-semibold">{logo.title}</span>
            </div>
            {/* <div className="flex items-center">
              <Link
                className={cn(
                  "text-muted-foreground",
                  navigationMenuTriggerStyle,
                  buttonVariants({
                    variant: "ghost",
                  })
                )}
                href="/"
              >
                Home
              </Link>
              <Link
                className={cn(
                  "text-muted-foreground",
                  navigationMenuTriggerStyle,
                  buttonVariants({
                    variant: "ghost",
                  })
                )}
                href="/dashboard"
              >
                Dashboard
              </Link>
              <Link
                className={cn(
                  "text-muted-foreground",
                  navigationMenuTriggerStyle,
                  buttonVariants({
                    variant: "ghost",
                  })
                )}
                href="/profile"
              >
                Profile
              </Link>
            </div> */}
          </div>
          <div className="flex gap-2">
            <ModeToggle size="sm" />
            {!session || !session.user ? (
              <>
                <Link
                  className={buttonVariants({ variant: "outline", size: "sm" })}
                  href="/login"
                >
                  Log in
                </Link>
                <Link className={buttonVariants({ size: "sm" })} href="/signup">
                  Sign up
                </Link>
              </>
            ) : (
              <>
                <p>{session.user.name}</p>
                <Button size="sm" onClick={signout}>
                  Sign Out
                </Button>
              </>
            )}
          </div>
        </nav>
        <div className="block md:hidden">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <img src={logo.src} className="w-8" alt={logo.alt} />
              <span className="text-lg font-semibold">{logo.title}</span>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <div className="flex items-center gap-2">
                      <img src={logo.src} className="w-8" alt={logo.alt} />
                      <span className="text-lg font-semibold">
                        {logo.title}
                      </span>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                {/* <div className="mb-6 mt-6 flex flex-col gap-4">
                  <Link href="/" className="font-semibold">
                    Home
                  </Link>
                  <Link href="/dashboard" className="font-semibold">
                    Dashboard
                  </Link>
                  <Link href="/profile" className="font-semibold">
                    Profile
                  </Link>
                </div> */}
                <div className="flex flex-col gap-3 mt-10">
                  <ModeToggle size="default" />
                  {!session || !session.user ? (
                    <>
                      <Link
                        className={buttonVariants({ variant: "outline" })}
                        href="/login"
                      >
                        Log in
                      </Link>
                      <Link className={buttonVariants()} href="/signup">
                        Sign up
                      </Link>
                    </>
                  ) : (
                    <>
                      <p>{session.user.name}</p>
                      <Button onClick={signout}>Sign Out</Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
