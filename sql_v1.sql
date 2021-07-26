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
	`grade` VARCHAR(255) NOT NULL,
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
     `del_yn` VARCHAR(1),
     `insert_date` DATETIME ,
     `insert_id` INT  ,
     `update_date` DATETIME  ,
     `update_id` INT,
     `price` DECIMAL
);