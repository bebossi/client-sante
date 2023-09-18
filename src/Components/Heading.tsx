interface HeadingProps {
  title?: string;
  subtitle?: string;
  center?: boolean;
  image?: string;
}

const Heading: React.FC<HeadingProps> = ({
  title,
  subtitle,
  center,
  image,
}) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <img className="w-full max-h-64 rounded-lg" src={image} />
      <div className="text-2xl font-bold">{title}</div>
      <div className="font-light text-neutral-500 mt-2">{subtitle}</div>
    </div>
  );
};

export default Heading;
