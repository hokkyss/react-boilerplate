import { Except } from "@hokkyss/composite-types";
import { VirtualElement } from "@popperjs/core";
import {
  HTMLAttributes,
  ReactNode,
  forwardRef,
  useMemo,
  useState,
} from "react";
import { usePopper } from "react-popper";
import useMergeRef from "~/hooks/useMergeRef/useMergeRef.hook";
import Portal from "../Portal/Portal.atom";

type UsePopper = typeof usePopper;
type PopperOptions = Parameters<UsePopper>[2];

export type PopperProps = PopperOptions & {
  referenceElement?: Element | VirtualElement | null;
  children: ReactNode;
  open: boolean;
  portalContainer?: HTMLElement;
} & Except<HTMLAttributes<HTMLDivElement>, "children">;

const Popper = forwardRef<HTMLDivElement, Props<PopperProps>>(
  (props, forwardedRef) => {
    const {
      className,
      referenceElement,
      children,
      open,
      portalContainer = document.body,
      placement,
      strategy,
      createPopper,
      onFirstUpdate,
      modifiers,
      ...rest
    } = props;

    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
      null
    );
    const popperElementRef = useMergeRef(forwardedRef, setPopperElement);

    const resolvedPopperOptions = useMemo<PopperOptions>(
      () => ({
        placement,
        strategy,
        createPopper,
        onFirstUpdate,
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
          ref={popperElementRef}
          className={className}
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
