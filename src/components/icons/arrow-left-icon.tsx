
import type { SVGProps } from "react";
import { memo } from "react";
const SvgArrowLefticon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 15 50"
    {...props}
  >
    <path
      fill="#D6D6D6"
      d="m4.195 25 8.442 8.442q.408.408.418.997.01.588-.417 1.031a1.4 1.4 0 0 1-1.014.456q-.585.014-1.04-.43L1.349 26.26a2 2 0 0 1-.4-.587A1.7 1.7 0 0 1 .815 25q0-.36.134-.673.133-.313.401-.58l9.233-9.233a1.4 1.4 0 0 1 1.031-.431q.597.002 1.024.446.427.443.427 1.022 0 .577-.428 1.006z"
    />
  </svg>
);
const Memo = memo(SvgArrowLefticon);
export default Memo;
