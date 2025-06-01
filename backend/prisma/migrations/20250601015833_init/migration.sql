-- CreateTable
CREATE TABLE "Client" (
    "client_id" TEXT NOT NULL,
    "client_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("client_id")
);

-- CreateTable
CREATE TABLE "Asset" (
    "asset_id" TEXT NOT NULL,
    "asset_name" TEXT NOT NULL,
    "currentValue" DOUBLE PRECISION NOT NULL,
    "clientId" TEXT NOT NULL,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("asset_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("client_id") ON DELETE CASCADE ON UPDATE CASCADE;
