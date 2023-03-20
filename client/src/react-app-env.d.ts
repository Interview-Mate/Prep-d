declare global {
  interface Window {
    SpeechRecognition: SpeechRecognition;
    webkitSpeechRecognition: SpeechRecognition;
  }
}

declare module "cloudinary-react" {
  import { Component } from "react";

  export class CloudinaryContext extends Component<any, any> {}
  export class Video extends Component<any, any> {}
}

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

//auth0 types
interface UserMetadata {
  [propName: string]: any;
}

interface AppMetadata {
  [propName: string]: any;
}

interface UserData<A = AppMetadata, U = UserMetadata> {
  email?: string | undefined;
  username?: string | undefined;
  email_verified?: boolean | undefined;
  verify_email?: boolean | undefined;
  user_id?: string | undefined;
  blocked?: boolean | undefined;
  nickname?: string | undefined;
  picture?: string | undefined;
  password?: string | undefined;
  phone_number?: string | undefined;
  phone_verified?: boolean | undefined;
  given_name?: string | undefined;
  family_name?: string | undefined;
  name?: string | undefined;
  user_metadata?: U | undefined;
  app_metadata?: A | undefined;
}

interface User {
  email?: string | undefined;
  name: string;
  surname: string;
  level: string;
  id?: string;
}
type Result = {
  input: string;
  output: string | null;
  error: string | null;
};

