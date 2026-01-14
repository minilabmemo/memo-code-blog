Console.log 的問題
❌ 直接刪除的缺點
// 開發時
console.log('User logged in:', user);

// 上線前手動刪除
// console.log('User logged in:', user);  ← 註解掉

// 下次要調試又要取消註解...很麻煩！
問題：
😫 每次調試都要重新寫
😫 可能忘記刪除敏感信息
😫 團隊協作時會有不一致
⚠️ 保留所有 log 的問題
// 到處都是 log
console.log('Component mounted');
console.log('Data:', data);
console.log('User:', user);
console.log('Token:', accessToken); // 😱 敏感！
問題：
🔴 暴露敏感信息（token、密碼等）
🟡 生產環境控制台混亂
🟡 輕微性能影響
最佳實踐方案
方案 1：環境條件式 Log（簡單）
// 創建開發專用的 log 函數
// utils/logger.ts
export const devLog = (...args: any[]) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(...args);
  }
};

export const devError = (...args: any[]) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(...args);
  }
};

// 使用
import { devLog } from '~/utils/logger';

devLog('User logged in:', user);  // 只在開發環境顯示
devLog('Session created:', sessionId);
優點：
✅ 簡單易用
✅ 生產環境自動靜默
✅ 不需要刪除程式碼
✅ 保留調試信息供未來使用
方案 2：使用 Consola（推薦）⭐
Nuxt 3 內建 consola，功能更強大：
// server/utils/logger.ts
import { consola } from 'consola';

// 根據環境設定日誌等級
const logger = consola.create({
  level: process.env.NODE_ENV === 'production' ? 3 : 5,
  // 0: fatal, 1: error, 2: warn, 3: info, 4: debug, 5: trace
});

export { logger };

// 使用範例
// server/utils/session.ts
import { logger } from './logger';

export async function createSession(user: AuthenticatedUser, accessToken: string) {
  const sessionId = generateSessionId();
  
  // 不同等級的日誌
  logger.debug('Creating session for user:', user.email);  // 開發環境
  logger.info(`Session created: ${sessionId}`);            // 生產環境也會顯示
  logger.trace('Session data:', sessionData);              // 只在最詳細模式
  
  return sessionId;
}
優點：
✅ 分等級管理（fatal/error/warn/info/debug/trace）
✅ 彩色輸出，易於識別
✅ 生產環境自動過濾低等級日誌
✅ 支援標籤分類
✅ Nuxt 3 內建，無需安裝
方案 3：自動移除 Console（激進）
使用 Vite 插件在打包時自動移除所有 console.log：
npm install vite-plugin-remove-console -D
// nuxt.config.ts
import removeConsole from 'vite-plugin-remove-console';

export default defineNuxtConfig({
  vite: {
    plugins: [
      // 生產環境自動移除 console.log
      process.env.NODE_ENV === 'production' 
        ? removeConsole({ 
            includes: ['log', 'debug', 'trace'] // 保留 error, warn
          }) 
        : undefined
    ].filter(Boolean)
  }
});
優點：
✅ 完全自動化
✅ 保留 console.error 和 console.warn
✅ 零手動操作
缺點：
⚠️ 可能需要保留某些重要 log
⚠️ 調試生產問題會困難
實際應用建議
1. 分類你的 Log
// ❌ 臨時調試 - 用完就刪
console.log('test', data);

// ✅ 重要狀態追蹤 - 保留但用 logger
logger.info('User logged in:', user.email);
logger.info('Session created:', sessionId);

// ✅ 錯誤追蹤 - 永遠保留
logger.error('Login failed:', error.message);
logger.error('Session creation failed:', error);
2. 敏感信息處理
// ❌ 危險！暴露完整 token
console.log('Token:', accessToken);

// ✅ 安全：只顯示部分
logger.debug('Token (first 10 chars):', accessToken.substring(0, 10) + '...');

// ✅ 更好：只在開發環境顯示
if (process.env.NODE_ENV === 'development') {
  logger.debug('Full token:', accessToken);
}
3. 使用結構化日誌
// ❌ 難以搜尋和分析
console.log('User John logged in at 2025-10-28');

// ✅ 結構化，易於搜尋
logger.info('User login', {
  event: 'user_login',
  userId: user.id,
  email: user.email,
  timestamp: new Date().toISOString(),
  ip: clientIP
});