import Popper, { PopperPlacementType, PopperProps } from "@mui/base/Popper";
import styled from "@mui/system/styled";
import useTheme from "@mui/system/useTheme";
import { AnimationProps, motion } from "framer-motion";
import { margin, padding, size, wordWrap } from "polished";
import { ReactNode, memo, useId, useMemo, useState } from "react";
import useToggle from "~/hooks/useToggle/useToggle.hook";

type TooltipProps = {
  content: ReactNode;
  className?: string;
  children: ReactNode;
  placement?: PopperPlacementType;
};

const TooltipAnchor = styled("div", {
  label: "TooltipAnchor",
  name: "TooltipAnchor",
})(() => ({
  display: "flex",
  ...size("fit-content", "fit-content"),
}));

const TooltipContentContainer = styled(Popper, {
  label: "TooltipContentContainer",
  name: "TooltipContentContainer",
})<PopperProps>(({ theme }) => ({
  display: "flex",
  pointerEvents: "none",
  zIndex: theme.vars.zIndex.tooltip,
  maxWidth: 360,
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
    ...margin(theme.spacing("auto", "auto")),
    display: "block",
    ...size("100%", "100%"),
    backgroundColor: "currentColor",
    transform: "rotate(45deg)",
  },
}));

const TooltipContent = styled(motion.div)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  color: theme.vars.palette.text.primary,
  background: theme.vars.palette.background.default,
  boxShadow: theme.vars.shadows[4],
  borderRadius: theme.vars.radius.lg,
  flexDirection: "inherit",
  whiteSpace: "normal",
  ...wordWrap("break-word"),
  wordBreak: "break-word",
  msWordBreak: "break-word",
  ...padding(theme.spacing(1), theme.spacing(2)),
}));

const Tooltip = memo<TooltipProps>(
  ({ className, children, content, placement }) => {
    const theme = useTheme();
    const [hovered, hoverAction] = useToggle();
    const id = useId();

    const [anchor, setAnchor] = useState<HTMLDivElement | null>(null);

    const animate = useMemo<AnimationProps["animate"]>(
      () => ({
        opacity: 1,
        transition: {
          from: 0,
          duration: theme.transitions.duration.enteringScreen / 1000,
        },
      }),
      [theme.transitions.duration.enteringScreen]
    );

    return (
      <>
        <TooltipAnchor
          ref={setAnchor}
          aria-describedby={id}
          onMouseEnter={hoverAction.open}
          onMouseLeave={hoverAction.close}
          className={className}
        >
          {children}
        </TooltipAnchor>
        <TooltipContentContainer
          placement={placement}
          id={id}
          open={hovered}
          anchorEl={anchor}
        >
          <TooltipContent
            animate={animate}
            // {...hoveredProps}
          >
            <TooltipArrow className="arrow" />
            {content}
          </TooltipContent>
        </TooltipContentContainer>
      </>
    );
  }
);

Tooltip.displayName = "Tooltip";

export default Tooltip;
