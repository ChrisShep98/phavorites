import { usePathname } from "next/navigation";

export const paramValue = usePathname().split("/").pop();
export const route = usePathname().split("/")[1];
