package com.reto.motorbike.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.reto.motorbike.model.Motorbike;
import com.reto.motorbike.service.MotorbikeService;

@RestController
@RequestMapping("/api/Motorbike")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE })
public class MotorbikeController {

    @Autowired
    private MotorbikeService motorbikeService;

    @GetMapping("/all")
    public List<Motorbike> obtenerMotorbikeCompleta() {
        return motorbikeService.obtenerMotorbikeCompleta();
    }

    @GetMapping("/{id}")
    public Optional<Motorbike> obtenerMotorbikeId(@PathVariable("id") Integer identificador) {
        return motorbikeService.obtenerMotorbikeId(identificador);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Motorbike salvarMotorbike(@RequestBody Motorbike motorbike) {
        return motorbikeService.salvarMotorbike(motorbike);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Motorbike update(@RequestBody Motorbike motorbike) {
        return motorbikeService.updateMotorbike(motorbike);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int id) {
        return motorbikeService.deleteMotorbike(id);
    }
}
