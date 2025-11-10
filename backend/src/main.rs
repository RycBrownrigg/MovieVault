mod config;

use actix_cors::Cors;
use actix_web::middleware::Logger;
use actix_web::{App, HttpResponse, HttpServer, Responder, get, web};
use config::AppConfig;
use dotenvy::dotenv;
use env_logger::Env;
use serde::Serialize;

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

    let config = AppConfig::from_env();
    let bind_address = config.address();

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
            .app_data(web::Data::new(config.clone()))
    })
    .bind(bind_address)?
    .run()
    .await
}
