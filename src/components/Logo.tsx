type LogoProps = {
  height?: number
}

export default function Logo({ height = 90 }: LogoProps) {
  return (
    <div className="flex items-center gap-3">
      <img
        src="https://res.cloudinary.com/dioua8akg/image/upload/v1770477511/valheim_logo_main_s07pam.svg"
        alt="Valheimbygg AS"
        style={{ height }}
        className="w-auto"
        decoding="async"
      />
    </div>
  )
}
