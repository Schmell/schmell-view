import { p as prisma } from "./prisma.js";
import { Prisma } from "@prisma/client";
import { e as error } from "./index.js";
import { i as isWithinExpiration, g as generateRandomString } from "./date.js";
const EXPIRES_IN = 1e3 * 60 * 60 * 2;
const generateEmailVerificationToken = async (userId) => {
  const storedUserTokens = await prisma.verificationToken.findMany({
    where: { user_id: userId }
  });
  if (storedUserTokens.length > 0) {
    const reusableStoredToken = storedUserTokens.find((token2) => {
      return isWithinExpiration(Number(token2.expires) - EXPIRES_IN / 2);
    });
    if (reusableStoredToken)
      return reusableStoredToken.id;
  }
  const token = generateRandomString(63);
  try {
    await prisma.verificationToken.create({
      data: {
        id: token,
        expires: (/* @__PURE__ */ new Date()).getTime() + EXPIRES_IN,
        user_id: userId
      }
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.log("PrismaClientKnownRequestError: ", e);
      if (e.code === "P2002") {
        console.log("Unique constraint: ", e);
      }
    }
  }
  return token;
};
const validateEmailVerificationToken = async (token) => {
  const storedToken = async () => {
    const storedToken2 = await prisma.verificationToken.findFirst({
      where: { id: token }
    });
    if (!storedToken2)
      throw new Error("Invalid token");
    await prisma.verificationToken.delete({
      where: { user_id: storedToken2.user_id }
    });
    return storedToken2;
  };
  const { expires, user_id } = await storedToken();
  const tokenExpires = Number(expires);
  if (!isWithinExpiration(tokenExpires)) {
    throw new Error("Expired token");
  }
  return user_id;
};
const generatePasswordResetToken = async (userId) => {
  const storedUserTokens = await prisma.verificationToken.findMany({
    where: { user_id: userId }
  });
  if (storedUserTokens.length > 0) {
    const reusableStoredToken = storedUserTokens.find((token2) => {
      return isWithinExpiration(Number(token2.expires) - EXPIRES_IN / 2);
    });
    if (reusableStoredToken)
      return reusableStoredToken.id;
  }
  const token = generateRandomString(63);
  try {
    await prisma.verificationToken.create({
      data: {
        id: token,
        expires: (/* @__PURE__ */ new Date()).getTime() + EXPIRES_IN,
        user_id: userId
      }
    });
  } catch (e) {
    console.log("e: ", e);
  }
  return token;
};
const validatePasswordResetToken = async (token) => {
  const storedToken = async () => {
    const storedToken2 = await prisma.verificationToken.findFirst({
      where: { id: token }
    });
    if (!storedToken2)
      throw error(500, "token is missing");
    await prisma.verificationToken.delete({
      where: { id: token }
    });
    return storedToken2;
  };
  const { expires, user_id } = await storedToken();
  const tokenExpires = Number(expires);
  if (!isWithinExpiration(tokenExpires)) {
    throw error(500, "Expired token");
  }
  return user_id;
};
const isValidPasswordResetToken = async (token) => {
  const storedToken = await prisma.verificationToken.findFirst({
    where: { id: token }
  });
  if (!storedToken)
    return false;
  const tokenExpires = Number(storedToken.expires);
  if (!isWithinExpiration(tokenExpires)) {
    return false;
  }
  return true;
};
export {
  generatePasswordResetToken as a,
  validatePasswordResetToken as b,
  generateEmailVerificationToken as g,
  isValidPasswordResetToken as i,
  validateEmailVerificationToken as v
};
