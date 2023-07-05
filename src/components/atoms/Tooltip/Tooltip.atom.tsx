import Popper, { PopperPlacementType, PopperProps } from "@mui/base/Popper";
import styled from "@mui/system/styled";
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
})``;

const TooltipContent = styled(Popper, {
  label: "TooltipContent",
  name: "TooltipContent",
})<PopperProps>(({ theme }) => ({
  display: "flex",
  pointerEvents: "none",
  background: theme.vars.palette.background.default,
  ...padding(theme.spacing(1), theme.spacing(2)),
  borderRadius: theme.vars.radius.lg,
  color: theme.vars.palette.text.primary,
  zIndex: theme.vars.zIndex.tooltip,
  alignItems: "center",
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

const Tooltip = memo<TooltipProps>(
  ({ className, children, content, placement }) => {
    const [hovered, hoverAction] = useToggle(false);
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
        <TooltipContent
          placement={placement}
          id={id}
          open={hovered}
          anchorEl={anchor}
        >
          <TooltipArrow className="arrow" />
          {content}
        </TooltipContent>
      </TooltipContainer>
    );
  }
);

Tooltip.displayName = "Tooltip";

export default Tooltip;
