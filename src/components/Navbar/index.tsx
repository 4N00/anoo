'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { NavContainer, NavList, NavItem } from './styles';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const pathname = usePathname();

  return (
    <NavContainer>
      <Link href="/" passHref legacyBehavior>
        <a>ANOO</a>
      </Link>
      <NavList>
        <NavItem>
          <Link href="/" passHref legacyBehavior>
            <a className={pathname === '/' ? 'active' : ''}>Home</a>
          </Link>
        </NavItem>
        <NavItem>
          <Link href="/about" passHref legacyBehavior>
            <a className={pathname === '/about' ? 'active' : ''}>About</a>
          </Link>
        </NavItem>
        <NavItem>
          <Link href="/contact" passHref legacyBehavior>
            <a className={pathname === '/contact' ? 'active' : ''}>Contact</a>
          </Link>
        </NavItem>
      </NavList>
    </NavContainer>
  );
};

export default Navbar;