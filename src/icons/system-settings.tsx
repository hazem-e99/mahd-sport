import type { SVGProps } from "react";
import { memo } from "react";
const SvgSystemSettings = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}>
    <path fill="#FF5000" fillRule="evenodd" d="M13.25 6.25h4.5v4.5h-1.5V17h-1.5v-6.25h-1.5zm1.5 1.5v1.5h1.5v-1.5zM10.75 13.25h-1.5V7h-1.5v6.25h-1.5v4.5h4.5zm-3 3v-1.5h1.5v1.5z" clipRule="evenodd" />
    <path fill="#FF5000" fillRule="evenodd" d="M2.25 3A.75.75 0 0 1 3 2.25h18a.75.75 0 0 1 .75.75v18a.75.75 0 0 1-.75.75H3a.75.75 0 0 1-.75-.75zm1.5.75v16.5h16.5V3.75z" clipRule="evenodd" />
  </svg>
);
export default memo(SvgSystemSettings);
