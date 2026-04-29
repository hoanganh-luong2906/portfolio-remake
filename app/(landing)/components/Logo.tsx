import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
      <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
        <circle cx="19" cy="19" r="18.5" stroke="var(--line-2)" />
        <path
          d="M11 13 L11 25 M11 19 L19 19 M19 13 L19 25 M23 13 L27 19 L23 25 M27 13 L23 19"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
      <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: "0.02em" }}>HAL</span>
    </Link>
  );
}
