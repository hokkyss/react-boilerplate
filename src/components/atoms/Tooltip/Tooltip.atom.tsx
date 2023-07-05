import Popper, { PopperPlacementType, PopperProps } from "@mui/base/Popper";
import styled from "@mui/system/styled";
import { motion } from "framer-motion";
import { padding } from "polished";
import { ReactNode, memo, useId, useState } from "react";
import useToggle from "~/hooks/useToggle/useToggle.hook";

type TooltipProps = {
  content: ReactNode;
  className?: string;
  children: ReactNode;
  placement?: PopperPlacementType;
};

const TooltipContainer = styled("div", {
  label: "TooltipContainer",
  name: "TooltipContainer",
})(() => ({
  display: "inline",
  position: "relative",
  width: "fit-content",
  height: "fit-content",
}));

const TooltipAnchor = styled("div", {
  label: "TooltipAnchor",
  name: "TooltipAnchor",
})(() => ({
  display: "inline",
}));

const TooltipContentContainer = styled(Popper, {
  label: "TooltipContentContainer",
  name: "TooltipContentContainer",
})<PopperProps>(({ theme }) => ({
  display: "flex",
  pointerEvents: "none",
  borderRadius: theme.vars.radius.lg,
  zIndex: theme.vars.zIndex.tooltip,
  '&[data-popper-placement*="left"], &[data-popper-placement*="right"]': {
    flexDirection: "row",
  },
  '&[data-popper-placement*="bottom"], &[data-popper-placement*="top"]': {
    flexDirection: "column",
  },
  [`&[data-popper-placement*="left"] .arrow`]: {
    transformOrigin: "right center",
    right: -4,
  },
  [`&[data-popper-placement*="right"] .arrow`]: {
    transformOrigin: "left center",
    left: -4,
  },
  [`&[data-popper-placement*="top"] .arrow`]: {
    transformOrigin: "center bottom",
    bottom: -4,
  },
  [`&[data-popper-placement*="bottom"] .arrow`]: {
    transformOrigin: "center top",
    top: -4,
  },
}));

const TooltipArrow = styled("span", {
  label: "TooltipArrow",
  name: "TooltipArrow",
})(({ theme }) => ({
  display: "flex",
  position: "absolute",
  width: "1em",
  height: "0.71em" /* = width / sqrt(2) = (length of the hypotenuse) */,
  boxSizing: "border-box",
  alignSelf: "center",
  color: theme.vars.palette.background.default,
  "::before": {
    content: '""',
    margin: "auto",
    display: "block",
    width: "100%",
    height: "100%",
    backgroundColor: "currentColor",
    transform: "rotate(45deg)",
  },
}));

const TooltipContent = styled(motion.div)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  color: theme.vars.palette.text.primary,
  background: theme.vars.palette.background.default,
  flexDirection: "inherit",
  ...padding(theme.spacing(1), theme.spacing(2)),
}));

const Tooltip = memo<TooltipProps>(
  ({ className, children, content, placement }) => {
    const [hovered, hoverAction] = useToggle(true);
    const id = useId();

    const [anchor, setAnchor] = useState<HTMLDivElement | null>(null);

    return (
      <TooltipContainer
        aria-describedby={id}
        onMouseEnter={hoverAction.open}
        onMouseLeave={hoverAction.close}
        className={className}
      >
        <TooltipAnchor ref={setAnchor}>{children}</TooltipAnchor>
        <TooltipContentContainer
          placement={placement}
          id={id}
          open={hovered}
          anchorEl={anchor}
        >
          <TooltipContent
            transition={{ from: 0, duration: 0.25 }}
            animate={{ opacity: 1 }}
          >
            <TooltipArrow className="arrow" />
            {content}
          </TooltipContent>
        </TooltipContentContainer>
      </TooltipContainer>
    );
  }
);

Tooltip.displayName = "Tooltip";

export default Tooltip;
