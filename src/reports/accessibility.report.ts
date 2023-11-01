import type React from "react";
import type ReactDOM from "react-dom/client";

/**
 * Happens only in DEVELOPMENT
 */
const reportAccessibility = async (
  ReactInstance: typeof React,
  ReactDOMInstance: typeof ReactDOM
): Promise<void> => {
  if (import.meta.env.DEV) {
    const axe = (await import("@axe-core/react")).default;
    axe(ReactInstance, ReactDOMInstance, 1000);
  }
};

export default reportAccessibility;
