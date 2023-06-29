import React from "react";
import Button from "~/components/atoms/Button/Button.atom";
import Text from "~/components/atoms/Text/Text.atom";

type ErrorBoundaryProps = React.PropsWithChildren<{ className?: string }>;
type ErrorBoundaryState = { hasError: boolean };

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error(error, errorInfo.componentStack);
  }

  render(): React.ReactNode {
    const { children, className } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return (
        <Button
          className={className}
          onClick={window.location.reload}
          type="button"
        >
          <Text>Reload Page</Text>
        </Button>
      );
    }

    return children;
  }
}
