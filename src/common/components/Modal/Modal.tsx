import classNames from "classnames";

import { CrossIcon } from "@/common/components/CustomIcon";
import Portal from "@/common/components/Portal";
import useMountTransition from "@/common/hooks/useMountTransition";

interface Props {
  isMounted: boolean;
  setOpenModal: (isOpen: boolean) => void;
  wrapperAdditionalClassNames?: string;
  children: React.ReactNode;
  hasCloseButton?: boolean;
  noAnimation?: boolean;
  unmountDelay?: number;
  duration?: number;
}

export const Modal = ({
  isMounted,
  setOpenModal,
  wrapperAdditionalClassNames,
  hasCloseButton = true,
  children,
  noAnimation = false,
  unmountDelay = 350,
  duration,
}: Props) => {
  const hasTransitionedIn = useMountTransition(
    isMounted,
    noAnimation ? 0 : unmountDelay
  );

  return (
    <Portal elementId="modal">
      {(hasTransitionedIn || isMounted) && (
        <aside
          className={classNames(
            isMounted ? "bg-black/70 backdrop-blur opacity-100" : "opacity-0",
            hasTransitionedIn
              ? "bg-black/70 backdrop-blur opacity-100"
              : "opacity-0",
            noAnimation ? "" : "transition-opacity duration-[600ms]",
            "fixed inset-0 z-30 flex items-center justify-center px-5 overflow-y-auto lg:px-0"
          )}
          style={{
            transitionDuration: duration ? `${duration}ms` : "",
          }}
        >
          <div
            className="relative w-full max-w-[fit-content]"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={classNames(
                "p-8 rounded-3xl text-white bg-cred-dark-blue shadow-lg",
                wrapperAdditionalClassNames
              )}
            >
              {hasCloseButton && (
                <button
                  aria-label="Close"
                  className="flex items-center justify-end w-full mb-4 cursor-pointer"
                  onClick={() => setOpenModal(false)}
                >
                  <CrossIcon className="w-4 h-4 text-white" />
                  <span className="sr-only">Close Modal</span>
                </button>
              )}
              {children}
            </div>
          </div>
        </aside>
      )}
    </Portal>
  );
};

export default Modal;
