import { Prisma } from "@prisma/client";
import { r as redirect } from "./index.js";
function prismaError(error) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    console.log("PrismaClientKnownRequestError: ", error.message);
    throw redirect(307, "/");
  }
  if (error instanceof Prisma.PrismaClientValidationError) {
    console.log("PrismaClientValidationError: ", error.message);
    throw redirect(307, "/");
  }
}
export {
  prismaError as p
};
