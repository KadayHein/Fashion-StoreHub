package com.gdc.backend.outfitHub.api;
import java.util.List;

import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gdc.backend.outfitHub.ds.PicRefDTO;
import com.gdc.backend.outfitHub.services.PicRefService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class PicRefApi {
	private final PicRefService service;
	
	@QueryMapping
	public List<PicRefDTO> eventSliders(){
		return service.eventSliders();
	}
	
	@QueryMapping
	public List<PicRefDTO> trendings(){
		return service.trendings();
	}
}
