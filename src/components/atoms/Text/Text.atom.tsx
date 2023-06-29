import styled from "@mui/system/styled";
import { motion } from "framer-motion";

const Heading1 = styled(motion.h1, { name: "Heading1", label: "Heading1" })(
  ({ theme }) => ({
    ...theme.vars.typography.h1,
  })
);

const Heading2 = styled(motion.h2, { name: "Heading2", label: "Heading2" })(
  ({ theme }) => ({
    ...theme.vars.typography.h2,
  })
);

const Heading3 = styled(motion.h3, { name: "Heading3", label: "Heading3" })(
  ({ theme }) => ({
    ...theme.vars.typography.h3,
  })
);

const Heading4 = styled(motion.h4, { name: "Heading4", label: "Heading4" })(
  ({ theme }) => ({
    ...theme.vars.typography.h4,
  })
);

const Heading5 = styled(motion.h5, { name: "Heading5", label: "Heading5" })(
  ({ theme }) => ({
    ...theme.vars.typography.h5,
  })
);

const Heading6 = styled(motion.h6, { name: "Heading6", label: "Heading6" })(
  ({ theme }) => ({
    ...theme.vars.typography.h6,
  })
);

const Paragraph = styled(motion.p, { name: "Paragraph", label: "Paragraph" })(
  ({ theme }) => ({
    ...theme.vars.typography.body1,
  })
);

// Without assigning to {} first, `hmr` will only trigger when `Paragraph` changes.
// eslint-disable-next-line prefer-object-spread
const Text = Object.assign({}, Paragraph, {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
});

export default Text;
