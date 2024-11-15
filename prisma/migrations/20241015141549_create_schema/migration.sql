-- CreateEnum
CREATE TYPE "shipmentRole" AS ENUM ('DELIVERED', 'PENDING', 'IN_TRANSIT', 'RETURNED');

-- CreateTable
CREATE TABLE "MailMan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "contact" TEXT,
    "position" TEXT NOT NULL DEFAULT 'mail',

    CONSTRAINT "MailMan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shipment" (
    "id" TEXT NOT NULL,
    "addresse" TEXT NOT NULL,
    "recipient_id" TEXT NOT NULL,
    "status" "shipmentRole" NOT NULL DEFAULT 'IN_TRANSIT',
    "mailManId" TEXT,

    CONSTRAINT "Shipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "Cpf" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Recipient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Shipment_recipient_id_key" ON "Shipment"("recipient_id");

-- AddForeignKey
ALTER TABLE "Shipment" ADD CONSTRAINT "Shipment_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "Recipient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shipment" ADD CONSTRAINT "Shipment_mailManId_fkey" FOREIGN KEY ("mailManId") REFERENCES "MailMan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
