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
