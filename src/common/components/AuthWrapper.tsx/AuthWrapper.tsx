//TODO: Remove this file once testing is complete (this is just for testing experience in prod.)
import { useState } from "react";

import AuthenticationForm from "@/common/components/AuthWrapper.tsx/AuthenticationForm";
import { LogoIcon } from "@/common/components/CustomIcon";

export const AuthWrapper = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  if (!isAuthorized) {
    return (
      <>
        <div
          className="min-h-screen"
          style={{
            background:
              "linear-gradient(0deg, rgba(19, 24, 100, 0.2), rgba(19, 24, 100, 0.2)), #000338",
          }}
        >
          <div
            className="relative"
            style={{
              backgroundSize: "1800px",
              backgroundPosition: "top 20px center",
              backgroundImage: "url('/image/DissolveBG.jpg')",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="px-6 py-4 pl-5 md:px-12 md:py-5">
              <div>
                <LogoIcon className="h-[40px] md:h-[48px] w-[75.4px] md:w-[90.48px]" />
              </div>
            </div>
            <AuthenticationForm setIsAuthorized={setIsAuthorized} />
          </div>
        </div>
      </>
    );
  }

  return <>{children}</>;
};

export default AuthWrapper;
