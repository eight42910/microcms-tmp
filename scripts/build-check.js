#!/usr/bin/env node

/**
 * ビルド前チェックスクリプト
 * 環境変数やファイルの存在確認を行う
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 ビルド前チェックを開始します...\n');

// 環境変数チェック
const requiredEnvVars = ['MICROCMS_SERVICE_DOMAIN', 'MICROCMS_API_KEY'];

let envMissing = false;

console.log('📋 環境変数チェック:');
requiredEnvVars.forEach((envVar) => {
  if (process.env[envVar]) {
    console.log(`✅ ${envVar}: 設定済み`);
  } else {
    console.log(`❌ ${envVar}: 未設定`);
    envMissing = true;
  }
});

if (envMissing) {
  console.log('\n⚠️  必要な環境変数が不足しています。');
  console.log(
    '💡 .env.local ファイルを作成し、必要な環境変数を設定してください。'
  );
}

// 重要ファイルの存在チェック
const requiredFiles = [
  'next.config.ts',
  'tailwind.config.ts',
  'postcss.config.mjs',
  'src/app/layout.tsx',
];

console.log('\n📁 重要ファイルチェック:');
requiredFiles.forEach((file) => {
  if (fs.existsSync(path.join(process.cwd(), file))) {
    console.log(`✅ ${file}: 存在`);
  } else {
    console.log(`❌ ${file}: 不存在`);
  }
});

// package.jsonのスクリプトチェック
const packageJson = require('../package.json');
const requiredScripts = ['dev', 'build', 'start', 'lint'];

console.log('\n📜 package.json スクリプトチェック:');
requiredScripts.forEach((script) => {
  if (packageJson.scripts && packageJson.scripts[script]) {
    console.log(`✅ ${script}: 設定済み`);
  } else {
    console.log(`❌ ${script}: 未設定`);
  }
});

console.log('\n✨ チェック完了！');

if (envMissing) {
  process.exit(1);
} else {
  console.log('🚀 ビルドを実行できます。');
}
