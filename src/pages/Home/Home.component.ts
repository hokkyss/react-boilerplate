import { keyframes } from "@emotion/react";
import styled from "@mui/system/styled";
import { isValidMotionProp, m } from "framer-motion";
import { padding, size } from "polished";

export const Link = styled("a", { label: "Link" })`
  display: flex;
`;

const spinningLogoKeyframes = keyframes`
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

type LogoProps = {
  spin?: boolean;
};
export const Logo = styled(m.svg, {
  label: "Logo",
  name: "Logo",
  shouldForwardProp: isValidMotionProp,
})<LogoProps>(({ spin, theme }) => ({
  ...padding(theme.spacing(1)),
  ...size(100, 100),
  animation: spin ? `${spinningLogoKeyframes} 2s linear infinite` : undefined,
}));
