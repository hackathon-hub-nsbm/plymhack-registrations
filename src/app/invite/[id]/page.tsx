"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { getInviteById, InviteData } from "@/data/invites";
import EventHeader from "@/components/EventHeader";
import Footer from "@/components/Footer";

export default function InvitePage() {
    const params = useParams();
    const id = params.id as string;
    const [invite, setInvite] = useState<InviteData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
    const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
    const [cameraError, setCameraError] = useState<string | null>(null);
    const [isCapturing, setIsCapturing] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const inviteData = getInviteById(id);
        setInvite(inviteData || null);
        setIsLoading(false);

        // Initialize camera if invite is valid
        if (inviteData) {
            initializeCamera();
        }
    }, [id]);

    // Cleanup camera stream when component unmounts or cameraStream changes
    useEffect(() => {
        return () => {
            if (cameraStream) {
                cameraStream.getTracks().forEach(track => track.stop());
            }
        };
    }, [cameraStream]);

    const initializeCamera = async () => {
        try {
            setCameraError(null);
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    facingMode: 'user' // Use front camera for selfies
                }
            });
            setCameraStream(stream);
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error('Camera access error:', error);
            setCameraError('Camera access denied or unavailable. Please allow camera permissions to continue.');
        }
    };

    const capturePhoto = () => {
        if (!videoRef.current || !canvasRef.current) return;

        setIsCapturing(true);

        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if (!context) return;

        // Set canvas size to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw the video frame to canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert to data URL
        const photoDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        setCapturedPhoto(photoDataUrl);

        // Stop camera stream
        if (cameraStream) {
            cameraStream.getTracks().forEach(track => track.stop());
            setCameraStream(null);
        }

        setIsCapturing(false);
    };

    const retakePhoto = () => {
        setCapturedPhoto(null);
        initializeCamera();
    };

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
                                INVALID INVITATION
                            </h2>
                            <p className="text-gray-400 font-[var(--font-space-mono)] tracking-widest text-sm mb-6">
                                INVITATION CODE NOT RECOGNIZED
                            </p>
                            <p className="text-gray-500 font-[var(--font-space-mono)] text-sm">
                                The invitation code you entered is not valid.
                                Please verify the URL and contact the organizers if you believe this is an error.
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
                                        OFFICIAL INVITATION
                                    </h2>
                                    <div className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
                                </div>
                                <p className="mt-6 text-gray-400 font-[var(--font-space-mono)] tracking-widest text-sm">
                                    PLYMHACK 2026 • UNIVERSITY OF PLYMOUTH
                                </p>
                            </div>

                            {/* Personal Information */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                                <div className="text-center">
                                    <label className="block mb-3 font-[var(--font-space-mono)] text-sm tracking-widest text-purple-300 uppercase">
                                        Invited Guest
                                    </label>
                                    <div className="bg-black/50 border border-purple-500/30 text-gray-100 px-4 py-3 rounded-lg font-[var(--font-space-mono)] text-center mystery-glow">
                                        {invite.name}
                                    </div>
                                </div>

                                <div className="text-center">
                                    <label className="block mb-3 font-[var(--font-space-mono)] text-sm tracking-widest text-purple-300 uppercase">
                                        Academic Position
                                    </label>
                                    <div className="bg-black/50 border border-purple-500/30 text-gray-100 px-4 py-3 rounded-lg font-[var(--font-space-mono)] text-center mystery-glow">
                                        {invite.position}
                                    </div>
                                </div>

                                <div className="text-center">
                                    <label className="block mb-3 font-[var(--font-space-mono)] text-sm tracking-widest text-purple-300 uppercase">
                                        Department
                                    </label>
                                    <div className="bg-black/50 border border-purple-500/30 text-gray-100 px-4 py-3 rounded-lg font-[var(--font-space-mono)] text-center mystery-glow">
                                        {invite.department}
                                    </div>
                                </div>
                            </div>

                            {/* Camera Section */}
                            <div className="mb-10">
                                <label className="block mb-6 font-[var(--font-space-mono)] text-sm tracking-widest text-purple-300 uppercase text-center">
                                    {capturedPhoto ? 'IDENTITY VERIFICATION COMPLETE' : 'IDENTITY VERIFICATION REQUIRED'}
                                </label>

                                {cameraError ? (
                                    <div className="text-center">
                                        <div className="bg-red-900/20 border border-red-500/50 text-red-400 px-6 py-4 rounded-lg font-[var(--font-space-mono)] text-center">
                                            {cameraError}
                                        </div>
                                        <button
                                            onClick={initializeCamera}
                                            className="mt-4 px-6 py-2 bg-gradient-to-r from-red-600 to-red-700
                                                       hover:from-red-500 hover:to-red-600
                                                       text-white font-[var(--font-orbitron)] font-bold tracking-wider
                                                       transition-all duration-300 rounded-lg
                                                       transform hover:scale-105 active:scale-95"
                                        >
                                            RETRY CAMERA ACCESS
                                        </button>
                                    </div>
                                ) : capturedPhoto ? (
                                    <div className="text-center">
                                        <div className="relative inline-block">
                                            <img
                                                src={capturedPhoto}
                                                alt="Captured photo"
                                                className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-lg border-2 border-purple-500/50 mystery-glow"
                                            />
                                            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                                <span className="text-white text-xs">✓</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={retakePhoto}
                                            className="mt-4 px-6 py-2 bg-gradient-to-r from-gray-600 to-gray-700
                                                       hover:from-gray-500 hover:to-gray-600
                                                       text-white font-[var(--font-orbitron)] font-bold tracking-wider
                                                       transition-all duration-300 rounded-lg
                                                       transform hover:scale-105 active:scale-95"
                                        >
                                            RETAKE PHOTO
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <div className="relative inline-block bg-black/50 border border-purple-500/30 rounded-lg overflow-hidden mystery-glow">
                                            <video
                                                ref={videoRef}
                                                autoPlay
                                                playsInline
                                                muted
                                                className="w-64 h-48 md:w-80 md:h-60 object-cover"
                                            />
                                            <div className="absolute inset-0 border border-purple-500/20 rounded-lg pointer-events-none" />
                                        </div>
                                        <div className="mt-4 space-y-2">
                                            <button
                                                onClick={capturePhoto}
                                                disabled={isCapturing}
                                                className="px-8 py-3 bg-gradient-to-r from-purple-600 via-purple-700 to-cyan-600
                                                           hover:from-purple-500 hover:via-purple-600 hover:to-cyan-500
                                                           disabled:opacity-50 disabled:cursor-not-allowed
                                                           text-white font-[var(--font-orbitron)] font-bold tracking-wider
                                                           mystery-glow hover:animate-pulse-glow
                                                           transition-all duration-300 rounded-lg
                                                           transform hover:scale-105 active:scale-95
                                                           overflow-hidden group"
                                            >
                                                <span className="relative z-10">
                                                    {isCapturing ? 'CAPTURING...' : 'CAPTURE PHOTO'}
                                                </span>
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                                                              translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                                            </button>
                                            <p className="text-xs text-gray-500 font-[var(--font-space-mono)] tracking-wider">
                                                PLEASE POSITION YOURSELF IN THE FRAME
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Hidden canvas for photo capture */}
                            <canvas ref={canvasRef} className="hidden" />

                            {/* Personal Message */}
                            {invite.message && (
                                <div className="mb-10">
                                    <label className="block mb-3 font-[var(--font-space-mono)] text-sm tracking-widest text-purple-300 uppercase text-center">
                                        Personal Message
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
                                    <p>TIME: 8:30 AM</p>
                                    <p>DURATION: 24 Hours</p>
                                    <p>VENUE: University of Plymouth</p>
                                    <p>OBJECTIVE: Innovation • Collaboration • Creation</p>
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
                                        ACCEPT INVITATION
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                                translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                                </button>
                                <p className="mt-4 text-xs text-gray-500 font-[var(--font-space-mono)] tracking-wider">
                                    PROCEED TO REGISTRATION
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