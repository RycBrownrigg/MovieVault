use std::env;

const DEFAULT_HOST: &str = "0.0.0.0";
const DEFAULT_PORT: &str = "8080";

#[derive(Debug, Clone)]
pub struct AppConfig {
    pub host: String,
    pub port: u16,
}

impl AppConfig {
    pub fn from_env() -> Self {
        let host = env::var("APP_HOST").unwrap_or_else(|_| DEFAULT_HOST.to_string());
        let port_str = env::var("APP_PORT").unwrap_or_else(|_| DEFAULT_PORT.to_string());

        let port = port_str
            .parse::<u16>()
            .unwrap_or_else(|_| DEFAULT_PORT.parse().expect("valid default port"));

        Self { host, port }
    }

    pub fn address(&self) -> String {
        format!("{}:{}", self.host, self.port)
    }
}
