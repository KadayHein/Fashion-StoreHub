package com.gdc.backend;

import java.time.LocalDate;
import java.util.Arrays;

import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

import com.gdc.backend.outfitHub.dao.CategoryDao;
import com.gdc.backend.outfitHub.dao.PicRefDao;
import com.gdc.backend.outfitHub.dao.TitleRefDao;
import com.gdc.backend.outfitHub.entities.Category;
import com.gdc.backend.outfitHub.entities.Genre;
import com.gdc.backend.outfitHub.entities.PicRef;
import com.gdc.backend.outfitHub.entities.Product;
import com.gdc.backend.outfitHub.entities.TitleRef;

import lombok.RequiredArgsConstructor;

@SpringBootApplication
@RequiredArgsConstructor
public class GadeiCoreBackendApplication {
	
	private final CategoryDao cateDao;
	private final TitleRefDao ttDao;
	private final PicRefDao prDao;
	

	public static void main(String[] args) {
		SpringApplication.run(GadeiCoreBackendApplication.class, args);
	}
	
	@Bean @Profile("dev")
	ApplicationRunner runner() {
	    return args -> {
 	        var c1 = new Category();
 	        c1.setName("Shirt");
 	        c1.setBannerImageUrl("shirt_banner.png");
 	        var c2 = new Category();
 	        c2.setName("Jean");
 	        c2.setBannerImageUrl("jean_banner.png");
 	        var c3 = new Category();
 	        c3.setName("Pants");
 	        var c4 = new Category();
 	        c4.setName("Blouse");
 	        var c5 = new Category();
 	        c5.setName("Sneaker");
 	        var c6 = new Category();
 	        c6.setName("Shoes");
	        
 	        var g1 = new Genre();
 	        g1.setCategory(c1);
 	        g1.setName("Collab");
	        
 	        var p1 = new Product("TSST001", "My Hero Academia", "as10.png", 3300, 50, 0,g1);
 	        var p2 = new Product("TSST002", "Kimetsu No Yaiba - Nezuko", "as2.png", 3200, 50, 0, g1);
 	        var p3 = new Product("TSST003", "Shingeki No Kyojin - Eren", "as3.png", 3250, 50, 0,g1);
 	        var p4 = new Product("TSST004", "Jujutsu Kaisen - Gojo", "as4.png", 2800, 50, 0,g1);
 	        var p5 = new Product("TSST005", "One Piece - Luffy", "as5.png", 3300, 50, 0,g1);
 	        var p6 = new Product("TSST006", "Naruto", "as6.png", 3500, 50, 0,g1);
 	        var p7 = new Product("TSST007", "Itachi", "as7.png", 3600, 50, 0,g1);
 	        var p8 = new Product("TSST008", "Naruto & Sasuke", "as8.png", 3400, 50, 0,g1);
 	        var p9 = new Product("TSST009", "Kimetsu No Yaiba - Duo Moon", "as9.png", 3200, 50, 0,g1);
	        
	        	        
 	        var g2 = new Genre();
 	        g2.setCategory(c1);
 	        g2.setName("Polo");
	        
 	        var p11 = new Product("TSPL001", "Polo Gray", "pl1.png", 4300, 50, 0, g2);
 	        var p12 = new Product("TSPL002", "Polo Navy", "pl2.png", 4300, 50, 0, g2);
 	        var p13 = new Product("TSPL003", "Polo White-Yellow", "pl3.png", 4300, 50, 0, g2);
 	        var p14 = new Product("TSPL004", "Polo White-Gray", "pl4.png", 4300, 50, 0, g2);
 	        
 	       var g20 = new Genre();
	        g20.setCategory(c1);
	        g20.setName("Tee-Sticker");
	        
 	        c1.addGenre(g1);
 	        c1.addGenre(g2);
 	        c1.addGenre(g20);
	        
 	        var g3 = new Genre();
 	        g3.setCategory(c2);
 	        g3.setName("Low-Rise");
	        
 	        var g4 = new Genre();
 	        g4.setCategory(c2);
 	        g4.setName("Jacket");
	        
 	        var p15 = new Product("JELR001","Baggy Wide Leg","baggy_wide_leg.png",3600,50,0,g3);
 	        var p16 = new Product("JELR002","Bootcut Flare","bootcut_flare.png",3600,50,0,g3);
 	        var p17 = new Product("JELR003","Straight","straight.png",3600,50,0,g3);
 	        var p18 = new Product("JELR004","Skinny","skinny.png",3600,50,0,g3);
 	        var p19 = new Product("JELR004","Jeanskirt","jeanskirt.png",3100,50,0,g3);
 	        g3.setProducts(Arrays.asList(p15,p16,p17,p18,p19));
	        
 	        var p20 = new Product("JEJK001","Jean Jacket","jacket.png",3600,50,0,g4);
 	        g4.setProducts(Arrays.asList(p20));

 	        c2.addGenre(g3);
 	        c2.addGenre(g4);
	    	        
 	        var event = new TitleRef("Event", LocalDate.now(), LocalDate.of(2026, 12, 31));
 	        var trend = new TitleRef("Trend", LocalDate.now(), LocalDate.of(2026, 12, 31));
	        
 	        var s1 = new PicRef(event, "slide1.png", null);
 	        var s2 = new PicRef(event, "slide2.png", null);
 	        var s3 = new PicRef(event, "slide3.png", null);
 	        var s4 = new PicRef(event, "slide4.png", null);
	        
 	        var t1 = new PicRef(trend, null, p7);
 	        var t2 = new PicRef(trend, null, p15);
 	        var t3 = new PicRef(trend, null, p20);
 	        var t4 = new PicRef(trend, null, p14);
 	        var t5 = new PicRef(trend, null, p9);
 	        var t6 = new PicRef(trend, null, p16);
 	        var t7 = new PicRef(trend, null, p12);
	        
// 	        //*************************************************************//
	        

            
             g1.setProducts(Arrays.asList(p1,p2,p20,p3,p4,p5,p6,p7,p8,p9));
 	        g2.setProducts(Arrays.asList(p11,p12,p13,p14));
	        
	        cateDao.saveAll(Arrays.asList(c1,c2,c3,c4,c5,c6));
	        prDao.saveAll(Arrays.asList(s1,s2,s3,s4,t1,t2,t3,t4,t5,t6,t7));
//            gameDao.saveAll(Arrays.asList(gi, mlbb, hi, pubg));
//            paymentDao.saveAll(Arrays.asList(kpay,wavepay,atom,ooredoo,visa,paypay,suica));
//            svdao.saveAll(Arrays.asList(sv1,sv2,sv3,sv4));

	        
	        
	        
	        
	        
	    };
	}

}
