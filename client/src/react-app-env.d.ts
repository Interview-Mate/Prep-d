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

interface InterviewFormValues {
  jobLevel: string;
  companyName: string;
  jobField: string;
  jobTitle: string;
}

type CompVoiceProps = {
  message?: string;
  setIsInterviewerSpeaking: (value: boolean) => void;
};

type InterviewFormProps = {
  onFormSubmit: (values: { companyName: string; jobLevel: string; jobField: string; jobTitle: string }) => void;
};

type AudioClip = {
  id: string;
  publicId: string;
  transcript: string;
};

type SpeechProps = {
  isInterviewerSpeaking: boolean;
  onAnswerRecorded: (audioUrl: any, transcript: any) => void;
  onSaveUserResponse: () => void;
};

type InterviewProps = {
  currentUser: any;
  setCurrentUser: any;
  isAuthenticated: boolean;
  handleGetUser: () => Promise<void>;
  handleCreateUser: () => Promise<void>;
};