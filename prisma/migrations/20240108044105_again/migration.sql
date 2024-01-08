-- AlterTable
ALTER TABLE "Follow" ADD COLUMN     "FollowedId" TEXT;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_FollowedId_fkey" FOREIGN KEY ("FollowedId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
