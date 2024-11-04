package com.example.intecap.repository;

import com.example.intecap.models.VentaModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VentaRepository extends JpaRepository<VentaModel, Integer> {
    
}
