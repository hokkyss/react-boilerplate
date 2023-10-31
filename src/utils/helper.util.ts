import type { ClassValue } from "clsx";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function tw(className: string): string;
export function tw(...inputs: ClassValue[]): string;
export function tw(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
