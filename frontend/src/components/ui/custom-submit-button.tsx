"use client";

import React, { PropsWithChildren } from "react";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

const SubmitButton = ({ children }: PropsWithChildren) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      aria-disabled={pending}
      disabled={pending}
      className="w-full"
    >
      {pending ? "Submitting..." : children}
    </Button>
  );
};

export default SubmitButton;
