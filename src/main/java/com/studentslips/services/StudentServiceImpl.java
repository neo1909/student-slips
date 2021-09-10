package com.studentslips.services;

import com.studentslips.common.SessionUtil;
import com.studentslips.common.StudentSlipException;
import com.studentslips.dao.StudentsDao;
import com.studentslips.entities.Student;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


import java.sql.Timestamp;
import java.util.List;
@Component(value = "StudentService")
public class StudentServiceImpl implements StudentService{

    @Autowired
    private StudentsDao studentDao;

    @Override
    public int insertStudent(Student student) throws Exception {

        String sqStudentId =  genStudentId(studentDao.selectMaxStudentId(SessionUtil.getSchoolId()));

        Student studentExist = new Student();
        studentExist.setStudentId(sqStudentId);
        studentExist.setSchoolId(SessionUtil.getSchoolId());
        studentExist = studentDao.selectStudentExist(studentExist);

        if(studentExist !=null && studentExist.getId()!=0){
            throw new StudentSlipException("Student has already exist.");
        }

        student.setStudentId(sqStudentId);
        student.setInsertId(SessionUtil.getUserLoginId());
        student.setSchoolId(SessionUtil.getSchoolId());

       return studentDao.insertStudent(student);
    }

    @Override
    public int updateStudent(Student student) throws Exception {
        student.setUpdateId(SessionUtil.getUserLoginId());
        return studentDao.updateStudent(student);
    }

    @Override
    public int deleteStudentById(int id) throws Exception {
        Student student = new Student();
        student.setId(id);
        student.setUpdateId(SessionUtil.getUserLoginId());
        student.setSchoolId(SessionUtil.getSchoolId());
        return studentDao.deleteStudentById(student);
    }

    @Override
    public List<Student> selectAllStudent(Student student) throws Exception {
        student.setSchoolId(SessionUtil.getSchoolId());
        return studentDao.selectAllStudent(student);
    }

    @Override
    public Student selectStudentById(int id) {
       return studentDao.selectStudentById(id);
    }

	@Override
	public List<Student> getAllStudentsWithSchool(Student student) throws Exception {
        student.setSchoolId(SessionUtil.getSchoolId());
		return studentDao.selectAllStudentsWithSchool(student);
	}

	private String genStudentId(String studentId){
        String  formattedNumber = "0001";
        if (studentId==null || studentId.equals("")){
            return formattedNumber;
        }
        int tmpStudentId = Integer.valueOf(studentId);

         formattedNumber = String.format("%04d", tmpStudentId+1);
        return  formattedNumber;
    }

}
