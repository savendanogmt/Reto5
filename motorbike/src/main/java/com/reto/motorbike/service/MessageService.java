package com.reto.motorbike.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reto.motorbike.model.Message;
import com.reto.motorbike.repository.MessageRepository;

@Service
public class MessageService {

    @Autowired
    public MessageRepository messageRepository;

    public List<Message> obtenerMessageCompleta() {
        return messageRepository.obtenerMessageCompleta();

    }

    public Optional<Message> obtenerMessageId(Integer id) {
        return messageRepository.obtenerMessageId(id);
    }

    public Message salvarMessage(Message message) {
        if (message.getIdMessage() == null) {
            return messageRepository.salvarMessage(message);
        } else {
            Optional<Message> messageAuxiliar = messageRepository.obtenerMessageId(message.getIdMessage());
            if (messageAuxiliar.isEmpty()) {
                return messageRepository.salvarMessage(message);
            } else {
                return message;
            }
        }

    }

    public Message updateMessage(Message message) {
        if (message.getIdMessage() != null) {
            Optional<Message> e = messageRepository.obtenerMessageId(message.getIdMessage());
            if (!e.isEmpty()) {
                if (message.getMessageText() != null) {
                    e.get().setMessageText(message.getMessageText());
                }

                messageRepository.salvarMessage(e.get());
                return e.get();
            } else {
                return message;
            }
        } else {
            return message;
        }
    }

    public boolean deleteMessage(int id) {
        Boolean d = obtenerMessageId(id).map(message -> {
            messageRepository.delete(message);
            return true;

        }).orElse(false);
        return d;
    }

}
