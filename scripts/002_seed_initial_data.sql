-- Insert initial categories
insert into public.categories (name_pl, slug, display_order) values
  ('Kolekcja Zimowa', 'zimowa', 1),
  ('Kolekcja Letnia', 'letnia', 2),
  ('Kolekcja Sezonowa', 'sezonowa', 3);

-- Insert subcategories for winter collection
insert into public.subcategories (category_id, name_pl, slug, display_order)
select id, 'Sukienki', 'sukienki-zimowe', 1 from public.categories where slug = 'zimowa'
union all
select id, 'Spódnice', 'spodnice-zimowe', 2 from public.categories where slug = 'zimowa'
union all
select id, 'Bluzki', 'bluzki-zimowe', 3 from public.categories where slug = 'zimowa'
union all
select id, 'Swetry', 'swetry-zimowe', 4 from public.categories where slug = 'zimowa'
union all
select id, 'Płaszcze', 'plaszcze-zimowe', 5 from public.categories where slug = 'zimowa';

-- Insert subcategories for summer collection
insert into public.subcategories (category_id, name_pl, slug, display_order)
select id, 'Sukienki', 'sukienki-letnie', 1 from public.categories where slug = 'letnia'
union all
select id, 'Spódnice', 'spodnice-letnie', 2 from public.categories where slug = 'letnia'
union all
select id, 'Bluzki', 'bluzki-letnie', 3 from public.categories where slug = 'letnia'
union all
select id, 'Szorty', 'szorty-letnie', 4 from public.categories where slug = 'letnia'
union all
select id, 'Kombinezony', 'kombinezony-letnie', 5 from public.categories where slug = 'letnia';

-- Insert subcategories for seasonal collection
insert into public.subcategories (category_id, name_pl, slug, display_order)
select id, 'Sukienki', 'sukienki-sezonowe', 1 from public.categories where slug = 'sezonowa'
union all
select id, 'Spódnice', 'spodnice-sezonowe', 2 from public.categories where slug = 'sezonowa'
union all
select id, 'Bluzki', 'bluzki-sezonowe', 3 from public.categories where slug = 'sezonowa'
union all
select id, 'Kurtki', 'kurtki-sezonowe', 4 from public.categories where slug = 'sezonowa'
union all
select id, 'Spodnie', 'spodnie-sezonowe', 5 from public.categories where slug = 'sezonowa';
