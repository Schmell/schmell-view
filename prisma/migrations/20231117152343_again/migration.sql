/*
  Warnings:

  - You are about to drop the `_EventCompRelation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_EventCompRelation" DROP CONSTRAINT "_EventCompRelation_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventCompRelation" DROP CONSTRAINT "_EventCompRelation_B_fkey";

-- DropTable
DROP TABLE "_EventCompRelation";

-- CreateTable
CREATE TABLE "_CompToEvent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CompToEvent_AB_unique" ON "_CompToEvent"("A", "B");

-- CreateIndex
CREATE INDEX "_CompToEvent_B_index" ON "_CompToEvent"("B");

-- AddForeignKey
ALTER TABLE "_CompToEvent" ADD CONSTRAINT "_CompToEvent_A_fkey" FOREIGN KEY ("A") REFERENCES "Comp"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompToEvent" ADD CONSTRAINT "_CompToEvent_B_fkey" FOREIGN KEY ("B") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
