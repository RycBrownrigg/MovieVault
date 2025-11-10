use anyhow::{Context, Result};
use std::env;

const DEFAULT_HOST: &str = "0.0.0.0";
const DEFAULT_PORT: &str = "8080";

#[derive(Debug, Clone)]
pub struct AppConfig {
    pub host: String,
    pub port: u16,
    pub database_url: String,
}

impl AppConfig {
    pub fn from_env() -> Result<Self> {
        let host = env::var("APP_HOST").unwrap_or_else(|_| DEFAULT_HOST.to_string());
        let port_str = env::var("APP_PORT").unwrap_or_else(|_| DEFAULT_PORT.to_string());
        let database_url = env::var("DATABASE_URL")
            .context("DATABASE_URL must be set (mysql://user:password@host:port/db)")?;

        let port = port_str
            .parse::<u16>()
            .context("APP_PORT must be a valid u16 integer")?;

        Ok(Self {
            host,
            port,
            database_url,
        })
    }

    pub fn address(&self) -> String {
        format!("{}:{}", self.host, self.port)
    }
}
