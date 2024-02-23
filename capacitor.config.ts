import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.beepo.squirreltron',
  appName: 'squirreltron',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
