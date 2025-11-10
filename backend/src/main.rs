mod config;
mod db;

use actix_cors::Cors;
use actix_web::middleware::Logger;
use actix_web::{App, HttpResponse, HttpServer, Responder, get, web};
use config::AppConfig;
use dotenvy::dotenv;
use env_logger::Env;
use serde::Serialize;
use std::io::{Error as IoError, ErrorKind};

#[derive(Serialize)]
struct HealthResponse<'a> {
    status: &'a str,
}

#[get("/api/health")]
async fn health() -> impl Responder {
    HttpResponse::Ok().json(HealthResponse { status: "ok" })
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    env_logger::Builder::from_env(Env::default().default_filter_or("info")).init();

    let config = AppConfig::from_env().map_err(|error| {
        log::error!("Configuration error: {error:#}");
        IoError::new(ErrorKind::Other, "failed to load application configuration")
    })?;

    let pool = db::init_pool(&config.database_url).map_err(|error| {
        log::error!("Failed to initialise database pool: {error}");
        IoError::new(ErrorKind::Other, "database pool initialisation failed")
    })?;

    if let Err(error) = db::run_migrations(&pool) {
        log::error!("Database migration error: {error:#}");
        return Err(IoError::new(
            ErrorKind::Other,
            "database migrations could not be applied",
        ));
    }

    let bind_address = config.address();
    let config_data = web::Data::new(config.clone());
    let pool_data = web::Data::new(pool.clone());

    log::info!("Starting server on {bind_address}");

    HttpServer::new(move || {
        App::new()
            .wrap(Logger::default())
            .wrap(
                Cors::default()
                    .allow_any_origin()
                    .allow_any_method()
                    .allow_any_header(),
            )
            .service(health)
            .app_data(config_data.clone())
            .app_data(pool_data.clone())
    })
    .bind(bind_address)?
    .run()
    .await
}
