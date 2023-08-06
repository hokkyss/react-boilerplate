import { forwardRef, useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import useMergeRef from "~/hooks/useMergeRef/useMergeRef.hook";

type PortalProps = {
  children: ReactNode;
  container?: HTMLElement;
};

const Portal = forwardRef<Element, PortalProps>((props, ref) => {
  const { children, container = document.body } = props;

  const containerRef = useMergeRef(ref);

  useEffect(() => {
    if (containerRef) {
      containerRef(container);
    }
  }, [container, containerRef, ref]);

  return <>{createPortal(children, container)}</>;
});

Portal.displayName = "Portal";

export default Portal;
