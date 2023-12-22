import { ReactNode } from "react";
type HOC = {
  children: ReactNode;
};

export type HasPermissionShieldProps = HOC & {
  required: string;
};
