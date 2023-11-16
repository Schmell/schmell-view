/*
  Warnings:

  - You are about to drop the `_CompToEvent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CompToEvent" DROP CONSTRAINT "_CompToEvent_A_fkey";

-- DropForeignKey
ALTER TABLE "_CompToEvent" DROP CONSTRAINT "_CompToEvent_B_fkey";

-- AlterTable
ALTER TABLE "Series" ADD COLUMN     "complete" BOOLEAN DEFAULT false,
ADD COLUMN     "public" BOOLEAN DEFAULT true;

-- DropTable
DROP TABLE "_CompToEvent";

-- CreateTable
CREATE TABLE "_EventCompRelation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EventCompRelation_AB_unique" ON "_EventCompRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_EventCompRelation_B_index" ON "_EventCompRelation"("B");

-- AddForeignKey
ALTER TABLE "_EventCompRelation" ADD CONSTRAINT "_EventCompRelation_A_fkey" FOREIGN KEY ("A") REFERENCES "Comp"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventCompRelation" ADD CONSTRAINT "_EventCompRelation_B_fkey" FOREIGN KEY ("B") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
