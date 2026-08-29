"use client";

import { SnackbarProvider } from "notistack";

export default function GlobalNotiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      preventDuplicate={false}
    >
      {children}
    </SnackbarProvider>
  );
}