type RewindIconProps = {
  size?: number;
  color?: string;
};

const RewindIcon = ({ size = 24, color = "currentColor" }: RewindIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-rewind-backward-5"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M15 18a6 6 0 1 0 0 -12h-11" />
      <path d="M7 9l-3 -3l3 -3" />
      <path d="M8 20h2a1 1 0 0 0 1 -1v-1a1 1 0 0 0 -1 -1h-2v-3h3" />
    </svg>
  );
};

export default RewindIcon;
