export default function Star11({
  color,
  size,
  stroke,
  strokeWidth,
  pathClassName,
  width,
  height,
  ...props
}: React.SVGProps<SVGSVGElement> & {
  color?: string;
  size?: number;
  stroke?: string;
  pathClassName?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 200 200"
      width={size ?? width}
      height={size ?? height}
      {...props}
    >
      <path
        fill={color ?? 'currentColor'}
        stroke={stroke}
        strokeWidth={strokeWidth}
        className={pathClassName}
        d="m100 5 18.05 63.737L182.272 52.5 136.1 100l46.172 47.5-64.222-16.236L100 195l-18.05-63.736L17.728 147.5 63.9 100 17.728 52.5 81.95 68.737z"
      />
    </svg>
  );
}
