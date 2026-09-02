export default function LandlineIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="6" y="10" width="12" height="11" rx="2" />
      <path d="M9 10V7a3 3 0 0 1 6 0v3" />
      <path d="M9 14h.01M12 14h.01M15 14h.01M9 17h6" />
    </svg>
  )
}
