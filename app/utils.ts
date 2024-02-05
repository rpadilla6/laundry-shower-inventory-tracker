import { DistributionRecord } from "./models/distribution_record";
import type { User } from "./models/user.server";
import { useMatches } from "@remix-run/react";
import { useMemo } from "react";

export function useMatchesData(id: string): any {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id]
  );

  return route?.data;
}

export function isUser(user: User) {
  return user && typeof user === "object";
}

export function useOptionalUser() {
  const data = useMatchesData("root");
  if (!data || !isUser(data.user)) {
    return undefined;
  }
  return data.user;
}

export function useUser() {
  const maybeUser = useOptionalUser();
  if (!maybeUser) {
    throw new Error(
      "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead."
    );
  }
  return maybeUser;
}

export function validateEmail(email: unknown): email is string {
  return typeof email === "string" && email.length > 3 && email.includes("@");
}

export function getEmojiStringForEntry(entry: DistributionRecord) {
  const emoji:string[] = [];
  if (entry.backpack)
    emoji.push("🎒");
  if (entry.duffel_bag)
    emoji.push("👜");
  if (entry.blanket)
    emoji.push("🇶🇦");
  if (entry.sleeping_bag)
    emoji.push("🛌");
  if (entry.tarp)
    emoji.push("⛺️");
  return emoji.join(" ");
}