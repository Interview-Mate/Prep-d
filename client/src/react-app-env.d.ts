/// <reference types="react-scripts" />

//general types
declare module "*.JPG";

//router types
declare function useNavigate(): NavigateFunction;

interface NavigateFunction {
  (
    to: To,
    options?: {
      replace?: boolean;
      state?: any;
      relative?: RelativeRoutingType;
    }
  ): void;
  (delta: number): void;
}

type createBrowserRouter = (
  routes: RouteObject[],
  opts?: {
    basename?: string;
    window?: Window;
  }
) => RemixRouter;

interface RouteObject {
  path?: string;
  index?: boolean;
  children?: React.ReactNode;
  caseSensitive?: boolean;
  id?: string;
  loader?: LoaderFunction;
  action?: ActionFunction;
  element?: React.ReactNode | null;
  Component?: React.ComponentType | null;
  errorElement?: React.ReactNode | null;
  ErrorBoundary?: React.ComponentType | null;
  handle?: RouteObject["handle"];
  shouldRevalidate?: ShouldRevalidateFunction;
  lazy?: LazyRouteFunction<RouteObject>;
}

//error types
type Err = {
  statusText?: string;
  message?: string;
};

type Problem = {
  // _id: string;
  name: string;
  description: string;
  hint: string;
  function: string | undefined;
  solution1: Solution;
  solution2: Solution;
  language: string;
  level: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Solution = any[];

type Dict = {
  [key: number]: string;
};

type Result = {
  input: string;
  output: string | null;
  error: string | null;
};

