package com.reto.motorbike.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reto.motorbike.model.Score;
import com.reto.motorbike.repository.ScoreRepository;

@Service
public class ScoreService {

    @Autowired
    public ScoreRepository scoreRepository;

    public List<Score> obtenerScoreCompleta() {
        return scoreRepository.obtenerScoreCompleta();

    }

    public Optional<Score> obtenerScoreId(Integer id) {
        return scoreRepository.obtenerScoreId(id);
    }

    public Score salvarScore(Score score) {
        if (score.getIdScore() == null) {
            return scoreRepository.salvarScore(score);
        } else {
            Optional<Score> scoreAuxiliar = scoreRepository.obtenerScoreId(score.getIdScore());
            if (scoreAuxiliar.isEmpty()) {
                return scoreRepository.salvarScore(score);
            } else {
                return score;
            }
        }

    }

    public Score updateScore(Score score) {
        if (score.getIdScore() != null) {
            Optional<Score> e = scoreRepository.obtenerScoreId(score.getIdScore());
            if (!e.isEmpty()) {
                if (score.getStars() != null) {
                    e.get().setStars(score.getStars());
                }
                if (score.getMessageText() != null) {
                    e.get().setMessageText(score.getMessageText());
                }

                scoreRepository.salvarScore(e.get());
                return e.get();
            } else {
                return score;
            }
        } else {
            return score;
        }
    }

    /*public boolean deleteScore(int id) {
        Boolean d = obtenerScoreId(id).map(score -> {
            scoreRepository.delete(score);
            return true;

        }).orElse(false);
        return d;
    }*/
}
