export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M3 12L12 3l9 9-1.5 1.5L12 6l-7.5 7.5L3 12zm2 4l7-7 7 7v3H5v-3z" />
      </svg>
      <span className="font-bold tracking-wide">Valheimbygg AS</span>
    </div>
  )
}