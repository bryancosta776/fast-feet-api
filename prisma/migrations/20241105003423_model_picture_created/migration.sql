-- CreateTable
CREATE TABLE "Picture" (
    "id" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "shipmentId" TEXT,

    CONSTRAINT "Picture_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Picture" ADD CONSTRAINT "Picture_shipmentId_fkey" FOREIGN KEY ("shipmentId") REFERENCES "Shipment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
