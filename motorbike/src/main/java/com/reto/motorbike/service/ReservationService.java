package com.reto.motorbike.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reto.motorbike.model.Reservation;
import com.reto.motorbike.repository.ReservationRepository;

@Service
public class ReservationService {

    @Autowired
    public ReservationRepository reservationRepository;

    public List<Reservation> obtenerReservationCompleta() {
        return reservationRepository.obtenerReservationCompleta();

    }

    public Optional<Reservation> obtenerReservationId(Integer id) {
        return reservationRepository.obtenerReservationId(id);
    }

    public Reservation salvarReservation(Reservation reservation) {
        if (reservation.getIdReservation() == null) {
            return reservationRepository.salvarReservation(reservation);
        } else {
            Optional<Reservation> reservationAuxiliar = reservationRepository
                    .obtenerReservationId(reservation.getIdReservation());
            if (reservationAuxiliar.isEmpty()) {
                return reservationRepository.salvarReservation(reservation);
            } else {
                return reservation;
            }
        }

    }

    public Reservation updateReservation(Reservation reservation) {
        if (reservation.getIdReservation() != null) {
            Optional<Reservation> e = reservationRepository.obtenerReservationId(reservation.getIdReservation());
            if (!e.isEmpty()) {
                if (reservation.getStartDate() != null) {
                    e.get().setStartDate(reservation.getStartDate());
                }
                if (reservation.getDevolutionDate() != null) {
                    e.get().setDevolutionDate(reservation.getDevolutionDate());
                }
                if (reservation.getStatus() != null) {
                    e.get().setStatus(reservation.getStatus());
                }

                reservationRepository.salvarReservation(e.get());
                return e.get();
            } else {
                return reservation;
            }
        } else {
            return reservation;
        }
    }

    public boolean deleteReservation(int id) {
        Boolean d = obtenerReservationId(id).map(reservation -> {
            reservationRepository.delete(reservation);
            return true;

        }).orElse(false);
        return d;
    }
}
