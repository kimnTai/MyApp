/*
 * Env 文件用於加載和驗證環境變量
 * 請謹慎操作；該文件不應導入到您的源文件夾中。
 * 我們將環境變量分為兩部分：
 * 1. 客戶端變量：這些變量在客戶端代碼 (src 文件夾) 中使用。
 * 2. 構建時變量：這些變量在構建過程中使用 (app.config.ts 文件)。
 * 將此文件導入到 `app.config.ts` 文件中以在構建過程中使用環境變量。然後可以使用 `app.config.ts` 文件中的 extra 字段將客戶端變量傳遞給客戶端。
 * 要在 `src` 文件夾中訪問客戶端環境變量，可以從 `@env` 導入。例如：`import Env from '@env'`。
 */
/**
 * 第一部分：導入包並加載您的環境變量
 * 我們使用 dotenv 根據 APP_ENV 變量從 .env 文件加載正確的變量（默認為開發環境）
 * APP_ENV 作為內聯變量在執行命令時傳遞，例如：APP_ENV=staging pnpm build:android
 */
const z = require('zod');

const packageJSON = require('./package.json');
const path = require('path');
const APP_ENV = process.env.APP_ENV ?? 'development';
const envPath = path.resolve(__dirname, `.env.${APP_ENV}`);

require('dotenv').config({
  path: envPath,
});

/**
 * 第二部分：定義一些應用的靜態變量
 * 例如：bundle id、package name、app name。
 *
 * 您可以將它們添加到 .env 文件中，但我們認為將它們保存在這裡更好，因為我們使用前綴根據 APP_ENV 生成這些值
 * 例如：如果 APP_ENV 是 staging，則 bundle id 將是 com.myapp.staging
 */

// TODO: 用你自己的值替換這些

const BUNDLE_ID = 'com.myapp'; // ios bundle id
const PACKAGE = 'com.myapp'; // android package name
const NAME = 'MyApp'; // app name
const EXPO_ACCOUNT_OWNER = 'tingxian'; // expo account owner
const EAS_PROJECT_ID = '66da18a4-e89c-4f7e-89e5-0092056976cb'; // eas project id
const SCHEME = 'MyApp'; // app scheme
const SLUG = 'my-expo-app';

/**
 * 我們聲明了一個函數 withEnvSuffix，將根據 APP_ENV 添加後綴到變量名
 * 為變量 env 添加後綴基於 APP_ENV
 * @param {string} name
 * @returns  {string}
 */

const withEnvSuffix = (name) => {
  return APP_ENV === 'production' ? name : `${name}.${APP_ENV}`;
};

/**
 * 第二部分：定義您的環境變量模式
 * 我們使用 zod 定義我們的環境變量模式
 *
 * 我們將環境變量分為兩部分：
 *    1. 客戶端：這些變量在客戶端代碼 (`src` 文件夾) 中使用。
 *    2. 構建時：這些變量在構建過程中使用 (app.config.ts 文件)。您可以將它們視為服務器端變量。
 *
 * 主要規則：
 *    1. 如果您需要在客戶端使用您的變量，您應該將它添加到客戶端模式中；否則，您應該將它添加到構建時模式中。
 *    2. 每當您想添加新變量時，您應該根據上述規則將其添加到正確的模式中，然後將其添加到相應的對象 (_clientEnv 或 _buildTimeEnv) 中。
 *
 * 注意：`z.string()` 意味著該變量存在並且可以是空字符串，但不能是 `undefined`。
 * 如果您想讓該變量是必需的，您應該使用 `z.string().min(1)` 來代替。
 * 在這裡閱讀更多關於 zod 的內容：https://zod.dev/?id=strings
 *
 */

const client = z.object({
  APP_ENV: z.enum(['development', 'staging', 'production']),
  NAME: z.string(),
  SCHEME: z.string(),
  BUNDLE_ID: z.string(),
  PACKAGE: z.string(),
  VERSION: z.string(),

  // 在這裡添加您的客戶端環境變量
  API_URL: z.string(),
  VAR_NUMBER: z.number(),
  VAR_BOOL: z.boolean(),
});

const buildTime = z.object({
  EXPO_ACCOUNT_OWNER: z.string(),
  EAS_PROJECT_ID: z.string(),
  // 在這裡添加您的構建時環境變量
  SECRET_KEY: z.string(),
  SLUG: z.string(),
});

/**
 * @type {Record<keyof z.infer<typeof client> , unknown>}
 */
const _clientEnv = {
  APP_ENV,
  NAME: NAME,
  SCHEME: SCHEME,
  BUNDLE_ID: withEnvSuffix(BUNDLE_ID),
  PACKAGE: withEnvSuffix(PACKAGE),
  VERSION: packageJSON.version,

  // 在這裡也添加您的環境變量
  API_URL: process.env.API_URL,
  VAR_NUMBER: Number(process.env.VAR_NUMBER),
  VAR_BOOL: process.env.VAR_BOOL === 'true',
};

/**
 * @type {Record<keyof z.infer<typeof buildTime> , unknown>}
 */
const _buildTimeEnv = {
  EXPO_ACCOUNT_OWNER,
  EAS_PROJECT_ID,
  // 在這裡也添加您的環境變量
  SECRET_KEY: process.env.SECRET_KEY,
  SLUG,
};

/**
 * 第三部分：合併並驗證您的環境變量
 * 我們使用 zod 根據我們上面定義的模式驗證我們的環境變量
 * 如果驗證失敗，我們會拋出錯誤並將錯誤日誌記錄到控制台，詳細說明缺少的變量
 * 如果驗證通過，我們將導出合併和解析的環境變量以便在 app.config.ts 文件中使用，以及用於客戶端代碼的 ClientEnv 對象
 **/
const _env = {
  ..._clientEnv,
  ..._buildTimeEnv,
};

const merged = buildTime.merge(client);
const parsed = merged.safeParse(_env);

if (parsed.success === false) {
  console.error(
    '❌ 無效的環境變量:',
    parsed.error.flatten().fieldErrors,

    `\n❌ .env.${APP_ENV} 文件中缺少變量，確保所有必需的變量都在 .env.${APP_ENV} 文件中定義。`,
    `\n💡 提示：如果您最近更新了 .env.${APP_ENV} 文件並且錯誤仍然存在，請嘗試使用 -cc 標誌重啟服務器以清除緩存。`
  );
  throw new Error('無效的環境變量，查看終端以獲取更多詳情');
}

const Env = parsed.data;
const ClientEnv = client.parse(_clientEnv);

module.exports = {
  Env,
  ClientEnv,
  withEnvSuffix,
};
