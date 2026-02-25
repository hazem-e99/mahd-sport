
import type { SVGProps } from "react";
import { memo } from "react";
const SvgArrowRighticon = (props: SVGProps<SVGSVGElement>) => (
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
      d="m10.805 25-8.442-8.442a1.4 1.4 0 0 1-.418-.997 1.4 1.4 0 0 1 .417-1.031 1.4 1.4 0 0 1 1.014-.456q.585-.014 1.04.43l9.236 9.237q.265.276.4.587.132.312.133.672 0 .36-.134.673a1.8 1.8 0 0 1-.401.58l-9.233 9.233a1.4 1.4 0 0 1-1.032.431 1.38 1.38 0 0 1-1.023-.446 1.43 1.43 0 0 1-.427-1.022q0-.577.428-1.006z"
    />
  </svg>
);
const Memo = memo(SvgArrowRighticon);
export default Memo;
