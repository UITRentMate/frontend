#!/usr/bin/env node

/**
 * Script kiểm tra Query Key Factory Pattern cho các hooks trong dự án RentMate.
 * Đảm bảo các feature hooks sử dụng Query Key Factory thay vì hardcoded string array.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FEATURES_DIR = path.resolve(__dirname, '../../../../src/features');

function checkHooks() {
  if (!fs.existsSync(FEATURES_DIR)) {
    console.log('Thư mục features chưa tồn tại.');
    return;
  }

  const features = fs.readdirSync(FEATURES_DIR);
  let checkedHooks = 0;

  features.forEach(feature => {
    const hooksDir = path.join(FEATURES_DIR, feature, 'hooks');
    if (fs.existsSync(hooksDir) && fs.statSync(hooksDir).isDirectory()) {
      const hookFiles = fs.readdirSync(hooksDir).filter(f => f.endsWith('.ts'));
      hookFiles.forEach(file => {
        checkedHooks++;
        const content = fs.readFileSync(path.join(hooksDir, file), 'utf-8');
        // Check for hardcoded string array queryKey: ['...']
        const hardcodedKeyRegex = /queryKey:\s*\[\s*['"`][a-zA-Z0-9_-]+['"`]\s*\]/;
        if (hardcodedKeyRegex.test(content) && !file.includes('Keys')) {
          console.warn(`⚠️ Cảnh báo: File ${feature}/hooks/${file} có thể đang dùng hardcoded queryKey thay vì Query Key Factory.`);
        }
      });
    }
  });

  console.log(`[RentMate Key Checker] Đã kiểm tra ${checkedHooks} hooks.`);
}

checkHooks();
