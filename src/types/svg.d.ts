declare module "*.svg" {
  import * as React from "react";

  // React.FunctionComponent<React.ComponentProps<"svg"> & { title?: string; className?: string }>;
  const Component: React.FunctionComponent<React.SVGProps<SVGElement>>;

  export default Component;
}
