import { ReactNode, forwardRef, useEffect } from "react";
import { createPortal } from "react-dom";

type PortalProps = {
  children: ReactNode;
  container?: HTMLElement;
};

const Portal = forwardRef<Element, PortalProps>((props, ref) => {
  const { children, container = document.body } = props;

  useEffect(() => {
    if (!ref) {
      return;
    }

    if (typeof ref === "function") {
      ref(container);
    } else {
      ref.current = container;
    }
  }, [container, ref]);

  return <>{createPortal(children, container)}</>;
});

Portal.displayName = "Portal";

export default Portal;
