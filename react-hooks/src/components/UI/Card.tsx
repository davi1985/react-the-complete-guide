import { ReactNode } from "react";
import "./Card.css";

export const Card = ({ children }: { children: ReactNode }) => {
  return <div className="card">{children}</div>;
};
