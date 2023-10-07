/*
  Warnings:

  - You are about to drop the column `uniqueCompId` on the `Comp` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Comp_uniqueCompId_key";

-- AlterTable
ALTER TABLE "Comp" DROP COLUMN "uniqueCompId";
