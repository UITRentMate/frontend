#!/usr/bin/env node

/**
 * Script kiểm tra quy tắc Centralized Types cho dự án RentMate:
 * Không cho phép khai báo 'interface' hoặc 'type' Component Props trực tiếp trong file .tsx.
 * Bắt buộc phải khai báo trong thư mục types/.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SRC_DIR = path.resolve(__dirname, '../../../../src');

function findTsxFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      findTsxFiles(fullPath, fileList);
    } else if (file.endsWith('.tsx')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const violations = [];

  const interfaceRegex = /^export\s+interface\s+([A-Za-z0-9_]+Props)\b/;
  const typeRegex = /^export\s+type\s+([A-Za-z0-9_]+Props)\s*=/;
  const inlineInterfaceRegex = /^interface\s+([A-Za-z0-9_]+Props)\b/;

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (interfaceRegex.test(trimmed) || typeRegex.test(trimmed) || inlineInterfaceRegex.test(trimmed)) {
      violations.push({
        line: index + 1,
        text: trimmed
      });
    }
  });

  return violations;
}

function run() {
  console.log(`[RentMate Linter] Đang kiểm tra Centralized Types trong: ${SRC_DIR}`);
  const tsxFiles = findTsxFiles(SRC_DIR);
  let totalViolations = 0;

  tsxFiles.forEach(file => {
    const relPath = path.relative(SRC_DIR, file);
    const violations = checkFile(file);
    if (violations.length > 0) {
      console.error(`\n❌ Vi phạm quy tắc Centralized Types tại: src/${relPath}`);
      violations.forEach(v => {
        console.error(`   Dòng ${v.line}: ${v.text}`);
      });
      totalViolations += violations.length;
    }
  });

  if (totalViolations === 0) {
    console.log(`\n✅ 100% file .tsx tuân thủ quy chuẩn Centralized Types!`);
    process.exit(0);
  } else {
    console.error(`\n⚠️ Phát hiện ${totalViolations} vi phạm. Hãy chuyển các Props type vào thư mục types/ tương ứng.`);
    process.exit(1);
  }
}

run();
