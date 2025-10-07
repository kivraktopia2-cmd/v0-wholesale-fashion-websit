-- Delete existing data to start fresh
DELETE FROM public.products;
DELETE FROM public.subcategories;
DELETE FROM public.categories;

-- Re-insert categories (already in Polish)
INSERT INTO public.categories (name_pl, slug, display_order) VALUES
  ('Kolekcja Zimowa', 'zimowa', 1),
  ('Kolekcja Letnia', 'letnia', 2),
  ('Kolekcja Sezonowa', 'sezonowa', 3);

-- Re-insert subcategories for winter collection
INSERT INTO public.subcategories (category_id, name_pl, slug, display_order)
SELECT id, 'Sukienki', 'sukienki-zimowe', 1 FROM public.categories WHERE slug = 'zimowa'
UNION ALL
SELECT id, 'Spódnice', 'spodnice-zimowe', 2 FROM public.categories WHERE slug = 'zimowa'
UNION ALL
SELECT id, 'Bluzki', 'bluzki-zimowe', 3 FROM public.categories WHERE slug = 'zimowa'
UNION ALL
SELECT id, 'Swetry', 'swetry-zimowe', 4 FROM public.categories WHERE slug = 'zimowa'
UNION ALL
SELECT id, 'Płaszcze', 'plaszcze-zimowe', 5 FROM public.categories WHERE slug = 'zimowa';

-- Re-insert subcategories for summer collection
INSERT INTO public.subcategories (category_id, name_pl, slug, display_order)
SELECT id, 'Sukienki', 'sukienki-letnie', 1 FROM public.categories WHERE slug = 'letnia'
UNION ALL
SELECT id, 'Spódnice', 'spodnice-letnie', 2 FROM public.categories WHERE slug = 'letnia'
UNION ALL
SELECT id, 'Bluzki', 'bluzki-letnie', 3 FROM public.categories WHERE slug = 'letnia'
UNION ALL
SELECT id, 'Szorty', 'szorty-letnie', 4 FROM public.categories WHERE slug = 'letnia'
UNION ALL
SELECT id, 'Kombinezony', 'kombinezony-letnie', 5 FROM public.categories WHERE slug = 'letnia';

-- Re-insert subcategories for seasonal collection
INSERT INTO public.subcategories (category_id, name_pl, slug, display_order)
SELECT id, 'Sukienki', 'sukienki-sezonowe', 1 FROM public.categories WHERE slug = 'sezonowa'
UNION ALL
SELECT id, 'Spódnice', 'spodnice-sezonowe', 2 FROM public.categories WHERE slug = 'sezonowa'
UNION ALL
SELECT id, 'Bluzki', 'bluzki-sezonowe', 3 FROM public.categories WHERE slug = 'sezonowa'
UNION ALL
SELECT id, 'Kurtki', 'kurtki-sezonowe', 4 FROM public.categories WHERE slug = 'sezonowa'
UNION ALL
SELECT id, 'Spodnie', 'spodnie-sezonowe', 5 FROM public.categories WHERE slug = 'sezonowa';
