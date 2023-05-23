/*
  Warnings:

  - The primary key for the `PhotoAlbums` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `PhotoAlbums` table. All the data in the column will be lost.
  - Added the required column `album_id` to the `PhotoAlbums` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `PhotoAlbums` DROP FOREIGN KEY `PhotoAlbums_user_id_fkey`;

-- AlterTable
ALTER TABLE `PhotoAlbums` DROP PRIMARY KEY,
    DROP COLUMN `user_id`,
    ADD COLUMN `album_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`img_id`, `album_id`);

-- AddForeignKey
ALTER TABLE `PhotoAlbums` ADD CONSTRAINT `PhotoAlbums_album_id_fkey` FOREIGN KEY (`album_id`) REFERENCES `Albums`(`album_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
