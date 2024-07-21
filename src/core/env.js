/*
 * 此文件不應被修改；請使用項目根目錄中的 `env.js` 來添加您的客戶端環境變量。
 * 如果您從 `@env` 中導入 `Env`，這就是將被加載的文件。
 * 您只能在這裡訪問客戶端環境變量。
 * 注意：我們使用 js 文件，因此可以加載客戶端環境變量的類型。
 */

import Constants from 'expo-constants';

/**
 *  @type {typeof import('../../env.js').ClientEnv}
 */
//@ts-ignore // 不用擔心 TypeScript 在這裡的錯誤；我們知道我們將正確的環境變量傳遞給 `app.config.ts` 中的 `extra`。
export const Env = Constants.expoConfig?.extra ?? {};
