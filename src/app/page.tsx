"use client";

import Countdown from "@/components/Countdown";
import EventHeader from "@/components/EventHeader";
import Form from "@/components/Form";
import Footer from "@/components/Footer";

export default function Home() {
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

            {/* Main container */}
            <div className="container mx-auto px-4 py-8 md:py-16">
                {/* Header section - mysterious reveal */}
                <div className="mb-16 animate-fade-in-up">
                    <EventHeader />
                </div>

                {/* Countdown section - floating effect */}
                <div className="mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <Countdown date="2026-02-07T08:30:00Z" />
                </div>

                {/* Form section - centered and mysterious */}
                <div className="max-w-6xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <Form />
                </div>

                {/* Footer section */}
                <div className="mt-20 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                    <Footer />
                </div>
            </div>

            {/* Exploration beam effect */}
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-t from-purple-600/20 via-purple-600/5 to-transparent pointer-events-none" />
        </div>
    );
}





