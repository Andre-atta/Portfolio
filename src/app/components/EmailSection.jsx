"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import GithubIcon from "../../../public/github-icon.svg";
import SpotifyIcon from "../../../public/spotify-icon.svg";
import LinkedinIcon from "../../../public/linkedin-icon.svg";
import InstagramIcon from "../../../public/instagram-icon.svg";
import LetterboxdIcon from "../../../public/letterboxd-icon.svg";
import RoundedFull from "@/app/components/button/RoundedFull";

const EmailSection = () => {
    const [emailSubmitted, setEmailSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email: e.target.email.value,
            subject: e.target.subject.value,
            message: e.target.message.value,
            "bot-field": e.target["bot-field"].value,
        };
        const JSONdata = JSON.stringify(data);
        const endpoint = "/api/send";

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSONdata,
        };

        const response = await fetch(endpoint, options);
        const resData = await response.json();

        if (response.status === 200) {
            setEmailSubmitted(true);
            e.target.reset();
            setErrorMessage("");
        } else
            setErrorMessage(resData.error || "Something went wrong");
    };

    return (
        <section
            id="contact"
            className="grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4 relative"
        >

            <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[var(--primary)] to-transparent rounded-full h-80 w-80 z-0 blur-lg absolute top-3/4 -left-4 transform -translate-x-1/2 -translate-1/2"/>
            <div className="">
                <h5 className="text-[var(--secondary)] text-xl font-bold --text my-2">
                    Let&apos;s Connect
                </h5>
                <p className="--text mb-4 max-w-md" style={{ color: "var(--text)" }}>
                    {" "}
                    I&apos;m currently looking for new opportunities, my inbox is always
                    open. Whether you have a question or just want to say hi, I&apos;ll
                    try my best to get back to you!
                </p>
                <div className="socials flex flex-row gap-2" >
                    <Link href="https://linkedin.com">
                        <Image src={LinkedinIcon} alt="Linkedin Icon" />
                    </Link>
                    <Link href="https://www.instagram.com/andre__atta/">
                        <Image src={InstagramIcon} alt="Instagram Icon" />
                    </Link>
                    <Link href="https://github.com/Andre-atta">
                        <Image src={GithubIcon} alt="Github Icon" />
                    </Link>
                    <Link href="https://open.spotify.com/user/vgjmmtcjkole4pkx5n11wi6nc?si=938d5eaac1da4aeb">
                        <Image src={SpotifyIcon} alt="Spotify Icon" />
                    </Link>
                    <Link href="https://boxd.it/7DcNB">
                        <Image src={LetterboxdIcon} alt="Letterboxd Icon" />
                    </Link>
                </div>
            </div>
            <div>
                {emailSubmitted ? (
                    <p className="text-green-500 text-sm mt-2">
                        Email sent successfully!
                    </p>
                ) : (
                    <form className="flex flex-col" onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label
                                htmlFor="email"
                                className="text-[var(--text)] block mb-2 text-bold font-medium"
                            >
                                YOUR EMAIL
                            </label>
                            <input
                                name="email"
                                type="email"
                                id="email"
                                required
                                className="bg-[#18191E] border border-[var(--primary)] placeholder-[#9CA2A9] text-[var(--text)] text-m rounded block w-full p-2.5"
                                placeholder="placeholder@google.com"
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="subject"
                                className="text-[var(--text)] block mb-2 text-bold font-medium"
                            >
                                SUBJECT
                            </label>
                            <input
                                name="subject"
                                type="text"
                                id="subject"
                                required
                                className="bg-[#18191E] border border-[var(--primary)] placeholder-[#9CA2A9] text-[var(--text)] text-m rounded block w-full p-2.5"
                                placeholder="Just saying hi"
                            />
                            <input type="text" name="bot-field" className="hidden" tabIndex="-1" autoComplete="off" />
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="message"
                                className="text-[var(--text)] block mb-2 text-bold font-medium"
                            >
                                MESSAGE
                            </label>
                            <textarea
                                name="message"
                                id="message"
                                required
                                minLength={10}
                                className="bg-[#18191E] border border-[var(--primary)] placeholder-[#9CA2A9] text-[var(--text)] text-m rounded block w-full p-2.5"
                                placeholder="Let's talk about..."
                            />
                        </div>
                        <RoundedFull
                            type="submit"
                            text="SEND MESSAGE"
                            className="mt-4 text-lg w-full"
                        />
                    </form>
                )} {errorMessage && ( <p className="text-red-500 text-sm mt-2">{errorMessage}</p>)}
            </div>
        </section>
    );
};

export default EmailSection;