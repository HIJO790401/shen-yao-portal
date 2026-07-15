CREATE TABLE `news_posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`title_zh` text NOT NULL,
	`title_en` text DEFAULT '' NOT NULL,
	`summary_zh` text DEFAULT '' NOT NULL,
	`summary_en` text DEFAULT '' NOT NULL,
	`body_zh` text DEFAULT '' NOT NULL,
	`body_en` text DEFAULT '' NOT NULL,
	`category` text DEFAULT 'REPORT' NOT NULL,
	`cover_url` text DEFAULT '' NOT NULL,
	`video_url` text DEFAULT '' NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`published_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`author_email` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `news_posts_slug_unique` ON `news_posts` (`slug`);