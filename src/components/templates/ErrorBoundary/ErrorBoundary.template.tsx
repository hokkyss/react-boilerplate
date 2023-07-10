import React from "react";
import Button from "~/components/atoms/Button/Button.atom";
import Text from "~/components/atoms/Text/Text.atom";

type ErrorBoundaryProps = React.PropsWithChildren<{ className?: string }>;
type ErrorBoundaryState = { hasError: boolean; errorMessage: string };

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ hasError: true, errorMessage: error.message });
    console.error("an error happened", error, errorInfo.componentStack);
  }

  render(): React.ReactNode {
    const { children, className } = this.props;
    const { hasError, errorMessage } = this.state;

    if (hasError) {
      return (
        <Button
          className={className}
          onClick={window.location.reload}
          type="button"
        >
          <Text>{errorMessage}</Text>
          <Text>Reload Page</Text>
        </Button>
      );
    }

    return children;
  }
}
