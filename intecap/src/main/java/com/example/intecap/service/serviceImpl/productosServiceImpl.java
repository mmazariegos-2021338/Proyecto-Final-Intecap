package com.example.intecap.service.serviceImpl;

import java.util.Optional;

import com.example.intecap.common.CommonSvcImpl;
import com.example.intecap.models.productosModel;
import com.example.intecap.repository.productosRepository;
import com.example.intecap.service.productosService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class productosServiceImpl extends CommonSvcImpl<productosModel, productosRepository> implements productosService {

    @Autowired
    private productosRepository productoRepository;

    @Override
    public Iterable<productosModel> findAll() {
        return productoRepository.findAll();
    }

    @Override
    public Optional<productosModel> findById(int id) {
        return productoRepository.findById(id);
    }

    @Override
    public productosModel save(productosModel entity) {
        return productoRepository.save(entity);
    }

    @Override
    public void deleteById(int id) {
        productoRepository.deleteById(id);
    }

    @Override
    public Iterable<productosModel> saveAll(Iterable<productosModel> entities) {
        return productoRepository.saveAll(entities);
    }

    
   

    @Override
    public productosModel update(productosModel entity, int id) {
        return productoRepository.findById(id)
            .map(existingProducto -> {
                existingProducto.setNombre(entity.getNombre());
                existingProducto.setPrecio(entity.getPrecio());
                existingProducto.setStock(entity.getStock());
                return productoRepository.save(existingProducto);
            })
            .orElseThrow(() -> new RuntimeException("Producto no encontrado con el ID: " + id));
    }
    
    

}
