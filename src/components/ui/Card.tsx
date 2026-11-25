import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export function Card({
  children,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`bg-white rounded-xl p-6 shadow-sm border border-gray-400 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}