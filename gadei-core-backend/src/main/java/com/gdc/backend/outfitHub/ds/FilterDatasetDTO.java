package com.gdc.backend.outfitHub.ds;

import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class FilterDatasetDTO {

    private List<FilterDTO> filterList;
    
}
