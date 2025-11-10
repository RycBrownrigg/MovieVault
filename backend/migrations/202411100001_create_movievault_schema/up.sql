CREATE TABLE IF NOT EXISTS formats (
    format_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(100)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS movies (
    movie_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    release_year YEAR,
    runtime_minutes INT,
    plot_summary TEXT,
    language VARCHAR(50),
    country VARCHAR(100),
    rating DECIMAL(3,1),
    format_id INT,
    poster_image_url VARCHAR(255),
    background_image_url VARCHAR(255),
    CONSTRAINT fk_movies_formats
        FOREIGN KEY (format_id)
        REFERENCES formats(format_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS genres (
    genre_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS movie_genres (
    movie_id INT NOT NULL,
    genre_id INT NOT NULL,
    PRIMARY KEY (movie_id, genre_id),
    CONSTRAINT fk_movie_genres_movie
        FOREIGN KEY (movie_id)
        REFERENCES movies(movie_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_movie_genres_genre
        FOREIGN KEY (genre_id)
        REFERENCES genres(genre_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS people (
    person_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    birth_year YEAR NULL,
    country VARCHAR(100),
    photo_url VARCHAR(255)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS movie_people (
    movie_id INT NOT NULL,
    person_id INT NOT NULL,
    role_id INT NOT NULL,
    character_name VARCHAR(100),
    photo_url VARCHAR(255),
    PRIMARY KEY (movie_id, person_id, role_id),
    CONSTRAINT fk_movie_people_movie
        FOREIGN KEY (movie_id)
        REFERENCES movies(movie_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_movie_people_person
        FOREIGN KEY (person_id)
        REFERENCES people(person_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_movie_people_role
        FOREIGN KEY (role_id)
        REFERENCES roles(role_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS ownership (
    ownership_id INT AUTO_INCREMENT PRIMARY KEY,
    movie_id INT NOT NULL,
    purchase_date DATE,
    price DECIMAL(8,2),
    vendor VARCHAR(100),
    `condition` VARCHAR(50),
    CONSTRAINT fk_ownership_movie
        FOREIGN KEY (movie_id)
        REFERENCES movies(movie_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS images (
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    entity_type ENUM('Movie', 'Person') NOT NULL,
    entity_id INT NOT NULL,
    image_type VARCHAR(50),
    url VARCHAR(255) NOT NULL,
    caption VARCHAR(255),
    INDEX idx_images_entity (entity_type, entity_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'viewer') NOT NULL DEFAULT 'viewer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

