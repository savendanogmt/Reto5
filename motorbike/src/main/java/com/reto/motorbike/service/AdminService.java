package com.reto.motorbike.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reto.motorbike.model.Admin;
import com.reto.motorbike.repository.AdminRepository;

@Service
public class AdminService {

    @Autowired
    public AdminRepository adminRepository;

    public List<Admin> obtenerAdminCompleta() {
        return adminRepository.obtenerAdminCompleta();

    }

    public Optional<Admin> obtenerAdminId(Integer id) {
        return adminRepository.obtenerAdminId(id);
    }

    public Admin salvarAdmin(Admin admin) {
        if (admin.getIdAdmin() == null) {
            return adminRepository.salvarAdmin(admin);
        } else {
            Optional<Admin> adminAuxiliar = adminRepository.obtenerAdminId(admin.getIdAdmin());
            if (adminAuxiliar.isEmpty()) {
                return adminRepository.salvarAdmin(admin);
            } else {
                return admin;
            }
        }

    }

    public Admin updateAdmin(Admin admin) {
        if (admin.getIdAdmin() != null) {
            Optional<Admin> e = adminRepository.obtenerAdminId(admin.getIdAdmin());
            if (!e.isEmpty()) {
                if (admin.getName() != null) {
                    e.get().setName(admin.getName());
                }
                if (admin.getPassword() != null) {
                    e.get().setPassword(admin.getPassword());
                }
                if (admin.getEmail() != null) {
                    e.get().setEmail(admin.getEmail());
                }
                adminRepository.salvarAdmin(e.get());
                return e.get();
            } else {
                return admin;
            }
        } else {
            return admin;
        }
    }

    public boolean deleteAdmin(int id) {
        Boolean d = obtenerAdminId(id).map(admin -> {
            adminRepository.delete(admin);
            return true;

        }).orElse(false);
        return d;
    }
}
