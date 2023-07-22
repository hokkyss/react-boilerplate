import { Except } from "@hokkyss/composite-types";
import useInput from "@mui/base/useInput";
import { SxProps } from "@mui/system";
import styled from "@mui/system/styled";
import useTheme from "@mui/system/useTheme";
import { HTMLMotionProps, m } from "framer-motion";
import { borderRadius, margin, padding } from "polished";
import { InputHTMLAttributes, forwardRef, useId, useMemo } from "react";
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
  "type" | "id" | "defaultValue" | "defaultChecked"
> & {
  label?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  placeholder: string;
  error?: string;
  containerStyle?: SxProps<ITheme>;
} & HTMLMotionProps<"input">;

const InputContainer = styled(m.div)`
  row-gap: ${({ theme }) => theme.spacing(1)};
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const StyledInput = styled(m.input, {
  name: "Input",
  label: "Input",
})(({ theme }) => ({
  ...borderRadius("top", theme.vars.radius.md),
  ...borderRadius("bottom", theme.vars.radius.md),
  ...padding(theme.spacing(2), theme.spacing(2)),
  ...theme.vars.typography.body1,
  color: theme.vars.palette.text.primary,
  backgroundColor: theme.vars.palette.background.default,
  borderWidth: 1,
  outlineWidth: 2,
  outlineColor: theme.vars.palette.primary.main,
  ":hover": {
    borderColor: theme.vars.palette.primary.main,
  },
  ":active": {
    borderColor: theme.vars.palette.primary.main,
  },
}));

const StyledLabel = Text.withComponent("label");

const ErrorText = styled(Text, { name: "ErrorText", label: "ErrorText" })(
  ({ theme }) => ({
    color: theme.vars.palette.error.main,
    ...margin(0),
  })
);

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    disabled,
    inputRef,
    onBlur,
    onChange,
    onClick,
    onFocus,
    required,
    value,
    label,
    error,
    containerStyle,
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
          id={labelId}
          htmlFor={inputId}
          sx={error ? { color: theme.vars.palette.error.main } : {}}
        >
          {label}
        </StyledLabel>
      )}
      <StyledInput
        {...rest}
        {...inputProps}
        type="text"
        aria-atomic
        aria-invalid={!!error}
        aria-orientation="horizontal"
        aria-relevant="text"
        aria-errormessage={error}
        aria-placeholder={rest.placeholder}
        aria-required={required}
        aria-readonly={disabled}
        aria-disabled={inputProps.disabled}
        aria-label={label}
        aria-describedby={errorId}
        aria-labelledby={labelId}
        id={inputId}
        ref={mergedInputRef}
        aria-valuetext={value ? value.toString() : undefined}
        sx={
          error
            ? {
                borderColor: theme.vars.palette.error.main,
                outlineColor: theme.vars.palette.error.main,
                ":hover": {
                  borderColor: theme.vars.palette.error.main,
                },
              }
            : {}
        }
      />
      {error && (
        <ErrorText id={errorId} aria-details={error}>
          {error}
        </ErrorText>
      )}
    </InputContainer>
  );
});

Input.displayName = "Input";

export default Input;
