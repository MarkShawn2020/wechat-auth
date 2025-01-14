from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    """应用配置"""
    APP_NAME: str = "WeChat Login Backend"
    API_V1_STR: str = "/api/v1"
    
    # 微信配置
    WECHAT_APP_ID: str = ""
    WECHAT_APP_SECRET: str = ""
    
    # 安全配置
    SECRET_KEY: str = "your-secret-key-here"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
