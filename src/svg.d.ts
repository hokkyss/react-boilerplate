declare module "*.svg" {
  import type { ForwardRefExoticComponent, SVGProps } from "react";

  // React.FunctionComponent<React.ComponentProps<"svg"> & { title?: string; className?: string }>;
  const Component: ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;

  export default Component;
}
