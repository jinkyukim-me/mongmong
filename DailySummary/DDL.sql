-- diarydb.user_info definition
CREATE TABLE `user_info` (
  `user_email` varchar(100) NOT NULL,
  `user_password` varchar(100) NOT NULL,
  `created_data_time` timestamp NOT NULL,
  `modified_data_time` timestamp NULL DEFAULT NULL,
  `agree_yn` varchar(1) NOT NULL,
  PRIMARY KEY (`user_email`)
);

-- diarydb.user_post definition
CREATE TABLE `user_post` (
  `post_id` bigint NOT NULL AUTO_INCREMENT,
  `user_email` varchar(100) NOT NULL,
  `paragraph` text NOT NULL,
  `strength_of_feeling` int NOT NULL,
  `created_data_time` timestamp NULL DEFAULT NULL,
  `modified_data_time` timestamp NULL DEFAULT NULL,
  `removed_data_time` timestamp NULL DEFAULT NULL,
  `delete_ch` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`post_id`)
);

-- diarydb.user_summary definition
CREATE TABLE `user_summary` (
  `summary_id` bigint NOT NULL AUTO_INCREMENT,
  `user_email` varchar(100) NOT NULL,
  `summary_text` text,
  `created_data_time` timestamp NULL DEFAULT NULL,
  `removed_data_time` timestamp NULL DEFAULT NULL,
  `delete_ch` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`summary_id`)
);
