/*
  Warnings:

  - You are about to drop the `EventComment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EventComment" DROP CONSTRAINT "EventComment_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventComment" DROP CONSTRAINT "EventComment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_eventCommentId_fkey";

-- DropTable
DROP TABLE "EventComment";
