/*
  Warnings:

  - You are about to drop the column `eventCommentId` on the `Like` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Like" DROP COLUMN "eventCommentId",
ADD COLUMN     "likedUserId" TEXT;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_likedUserId_fkey" FOREIGN KEY ("likedUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
