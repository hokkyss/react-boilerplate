import type { Placement } from "@popperjs/core";
import type { ReactElement, ReactNode } from "react";

import type { PopperProps } from "../Popper/Popper.atom";

import styled from "@mui/system/styled";
import useTheme from "@mui/system/useTheme";
import { m } from "framer-motion";
import { padding, size, wordWrap } from "polished";
import { memo, useId, useState } from "react";

import useToggle from "~/hooks/useToggle/useToggle.hook";

import Popper from "../Popper/Popper.atom";

export const tooltipClasses = {
  arrow: "arrow",
};

type TooltipProps = {
  children: ReactElement;
  content: ReactNode;
  placement?: Placement;
};

const TooltipAnchor = styled("div", {
  label: "TooltipAnchor",
})(() => ({
  display: "inline-block",
  ...size("fit-content", "fit-content"),
}));

const TooltipContentContainer = styled(Popper, {
  label: "TooltipContentContainer",
})<PopperProps>(({ theme }) => ({
  '&[data-popper-placement*="bottom"], &[data-popper-placement*="top"]': {
    flexDirection: "column",
  },
  '&[data-popper-placement*="left"], &[data-popper-placement*="right"]': {
    flexDirection: "row",
  },
  [`&[data-popper-placement*="bottom"] .${tooltipClasses.arrow}`]: {
    // transformOrigin: "center top",
    top: -4,
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
  display: "flex",
  maxWidth: 360,
  pointerEvents: "none",
  transitionDuration: `${theme.transitions.duration.short}ms`,
  transitionProperty: "all",
  transitionTimingFunction: theme.vars.transitions.easing.sharp,
  zIndex: theme.vars.zIndex.tooltip,
}));

const TooltipArrow = styled("span", { label: "TooltipArrow" })(() => ({
  display: "flex",
  position: "absolute",
  ...size("1em", "1em"),
  alignSelf: "center",
  backgroundColor: "inherit",
  boxSizing: "border-box",
  transform: "rotate(45deg)",
}));

const TooltipContent = styled(m.div, { label: "TooltipContent" })(
  ({ theme }) => ({
    alignItems: "center",
    backgroundColor: theme.vars.colors.gray[500],
    borderRadius: theme.vars.radius.lg,
    boxShadow: theme.vars.shadows[4],
    color: theme.vars.palette.common.white,
    display: "flex",
    flexDirection: "inherit",
    whiteSpace: "normal",
    ...wordWrap("break-word"),
    msWordBreak: "break-word",
    wordBreak: "break-word",
    ...padding(theme.spacing(1), theme.spacing(2)),
  })
);

const Tooltip = memo<Props<TooltipProps>>(
  ({ children, className, content, placement, sx }) => {
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
          aria-describedby={id}
          onMouseEnter={hoverAction.open}
          onMouseLeave={hoverAction.close}
          ref={setAnchor}
        >
          {children}
        </TooltipAnchor>
        <TooltipContentContainer
          modifiers={[
            {
              name: "offset",
              options: {
                offset: [0, 8],
              },
            },
          ]}
          open={hovered}
          placement={placement}
          referenceElement={anchor}
          role="tooltip"
        >
          <TooltipContent
            animate={{
              opacity: 1,
              transition: {
                duration: theme.transitions.duration.enteringScreen / 1000,
                from: 0,
              },
            }}
            className={className}
            data-testid="tooltip-content"
            sx={sx}
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
