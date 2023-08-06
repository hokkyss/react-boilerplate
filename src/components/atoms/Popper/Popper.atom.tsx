import type { Except } from "@hokkyss/composite-types";
import type { VirtualElement } from "@popperjs/core";
import type { HTMLAttributes, ReactNode } from "react";
import { forwardRef, useMemo, useState } from "react";
import { usePopper } from "react-popper";
import useMergeRef from "~/hooks/useMergeRef/useMergeRef.hook";
import Portal from "../Portal/Portal.atom";

type UsePopper = typeof usePopper;
type PopperOptions = Parameters<UsePopper>[2];

export type PopperProps = PopperOptions & {
  children: ReactNode;
  open: boolean;
  portalContainer?: HTMLElement;
  referenceElement?: Element | VirtualElement | null;
} & Except<HTMLAttributes<HTMLDivElement>, "children">;

const Popper = forwardRef<HTMLDivElement, Props<PopperProps>>(
  (props, forwardedRef) => {
    const {
      children,
      className,
      createPopper,
      modifiers,
      onFirstUpdate,
      open,
      placement,
      portalContainer = document.body,
      referenceElement,
      strategy,
      ...rest
    } = props;

    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
      null
    );
    const popperElementRef = useMergeRef(forwardedRef, setPopperElement);

    const resolvedPopperOptions = useMemo<PopperOptions>(
      () => ({
        createPopper,
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
          ...(modifiers ?? []),
        ],
        onFirstUpdate,
        placement,
        strategy,
      }),
      [createPopper, modifiers, onFirstUpdate, placement, strategy]
    );

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
          className={className}
          ref={popperElementRef}
          {...popper.attributes.popper}
          style={popper.styles.popper}
          {...rest}
        >
          {children}
        </div>
      </Portal>
    );
  }
);

Popper.displayName = "Popper";

export default Popper;
