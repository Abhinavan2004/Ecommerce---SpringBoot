package com.example.Backend.Controller;

import com.example.Backend.Model.P_Model;
import com.example.Backend.Service.P_Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;


import java.io.IOException;
import java.sql.SQLOutput;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class P_Controller {

    @Autowired
    private P_Service service ;

    // for fetching all products
    @RequestMapping("/products")
    public ResponseEntity<List<P_Model>> getAllProducts(){
        return new ResponseEntity<>(service.getAllProducts() , HttpStatus.OK) ;
    }

    //for fetching a single product
    @GetMapping("/product/{id}")
    public ResponseEntity<P_Model> getProduct(@PathVariable int id){
        return new ResponseEntity<>(service.getProduct(id) , HttpStatus.OK);
    }


    @PostMapping("/product")
    public ResponseEntity<?> addProduct(
            @RequestPart("product") P_Model product,
            @RequestPart("imageFile") MultipartFile imageFile) {
        System.out.println(product);
        try{
            P_Model product_to_add = (P_Model) service.addProduct(product , imageFile);
            return new ResponseEntity<>(product_to_add , HttpStatus.CREATED);
    }
        catch(Exception e){
            return new ResponseEntity<>(e.getMessage() , HttpStatus.INTERNAL_SERVER_ERROR);
        }
        }


    @GetMapping("/product/{productId}/image")
    public ResponseEntity<byte[]> getImageByProductId(@PathVariable int productId) {

        P_Model product = service.getProduct(productId);
        byte[] imageFile = product.getImageDate();

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(product.getImageType()))
                .body(imageFile);

    }


    @PutMapping("/product/{productId}")
    public ResponseEntity<String> updateProduct(@PathVariable int productId , @RequestPart("product") P_Model product ,
                                                @RequestPart("imageFile") MultipartFile imageFile) throws IOException {
        P_Model product1 = service.updateProduct(productId , product , imageFile);
        if(product1 != null){
            return new ResponseEntity<>("Updated" , HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>("Failed on Update", HttpStatus.BAD_REQUEST);
        }
    }



    @DeleteMapping("/product/{productId}")
    public ResponseEntity<String> deleteProduct(@PathVariable int productId){
        P_Model product1 = service.getProduct(productId);
        if(product1 != null){
            service.deleteProduct(productId);
            return new ResponseEntity<>("Deleted" , HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>("Product Not Found" , HttpStatus.BAD_REQUEST);
        }


    }


}
