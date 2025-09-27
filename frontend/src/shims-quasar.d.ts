declare module 'quasar' {
  import type { Plugin } from 'vue'
  const Quasar: Plugin & { install?: any }
  export { Quasar }
  export default Quasar
}

declare module '@quasar/vite-plugin' {
  export function quasar(options?: any): any
  export function transformAssetUrls(): any
}
