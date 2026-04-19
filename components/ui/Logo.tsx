import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/icon-256.png"
      alt="Skin Picker logo"
      width={256}
      height={256}
      draggable={false}
      className={cn("select-none", className)}
    />
  );
}
