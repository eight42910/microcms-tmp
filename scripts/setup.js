#!/usr/bin/env node

/**
 * プロジェクトセットアップスクリプト
 * 初回セットアップ時に必要な設定を行う
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('🚀 Next.js + microCMS プロジェクトセットアップ\n');

const ask = (question) => {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
};

async function setup() {
  try {
    console.log('📝 環境変数の設定を行います。');
    console.log('microCMSの管理画面から以下の情報を取得してください。\n');

    const serviceDomain = await ask(
      'microCMSサービスドメイン (例: your-service): '
    );
    const apiKey = await ask('microCMS APIキー: ');

    // .env.localファイルの作成
    const envContent = `# microCMS設定
MICROCMS_SERVICE_DOMAIN=${serviceDomain}
MICROCMS_API_KEY=${apiKey}

# Next.js設定
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-here

# 環境設定
NODE_ENV=development
`;

    fs.writeFileSync('.env.local', envContent);
    console.log('\n✅ .env.local ファイルを作成しました。');

    // gitignoreの確認・更新
    const gitignorePath = '.gitignore';
    let gitignoreContent = '';

    if (fs.existsSync(gitignorePath)) {
      gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
    }

    const requiredIgnores = ['.env.local', '.env*.local', '.vercel'];

    let needsUpdate = false;
    requiredIgnores.forEach((ignore) => {
      if (!gitignoreContent.includes(ignore)) {
        gitignoreContent += `\n${ignore}`;
        needsUpdate = true;
      }
    });

    if (needsUpdate) {
      fs.writeFileSync(gitignorePath, gitignoreContent);
      console.log('✅ .gitignore を更新しました。');
    }

    console.log('\n🎉 セットアップが完了しました！');
    console.log('\n次のステップ:');
    console.log('1. npm install (依存関係のインストール)');
    console.log('2. npm run dev (開発サーバーの起動)');
    console.log('3. microCMSで "works" エンドポイントを作成');
    console.log('4. http://localhost:3000 でサイトを確認');
  } catch (error) {
    console.error('❌ セットアップ中にエラーが発生しました:', error.message);
  } finally {
    rl.close();
  }
}

setup();
