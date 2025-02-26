import { auth } from "@clerk/nextjs/server";
const { userId: currentUserId, sessionClaims } = await auth();
const role = (sessionClaims?.metadata as { role: string })?.role;

export { currentUserId, role };
