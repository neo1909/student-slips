CREATE TABLE `ps_bank_statement` (
  `id` int NOT NULL AUTO_INCREMENT,
  `school_id` int DEFAULT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `bank_statement_date` date DEFAULT NULL,
  `account_number` varchar(255) DEFAULT NULL,
  `payer` varchar(255) DEFAULT NULL,
  `payer_account` varchar(255) NOT NULL,
  `payee_account` varchar(255) NOT NULL,
  `purpose` longtext,
  `no_of_changes` int DEFAULT NULL,
  `balance` decimal(10,0) DEFAULT NULL,
  `no_of_bank_statement` int DEFAULT NULL,
  `claims` decimal(10,0) DEFAULT NULL,
  `reference_no` varchar(255) DEFAULT NULL,
  `currency_date` date DEFAULT NULL,
  `insert_date` datetime NOT NULL,
  `insert_id` int NOT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_id` int DEFAULT NULL,
  `post_payment_yn` varchar(1) NOT NULL DEFAULT 'N',
  `del_yn` varchar(1) NOT NULL,
  `payee` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ps_bank_statement_upload_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `school_id` varchar(255) DEFAULT NULL,
  `file_name` longtext,
  `path` varchar(255) DEFAULT NULL,
  `upload_date` datetime NOT NULL,
  `post_payment_date` datetime DEFAULT NULL,
  `insert_date` datetime NOT NULL,
  `insert_id` int NOT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_id` int DEFAULT NULL,
  `del_yn` varchar(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ps_head_teachers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `grade` int NOT NULL,
  `class` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `school_id` int NOT NULL,
  `del_yn` varchar(1) DEFAULT NULL,
  `insert_date` datetime DEFAULT NULL,
  `insert_id` int DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ps_roles` (
  `id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `del_yn` varchar(1) DEFAULT NULL,
  `insert_date` datetime DEFAULT NULL,
  `insert_id` int DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ps_service` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `school_id` int NOT NULL,
  `del_yn` varchar(1) DEFAULT NULL,
  `insert_date` datetime DEFAULT NULL,
  `insert_id` int DEFAULT NULL,
  `update_date` int DEFAULT NULL,
  `update_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ps_school` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `zipcode` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `municipality` varchar(255) DEFAULT NULL,
  `bank_account_number` varchar(255) DEFAULT NULL,
  `del_yn` varchar(1) DEFAULT NULL,
  `insert_date` datetime DEFAULT NULL,
  `insert_id` int DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ps_students` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `grade` int NOT NULL,
  `class` int NOT NULL,
  `school_id` int NOT NULL,
  `del_yn` varchar(1) DEFAULT NULL,
  `insert_date` datetime DEFAULT NULL,
  `insert_id` int DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_id` int DEFAULT NULL,
  `student_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `student_id_UNIQUE` (`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `ps_students_debts` (
  `student_id` int NOT NULL,
  `suppliers_id` int NOT NULL,
  `service_id` int NOT NULL,
  `reference_no` varchar(255) NOT NULL,
  `quantity` int DEFAULT NULL,
  `school_id` int NOT NULL,
  `purpose` longtext,
  `debit_date` date NOT NULL,
  `amount_debt` decimal(10,0) NOT NULL,
  `del_yn` varchar(1) DEFAULT NULL,
  `insert_date` datetime NOT NULL,
  `insert_id` int DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_id` int DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ps_suppliers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `school_id` int NOT NULL,
  `del_yn` varchar(1) DEFAULT NULL,
  `insert_date` datetime DEFAULT NULL,
  `insert_id` int DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ps_suppliers_service` (
  `suppliers_id` int NOT NULL,
  `service_id` int NOT NULL,
  `school_id` int NOT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `no_payment` int NOT NULL,
  `amount_1` decimal(10,0) DEFAULT NULL,
  `amount_2` decimal(10,0) DEFAULT NULL,
  `amount_3` decimal(10,0) DEFAULT NULL,
  `amount_4` decimal(10,0) DEFAULT NULL,
  `amount_5` decimal(10,0) DEFAULT NULL,
  `amount_6` decimal(10,0) DEFAULT NULL,
  `amount_7` decimal(10,0) DEFAULT NULL,
  `amount_8` decimal(10,0) DEFAULT NULL,
  `amount_9` decimal(10,0) DEFAULT NULL,
  `amount_10` decimal(10,0) DEFAULT NULL,
  `amount_11` decimal(10,0) DEFAULT NULL,
  `amount_12` decimal(10,0) DEFAULT NULL,
  `grade` varchar(255) NOT NULL,
  `del_yn` varchar(1) DEFAULT NULL,
  `insert_date` datetime DEFAULT NULL,
  `insert_id` int DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ps_user_role` (
  `user_id` int NOT NULL,
  `role_id` int NOT NULL,
  `del_yn` varchar(1) NOT NULL DEFAULT 'N',
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `fk_userrole_role_idx` (`role_id`),
  CONSTRAINT `fk_userrole_role` FOREIGN KEY (`role_id`) REFERENCES `ps_roles` (`id`),
  CONSTRAINT `fk_userrole_user` FOREIGN KEY (`user_id`) REFERENCES `ps_users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ps_user_session` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `session_id` varchar(255) NOT NULL,
  `insert_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_usersession_user_idx` (`user_id`),
  CONSTRAINT `fk_usersession_user` FOREIGN KEY (`user_id`) REFERENCES `ps_users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ps_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `school_id` int NOT NULL,
  `email` varchar(180) DEFAULT NULL,
  `user_type` varchar(45) DEFAULT NULL,
  `login_retry_count` int DEFAULT NULL,
  `last_login_date` datetime DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `del_yn` varchar(1) NOT NULL,
  `insert_date` datetime DEFAULT NULL,
  `insert_id` int DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  KEY `fk_user_school_idx` (`school_id`),
  CONSTRAINT `fk_user_school` FOREIGN KEY (`school_id`) REFERENCES `ps_school` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `spring_session` (
  `PRIMARY_ID` char(36) NOT NULL,
  `SESSION_ID` char(36) NOT NULL,
  `CREATION_TIME` bigint NOT NULL,
  `LAST_ACCESS_TIME` bigint NOT NULL,
  `MAX_INACTIVE_INTERVAL` int NOT NULL,
  `EXPIRY_TIME` bigint NOT NULL,
  `PRINCIPAL_NAME` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`PRIMARY_ID`),
  UNIQUE KEY `SPRING_SESSION_IX1` (`SESSION_ID`),
  KEY `SPRING_SESSION_IX2` (`EXPIRY_TIME`),
  KEY `SPRING_SESSION_IX3` (`PRINCIPAL_NAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

CREATE TABLE `spring_session_attributes` (
  `SESSION_PRIMARY_ID` char(36) NOT NULL,
  `ATTRIBUTE_NAME` varchar(200) NOT NULL,
  `ATTRIBUTE_BYTES` blob NOT NULL,
  PRIMARY KEY (`SESSION_PRIMARY_ID`,`ATTRIBUTE_NAME`),
  CONSTRAINT `SPRING_SESSION_ATTRIBUTES_FK` FOREIGN KEY (`SESSION_PRIMARY_ID`) REFERENCES `spring_session` (`PRIMARY_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
