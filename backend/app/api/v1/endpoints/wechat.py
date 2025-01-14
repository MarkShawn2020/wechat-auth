from fastapi import APIRouter, Depends
from app.schemas.wechat import WeChatCode, WeChatToken, WeChatUser
from app.services.wechat import WeChatService

router = APIRouter()

@router.post("/login", response_model=WeChatUser)
async def wechat_login(
    code_data: WeChatCode,
    wechat_service: WeChatService = Depends()
) -> WeChatUser:
    """微信登录
    
    1. 使用授权码获取访问令牌
    2. 使用访问令牌获取用户信息
    3. 返回用户信息
    """
    # 获取访问令牌
    token = await wechat_service.get_access_token(code_data.code)
    
    # 获取用户信息
    user = await wechat_service.get_user_info(
        access_token=token.access_token,
        openid=token.openid
    )
    
    return user
