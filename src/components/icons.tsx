import type { SVGProps } from "react";

export function NexusStartLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>Nexus Start Logo</title>
      <path d="M12 2l7.5 4.5v9L12 20l-7.5-4.5v-9L12 2z" fill="hsl(var(--primary))" stroke="none" />
      <path d="M12 2v20" stroke="hsl(var(--accent))" />
      <path d="M4.5 6.5l15 9" stroke="hsl(var(--accent))" />
      <path d="M4.5 17.5l15-9" stroke="hsl(var(--accent))" />
    </svg>
  );
}
