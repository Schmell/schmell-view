/*
  Warnings:

  - A unique constraint covering the columns `[resultId]` on the table `Result` will be added. If there are existing duplicate values, this will fail.
  - Made the column `resultId` on table `Result` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Result" ALTER COLUMN "resultId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Result_resultId_key" ON "Result"("resultId");
