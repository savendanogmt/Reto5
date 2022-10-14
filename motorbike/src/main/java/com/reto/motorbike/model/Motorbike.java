package com.reto.motorbike.model;

import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.*;

@Entity
@Table(name = "motorbike")
@Getter
@Setter
public class Motorbike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Integer id;
    private String name;
    private String brand;
    @Column(name = "years")
    private Integer year;
    private String description;

    @ManyToOne
    @JoinColumn(name = "categoryId")
    @JsonIgnoreProperties("motorbikes")
    private Category category;

    @OneToMany(cascade = { CascadeType.PERSIST }, mappedBy = "motorbike")
    @JsonIgnoreProperties({ "motorbike", "client" })
    private List<Message> messages;

    @OneToMany(cascade = { CascadeType.PERSIST }, mappedBy = "motorbike")
    @JsonIgnoreProperties({ "motorbike", "messages" })
    public List<Reservation> reservations;

}
