package com.example.intecap.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.intecap.models.productosModel;
import com.example.intecap.service.productosService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

@RestController
@RequestMapping("/productos")
@CrossOrigin
public class productosController {

    @Autowired
    private productosService productoService;

    @GetMapping("/listar")
    public Iterable<productosModel> getProductos() {
        return this.productoService.findAll();
    }

    @GetMapping("/buscar/{idProducto}")
    public ResponseEntity<productosModel> getProductoById(@PathVariable int idProducto) {
        Optional<productosModel> producto = productoService.findById(idProducto);
        return producto.isPresent() ? ResponseEntity.ok(producto.get()) : ResponseEntity.notFound().build();
    }

    @PostMapping("/guardar")
    public ResponseEntity<String> saveProducto(@RequestBody productosModel entity) {
        try {
            this.productoService.save(entity);
            return ResponseEntity.ok("Producto guardado correctamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error en el servidor");
        }
    }

    @DeleteMapping("/eliminar/{idProducto}")
    public ResponseEntity<String> deleteProducto(@PathVariable int idProducto) {
        try {
            productoService.deleteById(idProducto);
            return ResponseEntity.ok("Producto eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al eliminar el producto");
        }
    }

    @PutMapping("/actualizar/{idProducto}")
public ResponseEntity<String> updateProducto(@PathVariable int idProducto, @RequestBody productosModel entity) {
    try {
        productoService.update(entity, idProducto);
        return ResponseEntity.ok("Producto actualizado correctamente");
    } catch (Exception e) {
        return ResponseEntity.badRequest().body("Error al actualizar el producto: " + e.getMessage());
    }
}


}
