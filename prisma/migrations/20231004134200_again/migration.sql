-- DropIndex
DROP INDEX "Venue_name_key";

-- AlterTable
ALTER TABLE "Venue" ALTER COLUMN "name" DROP NOT NULL;
