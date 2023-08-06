import { type Except } from "@hokkyss/composite-types";
import useInput from "@mui/base/useInput";
import { type SxProps } from "@mui/system";
import styled from "@mui/system/styled";
import useTheme from "@mui/system/useTheme";
import { m, type HTMLMotionProps } from "framer-motion";
import { borderRadius, margin, padding } from "polished";
import { forwardRef, useId, useMemo, type InputHTMLAttributes } from "react";
import useMergeRef from "~/hooks/useMergeRef/useMergeRef.hook";
import Text from "../Text/Text.atom";

/* TODO: checkbox is on another element */
// | "checkbox"
/* TODO: checkbox is on another element */
// | "color"
/* TODO: date, datetime-local, month is on another element */
// | "date"
// | "datetime-local"
// | "month"
// | "week"
// | "time"
/* TODO: file and image uploader on another element */
// | "file"
// | "image"
// TODO: radio on different element
// | "radio"
// TODO: range on different element
// | "range";

type InputProps = Except<
  InputHTMLAttributes<HTMLInputElement>,
  "defaultChecked" | "defaultValue" | "id" | "type"
> & {
  containerStyle?: SxProps<ITheme>;
  error?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  label?: string;
  placeholder: string;
} & HTMLMotionProps<"input">;

const InputContainer = styled(m.div, { label: "InputContainer" })`
  row-gap: ${({ theme }) => theme.spacing(1)};
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const StyledInput = styled(m.input, {
  label: "Input",
})(({ theme }) => ({
  ...borderRadius("top", theme.vars.radius.md),
  ...borderRadius("bottom", theme.vars.radius.md),
  ...padding(theme.spacing(2), theme.spacing(2)),
  ...theme.vars.typography.body1,
  ":active": {
    borderColor: theme.vars.palette.primary.main,
  },
  ":hover": {
    borderColor: theme.vars.palette.primary.main,
  },
  backgroundColor: theme.vars.palette.background.default,
  borderWidth: 1,
  color: theme.vars.palette.text.primary,
  outlineColor: theme.vars.palette.primary.main,
  outlineWidth: 2,
  transitionDuration: `${theme.transitions.duration.standard}ms`,
  transitionProperty: "all",
  transitionTimingFunction: theme.vars.transitions.easing.sharp,
}));

const StyledLabel = Text.withComponent("label");

const ErrorText = styled(Text, { label: "ErrorText" })(({ theme }) => ({
  color: theme.vars.palette.error.main,
  ...margin(0),
}));

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    containerStyle,
    disabled,
    error,
    inputRef,
    label,
    onBlur,
    onChange,
    onClick,
    onFocus,
    required,
    value,
    ...rest
  } = props;

  const theme = useTheme();
  const labelId = useId();
  const inputId = useId();
  const errorId = useId();
  const input = useInput({
    disabled,
    error: !!error,
    inputRef,
    onBlur,
    onChange,
    onClick,
    onFocus,
    required,
    value,
  });

  const inputProps = useMemo(() => input.getInputProps(), [input]);

  const mergedInputRef = useMergeRef(inputProps.ref, ref);

  return (
    <InputContainer {...input.getRootProps()} sx={containerStyle}>
      {label && (
        <StyledLabel
          aria-details={label}
          htmlFor={inputId}
          id={labelId}
          sx={error ? { color: theme.vars.palette.error.main } : {}}
        >
          {label}
        </StyledLabel>
      )}
      <StyledInput
        {...rest}
        {...inputProps}
        sx={[
          !!error && {
            ":hover": {
              borderColor: theme.vars.palette.error.main,
            },
            borderColor: theme.vars.palette.error.main,
            outlineColor: theme.vars.palette.error.main,
          },
        ]}
        aria-atomic
        aria-describedby={errorId}
        aria-disabled={inputProps.disabled}
        aria-errormessage={error}
        aria-invalid={!!error}
        aria-label={label}
        aria-labelledby={labelId}
        aria-orientation="horizontal"
        aria-placeholder={rest.placeholder}
        aria-readonly={disabled}
        aria-relevant="text"
        aria-required={required}
        aria-valuetext={value ? value.toString() : undefined}
        id={inputId}
        ref={mergedInputRef}
        type="text"
      />
      {error && (
        <ErrorText aria-details={error} id={errorId}>
          {error}
        </ErrorText>
      )}
    </InputContainer>
  );
});

Input.displayName = "Input";

export default Input;
