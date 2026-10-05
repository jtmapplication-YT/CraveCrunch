-- Seed the first ~50 hand-picked Winnipeg spots (from data/winnipeg-gems-starter.csv in the project files).
-- Every spot is unverified: coordinates are approximate neighbourhood centres until each one is checked
-- (Google Places), so distances are rough. Vibes map the list's emoji to the app's vibe ids.

alter table restaurants
  add column if not exists address text,
  add column if not exists neighbourhood text,
  add column if not exists city text not null default 'Winnipeg',
  add column if not exists blurb text,          -- one line on why it's worth the trip
  add column if not exists rating numeric(2, 1),
  add column if not exists review_count integer,
  add column if not exists curated boolean not null default false;  -- on the team's hand-picked gem list

-- What the apps read: one row per spot with plain lat/lng and its vibes.
create or replace view restaurant_cards with (security_invoker = true) as
select
  r.id, r.place_id, r.name, r.cuisine, r.price_level, r.is_chain, r.verified, r.curated,
  r.address, r.neighbourhood, r.city, r.blurb, r.rating, r.review_count,
  st_y(r.location::geometry) as lat,
  st_x(r.location::geometry) as lng,
  coalesce(array_agg(v.vibe order by v.votes desc, v.vibe) filter (where v.vibe is not null), '{}') as vibes
from restaurants r
left join restaurant_vibes v on v.restaurant_id = r.id
group by r.id;

grant select on restaurant_cards to anon, authenticated;

with seed (name, address, neighbourhood, cuisine, price_level, lat, lng, blurb, vibes) as (values
  ('VJ''s Drive Inn', '170 Main St', 'Downtown / The Forks', array['burgers', 'fries'], 1, 49.8889, -97.1349,
   'Takeout-only shack since 1958, famous chili cheeseburgers', array['street', 'late-night']),
  ('Mitzi''s Chicken Finger Restaurant', '250 St Mary Ave', 'Downtown', array['chicken fingers', 'chinese-canadian'], 1, 49.8951, -97.1384,
   'Local institution for honey-garlic chicken fingers', array['cozy', 'big-group']),
  ('Kum-Koon Garden', '257 King St', 'Chinatown', array['dim sum'], 2, 49.9003, -97.1386,
   'Long-running Chinatown dim sum hall', array['big-group', 'cozy']),
  ('Feast Café Bistro', '587 Ellice Ave', 'West End', array['first nations'], 2, 49.8975, -97.165,
   'Indigenous cooking; bannock pizza and Indian tacos', array['cozy', 'big-group']),
  ('Falafel Place', '1101 Corydon Ave', 'Corydon', array['middle eastern'], 1, 49.868, -97.158,
   'Open since 1986, famous breakfast and falafel', array['healthy', 'light', 'street']),
  ('King + Bannatyne', '100 King St', 'Exchange District', array['sandwiches'], 2, 49.899, -97.139,
   'Counter-service slow-roasted meat sandwiches', array['street']),
  ('Máquè', '909 Dorchester Ave', 'Crescentwood', array['pan-asian small plates'], 2, 49.869, -97.162,
   'Steamed buns and noodles, small and buzzy', array['spicy', 'date-night', 'drinks']),
  ('deer + almond', '85 Princess St', 'Exchange District', array['chef-driven fusion'], 3, 49.899, -97.139,
   'Inventive shared plates, date-night spot', array['date-night', 'drinks']),
  ('Segovia', '484 Stradbrook Ave', 'Osborne Village', array['spanish tapas'], 3, 49.878, -97.144,
   'Creative tapas in a converted house', array['date-night', 'drinks', 'late-night']),
  ('Enoteca', '1480 Corydon Ave', 'Corydon', array['small plates', 'wine'], 3, 49.868, -97.158,
   'Artful rotating small plates', array['date-night', 'drinks']),
  ('Clementine Café', '123 Princess St', 'Exchange District', array['brunch'], 2, 49.899, -97.139,
   'Fried chicken on toast; basement brunch spot', array['cozy', 'sweet']),
  ('White Star Diner', '258 Kennedy St', 'Downtown', array['diner', 'burgers'], 1, 49.8951, -97.1384,
   'Tiny counter diner, cheap and fast', array['street', 'cozy']),
  ('2 Kelly''s Café', '81 Garry St', 'Downtown', array['breakfast diner'], 1, 49.8951, -97.1384,
   'Classic cheap breakfast downtown', array['cozy']),
  ('WanaBees Diner', '639 Broadway', 'West Broadway', array['diner'], 1, 49.8865, -97.155,
   'Neighbourhood diner, eggs benny', array['cozy']),
  ('Kendel''s Diner', '1157 McLeod Ave', 'East Kildonan', array['diner'], 1, 49.93, -97.09,
   'Old-school early breakfast', array['cozy']),
  ('Red Top Drive Inn', '219 St Mary''s Rd', 'St Vital', array['greek diner'], 1, 49.835, -97.11,
   'Retro drive-inn since the 1960s', array['cozy', 'big-group']),
  ('Olympia Diner', '3253 Portage Ave', 'St James / Westwood', array['greek diner'], 2, 49.889, -97.27,
   'Greek ribs with lathorigani', array['big-group']),
  ('The Diner''s Grill', '405 Turenne St', 'St Boniface', array['diner'], 1, 49.889, -97.117,
   'Signature Reuben', array['cozy']),
  ('The Nook Diner', '43 Sherbrook St', 'Wolseley edge', array['diner'], 1, 49.883, -97.168,
   'Small breakfast diner', array['cozy']),
  ('Johnny''s Marion Restaurant', '382 Marion St', 'Norwood', array['greek-canadian diner'], 1, 49.877, -97.114,
   'Neighbourhood breakfast staple', array['cozy', 'big-group']),
  ('Dave and LaVerne''s Modern Diner', '15 Lakewood Blvd', 'St Vital', array['smash burgers'], 2, 49.835, -97.11,
   'Oklahoma smash burger', array['street']),
  ('Marion Street Eatery', '393 Marion St', 'Norwood', array['comfort food'], 2, 49.877, -97.114,
   'Cinnamon bannock, pretzel mac and cheese', array['cozy', 'sweet']),
  ('Ha Long Bay Restaurant', '772 Notre Dame Ave', 'West End', array['vietnamese'], 1, 49.8975, -97.165,
   'Top-rated cheap pho', array['cozy', 'spicy']),
  ('Watt Street Bistro', '710 Watt St', 'Elmwood', array['vietnamese'], 1, 49.915, -97.105,
   'Neighbourhood Vietnamese favourite', array['cozy', 'light']),
  ('Pho Kim Tuong', '856 Ellice Ave', 'West End', array['vietnamese'], 1, 49.8975, -97.165,
   'West End pho counter', array['cozy', 'spicy']),
  ('Super Boy''s', '1480 Main St', 'North End', array['greek burgers'], 1, 49.92, -97.145,
   'North End burger joint', array['street', 'late-night']),
  ('George''s Burgers & Submarines', '1141 St Mary''s Rd', 'St Vital', array['burgers', 'subs'], 1, 49.835, -97.11,
   'Old-school burger and sub shop', array['street']),
  ('Les Saj', '1038 St James St', 'St James', array['lebanese'], 1, 49.89, -97.24,
   'Saj wraps baked to order', array['street', 'light']),
  ('Yafa Café', '1785 Portage Ave', 'St James', array['middle eastern street food'], 1, 49.89, -97.24,
   'Shawarma and falafel', array['street', 'spicy']),
  ('Seine River Café', 'A-390 Provencher Blvd', 'St Boniface', array['café'], 1, 49.889, -97.117,
   'Francophone-quarter café', array['cozy', 'sweet']),
  ('Danny''s All-Day Breakfast and Brunch', '152-1 Forks Market Rd', 'The Forks', array['breakfast'], 2, 49.8873, -97.1306,
   'All-day breakfast stall at The Forks', array['cozy', 'big-group']),
  ('Gunn''s Bakery', '247 Selkirk Ave', 'North End', array['jewish bakery'], 1, 49.92, -97.145,
   'North End bakery since 1937, bagels and pastries', array['sweet']),
  ('Tall Grass Prairie Bread Co.', '859 Westminster Ave', 'Wolseley', array['bakery'], 1, 49.882, -97.175,
   'Local-grain bakery, cinnamon buns', array['sweet', 'healthy']),
  ('Bermax Caffé', '1001 Corydon Ave', 'Corydon', array['portuguese / italian café'], 1, 49.868, -97.158,
   'Neighbourhood café with paninis', array['cozy', 'light']),
  ('Sargent Sundae', '984 Sargent Ave', 'West End', array['ice cream'], 1, 49.8975, -97.165,
   'Old-school soft serve stand', array['sweet', 'late-night']),
  ('Bridge Drive-In (BDI)', '766 Jubilee Ave', 'Riverview', array['ice cream'], 1, 49.863, -97.138,
   'Summer-only riverside ice cream shack', array['sweet']),
  ('Bonfire Bistro', '1433 Corydon Ave', 'Corydon', array['wood-fired pizza'], 2, 49.868, -97.158,
   'Wood-oven pizza, laid-back', array['cozy', 'big-group', 'drinks']),
  ('Pizzeria Gusto', '596 Wardlaw Ave', 'Osborne Village', array['italian pizza'], 2, 49.878, -97.144,
   'Neapolitan-style pizza in a small room', array['date-night', 'drinks']),
  ('Peasant Cookery', '283 Bannatyne Ave', 'Exchange District', array['french-canadian'], 3, 49.899, -97.139,
   'Rustic French bistro', array['date-night', 'drinks', 'cozy']),
  ('Sous Sol', '222 Osborne St', 'Osborne Village', array['french small plates'], 3, 49.878, -97.144,
   'Candlelit basement bistro', array['date-night', 'late-night', 'drinks']),
  ('Thom Bargain', '64 Sherbrook St', 'West Broadway', array['gastropub'], 2, 49.8865, -97.155,
   'Pub food with a Winnipeg twist', array['drinks', 'big-group']),
  ('Dwarf No Cafe', '1095 St Mary''s Rd? (verify)', 'St Vital', array['korean'], 1, 49.835, -97.11,
   'Small Korean café, verify location', array['cozy', 'spicy']),
  ('Wasabi Sabi', '3-1 Forks Market Rd? (verify)', 'The Forks', array['sushi'], 2, 49.8873, -97.1306,
   'Creative sushi rolls', array['light', 'date-night']),
  ('Kawaii Crepe', 'Village / Exchange (verify)', 'Osborne Village', array['japanese crepes'], 1, 49.878, -97.144,
   'Sweet and savoury crepes', array['sweet', 'light']),
  ('Bernstein''s Deli', '1700 Corydon Ave', 'River Heights', array['jewish deli'], 2, 49.861, -97.18,
   'Montreal-style smoked meat', array['big-group']),
  ('Oscar''s Deli', '175 Hargrave St', 'Downtown', array['jewish deli'], 1, 49.8951, -97.1384,
   'Downtown corned beef counter', array['street']),
  ('Boon Burger Café', '79 Sherbrook St', 'Wolseley', array['vegan burgers'], 2, 49.882, -97.175,
   'Local vegan burger chain, few locations', array['healthy', 'light']),
  ('Brazen Hall Kitchen & Brewery', '800 Pembina Hwy', 'Fort Garry', array['brewpub'], 2, 49.815, -97.15,
   'House-brewed beer and gastropub food', array['drinks', 'big-group']),
  ('Forth', '171 McDermot Ave', 'Exchange District', array['café', 'cocktails'], 2, 49.899, -97.139,
   'Café, gallery and rooftop bar in one', array['drinks', 'date-night']),
  ('Simon''s Steaks', 'Forks Market Rd', 'The Forks', array['steak sandwiches'], 2, 49.8873, -97.1306,
   'Forks Market stall', array['street'])
),
inserted as (
  insert into restaurants (name, address, neighbourhood, cuisine, price_level, location, blurb, curated)
  select s.name, s.address, s.neighbourhood, s.cuisine, s.price_level,
         st_setsrid(st_makepoint(s.lng, s.lat), 4326)::geography, s.blurb, true
  from seed s
  where not exists (select 1 from restaurants r where r.name = s.name and r.city = 'Winnipeg')
  returning id, name
)
insert into restaurant_vibes (restaurant_id, vibe)
select i.id, unnest(s.vibes)
from inserted i
join seed s on s.name = i.name;
