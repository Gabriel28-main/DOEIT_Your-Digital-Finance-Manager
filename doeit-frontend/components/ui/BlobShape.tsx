type BlobShapeProps = {
  fill?: string
  className?: string
}

export default function BlobShape({ fill = "#FFFFFF", className = "" }: BlobShapeProps) {
  return (
    <svg
      viewBox="0 0 900 1117"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute inset-0 w-full h-full ${className}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <g filter="url(#blob-shadow)">
        <path
          d="M712.756 33C508.512 -158 121.366 -100 112.362 -107.5L-235.933 -248C-269.578 64.3333 -339.711 698 -351.084 734C-362.456 770 -320.44 1052.67 -298.01 1189.5L441.228 1364C614.033 1289.67 935 1074.5 840 918C745 761.5 456.825 1056.09 369 834C273.27 591.916 347.451 261.709 596.5 343.5C845.549 425.291 917 224 712.756 33Z"
          fill={fill}
        />
      </g>

      <defs>
        <filter id="blob-shadow" x="-386.9" y="-281.9" width="1286.03" height="1687.8">
          <feFlood floodOpacity="0" />
          <feColorMatrix in="SourceAlpha" type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset dx="4" dy="4" />
          <feGaussianBlur stdDeviation="18.95" />
          <feComposite operator="out" />
          <feColorMatrix type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.30 0" />
          <feBlend mode="normal" />
        </filter>
      </defs>
    </svg>
  )
}