# Todo list
# UI
- ~~仮のUIを作る~~
- システム面ができるまで、全てのUIタスクなし
# システム
- 現在のSvelte（Supabase）の+{page or layout}.server.tsで取得する形から、全面バックグラウンド（GoLangは宗教上の理由で使わかない、なおSvelteデフォルトでも可）への移行(重要度:高)
- ↑ /api/get/[slug]/+server.ts を作成してデータ取得を移行案（ChatGPTこうあん）
- ~~次の問題へのページ移動ができたりできなかったりする。~~(aタグから移動>>jsのwindows関数を利用して移動)
- ~~問題ページを作り直す~~
> ~~回答を入力 → AIが回答を採点 → 変数でトグルをする → ifで正解、不正解を表示~~
- ~~問題の採点がおかしい(例:1+2=3なのに不正解と言われる)~~
- ポイント機能(重要度:中)
- 別の問題集の追加（重要度:低）
- ユーザー機能(重要度:超低)
# その他
- ~~Githubにあげて、バックアップ兼他の開発環境でも作業できるようにする~~
# Error
- ~~[plugin:@tailwindcss/vite:generate:serve] Can't resolve 'daisyui" @import "tw-animate-css' in '/home/azilamo/開発フォルダ/Study-Svelte/src'~~←ちなみになんで治ったかはわからない
