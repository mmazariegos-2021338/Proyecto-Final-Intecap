package com.example.intecap.controller;

import com.example.intecap.models.VentaModel;
import com.example.intecap.service.VentasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ventas")
public class VentasController {

    @Autowired
    private VentasService ventasService;

   
    @PostMapping("/guardar")
    public ResponseEntity<VentaModel> registrarVenta(@RequestBody VentaModel venta) {
        try {
            VentaModel nuevaVenta = ventasService.registrarVenta(venta);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevaVenta);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/reporte")
    public ResponseEntity<List<VentaModel>> obtenerReporteVentas() {
        try {
            List<VentaModel> reporteVentas = ventasService.obtenerReporteVentas();
            return ResponseEntity.ok(reporteVentas);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
