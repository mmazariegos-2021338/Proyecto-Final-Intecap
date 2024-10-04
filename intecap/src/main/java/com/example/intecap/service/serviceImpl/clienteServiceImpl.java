package com.example.intecap.service.serviceImpl;

import java.util.Optional;

import com.example.intecap.common.CommonSvcImpl;
import com.example.intecap.models.clientesModel;
import com.example.intecap.repository.clienteRepository;
import com.example.intecap.service.clientesService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class clienteServiceImpl extends CommonSvcImpl<clientesModel, clienteRepository> implements clientesService {
    @Override
    public void deleteById(int id) {
        this.repository.deleteById(id);
    }
 
    @Override
    public Iterable<clientesModel> findAll() {
        return this.repository.findAll();
    }
 
    @Override
    public Optional<clientesModel> findById(int id) {
        return this.repository.findById(id);
    }
 
    @Override
    public clientesModel save(clientesModel entity) {
        return this.repository.save(entity);
    }
 
    @Override
    public Iterable<clientesModel> saveAll(Iterable<clientesModel> entities) {
        return this.repository.saveAll(entities);
    }
 
    

    @Override
    public Iterable<clientesModel> finAll() {
       
        return null;
    }
    @Override
    public clientesModel findByNombre(clientesModel entity) {
        return this.repository.findByNombre(entity.getNombre());
    }

     @Autowired
    private clienteRepository clienteRepository;

    @Override
    public clientesModel update(clientesModel entity, int id) {
        return clienteRepository.findById(id)
            .map(existingCliente -> {
                existingCliente.setNombre(entity.getNombre());
                existingCliente.setApellido(entity.getApellido());
                return clienteRepository.save(existingCliente);
            })
            .orElseThrow(() -> new RuntimeException("Cliente no encontrado con el ID: " + id));
        
    }
    

   
}
