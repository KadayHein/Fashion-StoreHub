package com.gdc.backend.outfitHub.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.gdc.backend.outfitHub.dao.PicRefDao;
import com.gdc.backend.outfitHub.ds.PicRefDTO;
import com.gdc.backend.outfitHub.entities.PicRef;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PicRefService {
	
	private final PicRefDao picRefdao;
	
	public List<PicRefDTO> eventSliders() {
		List<PicRefDTO> list = new ArrayList<>();
		picRefdao.findAll(eventSpec())
			.stream().forEach(entity -> {
			var dto = new PicRefDTO();
			BeanUtils.copyProperties(entity, dto);
			list.add(dto);
		});
		return list;
	}
	
	public List<PicRefDTO> trendings(){
		List<PicRefDTO> list = new ArrayList<>();
		picRefdao.findAll(trendSpec())
			.stream().forEach(entity -> {
			var dto = new PicRefDTO();
			BeanUtils.copyProperties(entity, dto);
			list.add(dto);
		});
		return list;
	}
	
	private Specification<PicRef> eventSpec(){
		return (root,cq,cb) -> cb.equal(root.get("title").get("name"), "Event");
	}
	
	private Specification<PicRef> trendSpec(){
		return (root,cq,cb) -> cb.equal(root.get("title").get("name"), "Trend");
	}

}
