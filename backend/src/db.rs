use anyhow::{Context, Result};
use diesel::mysql::MysqlConnection;
use diesel::r2d2::{ConnectionManager, Pool, PooledConnection};
use diesel_migrations::{EmbeddedMigrations, MigrationHarness, embed_migrations};

pub type DbPool = Pool<ConnectionManager<MysqlConnection>>;
pub type DbConnection = PooledConnection<ConnectionManager<MysqlConnection>>;

pub const MIGRATIONS: EmbeddedMigrations = embed_migrations!("migrations");

pub fn init_pool(database_url: &str) -> Result<DbPool> {
    let manager = ConnectionManager::<MysqlConnection>::new(database_url);
    Pool::builder()
        .build(manager)
        .context("Failed to build database connection pool")
}

pub fn run_migrations(pool: &DbPool) -> Result<()> {
    let mut conn = pool
        .get()
        .context("Failed to acquire database connection for migrations")?;

    conn.run_pending_migrations(MIGRATIONS)
        .context("Failed to run database migrations")?;

    log::info!("Database migrations applied successfully");

    Ok(())
}
use anyhow::{Context, Result};
use diesel::mysql::MysqlConnection;
use diesel::r2d2::{ConnectionManager, Pool, PoolError};
use diesel_migrations::{EmbeddedMigrations, MigrationHarness, embed_migrations};

pub type DbPool = Pool<ConnectionManager<MysqlConnection>>;

pub const MIGRATIONS: EmbeddedMigrations = embed_migrations!("migrations");

pub fn init_pool(database_url: &str) -> Result<DbPool, PoolError> {
    let manager = ConnectionManager::<MysqlConnection>::new(database_url);
    Pool::builder().build(manager)
}

pub fn run_migrations(pool: &DbPool) -> Result<()> {
    let mut conn = pool
        .get()
        .context("Failed to retrieve a database connection from the pool")?;
    conn.run_pending_migrations(MIGRATIONS)
        .context("Failed to run embedded database migrations")?;
    Ok(())
}
