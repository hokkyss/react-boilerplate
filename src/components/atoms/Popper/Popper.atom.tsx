import { VirtualElement } from "@popperjs/core";
import { ReactNode, forwardRef, useEffect, useMemo, useState } from "react";
import { usePopper } from "react-popper";
import Portal from "../Portal/Portal.atom";

type UsePopper = typeof usePopper;
type PopperOptions = Parameters<UsePopper>[2];

export type PopperProps = PopperOptions & {
  className?: string;
  referenceElement?: Element | VirtualElement | null;
  children: ReactNode;
  open: boolean;
  portalContainer?: HTMLElement;
};

const Popper = forwardRef<HTMLDivElement, PopperProps>(
  (props, forwardedRef) => {
    const {
      className,
      referenceElement,
      children,
      open,
      portalContainer = document.body,
      ...popperOptions
    } = props;
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
      null
    );

    const resolvedPopperOptions = useMemo<PopperOptions>(
      () => ({
        ...popperOptions,
        modifiers: [
          {
            name: "preventOverflow",
            options: {
              altBoundary: true, // false by default
            },
          },
          {
            name: "flip",
            options: {
              altBoundary: true, // false by default
            },
          },
          ...(popperOptions.modifiers ? popperOptions.modifiers : []),
        ],
      }),
      [popperOptions]
    );

    useEffect(() => {
      if (!forwardedRef) return;

      if (typeof forwardedRef === "function") {
        forwardedRef(popperElement);
      } else {
        forwardedRef.current = popperElement;
      }
    }, [popperElement, forwardedRef]);

    const popper = usePopper(
      referenceElement,
      popperElement,
      resolvedPopperOptions
    );

    if (!open) {
      return null;
    }

    return (
      <Portal container={portalContainer}>
        <div
          ref={setPopperElement}
          className={className}
          {...popper.attributes.popper}
          style={popper.styles.popper}
        >
          {children}
        </div>
      </Portal>
    );
  }
);

Popper.displayName = "Popper";
export default Popper;
