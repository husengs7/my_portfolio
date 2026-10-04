// Adapted from Gymnopedies Picture by shoota (MIT).
// Source: https://gymnopedies.shoota.work/r/picture.json
import type { HTMLAttributes } from "react";

type PictureProps = HTMLAttributes<HTMLElement>;

export function Picture({ className = "", children, ...props }: PictureProps) {
  return (
    <figure
      className={`gymnopedies-picture relative overflow-hidden rounded-md border border-parchment/10 bg-white/5 [&_img]:rounded-md ${className}`}
      {...props}
    >
      {children}
    </figure>
  );
}
