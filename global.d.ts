import en from '@core/app-i18n/messages/en.json'
// Phải đảm bảo rằng cấu trúc các file json language giống nhau

type Messages = typeof en

// https://next-intl-docs.vercel.app/docs/workflows/typescript
declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}
}
