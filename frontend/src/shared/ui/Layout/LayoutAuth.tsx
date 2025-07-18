import { Link } from "react-router";
import { Button } from "../Button/Button";
import { Card } from "../Card/Card";
import { FC, PropsWithChildren } from "react";
import { cn } from "@/shared/utils/tw-merge";

type Props = {
  heading: string;
  backButtonLabel?: string;
  backButtonHref?: string;
  className?: string;
};

export const LayoutAuth: FC<PropsWithChildren<Props>> = ({
  children,
  heading,
  backButtonLabel,
  backButtonHref,
  className,
}) => {
  return (
    <div className={cn("flex h-full items-center justify-center", className)}>
      <Card className="p-5 w-[450px]">
        <div className="flex-row items-center justify-center gap-x-4">
          <div>{heading}</div>
        </div>
        {children}
        <div className="mt-2">
          {backButtonLabel && backButtonHref && (
            <Link to={backButtonHref}>
              <Button intent={"ghost"} className="w-full">
                {backButtonLabel}
              </Button>
            </Link>
          )}
        </div>
      </Card>
    </div>
  );
};
