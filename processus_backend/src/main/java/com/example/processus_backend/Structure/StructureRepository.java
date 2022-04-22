package com.example.processus_backend.Structure;

import com.example.processus_backend.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface StructureRepository extends JpaRepository<Structure,Long> {
    @Query("select u from Structure u where u.structureId = ?1")
    public Structure findBySturctureId(Long Id );
    @Query("select u from Structure u where u.name= ?1")
    public Structure findByname(String name);
    public Boolean existsByName(String name);
    @Query("select s.userList from Structure s where s.name=?1 ")
    public List<User> gettuser(String name);
    @Query("select new com.example.processus_backend.Structure.StructureNameAndID(s.structureId,s.name)  from Structure s ")
  /*  @Query("SELECT " +
            "    new com.path.to.SurveyAnswerStatistics(v.answer, COUNT(v)) " +
            "FROM " +
            "    Survey v " +
            "GROUP BY " +
            "    v.answer")*/
    public List<StructureNameAndID> getStructureNameAndID ();

    @Query("select s from Structure s where s.name=?1")
    List<Structure> findStuructureachat(String s);
}
