"use client";

import {
  Navbar as NavbarBase,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@heroui/navbar';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { INavBar } from '@/types/ui';
import AppButton from '../AppButton';
import AppButtonGroup from '../AppButtonGroup';
import { Button } from '@heroui/button';

const defaultMenuItems = [
  { name: 'Events', href: '#', isActive: true },
  { name: 'Calculators', href: '#', isActive: false },
  { name: 'Running', href: '#', isActive: false },
  { name: 'Thriatlon', href: '#', isActive: false },
  { name: 'Sports', href: '#', isActive: false },
];

export default function Navbar({ menuItems = defaultMenuItems }: INavBar) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <NavbarBase
      onMenuOpenChange={setIsMenuOpen}
      isBlurred={false}
      maxWidth="xl"
      className="bg-transparent fixed top-0 w-full z-50 container mx-auto "
      classNames={{
        wrapper: '',
      }}
    >
      <NavbarContent className="gap-4">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden text-white"
        />
        <NavbarBrand>
          <Link href="/">
            <Image
              src="/img/logo-white.webp"
              alt="logo-wildbillie"
              width={70}
              height={100}
              className="cursor-pointer"
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex gap-8 text-white"
        justify="center"
      >
        {menuItems.map(item => (
          <NavbarItem
            key={item.name}
            isActive={item.isActive}
            className="font-raleway font-bold text-base"
          >
            <Link
              href={item.href}
              className={`${item.isActive ? 'text-orange-500' : 'text-white hover:text-orange-300'} transition-colors`}
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end" className="gap-4">
        <AppButtonGroup radius="sm" className="shadow-lg">
          <AppButton color="primary">Sign Up</AppButton>
          <AppButton color="primary">Log In</AppButton>
        </AppButtonGroup>
      </NavbarContent>

      <NavbarMenu className="bg-zinc-900/90 backdrop-blur-xl">
        {menuItems.map(item => (
          <NavbarMenuItem key={item.name}>
            <Link
              href={item.href}
              className={`w-full block py-2 text-lg ${
                item.isActive
                  ? 'text-orange-500'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NavbarBase>
  );
}

