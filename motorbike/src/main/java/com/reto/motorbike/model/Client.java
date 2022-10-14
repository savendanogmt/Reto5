package com.reto.motorbike.model;

import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.*;

@Entity
@Table(name = "client")
@Getter
@Setter
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Integer idClient;
    private String email;
    private String password;
    private String name;
    private Integer age;

    @OneToMany(cascade = { CascadeType.PERSIST }, mappedBy = "client")
    @JsonIgnoreProperties("client")
    public List<Message> messages;

    @OneToMany(cascade = { CascadeType.PERSIST }, mappedBy = "client")
    @JsonIgnoreProperties("client")
    public List<Reservation> reservations;
}
