package com.studentslips;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan(value = "com.studentslips.dao")
public class StudentSlipsApplication {

	public static void main(String[] args) {
		SpringApplication.run(StudentSlipsApplication.class, args);
	}

}
