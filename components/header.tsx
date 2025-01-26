"use client";

import React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import avatarImage from "@/public/image.png";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Switch } from "./ui/switch";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Menu } from "lucide-react";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <header className="flex items-center justify-between px-10 py-4 border-b">
      <div className="hidden md:flex items-center">
        <NavigationMenu>
          <NavigationMenuList className="gap-4">
            <NavigationMenuItem>
              <Link href="/">
                <Avatar>
                  <AvatarImage src={avatarImage.src} alt="Profile Picture" />
                  <AvatarFallback>GO</AvatarFallback>
                </Avatar>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Badge variant="outline" className="text-2xl">
                Gerhard Otto
              </Badge>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="md:hidden flex items-center justify-between w-full">
        <Link href="/">
          <Avatar className="h-12 w-12">
            <AvatarImage src={avatarImage.src} alt="Profile Picture" />
            <AvatarFallback>GO</AvatarFallback>
          </Avatar>
        </Link>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col items-center space-y-4 mt-8">
              <Link
                href="/about"
                className="text-lg"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-lg"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Switch />
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Right side actions */}
      <div className="hidden md:flex items-center space-x-4">
        <div>
          <NavigationMenu>
            <NavigationMenuList className="flex h-5 items-center space-x-4 text-sm">
              <NavigationMenuItem>About</NavigationMenuItem>
              <Separator orientation="vertical" />
              <NavigationMenuItem>Blog</NavigationMenuItem>
              <Separator orientation="vertical" />
              <NavigationMenuItem>History</NavigationMenuItem>
              <Separator orientation="vertical" />
              <HoverCard>
                <HoverCardTrigger>
                  <Switch />
                </HoverCardTrigger>
                <HoverCardContent>Toggle Visuals</HoverCardContent>
              </HoverCard>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
