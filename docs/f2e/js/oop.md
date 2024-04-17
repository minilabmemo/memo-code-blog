---
title: "[重新認識 Javascript 基礎] 什麼是基於原型的物件導向與原型鏈？"
tags:
  - javascript
toc: true
categories:
  - - Frontend
    - js

date: 2024-02-10 15:43:01
---

> Javascript 是一個物件導向的語言，只不過是基於原型的物件導向，本篇筆記介紹什麼是基於原型的物件導向與原型鏈。

<!--more-->

> 物件導向 Object-oriented programming，縮寫：OOP，是一種設計模式，<span class="my-hightlight ">是使用「物件」來做設計</span> ，封裝資料與操作，使得程式碼更具重用性與擴展性，易於理解與維護。

## 基於類別與基於原型

### 基於類別的物件導向

基於類別 (Class-Based) 的物件導向語言，例如 Java 和 C++。，類別（Class）是物件的抽象設計藍圖，包含資料屬性和操作方法，而物件（Object）是根據類別所創建的具體實例（Instance）。

看看 Java 的程式碼範例：

#### 1. 建立物件藍圖

```Java

class Animal {
    String name;
    int age;
    public Animal(String name, int age) {
      this.name = name;
      this.age = age;
      }
    void makeSound() {
    System.out.println("The     animal makes a sound.");
    }
}
```

#### 2. 建立物件實體

Main{}是 Java 的主程式入口，使用`類別 實例名稱 = new 類別(...)`可以創建不同的物件實體。

```Java

public class Main {
    public static void main(String[] args) {
        // 創建 Animal 類別的實例 myAnimal, ....
         Animal myAnimal = new Animal("Dog", 3);
         Animal myAnimal2 = new Animal("Cat", 5);
        // 呼叫實例的操作方法
        myAnimal.makeSound();
        System.out.println("Name: " + myAnimal.name);
        System.out.println("Age: " + myAnimal.age);
        System.out.println("Name: " + myAnimal2.name);
        System.out.println("Age: " + myAnimal2.age);
    }
}
```

### 基於原型的物件導向

基於原型 (Prototype-Based) 的程式語言 JavaScript。只有物件 (Object）以原型物件作為設計藍圖獲得資料屬性和操作方法，沒有傳統類別與實例概念，但類似於建構函式和物件實例。

#### 1. 建立物件藍圖

這邊有兩種寫法，以下看看 ES5 與 ES6 差異，ES6 的寫法更為簡潔。

- ES5 建構式 寫法

```JavaScript
var Animal = function (name, age) {
  this.name = name;
  this.age = age;
};

// 在原型上添加方法 makeSound
// 共享相同方法，節省記憶體。
Animal.prototype.makeSound = function () {
  console.log('The animal makes a sound.');
};

```

- ES6 class 寫法
  在 ES2015 有提供 class 關鍵字，但那只是個語法糖，JS 仍然是基於原型的語言。-MDN

```JavaScript
class Animal {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  makeSound() {
    console.log('The animal makes a sound.');
  }
}


```

#### 2. 建立物件實體

創建物件實體，使用`let 物件名 = new 建構函式(...)`創建。

```JavaScript
// 創建 Animal 實例
let myAnimal = new Animal('Cat', 3);

// 使用實例的屬性和方法
console.log(myAnimal.name);
// 輸出: Cat
console.log(myAnimal.age);
// 輸出: 3
myAnimal.makeSound();
// 輸出: The animal makes a sound.

```

## 原型鏈

看看由上述程式碼形成的原型鏈：

<!-- <img src="/images/prototype_chain.png" width="800px" /> -->

- 對象內部的 [[Prototype]]

  ```JavaScript
  console.log(myAnimal)  // 印出可以看到
  Animal {name: ‘Cat’, age: 3}
      age: 3
      name: "doggy"
      [[Prototype]]: Object
            makeSound: ƒ ()
            constructor: f(name, age)
            prototype: {makeSound: ƒ, constructor: ƒ}
            [[Prototype]]: ƒ ()

  ```

- 當對象找不到屬性時，會不斷向上尋找，可以取得原型的屬性跟方法，一層一層形成鏈結，就是原型鏈的由來。

  ```JavaScript
  myAnimal.makeSound();

  ```

- 訪問對象原型 (內部的 `[[Prototype]]` )
  語法： `obj.__proto__ `不過這個用法已準備移除，示例先用此表示，建議可改用 `Object.getPrototypeOf(obj)`

  ```JavaScript
  console.log(myAnimal.__proto__==Animal.prototype);  //true

  ```

- 判斷屬性是否在本身還是原型身上。
  語法：`obj.hasOwnProperty (屬性名稱)`

  ```JavaScript
  console.log(myAnimal.hasOwnProperty('makeSound')); // false
  console.log(myAnimal.__proto__.hasOwnProperty('makeSound')); // true
  ```

- 判斷 constructor 構造函數的 prototype 屬性是否在 object 的原型鏈上
  <span class="tag is-warning is-medium">語法</span>：`object instanceof constructor`
  ```JavaScript
  console.log(myAnimal instanceof Animal); // true
  console.log(myAnimal instanceof Object); // true
  console.log(myAnimal instanceof Array); // false
  ```

## 回顧總結

<script setup>
import { useScriptTag } from '@vueuse/core'

useScriptTag('//www.instagram.com/embed.js')
</script>

<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/C3KaV0QBWMZ/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/p/C3KaV0QBWMZ/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">在 Instagram 查看這則貼文</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/p/C3KaV0QBWMZ/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">Mini Lab memo 軟工女孩×小研究式（@minilab_memo）分享的貼文</a></p></div></blockquote>

---

## 網路參考文章

- Photo by <a href="https://unsplash.com/@mediamodifier?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Mediamodifier</a> on <a href="https://unsplash.com/photos/nPZzZpWhPwg?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
