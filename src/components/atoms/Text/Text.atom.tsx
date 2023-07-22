import styled from "@mui/system/styled";
import { m } from "framer-motion";

const Heading1 = styled(m.h1, { name: "Heading1", label: "Heading1" })(
  ({ theme }) => ({
    ...theme.vars.typography.h1,
    color: theme.vars.palette.text.primary,
  })
);

const Heading2 = styled(m.h2, { name: "Heading2", label: "Heading2" })(
  ({ theme }) => ({
    ...theme.vars.typography.h2,
    color: theme.vars.palette.text.primary,
  })
);

const Heading3 = styled(m.h3, { name: "Heading3", label: "Heading3" })(
  ({ theme }) => ({
    ...theme.vars.typography.h3,
    color: theme.vars.palette.text.primary,
  })
);

const Heading4 = styled(m.h4, { name: "Heading4", label: "Heading4" })(
  ({ theme }) => ({
    ...theme.vars.typography.h4,
    color: theme.vars.palette.text.primary,
  })
);

const Heading5 = styled(m.h5, { name: "Heading5", label: "Heading5" })(
  ({ theme }) => ({
    ...theme.vars.typography.h5,
    color: theme.vars.palette.text.primary,
  })
);

const Heading6 = styled(m.h6, { name: "Heading6", label: "Heading6" })(
  ({ theme }) => ({
    ...theme.vars.typography.h6,
    color: theme.vars.palette.text.primary,
  })
);

const Paragraph = styled(m.p, { name: "Paragraph", label: "Paragraph" })(
  ({ theme }) => ({
    ...theme.vars.typography.body1,
    color: theme.vars.palette.text.primary,
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
