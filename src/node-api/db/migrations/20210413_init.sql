CREATE TYPE website_asset_type AS ENUM ('image', 'youtube');

CREATE TABLE websites (
  id serial primary key,
  title text,
  description text,
  url text,
  asset_type website_asset_type,
  asset_url text,
  search_token tsvector
);

CREATE TABLE tags (
  id serial primary key,
  tag_name text
);

CREATE TABLE website_tags (
  id serial primary key,
  website_id integer REFERENCES websites (id) ON DELETE CASCADE,
  tag_id integer REFERENCES tags (id) ON DELETE CASCADE
);

INSERT INTO tags (tag_name) VALUES ('free'), ('video'), ('freemium'), ('youtube'), ('fun'), ('community'), ('paid');

INSERT INTO websites (title, description, url, asset_type, asset_url) VALUES ('ShredAcademy', 'Free guitar learning resource that have things like lick of the week for some amazing techniques.', 'https://www.youtube.com/channel/UCl5ySO1__-4HmjvTL_xaevg', 'youtube', 'https://www.youtube.com/watch?v=5olxYUmumVc&ab_channel=ShredAcademy');
INSERT INTO website_tags (website_id, tag_id) (SELECT w.id, t.id FROM websites w CROSS JOIN tags t WHERE w.title='ShredAcademy' and t.tag_name='free');
INSERT INTO website_tags (website_id, tag_id) (SELECT w.id, t.id FROM websites w CROSS JOIN tags t WHERE w.title='ShredAcademy' and t.tag_name='community');
INSERT INTO website_tags (website_id, tag_id) (SELECT w.id, t.id FROM websites w CROSS JOIN tags t WHERE w.title='ShredAcademy' and t.tag_name='youtube');

INSERT INTO websites (title, description, url, asset_type, asset_url) VALUES ('Justin Guitar', 'A guitar learning website that includes some free and paid guitar lessons.', 'https://justinguitar.com/', 'image', 'https://jtgt-static.b-cdn.net/images/thumbnails/BGC.gif');
INSERT INTO website_tags (website_id, tag_id) (SELECT w.id, t.id FROM websites w CROSS JOIN tags t WHERE w.title='Justin Guitar' and t.tag_name='freemium');
INSERT INTO website_tags (website_id, tag_id) (SELECT w.id, t.id FROM websites w CROSS JOIN tags t WHERE w.title='Justin Guitar' and t.tag_name='paid');

INSERT INTO websites (title, description, url, asset_type, asset_url) VALUES ('GuitarLessons', 'A free lessons on guitar. Not too bad given it is free!', 'https://www.guitarlessons.com/', 'youtube', 'https://www.youtube.com/watch?v=wWcnJGJeu4g&ab_channel=GuitarLessons');
INSERT INTO website_tags (website_id, tag_id) (SELECT w.id, t.id FROM websites w CROSS JOIN tags t WHERE w.title='GuitarLessons' and t.tag_name='free');
INSERT INTO website_tags (website_id, tag_id) (SELECT w.id, t.id FROM websites w CROSS JOIN tags t WHERE w.title='GuitarLessons' and t.tag_name='youtube');
INSERT INTO website_tags (website_id, tag_id) (SELECT w.id, t.id FROM websites w CROSS JOIN tags t WHERE w.title='GuitarLessons' and t.tag_name='video');

INSERT INTO websites (title, description, url, asset_type, asset_url) VALUES ('Guitar World', 'A youtube channel with awesome community. There is a lot of stuffs here to learn.', 'https://www.youtube.com/channel/UCqHkFMEmOPFO3ahcrrBAj4w', 'youtube', 'https://www.youtube.com/watch?v=7u8-RTJkM_g&t=4s&ab_channel=GuitarWorld');
INSERT INTO website_tags (website_id, tag_id) (SELECT w.id, t.id FROM websites w CROSS JOIN tags t WHERE w.title='GuitarLessons' and t.tag_name='free');
INSERT INTO website_tags (website_id, tag_id) (SELECT w.id, t.id FROM websites w CROSS JOIN tags t WHERE w.title='GuitarLessons' and t.tag_name='youtube');
INSERT INTO website_tags (website_id, tag_id) (SELECT w.id, t.id FROM websites w CROSS JOIN tags t WHERE w.title='GuitarLessons' and t.tag_name='fun');

INSERT INTO websites (title, description, url, asset_type, asset_url) VALUES ('ArtistWorks', 'A school for guitarists. You subscribe and learn from some amazing instructors.', 'https://artistworks.com/', 'image', 'https://my.artistworks.com/sites/default/files/u189178/Dobro-Lesson_Blog.jpg');
INSERT INTO website_tags (website_id, tag_id) (SELECT w.id, t.id FROM websites w CROSS JOIN tags t WHERE w.title='ArtistWorks' and t.tag_name='paid');
INSERT INTO website_tags (website_id, tag_id) (SELECT w.id, t.id FROM websites w CROSS JOIN tags t WHERE w.title='ArtistWorks' and t.tag_name='freemium');

UPDATE websites SET search_token = to_tsvector(title || ' ' || description);