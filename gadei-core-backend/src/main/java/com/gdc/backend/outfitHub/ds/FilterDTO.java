package com.gdc.backend.outfitHub.ds;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class FilterDTO {

    private Long itemid;
    private String caption;
    private String fieldname;
    private String datatype;
    private String condition;
    private String value;
    private String value2;
}