import { defineConfig } from 'tsdown';

export default defineConfig({
  dts: true,
  entry: ['src/random/index.ts', 'src/time/index.ts', 'src/types/index.ts', 'src/values/index.ts'],
  publint: true,
  sourcemap: true,
  target: 'es2022',
});
