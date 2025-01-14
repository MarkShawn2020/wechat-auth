import requests
from fastapi import HTTPException
from app.core.config import settings
from app.schemas.wechat import WeChatToken, WeChatUser

class WeChatService:
    """微信服务"""
    
    @staticmethod
    async def get_access_token(code: str) -> WeChatToken:
        """使用授权码获取访问令牌"""
        url = "https://api.weixin.qq.com/sns/oauth2/access_token"
        params = {
            "appid": settings.WECHAT_APP_ID,
            "secret": settings.WECHAT_APP_SECRET,
            "code": code,
            "grant_type": "authorization_code"
        }
        
        response = requests.get(url, params=params)
        data = response.json()
        
        if "errcode" in data:
            raise HTTPException(
                status_code=400,
                detail=f"WeChat API error: {data['errmsg']}"
            )
            
        return WeChatToken(**data)
    
    @staticmethod
    async def get_user_info(access_token: str, openid: str) -> WeChatUser:
        """获取用户信息"""
        url = "https://api.weixin.qq.com/sns/userinfo"
        params = {
            "access_token": access_token,
            "openid": openid,
            "lang": "zh_CN"
        }
        
        response = requests.get(url, params=params)
        data = response.json()
        
        if "errcode" in data:
            raise HTTPException(
                status_code=400,
                detail=f"WeChat API error: {data['errmsg']}"
            )
            
        return WeChatUser(**data)
