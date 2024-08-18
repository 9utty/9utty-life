-- CreateTable
CREATE TABLE "BlogMainMenu" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BlogMainMenu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogSubMenu" (
    "id" SERIAL NOT NULL,
    "mainMenuId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BlogSubMenu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogItem" (
    "id" SERIAL NOT NULL,
    "mainMenuId" INTEGER,
    "subMenuId" INTEGER,
    "title" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "tag" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BlogItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BlogSubMenu" ADD CONSTRAINT "BlogSubMenu_mainMenuId_fkey" FOREIGN KEY ("mainMenuId") REFERENCES "BlogMainMenu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogItem" ADD CONSTRAINT "BlogItem_mainMenuId_fkey" FOREIGN KEY ("mainMenuId") REFERENCES "BlogMainMenu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogItem" ADD CONSTRAINT "BlogItem_subMenuId_fkey" FOREIGN KEY ("subMenuId") REFERENCES "BlogSubMenu"("id") ON DELETE CASCADE ON UPDATE CASCADE;
