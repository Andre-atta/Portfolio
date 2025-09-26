"use client";
import Link from 'next/link';
import NavLink from "./NavLink";
import React, { useState } from 'react';
import MenuOverlay from "./MenuOverlay";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

const navLinks = [
    {
        title: "ABOUT",
        path: "#about",
    },
    {
        title: "PROJECTS",
        path: "#projects",
    },
    {
        title: "CONTACT",
        path: "#contact",
    },
];

const Navbar = () => {
    const [navbarOpen, setNavbarOpen] = useState(false);

    return (
        <nav className="fixed mx-auto top-0 left-0 right-0 z-20 bg-[var(--background)]">
            <div className="flex border-b-2 border-[var(--primary)] flex-wrap items-center justify-between mx-auto lg:px-8 lg:py-4 px-4 py-2">
                <Link
                    href={"/"}
                    className="text-5xl md:text-6xl font-semibold bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] bg-clip-text text-transparent"
                > Andre-atta
                </Link>
                <div className="mobile-menu block md:hidden">
                    {!navbarOpen ? (
                        <button
                            onClick={() => setNavbarOpen(true)}
                            className="flex items-center px-3 py-2 border rounded border-[var(--primary)] text-[var(--secondary)] hover:border-[var(--secondary)] hover:text-[var(--text)]"
                        >
                            <Bars3Icon className="h-5 w-5" />
                        </button>
                    ) : (
                        <button
                            onClick={() => setNavbarOpen(false)}
                            className="flex items-center px-3 py-2 border rounded border-[var(--primary)] text-[var(--secondary)] hover:border-[var(--secondary)] hover:text-[var(--text)]"
                        >
                            <XMarkIcon className="h-5 w-5" />
                        </button>
                    )}
                </div>
                <div className="menu hidden md:block md:w-auto" id="navbar">
                    <div className="bg-[#F5FBEF] bg-opacity-100 bg-transparent mt-2">
                        <ul className="flex p-0 md:flex-row md:space-x-16">
                            {navLinks.map((link, index) => (
                                <li key={index}>
                                    <NavLink
                                        href={link.path}
                                        title={link.title}
                                        className="text-xl px-6 py-3 rounded-lg transition-colors duration-200 hover:bg-[var(--primary)] hover:text-[var(--background)]"
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            {navbarOpen ? <MenuOverlay links={navLinks} /> : null}
        </nav>
    );
};

export default Navbar;