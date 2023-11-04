CREATE TABLE `skillpoints` (
  `player` VARCHAR(255) NOT NULL,
  `points` longtext,
  `skills` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `skillpoints`
  ADD PRIMARY KEY (`player`);
