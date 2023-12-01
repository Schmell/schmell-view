-- CreateTable
CREATE TABLE "UserComp" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "compId" TEXT NOT NULL,

    CONSTRAINT "UserComp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserComp_id_key" ON "UserComp"("id");

-- AddForeignKey
ALTER TABLE "UserComp" ADD CONSTRAINT "UserComp_compId_fkey" FOREIGN KEY ("compId") REFERENCES "Comp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
