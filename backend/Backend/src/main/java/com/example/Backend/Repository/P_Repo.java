package com.example.Backend.Repository;

import com.example.Backend.Model.P_Model;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface P_Repo extends JpaRepository<P_Model, Integer> {

}
