import useSwitch from "@mui/base/useSwitch";
import styled from "@mui/system/styled";
import { margin, padding, position, remToPx, size } from "polished";
import {
  forwardRef,
  useMemo,
  type ChangeEventHandler,
  type FocusEventHandler,
} from "react";
import { z } from "zod";
import useMergeRef from "~/hooks/useMergeRef/useMergeRef.hook";

const switchPropsScheme = z.object({
  checked: z.boolean(),
  disabled: z
    .boolean()
    .optional()
    .default(() => false),
  readOnly: z
    .boolean()
    .optional()
    .default(() => false),
  required: z
    .boolean()
    .optional()
    .default(() => false),
});

type SwitchPropsValue = z.input<typeof switchPropsScheme>;

type SwitchProps = SwitchPropsValue & {
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onFocusVisible?: FocusEventHandler<HTMLInputElement>;
};

const SwitchRoot = styled("span", {
  label: "SwitchRoot",
  shouldForwardProp: () => true,
})<{ checked?: boolean; disabled?: boolean }>(
  ({ theme }) => ({
    ...padding(theme.spacing(0.5)),
    ...size(remToPx(1), remToPx(2.5)),
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.vars.colors.gray[600]
        : theme.vars.colors.gray[400],
    borderRadius: theme.vars.radius.xl,
    cursor: "pointer",
    display: "inline-block",
    fontSize: 0,
    position: "relative",
  }),
  ({ disabled, theme }) =>
    disabled && {
      cursor: "not-allowed",
      opacity: theme.vars.palette.action.disabledOpacity,
    },
  ({ checked, theme }) =>
    checked && { backgroundColor: theme.vars.palette.primary.main }
);

const SwitchInput = styled("input", { label: "Switch" })(() => ({
  ...size("100%", "100%"),
  ...margin(0),
  ...position("absolute", 0, 0),
  cursor: "inherit",
  opacity: 0,
  zIndex: 1,
}));

const SwitchThumb = styled("span", {
  label: "SwitchThumb",
  shouldForwardProp: (name) => name !== "focusVisible",
})<{ checked: boolean; focusVisible?: boolean }>(
  ({ theme }) => ({
    aspectRatio: "1 / 1",
    boxSizing: "border-box",
    display: "block",
    height: "100%",
    ...position("relative"),
    backgroundColor: theme.vars.palette.common.white,
    borderRadius: theme.vars.radius.xl,
    boxShadow: theme.vars.shadows[5],
    marginBottom: "auto",
    marginTop: "auto",
    transitionDuration: `${theme.transitions.duration.shortest}ms`,
    transitionProperty: "all",
    transitionTimingFunction: theme.vars.transitions.easing.easeInOut,
  }),
  ({ checked }) =>
    checked
      ? {
          left: "100%",
          transform: "translateX(-100%)",
        }
      : { left: 0 },
  ({ focusVisible, theme }) =>
    focusVisible && {
      backgroundColor: theme.vars.palette.grey[500],
    }
);

const Switch = forwardRef<HTMLInputElement, Props<SwitchProps>>(
  (props, ref) => {
    const {
      className,
      onBlur,
      onChange,
      onFocus,
      onFocusVisible,
      sx,
      ...rest
    } = props;

    const parsedProps = useMemo(
      () => switchPropsScheme.safeParse(rest),
      [rest]
    );

    if (!parsedProps.success) {
      throw new Error(parsedProps.error.message);
    }

    const switchLogic = useSwitch({
      onBlur,
      onChange,
      onFocus,
      onFocusVisible,
      ...parsedProps.data,
    });
    const mergedRef = useMergeRef(switchLogic.inputRef, ref);

    return (
      <SwitchRoot
        aria-atomic
        aria-checked={switchLogic.checked}
        aria-current={switchLogic.checked}
        aria-disabled={switchLogic.disabled}
        aria-orientation="horizontal"
        aria-pressed={switchLogic.checked}
        aria-readonly={switchLogic.readOnly}
        aria-relevant="all"
        aria-required={parsedProps.data.required}
        checked={switchLogic.checked}
        className={className}
        disabled={switchLogic.disabled}
        sx={sx}
      >
        <SwitchThumb
          checked={switchLogic.checked}
          focusVisible={switchLogic.focusVisible}
        />
        <SwitchInput {...switchLogic.getInputProps()} ref={mergedRef} />
      </SwitchRoot>
    );
  }
);

Switch.displayName = "Switch";

export default Switch;
