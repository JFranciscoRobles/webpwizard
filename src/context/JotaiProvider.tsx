"use client";
import { Provider } from "jotai";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function JotaiProvider({ children }: Props) {
  return <Provider>{children}</Provider>;
}

export default JotaiProvider;
