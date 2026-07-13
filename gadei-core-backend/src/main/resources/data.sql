-- TitleRef
INSERT INTO title_ref (syskey, name, valid_from, expire_at)
VALUES
(1,'Event','2026-01-01','2026-12-31'),
(2,'Trend','2026-01-01','2026-12-31');


-- Category
INSERT INTO category (id,name)
VALUES
(1,'T-Shirt'),
(2,'Jean'),
(3,'Pants'),
(4,'Blouse'),
(5,'Sneaker'),
(6,'Shoes');

-- Genre
INSERT INTO genre (id,name,category_id)
VALUES
(1,'Sticker',1),
(2,'Polo',1),
(3,'Low-Rise',2),
(4,'Jacket',2);

-- Product
INSERT INTO product
(id,code,name,image_url,price,quantity,discount,genre_id)
VALUES

(1,'TSST001','My Hero Academia','as10.png',3300,50,0,1),
(2,'TSST002','Kimetsu No Yaiba - Nezuko','as2.png',3200,50,0,1),
(3,'TSST003','Shingeki No Kyojin - Eren','as3.png',3250,50,0,1),
(4,'TSST004','Jujutsu Kaisen - Gojo','as4.png',2800,50,0,1),
(5,'TSST005','One Piece - Luffy','as5.png',3300,50,0,1),
(6,'TSST006','Naruto','as6.png',3500,50,0,1),
(7,'TSST007','Itachi','as7.png',3600,50,0,1),
(8,'TSST008','Naruto & Sasuke','as8.png',3400,50,0,1),
(9,'TSST009','Kimetsu No Yaiba - Duo Moon','as9.png',3200,50,0,1),

(10,'TSPL001','Polo Gray','pl1.png',4300,50,0,2),
(11,'TSPL002','Polo Navy','pl2.png',4300,50,0,2),
(12,'TSPL003','Polo White-Yellow','pl3.png',4300,50,0,2),
(13,'TSPL004','Polo White-Gray','pl4.png',4300,50,0,2),

(14,'JELR001','Baggy Wide Leg','baggy_wide_leg.png',3600,50,0,3),
(15,'JELR002','Bootcut Flare','bootcut_flare.png',3600,50,0,3),
(16,'JELR003','Straight','straight.png',3600,50,0,3),
(17,'JELR004','Skinny','skinny.png',3600,50,0,3),
(18,'JELR005','Jeanskirt','jeanskirt.png',3100,50,0,3),

(19,'JEJK001','Jean Jacket','jacket.png',3600,50,0,4);

-- PicRef
INSERT INTO pic_ref
(syskey,image_url,title_syskey,product_id)
VALUES

-- Event Slides
(1,'slide1.png',1,NULL),
(2,'slide2.png',1,NULL),
(3,'slide3.png',1,NULL),
(4,'slide4.png',1,NULL),

-- Trending Products
(5,NULL,2,7),
(6,NULL,2,14),
(7,NULL,2,19),
(8,NULL,2,13),
(9,NULL,2,9),
(10,NULL,2,15),
(11,NULL,2,11);