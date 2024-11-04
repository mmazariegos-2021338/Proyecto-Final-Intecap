package com.example.intecap.service;

import com.example.intecap.models.VentaModel;
import java.util.List;

public interface VentasService {
    VentaModel registrarVenta(VentaModel venta);
    List<VentaModel> obtenerReporteVentas();
}
