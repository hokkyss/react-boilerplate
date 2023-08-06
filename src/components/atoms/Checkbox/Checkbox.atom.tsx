import type { Except } from "@hokkyss/composite-types";
import type {
  AriaAttributes,
  ChangeEventHandler,
  InputHTMLAttributes,
} from "react";

import CheckedIcon from "@material-design-icons/svg/filled/check.svg";
import IndeterminateIcon from "@material-design-icons/svg/filled/horizontal_rule.svg";
import styled from "@mui/system/styled";
import { m } from "framer-motion";
import isUndefined from "lodash/isUndefined";
import { margin, padding, position, size } from "polished";
import { forwardRef, useMemo } from "react";
import { z } from "zod";

import useCallback from "~/hooks/useCallback/useCallback.hook";
import useMergeRef from "~/hooks/useMergeRef/useMergeRef.hook";

type CheckboxProps = Except<
  InputHTMLAttributes<HTMLInputElement>,
  | "defaultChecked"
  | "defaultValue"
  | "onChange"
  | "type"
  | "value"
  | keyof AriaAttributes
> & {
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
};

const checkboxValueSchema = z
  .object({
    checked: z.boolean(),
    indeterminate: z.boolean().optional(),
  })
  .refine(({ checked, indeterminate }) =>
    !isUndefined(indeterminate) ? !(checked && indeterminate) : true
  );

const CheckboxRoot = styled(m.span, {
  label: "CheckboxRoot",
})<Pick<CheckboxProps, "checked" | "disabled" | "indeterminate">>(
  ({ theme }) => ({
    cursor: "pointer",
    display: "inline-block",
    fontSize: 0,
    position: "relative",
    ...size("1.5rem"),
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.vars.colors.gray[600]
        : theme.vars.colors.gray[400],
    borderRadius: theme.vars.radius.md,
    transitionDuration: `${theme.transitions.duration.standard}ms`,
    transitionProperty: "background-color",
    transitionTimingFunction: theme.vars.transitions.easing.sharp,
    willChange: ["background-color"],
  }),
  ({ checked, theme }) =>
    checked && {
      backgroundColor: theme.vars.palette.primary.main,
    },
  ({ indeterminate, theme }) =>
    indeterminate && { backgroundColor: theme.vars.palette.primary.light },
  ({ disabled, theme }) =>
    disabled && {
      cursor: "not-allowed",
      opacity: theme.vars.palette.action.disabledOpacity,
    }
);

const CheckboxIcon = styled("svg", { label: "CheckboxIcon" })(() => ({
  ...size("100%"),
  ...position("relative"),
  ...margin(0),
}));

const CheckboxInput = styled("input", { label: "Checkbox" })(() => ({
  ...position("absolute", 0, 0, 0, 0),
  ...size("100%", "100%"),
  ...margin(0),
  ...padding(0),
  borderWidth: 0,
  cursor: "inherit",
  opacity: 0,
  zIndex: 1,
}));

const Checkbox = forwardRef<HTMLInputElement, Props<CheckboxProps>>(
  (props, ref) => {
    const {
      checked: checkedProps,
      className,
      indeterminate: indeterminateProps,
      onChange,
      sx,
      ...rest
    } = props;
    const mergedRef = useMergeRef(ref);

    const parsedProps = useMemo(
      () =>
        checkboxValueSchema.safeParse({
          checked: checkedProps,
          indeterminate: indeterminateProps,
        }),
      [checkedProps, indeterminateProps]
    );

    if (!parsedProps.success) {
      throw new Error(parsedProps.error.message);
    }

    const { checked, indeterminate } = parsedProps.data;

    const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
      (e) => {
        e.stopPropagation();

        if (!onChange) return;
        onChange(e.target.checked);
      },
      [onChange]
    );

    return (
      <CheckboxRoot
        checked={checked}
        className={className}
        disabled={rest.disabled}
        indeterminate={indeterminate}
        sx={sx}
      >
        {indeterminate && <CheckboxIcon as={IndeterminateIcon} />}
        {checked && <CheckboxIcon as={CheckedIcon} />}
        <CheckboxInput
          onChange={handleChange}
          ref={mergedRef}
          type="checkbox"
          {...rest}
          checked={checked}
        />
      </CheckboxRoot>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
