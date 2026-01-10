"use client";

import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { registerSisterAction, getEventDetails } from "./actions";
import {
    Loader2,
    CheckCircle2,
    Download,
    MapPin,
    Calendar,
    Clock,
    Sparkles,
    User,
    Users,
    Ticket,
    Printer,
    ArrowLeft,
} from "lucide-react";

// --- TYPES ---
interface TicketData {
    id: string;
    first_name: string;
    last_name: string;
    level: string;
    department?: string;
}

interface EventInfo {
    title: string;
    description: string;
}

export default function SistersConferenceReg() {
    const [step, setStep] = useState<"form" | "ticket">("form");
    const [ticketData, setTicketData] = useState<TicketData | null>(null);
    const [loading, setLoading] = useState(false);
    const [eventInfo, setEventInfo] = useState<EventInfo | null>(null);
    const [isGuest, setIsGuest] = useState(false);

    useEffect(() => {
        async function load() {
            const data = await getEventDetails();
            if (data) setEventInfo(data as EventInfo);
        }
        load();
    }, []);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        formData.append("isGuest", isGuest ? "true" : "false");

        try {
            const result = await registerSisterAction(formData);
            if (result.success) {
                setTicketData(result.data);
                setStep("ticket");
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                alert("Error: " + result.error);
            }
        } catch (err) {
            alert("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-2 font-sans">
            {/* PRINT STYLES: Hides everything except the ticket when printing */}

            {/* =========================================
               1. LEFT PANEL (STATIC HERO)
               ========================================= */}
            <div className="no-print relative flex flex-col justify-between bg-[#9D174D] p-8 lg:p-16 text-white overflow-hidden min-h-[300px] lg:min-h-screen lg:sticky lg:top-0">
                {/* Abstract Background */}
                <div className="absolute top-0 right-0 -mr-32 -mt-32 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-pink-500 to-rose-600 blur-3xl opacity-40 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-80 w-80 rounded-full bg-purple-900 blur-3xl opacity-50"></div>

                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 rounded-full border border-pink-200/20 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-wider backdrop-blur-md text-pink-50 mb-8 uppercase">
                        <Sparkles className="h-3 w-3 text-yellow-300" />
                        RCF Sisters Unit
                    </div>

                    <h1 className="font-serif text-4xl lg:text-7xl font-bold leading-none tracking-tight mb-4">
                        {eventInfo ? eventInfo.title : "Loading..."}
                    </h1>

                    {eventInfo?.description && (
                        <p className="text-lg lg:text-xl text-pink-200 font-light max-w-md leading-relaxed">
                            {eventInfo.description}
                        </p>
                    )}
                </div>

                <div className="relative z-10 mt-12 space-y-5 hidden lg:block">
                    <div className="flex flex-col gap-6 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm shadow-2xl">
                        <InfoRow
                            icon={Calendar}
                            title="Today, Jan 10th"
                            subtitle="2026 Academic Session"
                        />
                        <InfoRow
                            icon={Clock}
                            title="8:00 AM Prompt"
                            subtitle="Morning Session"
                        />
                        <InfoRow
                            icon={MapPin}
                            title="Fellowship Auditorium"
                            subtitle="FUTA South Gate"
                        />
                    </div>
                </div>
            </div>

            {/* =========================================
               2. RIGHT PANEL (DYNAMIC CONTENT)
               ========================================= */}
            <div className="flex items-center justify-center p-6 lg:p-16 bg-slate-50">
                <div className="w-full max-w-2xl transition-all duration-500 ease-in-out">
                    {step === "form" ? (
                        <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                            <div className="mb-8 text-center lg:text-left">
                                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                                    Registration
                                </h2>
                                <p className="text-slate-500 mt-2">
                                    Claim your digital pass for the conference.
                                </p>
                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-6 bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100"
                            >
                                {/* Toggle */}
                                <div className="grid grid-cols-2 gap-1 p-1.5 bg-slate-100 rounded-xl">
                                    <button
                                        type="button"
                                        onClick={() => setIsGuest(false)}
                                        className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${
                                            !isGuest
                                                ? "bg-white text-pink-700 shadow-sm"
                                                : "text-slate-500 hover:text-slate-700"
                                        }`}
                                    >
                                        <User className="h-4 w-4" /> Member
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsGuest(true)}
                                        className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${
                                            isGuest
                                                ? "bg-white text-pink-700 shadow-sm"
                                                : "text-slate-500 hover:text-slate-700"
                                        }`}
                                    >
                                        <Users className="h-4 w-4" /> Guest
                                    </button>
                                </div>

                                <div className="lg:grid grid-cols-2 gap-4 flex flex-col">
                                    <FloatingInput
                                        label="First Name"
                                        name="firstname"
                                        placeholder="Oyin"
                                    />
                                    <FloatingInput
                                        label="Last Name"
                                        name="lastname"
                                        placeholder="Olwaseyi"
                                    />
                                </div>

                                <FloatingInput
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    placeholder="sister@example.com"
                                />


                                <FloatingInput
                                    label="Phone Number"
                                    name="phone"
                                    type="tel"
                                    placeholder="080..."
                                />

                                {!isGuest && (
                                    <div className="animate-in fade-in slide-in-from-top-2 duration-300 space-y-6">
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide ml-1">
                                                Level
                                            </label>
                                            <div className="relative">
                                                <select
                                                    name="level"
                                                    className="w-full h-12 appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium outline-none transition-all focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-500/10 cursor-pointer"
                                                >
                                                    <option>100L</option>
                                                    <option>200L</option>
                                                    <option>300L</option>
                                                    <option>400L</option>
                                                    <option>500L</option>
                                                </select>
                                                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                                                    <svg
                                                        className="h-4 w-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M19 9l-7 7-7-7"
                                                        ></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <button
                                    disabled={loading}
                                    className="group relative w-full overflow-hidden rounded-xl bg-[#BE185D] p-4 text-white shadow-lg shadow-pink-600/30 transition-all hover:bg-[#9D174D] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    <div className="flex items-center justify-center gap-2 font-bold">
                                        {loading ? (
                                            <Loader2 className="animate-spin h-5 w-5" />
                                        ) : (
                                            <>
                                                <span>Generate Ticket</span>
                                                <Ticket className="h-5 w-5" />
                                            </>
                                        )}
                                    </div>
                                </button>
                            </form>
                        </div>
                    ) : (
                        // TICKET VIEW
                        <div className="animate-in zoom-in-95 fade-in duration-500 flex flex-col items-center">
                            <div className="mb-6 text-center no-print">
                                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-green-100 text-green-600 mb-4">
                                    <CheckCircle2 className="h-6 w-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900">
                                    Registration Successful!
                                </h2>
                                <p className="text-slate-500 text-sm mt-1">
                                    Here is your gate pass.
                                </p>
                            </div>

                            {/* Ticket Component - Wrapped for Printing */}
                            <div className="printable mx-auto w-full max-w-2xl">
                                <TicketCard
                                    data={ticketData}
                                    eventInfo={eventInfo}
                                />
                            </div>

                            <div className="mt-8 flex flex-col w-full gap-3 no-print">
                                <button
                                    onClick={() => window.print()}
                                    className="group relative flex items-center justify-center gap-2 w-full overflow-hidden rounded-xl bg-[#BE185D] px-6 py-3.5 text-white font-bold text-sm shadow-lg hover:bg-[#9D174D] transition-all"
                                >
                                    <Printer className="h-4 w-4" /> Print / Save
                                    PDF
                                </button>

                                <button
                                    onClick={() => window.location.reload()}
                                    className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-600 px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all w-full"
                                >
                                    <ArrowLeft className="h-4 w-4" /> Register
                                    Another Person
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// --- SUB-COMPONENTS ---

function FloatingInput({ label, name, type = "text", placeholder }: any) {
    return (
        <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide ml-1">
                {label}
            </label>
            <input
                required
                name={name}
                type={type}
                className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium outline-none transition-all focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-500/10 placeholder:text-slate-400"
                placeholder={placeholder}
            />
        </div>
    );
}

function InfoRow({ icon: Icon, title, subtitle }: any) {
    return (
        <div className="flex items-center gap-4">
            <div className="rounded-lg bg-pink-500/20 p-2.5">
                <Icon className="h-5 w-5 text-pink-200" />
            </div>
            <div>
                <p className="font-bold text-lg leading-tight text-white">
                    {title}
                </p>
                <p className="text-pink-200 text-xs font-medium uppercase tracking-wide opacity-80">
                    {subtitle}
                </p>
            </div>
        </div>
    );
}

// --- THE TICKET CARD COMPONENT ---
// --- UPDATED WIDER TICKET CARD ---
function TicketCard({
    data,
    eventInfo,
}: {
    data: TicketData | null;
    eventInfo: EventInfo | null;
}) {
    if (!data) return null;

    return (
        // Ticket should fill the printable container; avoid forcing a large max-width
        <div className="relative w-full max-w-full drop-shadow-2xl print:drop-shadow-none">
            
            {/* 1. TICKET HEADER */}
            <div className="relative bg-gradient-to-br from-[#BE185D] to-[#831843] text-white p-8 rounded-t-3xl overflow-hidden print:bg-[#BE185D] print:print-color-adjust-exact">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

                <div className="relative z-10 flex flex-col items-center text-center">
                    <h2 className="font-serif text-3xl font-bold tracking-widest">
                        ADMIT ONE
                    </h2>
                    <p className="text-pink-200 text-xs uppercase tracking-[0.3em] mt-2 font-medium">
                        {eventInfo?.title || "Sisters Conference"}
                    </p>
                </div>

                {/* Scallops (Cutouts) */}
                <div className="absolute -bottom-4 -left-4 h-8 w-8 rounded-full bg-slate-50 print:bg-white"></div>
                <div className="absolute -bottom-4 -right-4 h-8 w-8 rounded-full bg-slate-50 print:bg-white"></div>
            </div>

            {/* 2. TICKET BODY */}
            <div className="bg-white relative px-10 py-8 print:border-x print:border-slate-300">
                <div className="absolute top-0 left-5 right-5 border-t-2 border-dashed border-slate-200"></div>

                <div className="flex flex-col items-center space-y-6">
                    {/* QR Code - Slightly larger now */}
                    <div className="p-2.5 border-2 border-slate-100 rounded-2xl bg-white shadow-sm print:border-slate-300">
                        {React.createElement(QRCode as any, {
                            value: String(data.id),
                            size: 160, // Increased size
                            level: "Q",
                            fgColor: "#831843",
                        })}
                    </div>

                    <div className="text-center space-y-1.5">
                        <h1 className="text-2xl font-bold text-slate-900 leading-tight">
                            {data.first_name} {data.last_name}
                        </h1>
                        <div className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-wider text-pink-600">
                            <span className="bg-pink-50 px-2 py-1 rounded-md border border-pink-100">
                                {data.level === "Guest" ? "Invited Guest" : data.level}
                            </span>
                            <span className="h-1.5 w-1.5 rounded-full bg-slate-300 print:bg-slate-200 print:print-color-adjust-exact"></span>
                            <span className="text-slate-400">#SC26</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 w-full gap-4">
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center print:bg-slate-100 print:print-color-adjust-exact">
                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                                Venue
                            </p>
                            <p className="text-sm font-bold text-slate-700 mt-0.5">
                                Auditorium
                            </p>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center print:bg-slate-100 print:print-color-adjust-exact">
                            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                                Time
                            </p>
                            <p className="text-sm font-bold text-slate-700 mt-0.5">
                                8:00 AM
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. TICKET FOOTER */}
            <div className="bg-slate-100 p-5 rounded-b-3xl border-t-2 border-dashed border-slate-300 relative print:bg-slate-100 print:print-color-adjust-exact">
                <div className="absolute -top-4 -left-4 h-8 w-8 rounded-full bg-slate-50 print:bg-white"></div>
                <div className="absolute -top-4 -right-4 h-8 w-8 rounded-full bg-slate-50 print:bg-white"></div>

                <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-2 text-green-700 bg-white px-4 py-1.5 rounded-full shadow-sm border border-green-100">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span className="text-[11px] font-bold uppercase tracking-wide">
                            Valid Entry
                        </span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-mono">
                        ID: {data.id.slice(0, 8)}
                    </p>
                </div>
            </div>
        </div>
    );
}