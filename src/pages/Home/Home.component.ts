import { keyframes } from "@emotion/react";
import styled from "@mui/system/styled";
import { isValidMotionProp, m } from "framer-motion";
import { between, padding, size } from "polished";

export const Container = styled(m.div, {
  name: "Container",
  label: "Container",
})`
  font-size: ${between("14px", "20px", "400px", "1000px")};
`;

export const Link = styled("a", { name: "Link", label: "Link" })``;

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
  shouldForwardProp: isValidMotionProp,
  name: "Logo",
  label: "Logo",
})<LogoProps>(({ theme, spin }) => ({
  ...padding(theme.spacing(1)),
  ...size(100, 100),
  animation: spin ? `${spinningLogoKeyframes} 2s linear infinite` : undefined,
}));
