declare module "*.svg" {
  import type { FunctionComponent, SVGProps } from "react";

  // React.FunctionComponent<React.ComponentProps<"svg"> & { title?: string; className?: string }>;
  const Component: FunctionComponent<SVGProps<SVGElement>>;

  export default Component;
}
