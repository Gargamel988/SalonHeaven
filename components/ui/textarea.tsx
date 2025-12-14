"use client";
import * as React from "react"

import { cn } from "@/lib/utils"
import { useMotionValue, useMotionTemplate } from "motion/react";
import { motion } from "framer-motion";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  const radius = 100; // change this to increase the radius of the hover effect
  const [visible, setVisible] = React.useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  
  return (
    <motion.div
      style={{
        background: useMotionTemplate`
          radial-gradient(
            ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
            #FF1770,
            transparent 80%
          )
        `,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="group/textarea p-[4px] w-full rounded-md transition-all duration-300"
    >
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-md border-2 border-gray-200 bg-white px-4 py-3 text-sm text-gray-900",
          "placeholder:text-gray-400",
          "transition-all duration-300",
          "focus:border-[#FF1770] focus:outline-none focus:ring-2 focus:ring-[#FF1770]/20",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50",
          "resize-y",
          "dark:bg-zinc-800 dark:border-zinc-700 dark:text-white dark:placeholder:text-zinc-400",
          "dark:focus:border-[#FF1770] dark:focus:ring-[#FF1770]/20",
          className
        )}
        {...props}
      />
    </motion.div>
  )
}

export { Textarea }
