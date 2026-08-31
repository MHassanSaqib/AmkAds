DROP TABLE IF EXISTS PortfolioMedia;

CREATE TABLE PortfolioMedia (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  brand TEXT NOT NULL,
  type TEXT NOT NULL,
  imageSrc TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS service_videos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  service_slug TEXT NOT NULL UNIQUE,
  video_key TEXT NOT NULL,
  video_url TEXT NOT NULL,
  uploaded_at TEXT NOT NULL
);
