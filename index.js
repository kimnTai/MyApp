import { registerRootComponent } from 'expo';

import App from './src';

// registerRootComponent 調用 AppRegistry.registerComponent('main', () => App);
// 它還確保無論您在 Expo Go 還是原生構建中加載應用程序，
// 環境都設置得當
registerRootComponent(App);
