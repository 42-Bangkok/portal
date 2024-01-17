"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { signOut, useSession } from "next-auth/react";
import { AuthBtn } from "../btns/auth-btn";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

const components: {
  title: string;
  href: string;
  description: string;
  target: string;
}[] = [
  {
    title: "Map",
    href: "/map",
    target: "_blank",
    description: "What's around 42 Bangkok?"
  },
  {
    title: "Who's on site?",
    href: "/who-s-on-site",
    target: "_self",
    description: "Check if your friend is on site"
  },
  {
    title: "My Resume",
    href: "/resume",
    target: "_self",
    description: "Your public resume"
  }
];

const ABOUTS: {
  title: string;
  href: string;
  description: string;
  target: string;
}[] = [
  {
    title: "Contributors",
    href: "/contributors",
    target: "",
    description: "Contributors"
  }
];

const no_renders = ["/login"];

export function NavBar() {
  const pathname = usePathname();
  const session = useSession();
  const user = session.data?.user;
  if (no_renders.includes(pathname)) return null;
  return (
    <div className="flex justify-center p-1 m-1 shadow">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                42 Portal
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Apps</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                    target={component.target}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Profile</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex flex-col justify-end w-full h-full p-6 no-underline rounded-md outline-none select-none bg-gradient-to-b from-muted/50 to-muted focus:shadow-md"
                      href="/"
                    >
                      <div className="mt-4 mb-2 text-lg font-medium">
                        {user?.login}
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        {user?.name}
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/profile/setting" title="Settings">
                  Configure your portal settings.
                </ListItem>
                <ListItem href="/" title="sub-menu-1">
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem href="/docs/primitives/typography" title="sub-menu-3">
                  Styles for headings, paragraphs, lists...etc
                </ListItem>
                <Button
                  onClick={() => {
                    signOut({ callbackUrl: "/login" });
                  }}
                  variant={"destructive"}
                >
                  Sign Out
                </Button>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>About</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {ABOUTS.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                    target={component.target}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
