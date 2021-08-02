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
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255),
    `school_id` INT NOT NULL,
    `del_yn` VARCHAR(1),
	`insert_date` DATETIME  ,
	`insert_id` INT  ,
	`update_date` INT  ,
	`update_id` INT  ,
	PRIMARY KEY (`id`)
);

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


CREATE TABLE `PS_Suppliers_Service` (
    `id` INT NOT NULL AUTO_INCREMENT,
	`suppliers_id` INT NOT NULL ,
	`service_id` INT NOT NULL,
	`school_id` INT NOT NULL,
	`price` DECIMAL  ,
	`no_payment` INT NOT NULL,
	`amount_1` DECIMAL  ,
	`amount_2` DECIMAL ,
	`amount_3` DECIMAL  ,
	`amount_4` DECIMAL  ,
	`amount_5` DECIMAL  ,
	`amount_6` DECIMAL  ,
	`amount_7` DECIMAL  ,
	`amount_8` DECIMAL  ,
	`amount_9` DECIMAL  ,
	`amount_10` DECIMAL  ,
	`amount_11` DECIMAL  ,
	`amount_12` DECIMAL  ,
	`grade` INT,
    `del_yn` VARCHAR(1),
	`insert_date` DATETIME ,
	`insert_id` INT  ,
	`update_date` DATETIME  ,
	`update_id` INT  
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
CREATE TABLE `PS_Students_Debts` (
     `student_id` INT NOT NULL ,
     `suppliers_id` INT NOT NULL ,
     `service_id` INT NOT NULL  ,
     `reference_no` VARCHAR(255)  ,
     `quantity` INT  ,
     `school_id` INT NOT NULL,
     `purpose` longtext,
     `debit_date` DATE  ,
     `amount_debt` DECIMAL  ,
     `grade` INT ,
     `class` INT ,
     `del_yn` VARCHAR(1),
     `insert_date` DATETIME ,
     `insert_id` INT  ,
     `update_date` DATETIME  ,
     `update_id` INT,
     `price` DECIMAL
);

CREATE TABLE ps_bank_statement_upload_history (
      id int NOT NULL AUTO_INCREMENT,
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
);

CREATE TABLE ps_bank_statement (
       id int NOT NULL AUTO_INCREMENT,
       file_name varchar(255) DEFAULT NULL,
       bank_statement_date date DEFAULT NULL,
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
);