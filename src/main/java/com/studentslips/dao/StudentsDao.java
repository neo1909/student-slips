package com.studentslips.dao;

import com.studentslips.entities.Student;
import com.studentslips.entities.StudentSearch;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class StudentsDao {

    private final SqlSession sqlSession;

    public StudentsDao(SqlSession sqlSession) {
        this.sqlSession = sqlSession;
    }

    public List<Student> selectAllStudent(Student student) throws Exception {
        return this.sqlSession.selectList("selectAllStudent", student);
    }

    public Student selectStudentById(int id){
        return this.sqlSession.selectOne("selectStudentById",id);
    }

    public List<Student> selectAllStudentsWithSchool(Student student) throws Exception {
        return this.sqlSession.selectList("selectAllStudentsWithSchool", student);
    }

    public int insertStudent(Student student){
        return this.sqlSession.insert("insertStudent", student);
    }
    public int updateStudent(Student student){
        return this.sqlSession.update("updateStudent", student);
    }
    public int deleteStudentById(Student student){
        return this.sqlSession.delete("deleteStudentById", student);
    }

    public String selectMaxStudentId(int schoolId){
        return this.sqlSession.selectOne("selectMaxStudentId",schoolId);
    }

    public Student selectStudentExist(Student student){
        return this.sqlSession.selectOne("selectStudentExist",student);
    }

	public List<Student> getStudentsWithSchool(StudentSearch studentSearch) {
        return this.sqlSession.selectList("selectStudentsWithSchool", studentSearch);
	}
}
