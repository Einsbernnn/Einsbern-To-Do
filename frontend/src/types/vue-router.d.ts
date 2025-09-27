// Fallback declaration for editor/TS-server resolution issues.
// The project already depends on `vue-router`, which provides its own types.
// This file only prevents editor errors when the TS server can't resolve package types.
declare module 'vue-router'
