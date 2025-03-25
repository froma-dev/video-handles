import mime from "mime";

type Html5PlayerProps = {
  src: string;
};

const Html5Player = ({ src }: Html5PlayerProps) => {
  return <source src={src} type={mime.getType(src) ?? ""} />;
};

export default Html5Player;
export type { Html5PlayerProps };
