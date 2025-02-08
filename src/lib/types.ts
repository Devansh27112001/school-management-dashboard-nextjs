import { Announcement, Class } from "@prisma/client";

export type searchParamsType = Promise<{
  [key: string]: string | undefined;
}>;

export type AnnouncementList = Announcement & { class: Class };
