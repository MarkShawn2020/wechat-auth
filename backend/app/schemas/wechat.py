from pydantic import BaseModel

class WeChatCode(BaseModel):
    """微信授权码请求模型"""
    code: str

class WeChatToken(BaseModel):
    """微信访问令牌响应模型"""
    access_token: str
    expires_in: int
    refresh_token: str
    openid: str
    scope: str

class WeChatUser(BaseModel):
    """微信用户信息模型"""
    openid: str
    nickname: str
    sex: int
    province: str
    city: str
    country: str
    headimgurl: str
    privilege: list[str]
    unionid: str | None = None
