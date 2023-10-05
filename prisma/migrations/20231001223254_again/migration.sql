/*
  Warnings:

  - A unique constraint covering the columns `[uniqueCompId]` on the table `Comp` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Comp" ADD COLUMN     "sailno" TEXT,
ADD COLUMN     "uniqueCompId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Comp_uniqueCompId_key" ON "Comp"("uniqueCompId");
