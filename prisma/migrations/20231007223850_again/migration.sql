-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_venueId_fkey";

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE CASCADE ON UPDATE CASCADE;
