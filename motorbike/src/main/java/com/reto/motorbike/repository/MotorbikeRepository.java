package com.reto.motorbike.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.reto.motorbike.model.Motorbike;
import com.reto.motorbike.repository.crud.MotorbikeCrudRepositoryInterfaz;

@Repository
public class MotorbikeRepository {

    @Autowired
    private MotorbikeCrudRepositoryInterfaz motorbikeCrudRepositoryInterfaz;

    public List<Motorbike> obtenerMotorbikeCompleta() {
        return (List<Motorbike>) motorbikeCrudRepositoryInterfaz.findAll();
    }

    public Optional<Motorbike> obtenerMotorbikeId(Integer id) {
        return motorbikeCrudRepositoryInterfaz.findById(id);
    }

    public Motorbike salvarMotorbike(Motorbike motorbike) {
        return motorbikeCrudRepositoryInterfaz.save(motorbike);
    }

    public void delete(Motorbike motorbike) {
        motorbikeCrudRepositoryInterfaz.delete(motorbike);
    }
}
