import { type PropsWithChildren } from "react";
import Button from "~/components/atoms/Button/Button.atom";
import Text from "~/components/atoms/Text/Text.atom";

type ErrorBoundaryProps = Props<PropsWithChildren>;
type ErrorBoundaryState = { errorMessage: string; hasError: boolean };

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { errorMessage: "", hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { errorMessage: error.message, hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ errorMessage: error.message, hasError: true });
    console.error("an error happened", error, errorInfo.componentStack);
  }

  render(): React.ReactNode {
    const { children, className, sx } = this.props;
    const { errorMessage, hasError } = this.state;

    if (hasError) {
      return (
        <Button
          className={className}
          onClick={window.location.reload}
          sx={sx}
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
