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


## TODO
- [ ]環境變數獲取
- [ ]狀態資料確認 目前 import 內部程式碼似乎要特別設定 待確認是否用 unit test