package com.studentslips.dao;

import com.studentslips.entities.StudentsDebts;
import com.studentslips.entities.StudentsDebtsTask;
import com.studentslips.entities.TaskArchiveSearch;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class StudentDebtsDao {
    private final SqlSession sqlSession;

    public StudentDebtsDao(SqlSession sqlSession) {
        this.sqlSession = sqlSession;
    }

    public List<StudentsDebts> selectStudentDebts(StudentsDebts studentsDebts) throws Exception {
        return this.sqlSession.selectList("selectStudentDebts", studentsDebts);
    }
    public List<StudentsDebts> search(StudentsDebts studentsDebts) throws Exception {
        return this.sqlSession.selectList("search", studentsDebts);
    }

    public int insertStudentsDebts(StudentsDebts studentsDebts){
        return this.sqlSession.insert("insertStudentDebts", studentsDebts);
    }
    public int updateStudentsDebts(StudentsDebts studentsDebts){
        return this.sqlSession.update("updateStudentDebts", studentsDebts);
    }
    public int updateStudentDebtsPurpose(StudentsDebts studentsDebts){
        return this.sqlSession.update("updateStudentDebtsPurpose", studentsDebts);
    }
    public int deleteStudentsDebtsById(StudentsDebts studentsDebts){
        return this.sqlSession.delete("deleteStudentDebtsById", studentsDebts);
    }

    public List<StudentsDebts> searchTaskArchive(TaskArchiveSearch taskArchiveSearch) throws Exception {
        return this.sqlSession.selectList("selectAllStudentDebts", taskArchiveSearch);
    }

    public List<StudentsDebtsTask> searchTaskArchives(TaskArchiveSearch taskArchiveSearch) throws Exception {
        return this.sqlSession.selectList("searchTaskArchives", taskArchiveSearch);
    }

    public int insertTaskArchive(StudentsDebtsTask studentsDebtsTask){
        return this.sqlSession.insert("insertTaskArchive", studentsDebtsTask);
    }
    
	public int deleteTaskArchive(StudentsDebtsTask studentsDebtsTask) {
		return this.sqlSession.delete("deleteTaskArchive", studentsDebtsTask);
	}

	public int updateTaskArchive(StudentsDebtsTask studentsDebtsTask) {
		return this.sqlSession.update("updateTaskArchive", studentsDebtsTask);
	}

	public int countTaskArchive(TaskArchiveSearch taskArchiveSearch) {
		return this.sqlSession.selectOne("countTaskArchive", taskArchiveSearch);
	}
  public int selectStudentDebtsCntByReferenceNo(StudentsDebts studentsDebts){
        return this.sqlSession.selectOne("selectStudentDebtsCntByReferenceNo", studentsDebts);
   }

}
