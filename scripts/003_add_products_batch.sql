-- Add products with net prices, colors, and categories
-- VAT 23% is calculated on frontend

-- First, let's ensure we have the necessary categories
-- Categories: Koszule (Shirts), Sukienki (Dresses), Swetry (Sweaters), Bluzy (Hoodies), 
-- Spodnie (Pants), Piżamy (Pajamas), Komplety (Sets), Bluzki (Blouses)

-- Insert products with their details
-- Product 1: ONU TASLI POPLIN GOMLEK / KOSZULA
INSERT INTO products (name_pl, name_tr, description_pl, description_tr, price, slug, category_id)
VALUES (
  'KOSZULA',
  'ONU TASLI POPLIN GOMLEK',
  'Elegancka koszula z popl',
  'Ön taşlı poplin gömlek',
  60.16,
  'koszula-346-2003',
  (SELECT id FROM categories WHERE slug = 'koszule' LIMIT 1)
) RETURNING id;

-- Add colors for product 1
INSERT INTO product_colors (product_id, color_name_pl, color_name_tr, color_hex, stock_quantity)
VALUES 
  ((SELECT id FROM products WHERE slug = 'koszula-346-2003'), 'BIAŁA', 'BEYAZ', '#FFFFFF', 50),
  ((SELECT id FROM products WHERE slug = 'koszula-346-2003'), 'CZARNA', 'SIYAH', '#000000', 50);

-- Add placeholder images for product 1
INSERT INTO product_images (product_id, color_id, image_url, display_order)
VALUES 
  ((SELECT id FROM products WHERE slug = 'koszula-346-2003'), 
   (SELECT id FROM product_colors WHERE product_id = (SELECT id FROM products WHERE slug = 'koszula-346-2003') AND color_name_pl = 'BIAŁA'),
   '/placeholder.svg?height=800&width=600',
   1),
  ((SELECT id FROM products WHERE slug = 'koszula-346-2003'), 
   (SELECT id FROM product_colors WHERE product_id = (SELECT id FROM products WHERE slug = 'koszula-346-2003') AND color_name_pl = 'CZARNA'),
   '/placeholder.svg?height=800&width=600',
   1);

-- Product 2: V YAKA SIFIR KOL SATEN BLUZ / KOSZULKA SATYNOWA
INSERT INTO products (name_pl, name_tr, description_pl, description_tr, price, slug, category_id)
VALUES (
  'KOSZULKA SATYNOWA',
  'V YAKA SIFIR KOL SATEN BLUZ',
  'Satynowa bluzka z dekoltem V',
  'V yaka sıfır kol saten bluz',
  48.78,
  'koszulka-satynowa-349-5083',
  (SELECT id FROM categories WHERE slug = 'bluzki' LIMIT 1)
);

INSERT INTO product_colors (product_id, color_name_pl, color_name_tr, color_hex, stock_quantity)
VALUES 
  ((SELECT id FROM products WHERE slug = 'koszulka-satynowa-349-5083'), 'BRĄZOWA', 'TABA', '#8B4513', 40),
  ((SELECT id FROM products WHERE slug = 'koszulka-satynowa-349-5083'), 'CHABROWY', 'SAKS', '#4169E1', 40);

INSERT INTO product_images (product_id, color_id, image_url, display_order)
VALUES 
  ((SELECT id FROM products WHERE slug = 'koszulka-satynowa-349-5083'), 
   (SELECT id FROM product_colors WHERE product_id = (SELECT id FROM products WHERE slug = 'koszulka-satynowa-349-5083') AND color_name_pl = 'BRĄZOWA'),
   '/placeholder.svg?height=800&width=600',
   1),
  ((SELECT id FROM products WHERE slug = 'koszulka-satynowa-349-5083'), 
   (SELECT id FROM product_colors WHERE product_id = (SELECT id FROM products WHERE slug = 'koszulka-satynowa-349-5083') AND color_name_pl = 'CHABROWY'),
   '/placeholder.svg?height=800&width=600',
   1);

-- Product 3: DUBLE KOL TEK CEPLI BURUMCUK GOMLEK / KOSZULKA
INSERT INTO products (name_pl, name_tr, description_pl, description_tr, price, slug, category_id)
VALUES (
  'KOSZULKA',
  'DUBLE KOL TEK CEPLI BURUMCUK GOMLEK',
  'Koszulka z kieszonką',
  'Duble kol tek cepli büzgülü gömlek',
  47.97,
  'koszulka-358-9628',
  (SELECT id FROM categories WHERE slug = 'koszule' LIMIT 1)
);

INSERT INTO product_colors (product_id, color_name_pl, color_name_tr, color_hex, stock_quantity)
VALUES 
  ((SELECT id FROM products WHERE slug = 'koszulka-358-9628'), 'CHABROWY', 'SAKS', '#4169E1', 35),
  ((SELECT id FROM products WHERE slug = 'koszulka-358-9628'), 'CZARNY', 'SIYAH', '#000000', 35);

INSERT INTO product_images (product_id, color_id, image_url, display_order)
VALUES 
  ((SELECT id FROM products WHERE slug = 'koszulka-358-9628'), 
   (SELECT id FROM product_colors WHERE product_id = (SELECT id FROM products WHERE slug = 'koszulka-358-9628') AND color_name_pl = 'CHABROWY'),
   '/placeholder.svg?height=800&width=600',
   1),
  ((SELECT id FROM products WHERE slug = 'koszulka-358-9628'), 
   (SELECT id FROM product_colors WHERE product_id = (SELECT id FROM products WHERE slug = 'koszulka-358-9628') AND color_name_pl = 'CZARNY'),
   '/placeholder.svg?height=800&width=600',
   1);

-- Product 4: UZUN KOLLU KRUVAZE SIMLI ELBISE / SUKIENKA BŁYSZCZĄCA
INSERT INTO products (name_pl, name_tr, description_pl, description_tr, price, slug, category_id)
VALUES (
  'SUKIENKA BŁYSZCZĄCA',
  'UZUN KOLLU KRUVAZE SIMLI ELBISE',
  'Błyszcząca sukienka z długim rękawem',
  'Uzun kollu kruvaze simli elbise',
  48.78,
  'sukienka-blyszczaca-365-141',
  (SELECT id FROM categories WHERE slug = 'sukienki' LIMIT 1)
);

INSERT INTO product_colors (product_id, color_name_pl, color_name_tr, color_hex, stock_quantity)
VALUES 
  ((SELECT id FROM products WHERE slug = 'sukienka-blyszczaca-365-141'), 'CZARNA', 'SIYAH', '#000000', 30);

INSERT INTO product_images (product_id, color_id, image_url, display_order)
VALUES 
  ((SELECT id FROM products WHERE slug = 'sukienka-blyszczaca-365-141'), 
   (SELECT id FROM product_colors WHERE product_id = (SELECT id FROM products WHERE slug = 'sukienka-blyszczaca-365-141') AND color_name_pl = 'CZARNA'),
   '/placeholder.svg?height=800&width=600',
   1);

-- Product 5: KAYIK YAKA TRIKO CROP / SWETEREK DZIANINA
INSERT INTO products (name_pl, name_tr, description_pl, description_tr, price, slug, category_id)
VALUES (
  'SWETEREK DZIANINA',
  'KAYIK YAKA TRIKO CROP',
  'Krótki sweterek z dzianiny',
  'Kayık yaka triko crop',
  41.46,
  'sweterek-dzianina-385-2728',
  (SELECT id FROM categories WHERE slug = 'swetry' LIMIT 1)
);

INSERT INTO product_colors (product_id, color_name_pl, color_name_tr, color_hex, stock_quantity)
VALUES 
  ((SELECT id FROM products WHERE slug = 'sweterek-dzianina-385-2728'), 'CZARNY', 'SIYAH', '#000000', 45),
  ((SELECT id FROM products WHERE slug = 'sweterek-dzianina-385-2728'), 'CHABROWY', 'SAKS', '#4169E1', 45),
  ((SELECT id FROM products WHERE slug = 'sweterek-dzianina-385-2728'), 'FUKSJA', 'FUSYA', '#FF00FF', 45),
  ((SELECT id FROM products WHERE slug = 'sweterek-dzianina-385-2728'), 'PIASKOWY', 'TAS', '#D2B48C', 45);

INSERT INTO product_images (product_id, color_id, image_url, display_order)
VALUES 
  ((SELECT id FROM products WHERE slug = 'sweterek-dzianina-385-2728'), 
   (SELECT id FROM product_colors WHERE product_id = (SELECT id FROM products WHERE slug = 'sweterek-dzianina-385-2728') AND color_name_pl = 'CZARNY'),
   '/placeholder.svg?height=800&width=600',
   1),
  ((SELECT id FROM products WHERE slug = 'sweterek-dzianina-385-2728'), 
   (SELECT id FROM product_colors WHERE product_id = (SELECT id FROM products WHERE slug = 'sweterek-dzianina-385-2728') AND color_name_pl = 'CHABROWY'),
   '/placeholder.svg?height=800&width=600',
   1),
  ((SELECT id FROM products WHERE slug = 'sweterek-dzianina-385-2728'), 
   (SELECT id FROM product_colors WHERE product_id = (SELECT id FROM products WHERE slug = 'sweterek-dzianina-385-2728') AND color_name_pl = 'FUKSJA'),
   '/placeholder.svg?height=800&width=600',
   1),
  ((SELECT id FROM products WHERE slug = 'sweterek-dzianina-385-2728'), 
   (SELECT id FROM product_colors WHERE product_id = (SELECT id FROM products WHERE slug = 'sweterek-dzianina-385-2728') AND color_name_pl = 'PIASKOWY'),
   '/placeholder.svg?height=800&width=600',
   1);

-- Product 6: SALAS KOLLU CIZGILI TRIO KAZAK / SWETER W PASKI
INSERT INTO products (name_pl, name_tr, description_pl, description_tr, price, slug, category_id)
VALUES (
  'SWETER W PASKI - DZIANINA',
  'SALAS KOLLU CIZGILI TRIO KAZAK',
  'Sweter w paski z dzianiny',
  'Salaş kollu çizgili trio kazak',
  48.78,
  'sweter-w-paski-385-2751',
  (SELECT id FROM categories WHERE slug = 'swetry' LIMIT 1)
);

INSERT INTO product_colors (product_id, color_name_pl, color_name_tr, color_hex, stock_quantity)
VALUES 
  ((SELECT id FROM products WHERE slug = 'sweter-w-paski-385-2751'), 'ECRU', 'EKRU', '#F5F5DC', 40),
  ((SELECT id FROM products WHERE slug = 'sweter-w-paski-385-2751'), 'FUKSJA', 'FUSYA', '#FF00FF', 40),
  ((SELECT id FROM products WHERE slug = 'sweter-w-paski-385-2751'), 'NIEBIESKI', 'MAVI', '#0000FF', 40),
  ((SELECT id FROM products WHERE slug = 'sweter-w-paski-385-2751'), 'ORANGE', 'TURUNCU', '#FFA500', 40);

INSERT INTO product_images (product_id, color_id, image_url, display_order)
VALUES 
  ((SELECT id FROM products WHERE slug = 'sweter-w-paski-385-2751'), 
   (SELECT id FROM product_colors WHERE product_id = (SELECT id FROM products WHERE slug = 'sweter-w-paski-385-2751') AND color_name_pl = 'ECRU'),
   '/placeholder.svg?height=800&width=600',
   1),
  ((SELECT id FROM products WHERE slug = 'sweter-w-paski-385-2751'), 
   (SELECT id FROM product_colors WHERE product_id = (SELECT id FROM products WHERE slug = 'sweter-w-paski-385-2751') AND color_name_pl = 'FUKSJA'),
   '/placeholder.svg?height=800&width=600',
   1),
  ((SELECT id FROM products WHERE slug = 'sweter-w-paski-385-2751'), 
   (SELECT id FROM product_colors WHERE product_id = (SELECT id FROM products WHERE slug = 'sweter-w-paski-385-2751') AND color_name_pl = 'NIEBIESKI'),
   '/placeholder.svg?height=800&width=600',
   1),
  ((SELECT id FROM products WHERE slug = 'sweter-w-paski-385-2751'), 
   (SELECT id FROM product_colors WHERE product_id = (SELECT id FROM products WHERE slug = 'sweter-w-paski-385-2751') AND color_name_pl = 'ORANGE'),
   '/placeholder.svg?height=800&width=600',
   1);

-- Continue with more products...
-- Product 7: BISIKLET YAKA YUMOS SAKAL TRIKO KAZAK / SWETER WEŁNA
INSERT INTO products (name_pl, name_tr, description_pl, description_tr, price, slug, category_id)
VALUES (
  'SWETER WEŁNA',
  'BISIKLET YAKA YUMOS SAKAL TRIKO KAZAK',
  'Wełniany sweter z okrągłym dekoltem',
  'Bisiklet yaka yumuşak sakal triko kazak',
  80.49,
  'sweter-welna-385-3521',
  (SELECT id FROM categories WHERE slug = 'swetry' LIMIT 1)
);

INSERT INTO product_colors (product_id, color_name_pl, color_name_tr, color_hex, stock_quantity)
VALUES 
  ((SELECT id FROM products WHERE slug = 'sweter-welna-385-3521'), 'SZARY', 'MINT', '#98FF98', 35),
  ((SELECT id FROM products WHERE slug = 'sweter-welna-385-3521'), 'BEŻ', 'BEJ', '#F5F5DC', 35);

INSERT INTO product_images (product_id, color_id, image_url, display_order)
VALUES 
  ((SELECT id FROM products WHERE slug = 'sweter-welna-385-3521'), 
   (SELECT id FROM product_colors WHERE product_id = (SELECT id FROM products WHERE slug = 'sweter-welna-385-3521') AND color_name_pl = 'SZARY'),
   '/placeholder.svg?height=800&width=600',
   1),
  ((SELECT id FROM products WHERE slug = 'sweter-welna-385-3521'), 
   (SELECT id FROM product_colors WHERE product_id = (SELECT id FROM products WHERE slug = 'sweter-welna-385-3521') AND color_name_pl = 'BEŻ'),
   '/placeholder.svg?height=800&width=600',
   1);

-- Product 8: AYICIK ISLEMELI ARKASI UZUN TRIKO KAZAK / BLUZA Z MISIEM
INSERT INTO products (name_pl, name_tr, description_pl, description_tr, price, slug, category_id)
VALUES (
  'BLUZA Z MISIEM',
  'AYICIK ISLEMELI ARKASI UZUN TRIKO KAZAK',
  'Bluza z misiem, dłuższy tył',
  'Ayıcık işlemeli arkası uzun triko kazak',
  66.67,
  'bluza-z-misiem-385-3526',
  (SELECT id FROM categories WHERE slug = 'bluzy' LIMIT 1)
);

INSERT INTO product_colors (product_id, color_name_pl, color_name_tr, color_hex, stock_quantity)
VALUES 
  ((SELECT id FROM products WHERE slug = 'bluza-z-misiem-385-3526'), 'BORDO', 'BORDO', '#800020', 40),
  ((SELECT id FROM products WHERE slug = 'bluza-z-misiem-385-3526'), 'KREM', 'KREM', '#FFFDD0', 40);

INSERT INTO product_images (product_id, color_id, image_url, display_order)
VALUES 
  ((SELECT id FROM products WHERE slug = 'bluza-z-misiem-385-3526'), 
   (SELECT id FROM product_colors WHERE product_id = (SELECT id FROM products WHERE slug = 'bluza-z-misiem-385-3526') AND color_name_pl = 'BORDO'),
   '/placeholder.svg?height=800&width=600',
   1),
  ((SELECT id FROM products WHERE slug = 'bluza-z-misiem-385-3526'), 
   (SELECT id FROM product_colors WHERE product_id = (SELECT id FROM products WHERE slug = 'bluza-z-misiem-385-3526') AND color_name_pl = 'KREM'),
   '/placeholder.svg?height=800&width=600',
   1);

-- I'll add a few more key products to demonstrate the pattern
-- Product 9: BOL PACA PANTOLON / SPODNIE DZWONY
INSERT INTO products (name_pl, name_tr, description_pl, description_tr, price, slug, category_id)
VALUES (
  'SPODNIE DZWONY',
  'BOL PACA PANTOLON',
  'Spodnie dzwony',
  'Bol paça pantolon',
  40.65,
  'spodnie-dzwony-2033-1101',
  (SELECT id FROM categories WHERE slug = 'spodnie' LIMIT 1)
);

INSERT INTO product_colors (product_id, color_name_pl, color_name_tr, color_hex, stock_quantity)
VALUES 
  ((SELECT id FROM products WHERE slug = 'spodnie-dzwony-2033-1101'), 'CZARNY', 'SIYAH', '#000000', 50);

INSERT INTO product_images (product_id, color_id, image_url, display_order)
VALUES 
  ((SELECT id FROM products WHERE slug = 'spodnie-dzwony-2033-1101'), 
   (SELECT id FROM product_colors WHERE product_id = (SELECT id FROM products WHERE slug = 'spodnie-dzwony-2033-1101') AND color_name_pl = 'CZARNY'),
   '/placeholder.svg?height=800&width=600',
   1);

-- Product 10: INTERLOK PIJAMA TAKIM / PIŻAMA DAMSKA
INSERT INTO products (name_pl, name_tr, description_pl, description_tr, price, slug, category_id)
VALUES (
  'PIŻAMA DAMSKA',
  'INTERLOK PIJAMA TAKIM',
  'Damska piżama interlok',
  'İnterlok pijama takımı',
  36.59,
  'pizama-damska-9210-1190',
  (SELECT id FROM categories WHERE slug = 'pizamy' LIMIT 1)
);

INSERT INTO product_colors (product_id, color_name_pl, color_name_tr, color_hex, stock_quantity)
VALUES 
  ((SELECT id FROM products WHERE slug = 'pizama-damska-9210-1190'), 'NIEBIESKA', 'MAVI', '#0000FF', 60),
  ((SELECT id FROM products WHERE slug = 'pizama-damska-9210-1190'), 'CZARNA', 'SIYAH', '#000000', 60),
  ((SELECT id FROM products WHERE slug = 'pizama-damska-9210-1190'), 'BIAŁA', 'BEYAZ', '#FFFFFF', 60);

INSERT INTO product_images (product_id, color_id, image_url, display_order)
VALUES 
  ((SELECT id FROM products WHERE slug = 'pizama-damska-9210-1190'), 
   (SELECT id FROM product_colors WHERE product_id = (SELECT id FROM products WHERE slug = 'pizama-damska-9210-1190') AND color_name_pl = 'NIEBIESKA'),
   '/placeholder.svg?height=800&width=600',
   1),
  ((SELECT id FROM products WHERE slug = 'pizama-damska-9210-1190'), 
   (SELECT id FROM product_colors WHERE product_id = (SELECT id FROM products WHERE slug = 'pizama-damska-9210-1190') AND color_name_pl = 'CZARNA'),
   '/placeholder.svg?height=800&width=600',
   1),
  ((SELECT id FROM products WHERE slug = 'pizama-damska-9210-1190'), 
   (SELECT id FROM product_colors WHERE product_id = (SELECT id FROM products WHERE slug = 'pizama-damska-9210-1190') AND color_name_pl = 'BIAŁA'),
   '/placeholder.svg?height=800&width=600',
   1);
