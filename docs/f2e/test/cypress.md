# cypress

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
