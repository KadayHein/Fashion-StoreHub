package com.gdc.backend.outfitHub.ds;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@Data
@ToString
public class JwtRespDTO {
    private String token;
    private String token_type = "Bearer";
}

