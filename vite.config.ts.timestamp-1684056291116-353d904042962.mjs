// vite.config.ts
import { fileURLToPath } from "url";
import { defineConfig } from "file:///E:/Coding/Web/Extensions/Tabify/node_modules/.pnpm/vite@4.3.5/node_modules/vite/dist/node/index.js";
import { svelte } from "file:///E:/Coding/Web/Extensions/Tabify/node_modules/.pnpm/@sveltejs+vite-plugin-svelte@2.2.0_svelte@3.59.1_vite@4.3.5/node_modules/@sveltejs/vite-plugin-svelte/dist/index.js";
var __vite_injected_original_import_meta_url = "file:///E:/Coding/Web/Extensions/Tabify/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      "@components": fileURLToPath(
        new URL("./src/lib/components", __vite_injected_original_import_meta_url)
      ),
      "@stores": fileURLToPath(new URL("./src/lib/stores", __vite_injected_original_import_meta_url)),
      "@utils": fileURLToPath(new URL("./src/lib/utils", __vite_injected_original_import_meta_url)),
      "@styles": fileURLToPath(new URL("./src/styles", __vite_injected_original_import_meta_url))
    }
  },
  server: {
    open: "./src/popup/"
  },
  build: {
    rollupOptions: {
      input: {
        popup: fileURLToPath(
          new URL("./src/popup/index.html", __vite_injected_original_import_meta_url)
        ),
        options: fileURLToPath(
          new URL("./src/options/index.html", __vite_injected_original_import_meta_url)
        )
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxDb2RpbmdcXFxcV2ViXFxcXEV4dGVuc2lvbnNcXFxcVGFiaWZ5XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxDb2RpbmdcXFxcV2ViXFxcXEV4dGVuc2lvbnNcXFxcVGFiaWZ5XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9Db2RpbmcvV2ViL0V4dGVuc2lvbnMvVGFiaWZ5L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ3VybCc7XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQgeyBzdmVsdGUgfSBmcm9tICdAc3ZlbHRlanMvdml0ZS1wbHVnaW4tc3ZlbHRlJztcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW3N2ZWx0ZSgpXSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAnQGNvbXBvbmVudHMnOiBmaWxlVVJMVG9QYXRoKFxyXG4gICAgICAgIG5ldyBVUkwoJy4vc3JjL2xpYi9jb21wb25lbnRzJywgaW1wb3J0Lm1ldGEudXJsKVxyXG4gICAgICApLFxyXG4gICAgICAnQHN0b3Jlcyc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMvbGliL3N0b3JlcycsIGltcG9ydC5tZXRhLnVybCkpLFxyXG4gICAgICAnQHV0aWxzJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYy9saWIvdXRpbHMnLCBpbXBvcnQubWV0YS51cmwpKSxcclxuICAgICAgJ0BzdHlsZXMnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjL3N0eWxlcycsIGltcG9ydC5tZXRhLnVybCkpLFxyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICBzZXJ2ZXI6IHtcclxuICAgIG9wZW46ICcuL3NyYy9wb3B1cC8nLFxyXG4gIH0sXHJcblxyXG4gIGJ1aWxkOiB7XHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIGlucHV0OiB7XHJcbiAgICAgICAgcG9wdXA6IGZpbGVVUkxUb1BhdGgoXHJcbiAgICAgICAgICBuZXcgVVJMKCcuL3NyYy9wb3B1cC9pbmRleC5odG1sJywgaW1wb3J0Lm1ldGEudXJsKVxyXG4gICAgICAgICksXHJcbiAgICAgICAgb3B0aW9uczogZmlsZVVSTFRvUGF0aChcclxuICAgICAgICAgIG5ldyBVUkwoJy4vc3JjL29wdGlvbnMvaW5kZXguaHRtbCcsIGltcG9ydC5tZXRhLnVybClcclxuICAgICAgICApLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5UixTQUFTLHFCQUFxQjtBQUN2VCxTQUFTLG9CQUFvQjtBQUM3QixTQUFTLGNBQWM7QUFGd0osSUFBTSwyQ0FBMkM7QUFLaE8sSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE9BQU8sQ0FBQztBQUFBLEVBQ2xCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLGVBQWU7QUFBQSxRQUNiLElBQUksSUFBSSx3QkFBd0Isd0NBQWU7QUFBQSxNQUNqRDtBQUFBLE1BQ0EsV0FBVyxjQUFjLElBQUksSUFBSSxvQkFBb0Isd0NBQWUsQ0FBQztBQUFBLE1BQ3JFLFVBQVUsY0FBYyxJQUFJLElBQUksbUJBQW1CLHdDQUFlLENBQUM7QUFBQSxNQUNuRSxXQUFXLGNBQWMsSUFBSSxJQUFJLGdCQUFnQix3Q0FBZSxDQUFDO0FBQUEsSUFDbkU7QUFBQSxFQUNGO0FBQUEsRUFFQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBRUEsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsT0FBTztBQUFBLFFBQ0wsT0FBTztBQUFBLFVBQ0wsSUFBSSxJQUFJLDBCQUEwQix3Q0FBZTtBQUFBLFFBQ25EO0FBQUEsUUFDQSxTQUFTO0FBQUEsVUFDUCxJQUFJLElBQUksNEJBQTRCLHdDQUFlO0FBQUEsUUFDckQ7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
