import { auth } from "@clerk/nextjs/server";

export const getDetails = async () => {
  const { userId: currentUserId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role: string })?.role;
  return { currentUserId, role };
};
