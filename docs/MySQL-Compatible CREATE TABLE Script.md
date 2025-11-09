Here’s a complete **MySQL SQL CREATE TABLE Script** for a movie collection database (MovieVault), based on the product design and database schema.

It includes all primary keys, foreign keys, indexes, and relationship constraints.

---

## **MySQL CREATE TABLE Script**

```sql
-- Ensure the correct database and character set
CREATE DATABASE IF NOT EXISTS MovieVaultDB
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE MovieVaultDB;

-- 1. Formats
CREATE TABLE Formats (
    format_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,           -- e.g., Blu-ray, DVD, Digital, etc.
    location VARCHAR(100)                -- Where it's stored (shelf, folder, etc.)
) ENGINE=InnoDB;

-- 2. Movies
CREATE TABLE Movies (
    movie_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    release_year YEAR,
    runtime_minutes INT,
    plot_summary TEXT,
    language VARCHAR(50),
    country VARCHAR(100),
    rating DECIMAL(2,1),
    format_id INT,
    poster_image_url VARCHAR(255),
    background_image_url VARCHAR(255),
    FOREIGN KEY (format_id) REFERENCES Formats(format_id)
        ON UPDATE CASCADE ON DELETE SET NULL
) ENGINE=InnoDB;

-- 3. Genres
CREATE TABLE Genres (
    genre_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
) ENGINE=InnoDB;

-- 4. Movie_Genres (many-to-many)
CREATE TABLE Movie_Genres (
    movie_id INT NOT NULL,
    genre_id INT NOT NULL,
    PRIMARY KEY (movie_id, genre_id),
    FOREIGN KEY (movie_id) REFERENCES Movies(movie_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES Genres(genre_id)
        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

-- 5. People
CREATE TABLE People (
    person_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    birth_year YEAR NULL,
    country VARCHAR(100),
    photo_url VARCHAR(255)
) ENGINE=InnoDB;

-- 6. Roles
CREATE TABLE Roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL             -- e.g., Actor, Director, Writer
) ENGINE=InnoDB;

-- 7. Movie_People (many-to-many with role)
CREATE TABLE Movie_People (
    movie_id INT NOT NULL,
    person_id INT NOT NULL,
    role_id INT NOT NULL,
    character_name VARCHAR(100),
    photo_url VARCHAR(255),
    PRIMARY KEY (movie_id, person_id, role_id),
    FOREIGN KEY (movie_id) REFERENCES Movies(movie_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (person_id) REFERENCES People(person_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES Roles(role_id)
        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

-- 8. Ownership
CREATE TABLE Ownership (
    ownership_id INT AUTO_INCREMENT PRIMARY KEY,
    movie_id INT NOT NULL,
    purchase_date DATE,
    price DECIMAL(6,2),
    vendor VARCHAR(100),
    condition VARCHAR(50),
    FOREIGN KEY (movie_id) REFERENCES Movies(movie_id)
        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

-- 9. Images (centralized image store)
CREATE TABLE Images (
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    entity_type ENUM('Movie', 'Person') NOT NULL,
    entity_id INT NOT NULL,
    image_type VARCHAR(50),
    url VARCHAR(255) NOT NULL,
    caption VARCHAR(255),
    INDEX idx_entity (entity_type, entity_id)
) ENGINE=InnoDB;
```

---

##  **Why These Changes Matter**

| Change                                             | Why It’s Important                                |
| -------------------------------------------------- | ------------------------------------------------- |
| Added `ENGINE=InnoDB`                              | Enables foreign key constraints and transactions. |
| Used `AUTO_INCREMENT`                              | MySQL’s preferred syntax for auto-generated IDs.  |
| Added explicit `ON UPDATE CASCADE / ON DELETE ...` | Keeps relationships consistent automatically.     |
| Removed unsupported `DEFERRABLE` constraints       | MySQL doesn’t support them.                       |
| Added `INDEX idx_entity` to `Images`               | Optimizes lookups by entity type and ID.          |
| Included `CREATE DATABASE`                         | Makes setup simpler on a fresh MySQL install.     |

---

### **Sample INSERT Statements**

```sql
INSERT INTO Formats (name, location)
VALUES ('Blu-ray', 'Living Room Shelf');

INSERT INTO Movies (title, release_year, runtime_minutes, language, country, format_id, poster_image_url)
VALUES ('Inception', 2010, 148, 'English', 'USA', 1, 'images/inception_poster.jpg');

INSERT INTO People (name, birth_year, country, photo_url)
VALUES ('Christopher Nolan', 1970, 'UK', 'images/nolan.jpg');

INSERT INTO Roles (name) VALUES ('Director');

INSERT INTO Movie_People (movie_id, person_id, role_id)
VALUES (1, 1, 1);
```

---
