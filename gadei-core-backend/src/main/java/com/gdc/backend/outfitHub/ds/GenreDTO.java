package com.gdc.backend.outfitHub.ds;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class GenreDTO {
	private Long id;
    private String name;
    private Long category_id;
}
