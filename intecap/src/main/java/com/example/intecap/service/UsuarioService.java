package com.example.intecap.service;


import com.example.intecap.models.Usuario;
import java.util.Optional;

public interface UsuarioService {

    public Optional<Usuario> findByUsername(String username);
    public Usuario save(Usuario usuario);
}
