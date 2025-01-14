import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import './index.css'

interface WeChatLoginConfig {
  appId: string
  redirectUri: string
  scope: string
}

const wechatConfig: WeChatLoginConfig = {
  appId: import.meta.env.VITE_WECHAT_APP_ID || '',
  // 使用环境变量中的回调地址
  redirectUri: import.meta.env.VITE_REDIRECT_URI || `${window.location.origin}/auth/callback`,
  scope: 'snsapi_userinfo'
}

function App() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = () => {
    if (!wechatConfig.appId) {
      setError('请先配置微信 AppID')
      return
    }

    if (!wechatConfig.redirectUri) {
      setError('请先配置回调地址')
      return
    }

    setLoading(true)
    const { appId, redirectUri, scope } = wechatConfig
    // 使用微信公众平台的网页授权链接
    const authUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=code&scope=${scope}&state=STATE#wechat_redirect`
    
    // 判断是否在微信浏览器中
    const isWechat = /MicroMessenger/i.test(navigator.userAgent)
    
    if (isWechat) {
      // 在微信内直接跳转
      window.location.href = authUrl
    } else {
      // 在非微信浏览器中显示提示
      setError('请在微信客户端中打开链接')
      setLoading(false)
    }
  }

  useEffect(() => {
    // 处理回调
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    const state = urlParams.get('state')

    if (code && state === 'STATE') {
      setLoading(true)
      // 发送 code 到后端
      fetch('http://localhost:8000/api/v1/wechat/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code })
      })
        .then(response => response.json())
        .then(data => {
          console.log('Login success:', data)
          // 处理登录成功后的逻辑
        })
        .catch(error => {
          console.error('Login error:', error)
          setError('登录失败，请重试')
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [])

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="w-full max-w-md mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <div>
            <h2 className="text-center text-3xl font-bold text-gray-900">
              微信登录示例
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              {/MicroMessenger/i.test(navigator.userAgent)
                ? '使用微信账号登录'
                : '请在微信中打开'}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-md text-sm">
              {error}
            </div>
          )}

          <div>
            <button
              onClick={handleLogin}
              disabled={loading}
              className={`
                w-full flex justify-center items-center py-3 px-4 
                border border-transparent text-sm font-medium rounded-lg
                text-white bg-[#07C160] hover:bg-[#07C160]/90 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#07C160]
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-200 ease-in-out
              `}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  登录中...
                </>
              ) : (
                '微信登录'
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              登录即表示同意
              <a href="#" className="text-[#07C160] hover:underline ml-1">
                服务条款
              </a>
              <span className="mx-1">和</span>
              <a href="#" className="text-[#07C160] hover:underline">
                隐私政策
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
