import styled from "@mui/system/styled";
import { m } from "framer-motion";
import { position } from "polished";
import { ReactNode, forwardRef } from "react";

type BadgeProps = {
  children: ReactNode;
  content: ReactNode;
};

const BadgeRoot = styled(m.span, { label: "BadgeRoot" })(() => ({
  ...position("relative"),
}));

const BadgeContent = styled(m.span, { label: "BadgeContent" })(({ theme }) => ({
  ...position("absolute", 0, null, null, "75%"),
  borderRadius: theme.vars.radius.full,
  boxSizing: "border-box",
  zIndex: 1,
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  backgroundColor: theme.vars.palette.primary.main,
}));

const Badge = forwardRef<HTMLSpanElement, Props<BadgeProps>>((props, ref) => {
  const { sx, className, children, content } = props;

  return (
    <BadgeRoot>
      {children}
      <BadgeContent ref={ref} sx={sx} className={className}>
        {content}
      </BadgeContent>
    </BadgeRoot>
  );
});

Badge.displayName = "Badge";

export default Badge;
