---
outline: deep
---

# cypress

## 設定自訂屬性測試

```md
<button data-testid="submit-button">Submit</button>

cy.get('[data-testid="submit-button"]').click();
```

## 內容與導向測試

- 按鈕與導向

```js
it("click nav link and back to home", () => {
  cy.visit("/");
  cy.url().should("contain", "/#");
  cy.contains(".nav-link", "熱銷").click();
  cy.url().should("contain", "/#/product/hot/all");
  cy.get("#logo").first().click();
  cy.location().should((loc) => {
    expect(loc.hash).to.eq("#/");
  });
});
```

## 不同尺寸測試

- 尺寸可以查看官網定義或是自訂 https://docs.cypress.io/api/commands/viewport

```ts
describe("Responsive Design", () => {
  it("Should display properly on mobile", () => {
    cy.viewport("iphone-6");
    // Your test assertions here
  });

  it("Should display properly on tablet", () => {
    cy.viewport("ipad-2");
    // Your test assertions here
  });

  it("Should display properly on desktop", () => {
    cy.viewport(1920, 1080);
    // Your test assertions here
  });
});
```

## 重複程式碼可以包成自訂指令

- 新增 commands.cy.js

```ts
Cypress.Commands.add("visitAndCheckPage", () => {
  cy.visit("/");
  cy.url().should("contain", "/#");
  cy.get("#logo").should("be.visible");
  cy.get("nav").should("be.visible");
  cy.get("#news").should("exist");
  cy.get("#news h4").should("contain", "連身裙");
  cy.get("#special").should("exist");
});
```

- 引用

```ts
import "./commands.cy";
describe("Responsive Design", () => {
  it("Should display properly on mobile", () => {
    cy.viewport("iphone-6");
    cy.visitAndCheckPage();
  });

  it("Should display properly on tablet", () => {
    cy.viewport("ipad-2");
    cy.visitAndCheckPage();
  });

  it("Should display properly on desktop", () => {
    cy.viewport(1920, 1080);
    cy.visitAndCheckPage();
  });
});
```

## 發送 API 測試

```js
  it('product list number test.', () => {
    cy.visit('/#/product/all/all')
    cy.request('GET', userProductsApi)
    .then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('products');

    });
```

## 登入與輸入測試

```
describe('Login Test', () => {
  it('visits the product,need login and check failed.', () => {
    cy.visit('#/admin/dashboard/products')
    cy.url().should('contain', '/login');
    cy.get('#inputEmail').type('john_doe');
    cy.get('#inputPassword').type('password123');
    cy.get('.btn').click();

    cy.get('#inputEmail').should('have.focus');
  })

})



```

## 測試是否出現不應該出現 x 軸

那天發現在手機 360 寬度上出現了捲軸，內容寬度 371，明顯超出內容爆版，於是先在 cypress 上先測試這種錯誤情況。

- devTool 開發者訊息
  clientWidth 與 scrollWidth 符合我的錯誤情境，寬度超出了。

```
console.log(window.innerWidth); 371 ??以為應該會是360??? / // [!code warning]
document.documentElement.clientWidth 360  // [!code highlight]
console.log(document.documentElement.scrollWidth); 371  // [!code highlight]


```

### 在 cypress 遇到的問題與解法：

1. 在 cypress 中無法直接抓到捲軸寬度或是否出現卷軸！0.0 所以要自己判斷

1. 在 cypress 中無法直接抓到 document，要利用他的 cy.window/ cy.document
1. 在 cypress 中抓到的 innerWidth/scrollWidth/clientWidth 數值都跟 devTool 預期的不一樣！？？沒辦法抓到爆版真正寬度？？？
1. cy.viewport("samsung-s10"); 360px 雖然抓到數值都小於真正測試寬度 360，但是抓到的 scrollWidth 的確大於 clientWidth 因此的確是錯誤情況，以此判斷
1. 奇怪得是如果用 cy.viewport('iphone-6') 理應是 375px 抓到的卻像是 360px 正確的寬度設定。以此推斷 cy.viewport("samsung-s10");抓到的是 320px??

> AI:在 Cypress 中，直接獲取文檔的 scrollWidth 可能會出現問題，因為 Cypress 測試運行在一個特殊的環境中，並不是真正的瀏覽器環境。這可能導致某些 DOM 屬性的值無法正確獲取。

- [完整測試範例](https://github.com/minilabmemo/f2e-ec-store/tree/main/cypress/e2e/scroll)

```ts
// https://on.cypress.io/api
describe("My First Test", () => {
  it("Window should not have horizontal scrollbar", () => {
    cy.viewport("samsung-s10");
    cy.visit("/");
    cy.url().should("contain", "/");
    cy.get("#footer").should("exist");
    //const documentWidth3 = document.documentElement.scrollWidth
    // cy.log('scrollWidth width:', documentWidth3)//0 直接抓 document 是抓不到的
    cy.window().then((win) => {
      const windowWidth = win.innerWidth;
      cy.log("innerWidth width:", windowWidth); //360 正確
      //const scrollWidth = document.documentElement.scrollWidth
      //cy.log('Window width:', scrollWidth)//0 直接抓 document scrollWidth 是抓不到的
      //試試抓其他內容
      // cy.log('win.scrollX:', win.scrollX)//0
      //cy.log('win.screenX:', win.screenX) //2363??
      //cy.log('win.screenX:', win.outerWidth) //1599?
      const scrollWidth = win.document.documentElement.scrollWidth;
      cy.log("scrollWidth width:", scrollWidth); //358? 不知道為什麼不等於 document.documentElement.clientWidth=371
      const clientWidth = win.document.documentElement.clientWidth;
      cy.log("clientWidth width:", clientWidth); //345? 不知道為什麼不等於 document.documentElement.clientWidth=360
      //expect(scrollWidth).to.be.at.most(windowWidth) 原本預期是應小於 windowWidth 但是因為抓到的數值竟然小於 windowWidth
      expect(scrollWidth).to.be.at.most(clientWidth); //改為應小於 clientWidth
    });

    cy.document().then((doc) => {
      //其實等於上面
      // work with document element
      cy.log("scrollWidth width:", doc.documentElement.scrollWidth); //358
      cy.log("clientWidth width:", doc.documentElement.clientWidth); //345
      cy.log("offsetWidth width:", doc.documentElement.offsetWidth); //345
      cy.log("body scrollWidth:", doc.body.scrollWidth); //358 跟上面一樣
      cy.log("innerWidth width:", doc.documentElement);
    });

    //cy.window().then(($el) => expect($el.document.body.style.overflow).to.eq('hidden'))
  });
});
```

## TODO

- [ ]環境變數獲取
- [ ]狀態資料確認 目前 import 內部程式碼似乎要特別設定 待確認是否用 unit test
- [ ]完整測試週期 if 去除？
