import styled from "@mui/system/styled";
import useTheme from "@mui/system/useTheme";
import { Placement } from "@popperjs/core";
import { m } from "framer-motion";
import { padding, size, wordWrap } from "polished";
import { ReactElement, ReactNode, memo, useId, useState } from "react";
import useToggle from "~/hooks/useToggle/useToggle.hook";
import Popper, { PopperProps } from "../Popper/Popper.atom";

export const tooltipClasses = {
  arrow: "arrow",
};

type TooltipProps = {
  content: ReactNode;
  className?: string;
  children: ReactElement;
  placement?: Placement;
};

const TooltipAnchor = styled("div", {
  label: "TooltipAnchor",
  name: "TooltipAnchor",
})(() => ({
  display: "inline-flex",
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
  [`&[data-popper-placement*="left"] .${tooltipClasses.arrow}`]: {
    // transformOrigin: "right center",
    right: -4,
  },
  [`&[data-popper-placement*="right"] .${tooltipClasses.arrow}`]: {
    // transformOrigin: "left center",
    left: -4,
  },
  [`&[data-popper-placement*="top"] .${tooltipClasses.arrow}`]: {
    // transformOrigin: "center bottom",
    bottom: -4,
  },
  [`&[data-popper-placement*="bottom"] .${tooltipClasses.arrow}`]: {
    // transformOrigin: "center top",
    top: -4,
  },
}));

const TooltipArrow = styled("span", {
  label: "TooltipArrow",
  name: "TooltipArrow",
})(() => ({
  display: "flex",
  position: "absolute",
  ...size("1em", "1em"),
  boxSizing: "border-box",
  alignSelf: "center",
  transform: "rotate(45deg)",
  backgroundColor: "inherit",
}));

const TooltipContent = styled(m.div)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  color: theme.vars.colors.white,
  backgroundColor: theme.vars.colors.gray[500],
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

    return (
      <>
        {/* {cloneElement(children, {
          ref: setAnchor,
          "aria-describedby": id,
          onMouseEnter: hoverAction.open,
          onMouseLeave: hoverAction.close,
          className,
        })} */}
        <TooltipAnchor
          ref={setAnchor}
          aria-describedby={id}
          onMouseEnter={hoverAction.open}
          onMouseLeave={hoverAction.close}
        >
          {children}
        </TooltipAnchor>
        <TooltipContentContainer
          placement={placement}
          open={hovered}
          referenceElement={anchor}
          modifiers={[
            {
              name: "offset",
              options: {
                offset: [0, 8],
              },
            },
          ]}
        >
          <TooltipContent
            className={className}
            animate={{
              opacity: 1,
              transition: {
                from: 0,
                duration: theme.transitions.duration.enteringScreen / 1000,
              },
            }}
          >
            <TooltipArrow className={tooltipClasses.arrow} />
            {content}
          </TooltipContent>
        </TooltipContentContainer>
      </>
    );
  }
);

Tooltip.displayName = "Tooltip";

export default Tooltip;
