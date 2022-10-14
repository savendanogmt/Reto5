package com.reto.motorbike.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.reto.motorbike.model.Message;
import com.reto.motorbike.repository.crud.MessageCrudRepositoryInterfaz;

@Repository
public class MessageRepository {

    @Autowired
    private MessageCrudRepositoryInterfaz messageCrudRepositoryInterfaz;

    public List<Message> obtenerMessageCompleta() {
        return (List<Message>) messageCrudRepositoryInterfaz.findAll();
    }

    public Optional<Message> obtenerMessageId(Integer id) {
        return messageCrudRepositoryInterfaz.findById(id);
    }

    public Message salvarMessage(Message message) {
        return messageCrudRepositoryInterfaz.save(message);
    }

    public void delete(Message message) {
        messageCrudRepositoryInterfaz.delete(message);
    }
}
