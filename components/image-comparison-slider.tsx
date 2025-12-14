"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";

// This component takes two image URLs (before and after) and creates a slider to compare them.
export const ImageComparison = ({
  beforeImage,
  afterImage,
  altBefore = "Before",
  altAfter = "After",
}: {
  beforeImage: string;
  afterImage: string;
  altBefore: string;
  altAfter: string;
}) => {
  // State to track the slider's position (from 0 to 100)
  const [sliderPosition, setSliderPosition] = useState(50);
  // State to track if the user is currently dragging the slider
  const [isDragging, setIsDragging] = useState(false);

  // Ref to the main container element to get its dimensions
  const containerRef = useRef<HTMLDivElement>(null);

  // Function to handle the slider movement (for both mouse and touch)
  const handleMove = useCallback(
    (clientX: number) => {
      // If not dragging or no container ref, do nothing
      if (!isDragging || !containerRef.current) return;

      // Get the bounding box of the container
      const rect = containerRef.current.getBoundingClientRect();
      // Calculate the new slider position as a percentage
      let newPosition = ((clientX - rect.left) / rect.width) * 100;

      // Clamp the position to be between 0 and 100 to prevent it from going out of bounds
      newPosition = Math.max(0, Math.min(100, newPosition));

      setSliderPosition(newPosition);
    },
    [isDragging]
  );

  // Mouse event handlers
  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  // Touch event handlers
  const handleTouchStart = () => setIsDragging(true);
  const handleTouchEnd = () => setIsDragging(false);

  // Effect to add and clean up global event listeners for mouse up/leave
  // This ensures dragging stops even if the cursor leaves the component area
  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseUp]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-4xl mx-auto select-none rounded-xl overflow-hidden shadow-2xl h-[100vh]"
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseLeave={handleMouseUp} // Stop dragging if mouse leaves the container
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={handleTouchEnd}
    >
      {/* After Image (Top Layer) - Its visibility is controlled by the clip-path */}
      {/* Labels - Both visible until slider reaches the edges, then one fades out */}
      <div className="absolute top-2 md:top-4 left-2 md:left-4 z-10">
        <div
          className={`px-2 md:px-6 py-1 md:py-3 rounded-full backdrop-blur-md bg-[#EE6983]/80 border-2 border-white/30 shadow-xl transition-all duration-300 ${
            sliderPosition > 90 ? "opacity-100" : sliderPosition < 20 ? "opacity-0" : "opacity-100"
          }`}
        >
          <p className="text-white text-sm md:text-xl font-bold drop-shadow-lg">
            Sonra
          </p>
        </div>
      </div>
      <div className="absolute top-2 md:top-4 right-2 md:right-4 z-10">
        <div
          className={`px-2 md:px-6 py-1 md:py-3 rounded-full backdrop-blur-md bg-[#EE6983]/80 border-2 border-white/30 shadow-xl transition-all duration-300 ${
            sliderPosition > 80 ? "opacity-0" : sliderPosition < 10 ? "opacity-100" : "opacity-100"
          }`}
        >
          <p className="text-white text-sm md:text-xl font-bold drop-shadow-lg">
            Önce
          </p>
        </div>
      </div>
      <div
        className="absolute top-0 left-0 h-full w-full overflow-hidden "
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <div className="h-full w-full  flex items-center justify-center">
          <img
          src={afterImage}
          alt={altAfter}
            className="h-full w-full object-contain"
          draggable="false"
            loading="lazy"
        />
        </div>
      </div>

      {/* Before Image (Bottom Layer) */}
      <div className="h-full w-full flex items-center justify-center ">
        <img
        src={beforeImage}
        alt={altBefore}
          className="h-full w-full object-contain"
        draggable="false"
          loading="lazy"
      />
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1.5 bg-white/80 cursor-ew-resize flex items-center justify-center"
        style={{ left: `calc(${sliderPosition}% - 0.375rem)` }} // Center the handle on the line
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div
          className={`bg-white rounded-full h-12 w-12 flex items-center justify-center shadow-md transition-all duration-200 ease-in-out ${
            isDragging ? "scale-110 shadow-xl" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-700"
          >
            <line x1="15" y1="18" x2="9" y2="12"></line>
            <line x1="9" y1="6" x2="15" y2="12"></line>
          </svg>
        </div>
      </div>
    </div>
  );
};
