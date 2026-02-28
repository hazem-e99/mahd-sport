import type { SVGProps } from "react";
import { memo } from "react";
const SvgArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 20 20" {...props}>
    <path fill="#A5A5A5" d="M10.322 10 6.944 6.623a.56.56 0 0 1-.166-.398.56.56 0 0 1 .166-.413.56.56 0 0 1 .822-.01l3.694 3.694a.8.8 0 0 1 .16.235.7.7 0 0 1 .053.27.68.68 0 0 1-.213.5l-3.694 3.693a.56.56 0 0 1-.412.173.55.55 0 0 1-.41-.179.57.57 0 0 1-.17-.408.55.55 0 0 1 .17-.403z" />
  </svg>
);
export default memo(SvgArrow);
