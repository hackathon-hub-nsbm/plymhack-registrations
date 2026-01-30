"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getInviteById, InviteData } from "@/data/invites";
import EventHeader from "@/components/EventHeader";
import Footer from "@/components/Footer";

export default function InvitePage() {
    const params = useParams();
    const id = params.id as string;
    const [invite, setInvite] = useState<InviteData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const inviteData = getInviteById(id);
        setInvite(inviteData || null);
        setIsLoading(false);
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                    <p className="text-gray-400 font-[var(--font-space-mono)]">Loading invitation...</p>
                </div>
            </div>
        );
    }

    if (!invite) {
        return (
            <div className="min-h-screen relative">
                {/* Mysterious particles effect */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
                                animationDelay: `${Math.random() * 5}s`,
                            }}
                        />
                    ))}
                </div>

                <div className="container mx-auto px-4 py-8 md:py-16">
                    <div className="text-center animate-fade-in-up">
                        <EventHeader />
                    </div>

                    <div className="max-w-2xl mx-auto mt-16 text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <div className="relative glass-effect rounded-2xl p-8 md:p-12 exploration-shadow mysterious-border">
                            <div className="text-red-400 text-6xl mb-6">⚠️</div>
                            <h2 className="text-3xl md:text-4xl font-bold font-[var(--font-orbitron)] mystery-text-glow mb-4 tracking-wider">
                                ACCESS DENIED
                            </h2>
                            <p className="text-gray-400 font-[var(--font-space-mono)] tracking-widest text-sm mb-6">
                                &gt;&gt; INVALID INVITATION CODE &lt;&lt;
                            </p>
                            <p className="text-gray-500 font-[var(--font-space-mono)] text-sm">
                                The invitation code you entered does not exist in our system.
                                Please verify the URL and try again.
                            </p>
                        </div>
                    </div>

                    <div className="mt-20 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        <Footer />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative">
            {/* Mysterious particles effect */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 5}s`,
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-4 py-8 md:py-16">
                {/* Header section */}
                <div className="mb-16 animate-fade-in-up">
                    <EventHeader />
                </div>

                {/* Invitation Card */}
                <div className="max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <div className="relative glass-effect rounded-2xl p-8 md:p-12 exploration-shadow mysterious-border">
                        {/* Mysterious glow background */}
                        <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-purple-600/20 via-cyan-600/20 to-purple-600/20 animate-pulse-glow" />

                        <div className="relative z-10">
                            {/* Header */}
                            <div className="text-center mb-12">
                                <div className="inline-block relative">
                                    <h2 className="text-3xl md:text-4xl font-bold font-[var(--font-orbitron)] mystery-text-glow mb-2 tracking-wider">
                                        CLASSIFIED INVITATION
                                    </h2>
                                    <div className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
                                </div>
                                <p className="mt-6 text-gray-400 font-[var(--font-space-mono)] tracking-widest text-sm">
                                    &gt;&gt; ACCESS CODE: {invite.id.toUpperCase()} &lt;&lt;
                                </p>
                            </div>

                            {/* Personal Information */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                                <div className="text-center">
                                    <label className="block mb-3 font-[var(--font-space-mono)] text-sm tracking-widest text-purple-300 uppercase">
                                        Designated Individual
                                    </label>
                                    <div className="bg-black/50 border border-purple-500/30 text-gray-100 px-4 py-3 rounded-lg font-[var(--font-space-mono)] text-center mystery-glow">
                                        {invite.name}
                                    </div>
                                </div>

                                <div className="text-center">
                                    <label className="block mb-3 font-[var(--font-space-mono)] text-sm tracking-widest text-purple-300 uppercase">
                                        Operational Role
                                    </label>
                                    <div className="bg-black/50 border border-purple-500/30 text-gray-100 px-4 py-3 rounded-lg font-[var(--font-space-mono)] text-center mystery-glow">
                                        {invite.position}
                                    </div>
                                </div>

                                <div className="text-center">
                                    <label className="block mb-3 font-[var(--font-space-mono)] text-sm tracking-widest text-purple-300 uppercase">
                                        Department Sector
                                    </label>
                                    <div className="bg-black/50 border border-purple-500/30 text-gray-100 px-4 py-3 rounded-lg font-[var(--font-space-mono)] text-center mystery-glow">
                                        {invite.department}
                                    </div>
                                </div>
                            </div>

                            {/* Personal Message */}
                            {invite.message && (
                                <div className="mb-10">
                                    <label className="block mb-3 font-[var(--font-space-mono)] text-sm tracking-widest text-purple-300 uppercase text-center">
                                        Mission Brief
                                    </label>
                                    <div className="bg-black/50 border border-purple-500/30 text-gray-100 px-6 py-4 rounded-lg font-[var(--font-space-mono)] text-center mystery-glow italic">
                                        &quot;{invite.message}&quot;
                                    </div>
                                </div>
                            )}

                            {/* Event Details */}
                            <div className="text-center mb-10">
                                <h3 className="text-xl md:text-2xl font-bold font-[var(--font-orbitron)] mystery-text-glow mb-4 tracking-wider">
                                    PLYMHACK 2026
                                </h3>
                                <div className="space-y-2 text-gray-400 font-[var(--font-space-mono)] tracking-wider text-sm">
                                    <p>DATE: February 7, 2026</p>
                                    <p>TIME: 1:30 PM</p>
                                    <p>DURATION: 24 Hours</p>
                                    <p>OBJECTIVE: Enter the Unknown • Discover Infinite Possibilities</p>
                                </div>
                            </div>

                            {/* Call to Action */}
                            <div className="text-center">
                                <button
                                    onClick={() => window.location.href = '/'}
                                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 via-purple-700 to-cyan-600
                           hover:from-purple-500 hover:via-purple-600 hover:to-cyan-500
                           text-white font-[var(--font-orbitron)] font-bold tracking-wider
                           mystery-glow hover:animate-pulse-glow
                           transition-all duration-300 rounded-lg
                           transform hover:scale-105 active:scale-95
                           overflow-hidden group"
                                >
                                    <span className="relative z-10">
                                        ACCEPT MISSION
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                                translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                                </button>
                                <p className="mt-4 text-xs text-gray-500 font-[var(--font-space-mono)] tracking-wider">
                                    &gt;&gt; CLICK TO BEGIN YOUR JOURNEY &lt;&lt;
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer section */}
                <div className="mt-20 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <Footer />
                </div>
            </div>
        </div>
    );
}