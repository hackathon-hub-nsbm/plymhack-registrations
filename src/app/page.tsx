"use client";

import Countdown from "@/components/Countdown";
import EventHeader from "@/components/EventHeader";
import Form from "@/components/Form";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <div className="min-h-screen md:h-screen md:overflow-hidden flex flex-col">
            <div className="block md:hidden">
                <br /><br /><br />
            </div>

            {/* Main Content Container */}
            <div className="flex-1 flex flex-col md:grid md:grid-cols-[400px_1fr] md:gap-8 p-4 md:p-6 max-w-[1600px] mx-auto w-full">
                {/* Left Sidebar - Branding & Countdown */}
                <div className="flex flex-col justify-between space-y-4 md:space-y-6">
                    <EventHeader
                        description="An annual event organized by Hackathon Hub to welcome new members and showcase exciting projects"
                    />
                    <Countdown date="2025-11-04T09:30:00Z" />

                    {/* Desktop Footer in Sidebar */}
                    <div className="hidden md:block">
                        <Footer />
                    </div>
                </div>

                {/* Right Content - Form */}
                <div className="flex-1 flex items-center justify-center md:overflow-hidden">
                    <div className="w-full h-full md:flex md:items-center">
                        <Form />
                    </div>
                </div>
            </div>

            {/* Mobile Footer */}
            <div className="md:hidden mt-4">
                <Footer />
            </div>
        </div>
    );
}





