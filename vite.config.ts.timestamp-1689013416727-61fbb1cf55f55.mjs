// vite.config.ts
import { fileURLToPath } from "url";
import { defineConfig } from "file:///E:/Coding/Web/Extensions/Tabify/node_modules/.pnpm/vite@4.4.2_@types+node@20.4.1/node_modules/vite/dist/node/index.js";
import { svelte } from "file:///E:/Coding/Web/Extensions/Tabify/node_modules/.pnpm/@sveltejs+vite-plugin-svelte@2.4.2_svelte@4.0.5_vite@4.4.2/node_modules/@sveltejs/vite-plugin-svelte/src/index.js";
var __vite_injected_original_import_meta_url = "file:///E:/Coding/Web/Extensions/Tabify/vite.config.ts";
function _dir(path) {
  return fileURLToPath(new URL(path, __vite_injected_original_import_meta_url));
}
var vite_config_default = defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      "@constants": _dir("./src/lib/constants"),
      "@components": _dir("./src/lib/components"),
      "@stores": _dir("./src/lib/stores"),
      "@utils": _dir("./src/lib/utils"),
      "@styles": _dir("./src/styles")
    }
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      input: {
        popup: _dir("./src/popup/index.html"),
        options: _dir("./src/options/index.html")
      }
    }
  }
});
export {
  _dir,
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxDb2RpbmdcXFxcV2ViXFxcXEV4dGVuc2lvbnNcXFxcVGFiaWZ5XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxDb2RpbmdcXFxcV2ViXFxcXEV4dGVuc2lvbnNcXFxcVGFiaWZ5XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9Db2RpbmcvV2ViL0V4dGVuc2lvbnMvVGFiaWZ5L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ3VybCc7XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQgeyBzdmVsdGUgfSBmcm9tICdAc3ZlbHRlanMvdml0ZS1wbHVnaW4tc3ZlbHRlJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfZGlyKHBhdGg6IHN0cmluZykge1xyXG4gIHJldHVybiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwocGF0aCwgaW1wb3J0Lm1ldGEudXJsKSk7XHJcbn1cclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW3N2ZWx0ZSgpXSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAnQGNvbnN0YW50cyc6IF9kaXIoJy4vc3JjL2xpYi9jb25zdGFudHMnKSxcclxuICAgICAgJ0Bjb21wb25lbnRzJzogX2RpcignLi9zcmMvbGliL2NvbXBvbmVudHMnKSxcclxuICAgICAgJ0BzdG9yZXMnOiBfZGlyKCcuL3NyYy9saWIvc3RvcmVzJyksXHJcbiAgICAgICdAdXRpbHMnOiBfZGlyKCcuL3NyYy9saWIvdXRpbHMnKSxcclxuICAgICAgJ0BzdHlsZXMnOiBfZGlyKCcuL3NyYy9zdHlsZXMnKSxcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgYnVpbGQ6IHtcclxuICAgIHNvdXJjZW1hcDogdHJ1ZSxcclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgaW5wdXQ6IHtcclxuICAgICAgICBwb3B1cDogX2RpcignLi9zcmMvcG9wdXAvaW5kZXguaHRtbCcpLFxyXG4gICAgICAgIG9wdGlvbnM6IF9kaXIoJy4vc3JjL29wdGlvbnMvaW5kZXguaHRtbCcpLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5UixTQUFTLHFCQUFxQjtBQUN2VCxTQUFTLG9CQUFvQjtBQUM3QixTQUFTLGNBQWM7QUFGd0osSUFBTSwyQ0FBMkM7QUFJek4sU0FBUyxLQUFLLE1BQWM7QUFDakMsU0FBTyxjQUFjLElBQUksSUFBSSxNQUFNLHdDQUFlLENBQUM7QUFDckQ7QUFHQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsT0FBTyxDQUFDO0FBQUEsRUFDbEIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsY0FBYyxLQUFLLHFCQUFxQjtBQUFBLE1BQ3hDLGVBQWUsS0FBSyxzQkFBc0I7QUFBQSxNQUMxQyxXQUFXLEtBQUssa0JBQWtCO0FBQUEsTUFDbEMsVUFBVSxLQUFLLGlCQUFpQjtBQUFBLE1BQ2hDLFdBQVcsS0FBSyxjQUFjO0FBQUEsSUFDaEM7QUFBQSxFQUNGO0FBQUEsRUFFQSxPQUFPO0FBQUEsSUFDTCxXQUFXO0FBQUEsSUFDWCxlQUFlO0FBQUEsTUFDYixPQUFPO0FBQUEsUUFDTCxPQUFPLEtBQUssd0JBQXdCO0FBQUEsUUFDcEMsU0FBUyxLQUFLLDBCQUEwQjtBQUFBLE1BQzFDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
