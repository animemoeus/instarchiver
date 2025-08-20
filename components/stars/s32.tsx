export default function Star32({
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
        d="M100 5a9.5 9.5 0 0 0-9.5 9.5v50.045l-25.023-43.34A9.5 9.5 0 0 0 52.5 17.728a9.5 9.5 0 0 0-3.477 12.977l25.023 43.34-43.341-25.022a9.5 9.5 0 0 0-9.5 16.454L64.545 90.5H14.5A9.5 9.5 0 0 0 5 100a9.5 9.5 0 0 0 9.5 9.5h50.046l-43.341 25.023a9.5 9.5 0 0 0-3.477 12.977 9.5 9.5 0 0 0 12.977 3.477l43.34-25.023-25.022 43.341a9.5 9.5 0 0 0 3.477 12.977 9.5 9.5 0 0 0 12.977-3.477L90.5 135.454V185.5a9.5 9.5 0 0 0 9.5 9.5 9.5 9.5 0 0 0 9.5-9.5v-50.046l25.023 43.341a9.5 9.5 0 0 0 12.977 3.477 9.5 9.5 0 0 0 3.477-12.977l-25.023-43.341 43.341 25.023a9.5 9.5 0 0 0 12.977-3.477 9.5 9.5 0 0 0-3.477-12.977L135.454 109.5H185.5a9.5 9.5 0 0 0 9.5-9.5 9.5 9.5 0 0 0-9.5-9.5h-50.046l43.341-25.023a9.5 9.5 0 0 0 3.477-12.977c-2.623-4.544-8.433-6.1-12.977-3.477l-43.341 25.023 25.023-43.341a9.5 9.5 0 0 0-3.477-12.977 9.5 9.5 0 0 0-12.977 3.477L109.5 64.545V14.5A9.5 9.5 0 0 0 100 5"
        clipRule="evenodd"
        fillRule="evenodd"
      />
    </svg>
  );
}
