import type { SVGProps } from "react";
import { memo } from "react";

/** Group / Team icon — renamed from grou-icon (typo fix) */
const SvgGroupIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      fill="#FF5000"
      fillRule="evenodd"
      d="M6.458 6.25a3.542 3.542 0 1 1 7.083 0 3.542 3.542 0 0 1-7.083 0m3.541-2.292a2.292 2.292 0 1 0 0 4.584 2.292 2.292 0 0 0 0-4.584"
      clipRule="evenodd"
    />
    <path
      fill="#FF5000"
      d="M5.833 3.958a2.708 2.708 0 1 0 0 5.417v-1.25a1.458 1.458 0 1 1 0-2.917zM5.833 10.208A4.79 4.79 0 0 0 1.04 15h1.25a3.54 3.54 0 0 1 3.542-3.542zM14.166 5.208a1.458 1.458 0 0 1 0 2.917v1.25a2.708 2.708 0 1 0 0-5.417zM14.166 11.458A3.54 3.54 0 0 1 17.708 15h1.25a4.79 4.79 0 0 0-4.792-4.792z"
    />
    <path
      fill="#FF5000"
      fillRule="evenodd"
      d="M10 11.042c-3.474 0-6.459 2.431-6.459 5.625v.625h12.917v-.625c0-3.194-2.986-5.625-6.459-5.625m0 1.25c2.7 0 4.796 1.691 5.154 3.75H4.845c.358-2.059 2.453-3.75 5.154-3.75"
      clipRule="evenodd"
    />
  </svg>
);

const Memo = memo(SvgGroupIcon);
export default Memo;
