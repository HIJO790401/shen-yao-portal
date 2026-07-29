CREATE INDEX IF NOT EXISTS `museum_entries_status_date_idx` ON `museum_entries` (`status`,`occurred_at`);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `news_posts_status_date_idx` ON `news_posts` (`status`,`published_at`);
