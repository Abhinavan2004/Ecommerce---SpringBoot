package com.example.Backend.Model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class P_Model {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer p_id;
    private String p_name ;
    private String p_desc ;
    private String p_brand ;
    private BigDecimal price ;
    private String category ;
    @JsonFormat(shape = JsonFormat.Shape.STRING , pattern ="dd-MM-yyyy")
    private Date date ;
    private boolean available ;
    private int quantity ;
    private String imageName ;
    private String imageType;
    @Lob // fullform is :-> Long Object
    private byte[] imageDate ;


}
