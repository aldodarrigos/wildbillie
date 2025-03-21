"use client";

import {
  Navbar as NavbarBase,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarItemProps,
} from "@heroui/navbar";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import AppButton from "@/components/AppButton";
import { INavBar, INavBarItem } from "@/types/ui";


export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function Navbar({ menuItems }: INavBar) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <NavbarBase onMenuOpenChange={setIsMenuOpen} isBlurred={false} className="bg-transparent">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Image src="/img/logo-white.webp" alt="logo-wildbillie" width={70} height={100} />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4 text-white" justify="center">
        {menuItems && menuItems.map((item) => (
          <NavbarItem key={item.name} isActive={item.isActive}>
            <Link color={item.isActive ? undefined : "foreground"} href={item.href}>
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <AppButton as={Link} color="primary" href="#">
            Sign Upx
          </AppButton>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems && menuItems.map((item, index) =>  item.isMenu && (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href={item.href}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NavbarBase>
  );
}

