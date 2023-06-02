interface BrandNameProps {
  fontColor?: string;
  fontSize?: string;
}

export default function BrandName({ fontColor, fontSize }: BrandNameProps) {
  return (
    <h1
      className={`font-krona-one font-extrabold ${fontSize ? fontSize : 'text-6xl'} ${fontColor ? fontColor : 'text-white'} -tracking-widest`}
    >
      Comune
    </h1>
  );
}