import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

// Middleware برای مقدار پیش‌فرض آدرس
prisma.$use(async (params, next) => {
  if (params.model === "User" && params.action === "create") {
    if (!params.args.data.address) {
      params.args.data.address = [
        {
          location: "Default Location",
          state: "Default State",
          zipcode: "00000",
        },
      ];
    }
  }
  return next(params);
});
