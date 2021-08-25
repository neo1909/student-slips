--script db day import vao nhe

CREATE TABLE `PS_Students` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) ,
    `grade` INT NOT NULL,
    `class` INT NOT NULL,
	`school_id` INT NOT NULL,
	`del_yn` VARCHAR(1),
	`insert_date` DATETIME ,
	`insert_id` INT ,
	`update_date` DATETIME ,
	`update_id` INT,
	PRIMARY KEY (`id`)
);

CREATE TABLE `PS_Head_Teachers` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`grade` INT NOT NULL,
	`class` INT NOT NULL,
	`name` VARCHAR(255),
	`school_id` INT NOT NULL,
    `del_yn` VARCHAR(1),
	`insert_date` DATETIME,
	`insert_id` INT ,
	`update_date` DATETIME ,
	`update_id` INT  ,
	PRIMARY KEY (`id`)
);

CREATE TABLE `PS_Service` (
      `id` int NOT NULL AUTO_INCREMENT,
      `name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
      `school_id` int DEFAULT NULL,
      `supplier_id` int DEFAULT NULL,
      `del_yn` varchar(1) COLLATE utf8_bin DEFAULT NULL,
      `insert_date` datetime DEFAULT NULL,
      `insert_id` int DEFAULT NULL,
      `update_date` datetime DEFAULT NULL,
      `update_id` int DEFAULT NULL,
      PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin

CREATE TABLE `PS_Suppliers` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255)  ,
    `school_id` INT NOT NULL,
    `del_yn` VARCHAR(1),
	`insert_date` DATETIME  ,
	`insert_id` INT  ,
	`update_date` DATETIME ,
	`update_id` INT  ,
	PRIMARY KEY (`id`)
);


CREATE TABLE `ps_suppliers_service` (
        `id` int NOT NULL AUTO_INCREMENT,
        `name` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
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
        `grade` int DEFAULT NULL,
        `del_yn` varchar(1) COLLATE utf8_unicode_ci DEFAULT NULL,
        `insert_date` datetime DEFAULT NULL,
        `insert_id` int DEFAULT NULL,
        `update_date` datetime DEFAULT NULL,
        `update_id` int DEFAULT NULL,
        PRIMARY KEY (`id`)
);

CREATE TABLE `PS_School` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255)  ,
	`address` VARCHAR(255)  ,
	`zipcode` VARCHAR(255)  ,
	`city` VARCHAR(255)  ,
	`municipality` VARCHAR(255) ,
	`bank_account_number` VARCHAR(255) ,
    `del_yn` VARCHAR(1),
	`insert_date` DATETIME ,
	`insert_id` INT  ,
	`update_date` DATETIME  ,
	`update_id` INT  ,
	PRIMARY KEY (`id`)
);
CREATE TABLE `Ps_Students_Debts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `task_id` int DEFAULT NULL,
  `school_id` int NOT NULL,
  `grade` int DEFAULT NULL,
  `class` int DEFAULT NULL,
  `student_id` int NOT NULL,
  `suppliers_id` int NOT NULL,
  `service_id` int NOT NULL,
  `reference_no` varchar(255) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `amount_debt` decimal(10,0) DEFAULT NULL,
  `purpose` longtext,
  `debit_date` date DEFAULT NULL,
  `del_yn` varchar(1) DEFAULT NULL,
  `insert_date` datetime DEFAULT NULL,
  `insert_id` int DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_student_debt_task_idx` (`task_id`),
  CONSTRAINT `fk_student_debt_task` FOREIGN KEY (`task_id`) REFERENCES `ps_students_debts_task` (`id`)
);

CREATE TABLE PS_Bank_Statement_Upload_History (
                                                  id int NOT NULL AUTO_INCREMENT,
                                                  school_id int DEFAULT NULL,
                                                  file_name longtext DEFAULT NULL,
                                                  path varchar(255) DEFAULT NULL,
                                                  upload_date datetime NOT NULL,
                                                  post_payment_date datetime DEFAULT NULL,
                                                  insert_date datetime NOT NULL,
                                                  insert_id int NOT NULL,
                                                  update_date datetime DEFAULT NULL,
                                                  update_id int DEFAULT NULL,
                                                  del_yn varchar(1) NOT NULL,
                                                  PRIMARY KEY (id)
)
CREATE TABLE PS_Bank_Statement (
                                   id int NOT NULL AUTO_INCREMENT,
                                   school_id int DEFAULT NULL,
                                   file_name varchar(255) DEFAULT NULL,
                                   bank_statement_date date DEFAULT NULL,
                                   account_number varchar(255) DEFAULT NULL,
                                   payer varchar(255) DEFAULT NULL,
                                   purpose longtext DEFAULT NULL,
                                   no_of_changes int DEFAULT NULL,
                                   balance decimal(10,0) DEFAULT NULL,
                                   no_of_bank_statement int DEFAULT NULL,
                                   claims decimal(10,0) DEFAULT NULL,
                                   reference_no varchar(255) DEFAULT NULL,
                                   currency_date date DEFAULT NULL,
                                   insert_date datetime NOT NULL,
                                   insert_id int NOT NULL,
                                   update_date datetime DEFAULT NULL,
                                   update_id int DEFAULT NULL,
                                   post_payment_yn varchar(1) NOT NULL DEFAULT 'N',
                                   del_yn varchar(1) NOT NULL,
                                   PRIMARY KEY (id)
)
CREATE TABLE `Ps_Students_Debts_Task` (
  `id` int NOT NULL AUTO_INCREMENT,
  `school_id` int DEFAULT NULL,
  `grade` int DEFAULT NULL,
  `class` int DEFAULT NULL,
  `service_id` int DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `debit_date` date DEFAULT NULL,
  `del_yn` varchar(1) NOT NULL,
  `insert_id` int DEFAULT NULL,
  `insert_date` date DEFAULT NULL,
  `update_id` int DEFAULT NULL,
  `update_date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
);

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
);
INSERT INTO `ps_users` VALUES (1,'admin','$2a$10$3ZpIvM/JzRJQMBUflw7JQu28k8F3leyySyHYF3/RT1emRhyVwL9Ni','Admin Student Slips',0,'studentslips.adm@gmail.com',NULL,0,NULL,'ACTIVE',NULL,'N','2021-08-15 15:57:23',NULL,NULL,NULL);

CREATE TABLE `ps_roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `del_yn` varchar(1) DEFAULT NULL,
  `insert_date` datetime DEFAULT NULL,
  `insert_id` int DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
);
INSERT INTO `ps_roles` VALUES (1,'USER',NULL,'N',NULL,NULL,NULL,NULL),(2,'ADMIN',NULL,'N',NULL,NULL,NULL,NULL);

CREATE TABLE `ps_user_role` (
  `user_id` int NOT NULL,
  `role_id` int NOT NULL,
  `del_yn` varchar(1) NOT NULL DEFAULT 'N',
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `fk_userrole_role_idx` (`role_id`),
  CONSTRAINT `fk_userrole_role` FOREIGN KEY (`role_id`) REFERENCES `ps_roles` (`id`),
  CONSTRAINT `fk_userrole_user` FOREIGN KEY (`user_id`) REFERENCES `ps_users` (`id`)
);
INSERT INTO `ps_user_role` VALUES (1,1,'N'),(1,2,'N');

CREATE TABLE `ps_user_session` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `session_id` varchar(255) NOT NULL,
  `insert_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_usersession_user_idx` (`user_id`),
  CONSTRAINT `fk_usersession_user` FOREIGN KEY (`user_id`) REFERENCES `ps_users` (`id`)
);

-- 24/08/2021 Add `supplier_id` to PS_Service (1 service - 1 supplier)
ALTER TABLE `onetouch`.`ps_service` 
ADD COLUMN `supplier_id` INT NULL AFTER `school_id`; -- no need to add as FK

