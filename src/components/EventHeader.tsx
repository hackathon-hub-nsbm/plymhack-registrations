"use client";

import Image from "next/image";

interface EventHeaderProps {
  description: string;
}

const EventHeader = ({ description }: EventHeaderProps) => {
  return (
    <div className="text-center md:text-left flex flex-col items-center md:items-start space-y-3">
      <Image
        src="/assets/logo.jpg"
        alt="Event Logo"
        width={200}
        height={200}
        className="rounded-lg shadow-lg"
        priority
      />

      <p className="text-gray-300 leading-relaxed text-sm md:text-base text-center md:text-left">
        {description}
      </p>
    </div>
  );
};

export default EventHeader;


