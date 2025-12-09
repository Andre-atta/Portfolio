import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL;

export async function POST(req) {
    const body = await req.json();
    const { email, subject, message, ["bot-field"]: botField } = body;

    if (botField && botField.trim() !== "")
        return NextResponse.json({ error: "Bot deteced" }, { status: 400 });

    if (
        !email || !subject || !message ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
        message.trim().length < 10 || message.trim().length > 10000
    ) { return NextResponse.json({ error: "Invalid input" }, { status: 400 }); }

    const spammyWords = ["viagra", "free money", "http://", "buy now"];
    if (spammyWords.some((word) => message.toLowerCase().includes(word)))
        return NextResponse.json({ error: "Spam content detected" }, { status: 400 });

    try {
        const data = await resend.emails.send({
            from: fromEmail,
            to: [fromEmail, email],
            subject: subject,
            react: (
                <>
                    <h1>{subject}</h1>
                    <p>Thank you for contacting me!</p>
                    <p>I&apos;ll reply as soon as possible</p>
                </>
            ),
        });

        return NextResponse.json({ success: true, data }, { status: 200 });
    } catch (error) { return NextResponse.json({ error: "Email failed to send" }, { status: 500 }); }
}