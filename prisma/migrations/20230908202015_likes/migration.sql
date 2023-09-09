/*
  Warnings:

  - You are about to drop the column `compId` on the `Race` table. All the data in the column will be lost.
  - You are about to drop the `eventComment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `follow` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `like` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "eventComment" DROP CONSTRAINT "eventComment_eventId_fkey";

-- DropForeignKey
ALTER TABLE "eventComment" DROP CONSTRAINT "eventComment_userId_fkey";

-- DropForeignKey
ALTER TABLE "follow" DROP CONSTRAINT "follow_compId_fkey";

-- DropForeignKey
ALTER TABLE "follow" DROP CONSTRAINT "follow_eventId_fkey";

-- DropForeignKey
ALTER TABLE "follow" DROP CONSTRAINT "follow_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "follow" DROP CONSTRAINT "follow_raceId_fkey";

-- DropForeignKey
ALTER TABLE "follow" DROP CONSTRAINT "follow_seriesId_fkey";

-- DropForeignKey
ALTER TABLE "follow" DROP CONSTRAINT "follow_userId_fkey";

-- DropForeignKey
ALTER TABLE "like" DROP CONSTRAINT "like_compId_fkey";

-- DropForeignKey
ALTER TABLE "like" DROP CONSTRAINT "like_eventCommentId_fkey";

-- DropForeignKey
ALTER TABLE "like" DROP CONSTRAINT "like_eventId_fkey";

-- DropForeignKey
ALTER TABLE "like" DROP CONSTRAINT "like_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "like" DROP CONSTRAINT "like_raceId_fkey";

-- DropForeignKey
ALTER TABLE "like" DROP CONSTRAINT "like_seriesId_fkey";

-- DropForeignKey
ALTER TABLE "like" DROP CONSTRAINT "like_userId_fkey";

-- AlterTable
ALTER TABLE "Race" DROP COLUMN "compId";

-- DropTable
DROP TABLE "eventComment";

-- DropTable
DROP TABLE "follow";

-- DropTable
DROP TABLE "like";

-- CreateTable
CREATE TABLE "EventComment" (
    "type" TEXT,
    "ref" TEXT,
    "comment" TEXT NOT NULL,
    "eventId" TEXT,
    "userId" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "EventComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Follow" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "seriesId" TEXT,
    "eventId" TEXT,
    "organizationId" TEXT,
    "raceId" TEXT,
    "compId" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Follow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "itemId" TEXT,
    "seriesId" TEXT,
    "eventId" TEXT,
    "organizationId" TEXT,
    "raceId" TEXT,
    "compId" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eventCommentId" TEXT,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventComment_id_key" ON "EventComment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Follow_id_key" ON "Follow"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Like_id_key" ON "Like"("id");

-- AddForeignKey
ALTER TABLE "EventComment" ADD CONSTRAINT "EventComment_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventComment" ADD CONSTRAINT "EventComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_compId_fkey" FOREIGN KEY ("compId") REFERENCES "Comp"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_compId_fkey" FOREIGN KEY ("compId") REFERENCES "Comp"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_raceId_fkey" FOREIGN KEY ("raceId") REFERENCES "Race"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_eventCommentId_fkey" FOREIGN KEY ("eventCommentId") REFERENCES "EventComment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
