export const environment: Environment = {
  googleAnalyticsTrackingCode: 'G-8QWBE016HK',
  production: true,
  assetLocationPrefix: '/en-US',
};

export interface Environment {
  googleAnalyticsTrackingCode: string;
  production: boolean;
  assetLocationPrefix: string;
}
