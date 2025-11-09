Here is an initial design of a **relational database schema** for a movie collection.

---

## **Database Schema: Movie Collection (with Imagery)**

### 1. Movies

Stores basic movie information.

| Field Name               | Data Type    | Description                                |
| ------------------------ | ------------ | ------------------------------------------ |
| movie_id                 | INT (PK)     | Unique identifier for each movie           |
| title                    | VARCHAR(255) | Movie title                                |
| release_year             | YEAR         | Year of release                            |
| runtime_minutes          | INT          | Duration in minutes                        |
| plot_summary             | TEXT         | Short summary of the movie                 |
| language                 | VARCHAR(50)  | Primary language                           |
| country                  | VARCHAR(100) | Country of origin                          |
| rating                   | DECIMAL(2,1) | Average rating (e.g., IMDb score)          |
| format_id                | INT (FK)     | References the format (DVD, Blu-ray, etc.) |
| **poster_image_url**     | VARCHAR(255) | URL or file path to box art/poster         |
| **background_image_url** | VARCHAR(255) | Optional background image or banner        |

---

### 2. Formats

| Field Name | Data Type    | Description                                 |
| ---------- | ------------ | ------------------------------------------- |
| format_id  | INT (PK)     | Unique ID                                   |
| name       | VARCHAR(50)  | e.g., “Blu-ray”, “DVD”, “Digital”, “4K UHD” |
| location   | VARCHAR(100) | Where it’s stored (shelf, folder, etc.)     |

---

### 3. Genres

| Field Name | Data Type   | Description                       |
| ---------- | ----------- | --------------------------------- |
| genre_id   | INT (PK)    | Unique ID                         |
| name       | VARCHAR(50) | e.g., “Action”, “Drama”, “Comedy” |

---

### 4. Movie_Genres

| Field Name                            | Data Type | Description                |
| ------------------------------------- | --------- | -------------------------- |
| movie_id                              | INT (FK)  | References Movies.movie_id |
| genre_id                              | INT (FK)  | References Genres.genre_id |
| **Primary Key:** (movie_id, genre_id) |           |                            |

---

### 5. People

| Field Name    | Data Type       | Description                                 |
| ------------- | --------------- | ------------------------------------------- |
| person_id     | INT (PK)        | Unique ID                                   |
| name          | VARCHAR(100)    | Full name                                   |
| birth_year    | YEAR (NULLABLE) | Optional birth year                         |
| country       | VARCHAR(100)    | Country of origin                           |
| **photo_url** | VARCHAR(255)    | URL or file path to person’s image/headshot |

---

### 6. Roles

| Field Name | Data Type   | Description                         |
| ---------- | ----------- | ----------------------------------- |
| role_id    | INT (PK)    | Unique ID                           |
| name       | VARCHAR(50) | e.g., “Director”, “Actor”, “Writer” |

---

### 7. Movie_People

| Field Name                                      | Data Type    | Description                                                         |
| ----------------------------------------------- | ------------ | ------------------------------------------------------------------- |
| movie_id                                        | INT (FK)     | References Movies.movie_id                                          |
| person_id                                       | INT (FK)     | References People.person_id                                         |
| role_id                                         | INT (FK)     | References Roles.role_id                                            |
| character_name                                  | VARCHAR(100) | If Actor, the character name                                        |
| **photo_url**                                   | VARCHAR(255) | Optional: photo specific to that movie role (e.g., character still) |
| **Primary Key:** (movie_id, person_id, role_id) |              |                                                                     |

---

### 8. Ownership

| Field Name    | Data Type    | Description                    |
| ------------- | ------------ | ------------------------------ |
| ownership_id  | INT (PK)     | Unique ID                      |
| movie_id      | INT (FK)     | References Movies.movie_id     |
| purchase_date | DATE         | When you bought it             |
| price         | DECIMAL(6,2) | Purchase price                 |
| vendor        | VARCHAR(100) | Store or site where purchased  |
| condition     | VARCHAR(50)  | e.g., “New”, “Used”, “Digital” |

---

### 9. Images (Optional Centralized Table)

To store multiple images per entity (posters, stills, concept art, etc.), you can normalize imagery in a separate table:

| Field Name  | Data Type               | Description                                              |
| ----------- | ----------------------- | -------------------------------------------------------- |
| image_id    | INT (PK)                | Unique ID                                                |
| entity_type | ENUM(‘Movie’, ‘Person’) | What this image belongs to                               |
| entity_id   | INT                     | The specific movie_id or person_id                       |
| image_type  | VARCHAR(50)             | e.g., “Poster”, “Scene”, “Portrait”, “Behind the Scenes” |
| url         | VARCHAR(255)            | File path or URL to image                                |
| caption     | VARCHAR(255)            | Optional description or caption                          |

---

### **Entity-Relationship Overview**

* Movies → Movie_Genres → Genres
* Movies → Movie_People → People → Roles
* Movies → Ownership
* Movies → Formats
* Movies ↔ Images
* People ↔ Images

---

