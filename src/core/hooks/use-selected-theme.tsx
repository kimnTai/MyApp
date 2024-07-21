import { colorScheme, useColorScheme } from 'nativewind';
import React from 'react';
import { useMMKVString } from 'react-native-mmkv';

import { storage } from '../storage';

const SELECTED_THEME = 'SELECTED_THEME';
export type ColorSchemeType = 'light' | 'dark' | 'system';

/**
 * 此钩子函数应仅在选择主题时使用
 * 此钩子函数将返回存储在 MMKV 中的选定主题
 * selectedTheme 应为以下值之一：'light'、'dark' 或 'system'
 * 如果您想基于主题来样式化组件，请不要使用此钩子函数，而是使用 nativewind 的 useColorScheme
 *
 */
export const useSelectedTheme = () => {
  const { colorScheme: _color, setColorScheme } = useColorScheme();
  const [theme, _setTheme] = useMMKVString(SELECTED_THEME, storage);

  const setSelectedTheme = React.useCallback(
    (t: ColorSchemeType) => {
      setColorScheme(t);
      _setTheme(t);
    },
    [setColorScheme, _setTheme]
  );

  const selectedTheme = (theme ?? 'system') as ColorSchemeType;
  return { selectedTheme, setSelectedTheme } as const;
};

// 在根文件中使用此函数从 MMKV 加载选定的主题
export const loadSelectedTheme = () => {
  const theme = storage.getString(SELECTED_THEME);
  if (theme !== undefined) {
    console.log('theme', theme);
    colorScheme.set(theme as ColorSchemeType);
  }
};
