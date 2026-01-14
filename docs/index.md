---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Memo Code Blog"
  text: "A VitePress Site"
  tagline: My Memo Code Note Blog
  actions:
    - theme: brand
      text: Vue 
      link: /vue/
    - theme: alt
      text: F2E Road
      link: /f2e/
    - theme: alt
      text: Backend Road
      link: /tech/

features:
  - title: 程式筆記
    details: 記錄程式碼片段與疑難雜症筆記
  - title: 工具使用紀錄
    details: 紀錄各種插件與工具
  - title: 前後端筆記
    details: 紀錄前後端學習等相關知識
---

<div class="external-resources">
  <div class="resource-grid">
    <a href="https://minilabmemo.gitbook.io/golang-memo/" target="_blank" class="resource-card golang">
       <div class="card-content">
         <span class="icon">📘</span>
         <div>
           <h3>Golang Memo</h3>
           <p>Gitbook 外部連結 : 後端 Golang筆記</p>
         </div>
       </div>
       <div class="link-text">前往閱讀 &rarr;</div>
    </a>
    <a href="https://minilabmemo.gitbook.io/frontend-memo/" target="_blank" class="resource-card fe">
       <div class="card-content">
         <span class="icon">📙</span>
         <div>
           <h3>FE Memo</h3>
           <p>Gitbook 外部連結 : 前端筆記</p>
         </div>
       </div>
       <div class="link-text">前往閱讀 &rarr;</div>
    </a>
  </div>
</div>

<style>
.external-resources {
  margin-top: 48px;
  padding: 0 24px;
}
@media (min-width: 640px) {
  .external-resources {
    padding: 0 48px;
  }
}
@media (min-width: 960px) {
  .external-resources {
    padding: 0 64px;
  }
}

.resource-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  max-width: 1152px;
  margin: 0 auto;
}

.resource-card {
  display: flex !important;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid var(--vp-c-bg-soft);
  background-color: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 24px;
  transition: all 0.25s;
  text-decoration: none !important;
  color: var(--vp-c-text-1) !important;
  height: 100%;
}

.resource-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.05);
}

.resource-card.golang:hover {
  border-color: #00ADD8; /* Go Blue */
  background-color: rgba(0, 173, 216, 0.05);
}

.resource-card.fe:hover {
  border-color: #F7DF1E; /* JS Yellowish */
  background-color: rgba(247, 223, 30, 0.05);
}

.card-content {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 20px;
}

.icon {
  font-size: 32px;
  line-height: 1;
  padding: 8px;
  background: var(--vp-c-bg);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.resource-card h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
}

.resource-card p {
  margin: 4px 0 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
}

.link-text {
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  display: flex;
  align-items: center;
  gap: 4px;
}

.resource-card:hover .link-text {
  color: var(--vp-c-brand-2);
}
</style>
