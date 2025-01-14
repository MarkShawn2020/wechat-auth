from fastapi import APIRouter
from app.api.v1.endpoints import wechat

api_router = APIRouter()
api_router.include_router(wechat.router, prefix="/wechat", tags=["wechat"])
