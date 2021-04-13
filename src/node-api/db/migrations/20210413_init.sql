CREATE TYPE website_asset_type AS ENUM ('image', 'youtube');

CREATE TABLE websites (
  id serial primary key,
  title text,
  description text,
  asset_type website_asset_type,
  asset_url text,
  search_token tsvector
);

INSERT INTO websites (title, description, asset_type, asset_url) VALUES ('ShredAcademy', 'Free guitar learning resource that have things like lick of the week for some amazing techniques.', 'youtube', 'https://www.youtube.com/watch?v=5olxYUmumVc&ab_channel=ShredAcademy');
INSERT INTO websites (title, description, asset_type, asset_url) VALUES ('Justin Guitar', 'A guitar learning website that includes some free and paid guitar lessons.', 'image', 'https://jtgt-static.b-cdn.net/images/thumbnails/BGC.gif');
INSERT INTO websites (title, description, asset_type, asset_url) VALUES ('GuitarLessons', 'A free lessons on guitar. Not too bad given it is free!', 'youtube', 'https://www.youtube.com/watch?v=wWcnJGJeu4g&ab_channel=GuitarLessons');
UPDATE websites SET search_token = to_tsvector(title || ' ' || description);