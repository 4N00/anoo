'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavContainer, NavList, NavItem, NavLink, Logo, MenuButton } from './styles';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <NavContainer>
      <Link href="/" passHref legacyBehavior>
        <Logo>ANOO</Logo>
      </Link>
      <MenuButton onClick={toggleMenu}>
        <span>{isMenuOpen ? '×' : '☰'}</span>
      </MenuButton>
      <NavList $isOpen={isMenuOpen}>
        <NavItem>
          <Link href="/" passHref legacyBehavior>
            <NavLink $isActive={pathname === '/'}>Home</NavLink>
          </Link>
        </NavItem>
        <NavItem>
          <Link href="/about" passHref legacyBehavior>
            <NavLink $isActive={pathname === '/about'}>About</NavLink>
          </Link>
        </NavItem>
        <NavItem>
          <Link href="/contact" passHref legacyBehavior>
            <NavLink $isActive={pathname === '/contact'}>Contact</NavLink>
          </Link>
        </NavItem>
      </NavList>
    </NavContainer>
  );
};

export default Navbar;