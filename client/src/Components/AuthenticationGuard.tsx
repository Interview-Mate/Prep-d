import { withAuthenticationRequired } from "@auth0/auth0-react";

export const AuthenticationGuard = ({ component }: { component: React.FC }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <div>Page is loading...</div>,
  });

  return <Component />;
};
