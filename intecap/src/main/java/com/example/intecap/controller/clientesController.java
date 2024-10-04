package com.example.intecap.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.intecap.models.clientesModel;
import com.example.intecap.service.clientesService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/clientes")
@CrossOrigin
public class clientesController {
    
    @Autowired
    private clientesService clienteService;

    @GetMapping("/listar")
    public Iterable<clientesModel> getClientes() {
        return this.clienteService.findAll(); // Corregido el método llamado
    }

    @PostMapping("/guardar")
    public ResponseEntity<String> saveClientes(@RequestBody clientesModel entity) {
        try {
            this.clienteService.save(entity);
            return ResponseEntity.ok("Cliente guardado correctamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error en el servidor");
        }
    }
   
    @DeleteMapping("/eliminar/{idCliente}")
public ResponseEntity<String> deleteCliente(@PathVariable int idCliente) {
    try {
        clienteService.deleteById(idCliente);
        return ResponseEntity.ok("Cliente eliminado correctamente");
    } catch (Exception e) {
        return ResponseEntity.badRequest().body("Error al eliminar el cliente");
    }
}

@PutMapping("/actualizar/{idCliente}")
public ResponseEntity<String> updateCliente(@PathVariable int idCliente, @RequestBody clientesModel entity) {
    try {
        clienteService.update(entity, idCliente);
        return ResponseEntity.ok("Cliente actualizado correctamente");
    } catch (Exception e) {
        return ResponseEntity.badRequest().body("Error al actualizar el cliente: " + e.getMessage());
    }
}


}
