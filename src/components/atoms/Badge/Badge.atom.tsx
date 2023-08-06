import type { ReactNode } from "react";

import styled from "@mui/system/styled";
import { m } from "framer-motion";
import { position } from "polished";
import { forwardRef } from "react";

type BadgeProps = {
  children: ReactNode;
  content: ReactNode;
};

const BadgeRoot = styled(m.span, { label: "BadgeRoot" })(() => ({
  ...position("relative"),
}));

const BadgeContent = styled(m.span, { label: "BadgeContent" })(({ theme }) => ({
  ...position("absolute", 0, null, null, "75%"),
  backgroundColor: theme.vars.palette.primary.main,
  borderRadius: theme.vars.radius.full,
  boxSizing: "border-box",
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  zIndex: 1,
}));

const Badge = forwardRef<HTMLSpanElement, Props<BadgeProps>>((props, ref) => {
  const { children, className, content, sx } = props;

  return (
    <BadgeRoot>
      {children}
      <BadgeContent className={className} ref={ref} sx={sx}>
        {content}
      </BadgeContent>
    </BadgeRoot>
  );
});

Badge.displayName = "Badge";

export default Badge;
