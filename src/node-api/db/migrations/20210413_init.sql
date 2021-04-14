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

-- to store which migration has been implemented in the DB
CREATE TABLE migrations (
  id serial primary key,
  migration_file text
);

INSERT INTO migrations (migration_file) VALUES ('20210413_init');

INSERT INTO tags (tag_name) VALUES ('free'), ('video'), ('freemium'), ('youtube'), ('fun'), ('community'), ('paid');

INSERT INTO websites (title, description, url, asset_type, asset_url) VALUES ('ShredAcademy', 'Free guitar learning resource that have things like lick of the week for some amazing techniques.', 'https://www.youtube.com/channel/UCl5ySO1__-4HmjvTL_xaevg', 'youtube', 'https://www.youtube.com/watch?v=5olxYUmumVc');
INSERT INTO website_tags (website_id, tag_id) (SELECT w.id, t.id FROM websites w CROSS JOIN tags t WHERE w.title='ShredAcademy' and t.tag_name='free');
INSERT INTO website_tags (website_id, tag_id) (SELECT w.id, t.id FROM websites w CROSS JOIN tags t WHERE w.title='ShredAcademy' and t.tag_name='community');
INSERT INTO website_tags (website_id, tag_id) (SELECT w.id, t.id FROM websites w CROSS JOIN tags t WHERE w.title='ShredAcademy' and t.tag_name='youtube');

INSERT INTO websites (title, description, url, asset_type, asset_url) VALUES ('Justin Guitar', 'A guitar learning website that includes some free and paid guitar lessons.', 'https://justinguitar.com/', 'image', 'https://jtgt-static.b-cdn.net/images/thumbnails/BGC.gif');
INSERT INTO website_tags (website_id, tag_id) (SELECT w.id, t.id FROM websites w CROSS JOIN tags t WHERE w.title='Justin Guitar' and t.tag_name='freemium');
INSERT INTO website_tags (website_id, tag_id) (SELECT w.id, t.id FROM websites w CROSS JOIN tags t WHERE w.title='Justin Guitar' and t.tag_name='paid');

INSERT INTO websites (title, description, url, asset_type, asset_url) VALUES ('GuitarLessons', 'A free lessons on guitar. Not too bad given it is free!', 'https://www.guitarlessons.com/', 'youtube', 'https://www.youtube.com/watch?v=wWcnJGJeu4g');
INSERT INTO website_tags (website_id, tag_id) (SELECT w.id, t.id FROM websites w CROSS JOIN tags t WHERE w.title='GuitarLessons' and t.tag_name='free');
INSERT INTO website_tags (website_id, tag_id) (SELECT w.id, t.id FROM websites w CROSS JOIN tags t WHERE w.title='GuitarLessons' and t.tag_name='youtube');
INSERT INTO website_tags (website_id, tag_id) (SELECT w.id, t.id FROM websites w CROSS JOIN tags t WHERE w.title='GuitarLessons' and t.tag_name='video');

INSERT INTO websites (title, description, url, asset_type, asset_url) VALUES ('Guitar World', 'A youtube channel with awesome community. There is a lot of stuffs here to learn.', 'https://www.youtube.com/channel/UCqHkFMEmOPFO3ahcrrBAj4w', 'youtube', 'https://www.youtube.com/watch?v=7u8-RTJkM_g');
INSERT INTO website_tags (website_id, tag_id) (SELECT w.id, t.id FROM websites w CROSS JOIN tags t WHERE w.title='Guitar World' and t.tag_name='free');
INSERT INTO website_tags (website_id, tag_id) (SELECT w.id, t.id FROM websites w CROSS JOIN tags t WHERE w.title='Guitar World' and t.tag_name='youtube');
INSERT INTO website_tags (website_id, tag_id) (SELECT w.id, t.id FROM websites w CROSS JOIN tags t WHERE w.title='Guitar World' and t.tag_name='fun');

INSERT INTO websites (title, description, url, asset_type, asset_url) VALUES ('ArtistWorks', 'A school for guitarists. You subscribe and learn from some amazing instructors.', 'https://artistworks.com/', 'image', 'https://my.artistworks.com/sites/default/files/u189178/Dobro-Lesson_Blog.jpg');
INSERT INTO website_tags (website_id, tag_id) (SELECT w.id, t.id FROM websites w CROSS JOIN tags t WHERE w.title='ArtistWorks' and t.tag_name='paid');
INSERT INTO website_tags (website_id, tag_id) (SELECT w.id, t.id FROM websites w CROSS JOIN tags t WHERE w.title='ArtistWorks' and t.tag_name='freemium');

INSERT INTO websites (title, description, url, asset_type, asset_url) VALUES ('Yousician', 'It boasts itself as the everything you need learn guitar in one app.', 'https://yousician.com/', 'image', 'https://assets.yousician.com/app/uploads/2021/03/16045742/learn-guitar-woman-cropped.jpg');
INSERT INTO website_tags (website_id, tag_id) (SELECT w.id, t.id FROM websites w CROSS JOIN tags t WHERE w.title='Yousician' and t.tag_name='paid');
INSERT INTO website_tags (website_id, tag_id) (SELECT w.id, t.id FROM websites w CROSS JOIN tags t WHERE w.title='Yousician' and t.tag_name='freemium');

INSERT INTO websites (title, description, url, asset_type, asset_url) VALUES ('GuitarTricks', 'Learn to play the best songs from favorite artists.', 'https://www.guitartricks.com/', 'image', 'https://www.guitartricks.com/assets/news_images/BlogJimiHendrixGuitarTechniques.png');
INSERT INTO website_tags (website_id, tag_id) (SELECT w.id, t.id FROM websites w CROSS JOIN tags t WHERE w.title='GuitarTricks' and t.tag_name='paid');
INSERT INTO website_tags (website_id, tag_id) (SELECT w.id, t.id FROM websites w CROSS JOIN tags t WHERE w.title='GuitarTricks' and t.tag_name='fun');

INSERT INTO websites (title, description, url, asset_type, asset_url) VALUES ('Andy Guitar', 'A youtube channel with more than 1.5Mil subscribers for learning guitar.', 'https://www.youtube.com/channel/UC9cvVvlvr-qBssphm1EdYGQ', 'youtube', 'https://www.youtube.com/watch?v=BBz-Jyr23M4');
INSERT INTO website_tags (website_id, tag_id) (SELECT w.id, t.id FROM websites w CROSS JOIN tags t WHERE w.title='Andy Guitar' and t.tag_name='free');
INSERT INTO website_tags (website_id, tag_id) (SELECT w.id, t.id FROM websites w CROSS JOIN tags t WHERE w.title='Andy Guitar' and t.tag_name='youtube');
INSERT INTO website_tags (website_id, tag_id) (SELECT w.id, t.id FROM websites w CROSS JOIN tags t WHERE w.title='Andy Guitar' and t.tag_name='video');

INSERT INTO websites (title, description, url, asset_type, asset_url) VALUES ('Music is Win', 'A youtube channel with fancy guitar on display!', 'https://www.youtube.com/channel/UC9cvVvlvr-qBssphm1EdYGQ', 'youtube', 'https://www.youtube.com/watch?v=ZZhokdoTv4Y');
INSERT INTO website_tags (website_id, tag_id) (SELECT w.id, t.id FROM websites w CROSS JOIN tags t WHERE w.title='Music is Win' and t.tag_name='free');
INSERT INTO website_tags (website_id, tag_id) (SELECT w.id, t.id FROM websites w CROSS JOIN tags t WHERE w.title='Music is Win' and t.tag_name='youtube');
INSERT INTO website_tags (website_id, tag_id) (SELECT w.id, t.id FROM websites w CROSS JOIN tags t WHERE w.title='Music is Win' and t.tag_name='fun');
INSERT INTO website_tags (website_id, tag_id) (SELECT w.id, t.id FROM websites w CROSS JOIN tags t WHERE w.title='Music is Win' and t.tag_name='video');

INSERT INTO websites (title, description, url, asset_type, asset_url) VALUES ('Fender', 'A youtube channel by one of the most famous guitar maker.', 'https://www.youtube.com/channel/UCI7fys0WM62xF2jUlUdq0XQ', 'youtube', 'https://www.youtube.com/watch?v=wuw1rWFDlko');
INSERT INTO website_tags (website_id, tag_id) (SELECT w.id, t.id FROM websites w CROSS JOIN tags t WHERE w.title='Fender' and t.tag_name='free');
INSERT INTO website_tags (website_id, tag_id) (SELECT w.id, t.id FROM websites w CROSS JOIN tags t WHERE w.title='Fender' and t.tag_name='youtube');
INSERT INTO website_tags (website_id, tag_id) (SELECT w.id, t.id FROM websites w CROSS JOIN tags t WHERE w.title='Fender' and t.tag_name='fun');
INSERT INTO website_tags (website_id, tag_id) (SELECT w.id, t.id FROM websites w CROSS JOIN tags t WHERE w.title='Fender' and t.tag_name='video');
INSERT INTO website_tags (website_id, tag_id) (SELECT w.id, t.id FROM websites w CROSS JOIN tags t WHERE w.title='Fender' and t.tag_name='community');


UPDATE websites SET search_token = to_tsvector(title || ' ' || description);