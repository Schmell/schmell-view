-- AlterTable
ALTER TABLE "Follow" ADD COLUMN     "venueId" TEXT;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE SET NULL ON UPDATE CASCADE;
