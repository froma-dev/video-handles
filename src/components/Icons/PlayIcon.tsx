type PlayIconProps = {
  size?: number;
  color?: string;
};

const PlayIcon = ({ size = 24, color = "currentColor" }: PlayIconProps) => (
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
    className="icon icon-tabler icons-tabler-outline icon-tabler-player-play"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M7 4v16l13 -8z" />
  </svg>
);

export default PlayIcon;
