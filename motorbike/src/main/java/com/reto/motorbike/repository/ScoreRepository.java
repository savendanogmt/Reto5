package com.reto.motorbike.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.reto.motorbike.model.Score;
import com.reto.motorbike.repository.crud.ScoreCrudRepositoryInterfaz;

@Repository
public class ScoreRepository {

    @Autowired
    private ScoreCrudRepositoryInterfaz scoreCrudRepositoryInterfaz;

    public List<Score> obtenerScoreCompleta() {
        return (List<Score>) scoreCrudRepositoryInterfaz.findAll();
    }

    public Optional<Score> obtenerScoreId(Integer id) {
        return scoreCrudRepositoryInterfaz.findById(id);
    }

    public Score salvarScore(Score score) {
        return scoreCrudRepositoryInterfaz.save(score);
    }

    public void delete(Score score) {
        scoreCrudRepositoryInterfaz.delete(score);
    }
}
