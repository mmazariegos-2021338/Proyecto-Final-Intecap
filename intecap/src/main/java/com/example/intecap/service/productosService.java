package com.example.intecap.service;

import java.util.Optional;

import com.example.intecap.common.CommonSvc;
import com.example.intecap.models.productosModel;

public interface productosService extends CommonSvc<productosModel> {

    public Iterable<productosModel> findAll();
    public Optional<productosModel> findById(int id);
    public productosModel save(productosModel entity);
    public void deleteById(int id);
    public productosModel update(productosModel entity, int id);
    Iterable<productosModel> saveAll(Iterable<productosModel> entities);
}
