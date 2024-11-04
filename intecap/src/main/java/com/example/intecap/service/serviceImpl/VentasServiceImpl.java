package com.example.intecap.service.serviceImpl;

import com.example.intecap.models.VentaModel;
import com.example.intecap.repository.VentaRepository;
import com.example.intecap.service.VentasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VentasServiceImpl implements VentasService {

    @Autowired
    private VentaRepository ventaRepository;

    @Override
    public VentaModel registrarVenta(VentaModel venta) {
        return ventaRepository.save(venta);
    }

    @Override
    public List<VentaModel> obtenerReporteVentas() {
        return ventaRepository.findAll();
    }
}
