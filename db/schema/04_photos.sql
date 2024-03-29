-- DROP and CREATE photos TABLE
DROP TABLE IF EXISTS photos CASCADE;

CREATE TABLE photos (
photo_id SERIAL PRIMARY KEY NOT NULL,
image_key VARCHAR(255) NOT NULL,
garden_id INT,
FOREIGN KEY(garden_id) REFERENCES gardens ON DELETE CASCADE,
plot_id INT,
FOREIGN KEY(plot_id) REFERENCES plots ON DELETE CASCADE
);  