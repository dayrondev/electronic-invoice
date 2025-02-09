import { PropsWithChildren } from "react";
const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
};
export default AuthLayout;
