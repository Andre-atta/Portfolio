"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import RoundedFull from "@/components/button/RoundedFull";
import TerminalWindow from "@/components/modal/TerminalWindow";
import GlowBlob from "@/components/ui/GlowBlob";

const SOCIAL_LINKS = [
    { href: "https://www.linkedin.com/in/andrea-francesco-ivo-andreatta-310a4b32a/", src: "/linkedin-icon.svg", alt: "Linkedin" },
    { href: "https://www.instagram.com/andre__atta/", src: "/instagram-icon.svg", alt: "Instagram" },
    { href: "https://github.com/Andre-atta", src: "/github-icon.svg", alt: "Github" },
];

// Input style condiviso — usa variabili CSS, niente hardcoded
const inputClass =
    "border rounded block w-full p-2.5 text-sm transition-colors duration-200 focus:outline-none focus:ring-1 font-mono";
const inputStyle = {
    background: "rgba(var(--primary-rgb), 0.06)",
    borderColor: "var(--primary-lighter)",
    color: "var(--text)",
    caretColor: "var(--accent)",
};
const inputFocusStyle = { boxShadow: "0 0 0 2px var(--accent-lightest)" };

const EmailSection = () => {
    const [emailSubmitted, setEmailSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            email: e.target.email.value,
            subject: e.target.subject.value,
            message: e.target.message.value,
            "bot-field": e.target["bot-field"].value,
        };

        try {
            const response = await fetch("/api/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            const resData = await response.json();

            if (response.status === 200) {
                setEmailSubmitted(true);
                e.target.reset();
                setErrorMessage("");
            } else {
                setErrorMessage(resData.error || "Something went wrong");
            }
        } catch {
            setErrorMessage("Network error — please try again");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section
            id="contact"
            className="grid md:grid-cols-2 gap-8 py-16 md:py-24 relative"
        >
            {/* Left — intro */}
            <div>
                <h5 className="text-xl font-bold mb-3" style={{ color: "var(--secondary)" }}>
                    Let&apos;s Connect
                </h5>
                <p className="mb-6 max-w-md text-sm md:text-base leading-relaxed opacity-80" style={{ color: "var(--text)" }}>
                    I&apos;m currently looking for new opportunities, my inbox is always open.
                    Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
                </p>
                <div className="flex flex-row gap-3">
                    {SOCIAL_LINKS.map((s) => (
                        <Link key={s.alt} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.alt}>
                            <Image src={s.src} alt={`${s.alt} Icon`} width={32} height={32} />
                        </Link>
                    ))}
                </div>
            </div>

            {/* Right — form */}
            <div>
                <TerminalWindow title="contact.sh">
                    {emailSubmitted ? (
                        <p className="text-sm mt-2" style={{ color: "var(--success)" }}>
                            ✓ Message sent successfully!
                        </p>
                    ) : (
                        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                            {/* Bot honeypot */}
                            <input type="text" name="bot-field" className="hidden" tabIndex="-1" autoComplete="off" />

                            {[
                                { id: "email", label: "YOUR EMAIL", type: "email", placeholder: "you@example.com", required: true },
                                { id: "subject", label: "SUBJECT", type: "text", placeholder: "Just saying hi", required: true },
                            ].map(({ id, label, type, placeholder, required }) => (
                                <div key={id}>
                                    <label htmlFor={id} className="block mb-1.5 text-xs font-bold font-mono tracking-widest" style={{ color: "var(--accent)" }}>
                                        {label}
                                    </label>
                                    <input
                                        name={id} type={type} id={id} required={required}
                                        placeholder={placeholder}
                                        className={inputClass}
                                        style={{ ...inputStyle, "--tw-ring-color": "var(--accent-lightest)" }}
                                        onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
                                        onBlur={e => { e.target.style.boxShadow = "none"; }}
                                    />
                                </div>
                            ))}

                            <div>
                                <label htmlFor="message" className="block mb-1.5 text-xs font-bold font-mono tracking-widest" style={{ color: "var(--accent)" }}>
                                    MESSAGE
                                </label>
                                <textarea
                                    name="message" id="message" required minLength={10} rows={4}
                                    placeholder="Let's talk about..."
                                    className={inputClass}
                                    style={{ ...inputStyle, resize: "vertical" }}
                                    onFocus={e => Object.assign(e.target.style, inputFocusStyle)}
                                    onBlur={e => { e.target.style.boxShadow = "none"; }}
                                />
                            </div>

                            <RoundedFull
                                type="submit"
                                text={loading ? "SENDING..." : "SEND MESSAGE"}
                            />

                            {errorMessage && (
                                <p className="text-xs mt-1" style={{ color: "var(--danger)" }}>{errorMessage}</p>
                            )}
                        </form>
                    )}
                </TerminalWindow>
            </div>
            <GlowBlob/>
        </section>
    );
};

export default EmailSection;

