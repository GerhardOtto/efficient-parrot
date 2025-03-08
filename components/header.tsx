"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Menu } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

import { notionists } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { ThemeSwitch } from "./ThemeSwitch";

const avatar = createAvatar(notionists, {
  seed: "Food",
});

const svg = avatar.toDataUri();

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navItems = [{ label: "Recipes", href: "/recipes" }];
  return (
    <header className="flex items-center justify-between px-10 py-4 border-b">
      {/* Hamburger */}
      <div className="md:hidden flex items-center justify-between w-full">
        <Link href="/" passHref>
          <Avatar>
            <AvatarImage
              src={svg}
              alt="Profile Picture"
              height={40}
              width={40}
            />
            <AvatarFallback>GO</AvatarFallback>
          </Avatar>
        </Link>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>
                  Gerhard Otto
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col items-center space-y-4 mt-8">
              {navItems.map((item) => (
                <Link href={item.href} key={item.label} passHref>
                  <Button variant="ghost" onClick={() => setIsOpen(false)}>
                    {item.label}
                  </Button>
                </Link>
              ))}
              <ThemeSwitch />
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Regular left*/}
      <div className="hidden md:flex">
        <NavigationMenu>
          <NavigationMenuList className="gap-4">
            <NavigationMenuItem>
              <Link href="/" passHref>
                <Avatar>
                  <AvatarImage
                    src={svg}
                    alt="Profile Picture"
                    height={100}
                    width={100}
                  />
                  <AvatarFallback>GO</AvatarFallback>
                </Avatar>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Badge variant="default" className="text-2xl">
                Gerhard Otto
              </Badge>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Regular right*/}
      <div className="hidden md:flex items-center space-x-4">
        <div>
          <NavigationMenu>
            <NavigationMenuList className="flex h-5 items-center space-x-4 text-sm">
              <NavigationMenuItem>
                {navItems.map((item) => (
                  <Link href={item.href} key={item.label} passHref>
                    <Button variant="ghost" onClick={() => setIsOpen(false)}>
                      {item.label}
                    </Button>
                  </Link>
                ))}
              </NavigationMenuItem>
              <NavigationMenuItem>
                <ThemeSwitch />
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
