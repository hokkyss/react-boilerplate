import useSwitch from "@mui/base/useSwitch";
import styled from "@mui/system/styled";
import { margin, padding, position, remToPx, size } from "polished";
import {
  ChangeEventHandler,
  FocusEventHandler,
  forwardRef,
  useMemo,
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
  shouldForwardProp: () => true,
  name: "SwitchRoot",
  label: "SwitchRoot",
})<{ disabled?: boolean; checked?: boolean }>(
  ({ theme, disabled, checked }) => ({
    fontSize: 0,
    position: "relative",
    display: "inline-block",
    ...padding(theme.spacing(0.5)),
    ...size(remToPx(1), remToPx(2.5)),
    cursor: "pointer",
    borderRadius: theme.vars.radius.xl,
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.vars.colors.gray[600]
        : theme.vars.colors.gray[400],
    ...(disabled ? { opacity: 0.4, cursor: "not-allowed" } : {}),
    ...(checked ? { backgroundColor: theme.vars.palette.primary.main } : {}),
  })
);

const SwitchInput = styled("input")(() => ({
  ...size("100%", "100%"),
  ...margin(0),
  ...position("absolute", 0, 0),
  cursor: "inherit",
  opacity: 0,
  zIndex: 1,
}));

const SwitchThumb = styled("span", {
  name: "SwitchThumb",
  label: "SwitchThumb",
  shouldForwardProp: () => true,
})<{ focusVisible?: boolean; checked: boolean }>(
  ({ theme, checked, focusVisible }) => ({
    display: "block",
    aspectRatio: "1 / 1",
    height: "100%",
    boxSizing: "border-box",
    ...position("relative"),
    transitionTimingFunction: theme.vars.transitions.easing.easeInOut,
    transitionProperty: "all",
    transitionDuration: `${theme.transitions.duration.shortest}ms`,
    marginTop: "auto",
    marginBottom: "auto",
    borderRadius: theme.vars.radius.xl,
    backgroundColor: theme.vars.palette.common.white,
    boxShadow: theme.vars.shadows[5],
    ...(checked
      ? {
          left: "100%",
          transform: "translateX(-100%)",
        }
      : {
          left: 0,
        }),
    ...(focusVisible && {
      backgroundColor: theme.vars.palette.grey[500],
    }),
  })
);

const Switch = forwardRef<HTMLInputElement, Props<SwitchProps>>(
  (props, ref) => {
    const {
      onBlur,
      onChange,
      onFocus,
      onFocusVisible,
      sx,
      className,
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
        sx={sx}
        className={className}
        checked={switchLogic.checked}
        disabled={switchLogic.disabled}
        aria-atomic
        aria-current={switchLogic.checked}
        aria-checked={switchLogic.checked}
        aria-pressed={switchLogic.checked}
        aria-relevant="all"
        aria-disabled={switchLogic.disabled}
        aria-readonly={switchLogic.readOnly}
        aria-required={parsedProps.data.required}
        aria-orientation="horizontal"
      >
        <SwitchThumb
          focusVisible={switchLogic.focusVisible}
          checked={switchLogic.checked}
        />
        <SwitchInput {...switchLogic.getInputProps()} ref={mergedRef} />
      </SwitchRoot>
    );
  }
);

Switch.displayName = "Switch";

export default Switch;
