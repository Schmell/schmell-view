/*
  Warnings:

  - You are about to drop the column `elasped` on the `Result` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Result" DROP COLUMN "elasped",
ADD COLUMN     "elapsed" TEXT;
