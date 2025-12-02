package com.example.Backend.Service;

import com.example.Backend.Model.P_Model;
import com.example.Backend.Repository.P_Repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class P_Service {

    @Autowired
    private P_Repo repo;

    public List<P_Model> getAllProducts() {
        return repo.findAll() ;

    }

    public P_Model getProduct(int id) {
        return repo.findById(id).orElse(new P_Model());
    }

    public Object addProduct(P_Model product, MultipartFile imageFile) throws IOException {
        product.setImageName(imageFile.getOriginalFilename());
        product.setImageType(imageFile.getContentType());
        product.setImageDate(imageFile.getBytes());
        return repo.save(product);
    }

    public P_Model updateProduct(int productId, P_Model product, MultipartFile imageFile) throws IOException{
        product.setImageDate(imageFile.getBytes());
        product.setImageName(imageFile.getOriginalFilename());
        product.setImageType(imageFile.getContentType());
        return repo.save(product);
    }

    public void deleteProduct(int productId) {
        repo.deleteById(productId);
    }
}
