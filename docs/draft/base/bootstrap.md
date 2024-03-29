---
outline: deep
---

# bootstrap + vue 使用筆記

## 參考文

- [怎樣也不會失手的 Bootstrap 格線運用技巧](https://ithelp.ithome.com.tw/articles/10251180)

### [30 天轉生到 bootstrap 5 的意識界系列 第 8 篇](https://ithelp.ithome.com.tw/articles/10270835)

- 在使用格線系統時最外層至少一定要有一個 .container。
- .container 下第一層不一定要是 .row。.row 內層只能是 .col。.col 上一層只能是 .row。
- 不要更改寬度（margin、padding），容易造成跑版，有需要則在 row 使用 gutters 即可，但可以加上下的 margin 與 padding。

## 基本

```

.container-fluid ：滿版 可能是無限延伸的標頭背景
.container ：固定寬度 可能是文字，標頭內容


```

## example & guild

- [bootstrap5 首頁 Snippets & examples](https://getbootstrap.com/docs/5.3/examples/)
  - 中間有很多範例可以參考，雖然這邊沒有顯示完整程式碼，但打開開發模式複製似乎就可以了。

### navBar + collapse 折疊導覽

導覽列，有 RWD 自動摺疊。

- 使用樣式

  - [範例](https://bootstrap5.hexschool.com/docs/5.1/components/navbar/#supported-content)
  - 重要的是要有 button class="navbar-toggler" 與 div class="collapse navbar-collapse" 匹配 id 和 data-bs-target

- 啟用 JS 來使摺疊按鈕啟動
  - 要引入 JS, 但不需要實體化 new 就可以運作。
  - 如果用了 new 預設 , 會變成預設展開，但可以加上{ toggle: false} 預設關閉
  - collapse 用法請見 [collapse](https://bootstrap5.hexschool.com/docs/5.1/components/collapse/#via-javascript)
  - navbar-expand-lg 決定了該在什麼時候展開

```
<script>

import Collapse from 'bootstrap/js/dist/collapse';
export default {

  mounted() {
    // var myCollapse = new Collapse(document.getElementById('navbarNav'));
  },
}
</script>


var bsCollapse = new bootstrap.Collapse(myCollapse, {
  toggle: false
})

```

- 效果：[navbars](https://getbootstrap.com/docs/5.3/examples/navbars/)

  - 自動幫你把導覽列放進側邊欄，但跟側邊抽屜不太一樣。
  - 如果想要側邊抽屜，要看 Offcanvas 效果
  - 雖然 import js 就有效果，但是需要抓到是否折疊，來進一步修改判斷或是樣式

- ### Offcanvas

  側邊抽屜，預設顯示。

  - [六角翻譯 Offcanvas (畫布)](https://bootstrap5.hexschool.com/docs/5.1/components/offcanvas/)
  - [線上效果](https://bootstrap5.hexschool.com/docs/5.1/examples/sidebars/#)
  - [官方程式碼]（https://getbootstrap.com/docs/5.3/components/navbar/#offcanvas）
    - 貼上以下官方程式碼
    - 記得引入 JS`import 'bootstrap/js/dist/offcanvas';`

```
<nav class="navbar bg-body-tertiary fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Offcanvas navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
        </ul>
        <form class="d-flex mt-3" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </div>
</nav>

```

### navbars-offcanvas

- [官方範例 navbars-offcanvas/](https://getbootstrap.com/docs/5.3/examples/navbars-offcanvas/)

  - 同時結合以上導覽列與抽屜，會自動把導覽列的東西放進抽屜
    － 雖然有了抽屜效果，但抽屜內容一樣來自導覽列列表，無法客製化內容 body(例如導覽列多加一些細節展開下拉選單？這應該要自己再次加工，好像蠻合理的，但是否不好加入？)
  - 可以利用 bs 提供的事件 js 來獲取判斷抽屜是否打開或是關閉。

    ```

    ```

  mounted() {
  var myOffcanvas = document.getElementById('offcanvasNavbar2')
  console.log('myOffcanvas', myOffcanvas);
  myOffcanvas.addEventListener('hide.bs.offcanvas', function () {
  // do something...
  alert('當 hide 方法調用時觸發');
  console.log('hidden');

  })
  myOffcanvas.addEventListener('hidden.bs.offcanvas', function () {
  // do something...
  alert('當 hidden 方法調用時觸發');
  console.log('hidden');

  })
  myOffcanvas.addEventListener('show.bs.offcanvas', function () {
  // do something...
  alert('當 show 方法調用時觸發');
  console.log('hidden');

  })
  myOffcanvas.addEventListener('shown.bs.offcanvas', function () {
  // do something...
  alert('當 shown 方法調用時觸發');
  console.log('hidden');

  })

  ```

  ```

- 但是要注意的是如果使用 this.xxx 設定資料，在事件处理程序中的 this 上下文不是组件实例，而是触发事件的 DOM 元素。要改用箭頭函示。

```
 myOffcanvas.addEventListener('hide.bs.offcanvas', () => {
    this.isCollapsed = false;
  });

  myOffcanvas.addEventListener('show.bs.offcanvas', () => {
    this.isCollapsed = true;
  });
```

### 在開啟側邊導覽列時按下連接，切換路由，背景雖然有變，但是導覽列不會自動關閉

- 先偵測路由更變了

```
  watch: {
    '$route'(to, from) {

      if (to.path !== from.path) {
        this.bsOffcanvas.hide()
      }
    }
  }
```

- 然後找到 offcanvasNavbar DOM 利用 BS JS 關閉，注意在 mounted 時去綁定，watch 後關閉即可。

```
import Offcanvas from 'bootstrap/js/dist/offcanvas'; // [!code ++]
  data() {
    return {
      bsOffcanvas: {},
    }
  },
    mounted() {  // [!code ++]

    var myOffcanvas = document.getElementById('offcanvasNavbar')
    this.bsOffcanvas = new Offcanvas(myOffcanvas, {
      toggle: false
    })


  },
  watch: {
    '$route'(to, from) {

      if (to.path !== from.path) {
        this.bsOffcanvas.hide()  // [!code ++]
      }

      //以下在這邊這樣寫沒有作用,雖然有抓到卻沒有正確關閉 / // [!code error]
      // var myOffcanvas = document.getElementById('offcanvasNavbar')
      // console.log('myOffcanvas', myOffcanvas);

      // var bsOffcanvas = new Offcanvas(myOffcanvas, {
      //   toggle: false
      // })
      // bsOffcanvas.hide()
    }
  }

```

---

## 格線系統

col 加起來要是 12，但如果超過會自動換行，可以利用在小螢幕時換行，大螢幕不換行

```
 <div class="row g-2    justify-content-center  align-items-center  ">
          <div class="col-3 col-sm-2">
            <button class="navbar-toggler btn-sm" type="button" data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
          </div>
          <div class="col-9 col-sm-4 justify-content-center  align-items-center">
            <HomeLogo></HomeLogo>
          </div>

          <div class="col-12 col-sm-5 col-md-4 justify-content-center  align-items-center">
            <UserNav></UserNav>
          </div>
        </div>
```

- row 對其可以直接加，col 對其要加上 d-flex

## 按鈕

- 如果有一行，需要均分三等份可以先用 row/co
- 但是按鈕大小似乎是依照內容，可以利用 h-100/w-100 佔滿空間。
- 如果不希望字體空間不夠時換行，可以用 text-nowrap

```
          <div class="row  justify-content-center align-items-stretch ">
              <div class="col-4   ">
                <button type="button" class="h-100 w-100 btn btn-outline-danger  "
                  @click="checkQty(product.id, itemQty)">
                  立即結帳
                </button>
              </div>
              <div class="col-4  "> <button type="button" class="h-100 w-100  btn btn-outline-danger "
                  @click="addToCart(product.id, itemQty, false)" :class="{ disabled: isCartLoading }">
                  加到購物車
                </button></div>
              <div class="col-4  ">
                <SaveButton class="h-100 w-100 " :item="{
    title: product.title, id: product.id, imageUrl: product.imageUrl, on_stock: true
  }" v-if="product.id">
                </SaveButton>
              </div>

            </div>

```

## 表格

- 表格似乎會依照內容去分隔
- table>thead>tr>th*N ,N 是幾欄的意思，table>tbody>tr>td*N,tr 是新的一行，th/td 是內容
- table>tfoot>tr>td\*N 適合作總計，用 colspan 合併欄位

```
     <tfoot>
          <tr>
            <td colspan="3" class="text-end">總計</td>
            <td class="text-end">{{ $filters.currency(cart.total) }}</td>
          </tr>
          <tr v-if="cart.final_total !== cart.total">
            <td colspan="3" class="text-end text-success">折扣價</td>
            <td class="text-end text-success">{{ $filters.currency(cart.final_total) }}</td>
          </tr>
        </tfoot>
```

- td 的內容如果要固定分 2:2/1:3 等 適合用 flex 去分，不然很容易變成圖片與內容長度不一，造成左右不平均
  - style="flex: 2;" 可以拿掉看看效果

```
     <td>
                <div class="d-flex  gap-2 ">
                  <div style="flex: 1;width: 100px"> <img :src="item.product.imageUrl" alt="imageUrl"
                      class="flex-image"></div>
                  <div style="flex: 2;" class=" d-flex   flex-column  align-items-start text-start gap-2">
                    <div class=""> {{ item.product.title }}</div>
                    ............................
                  </div>
                </div>
              </td>
```

## 樣式修改

### 基本設定

### 新增顏色

利用 theme-colors: map-merge 加入顏色 map, 新增樣式為 map key

```
//自訂義 colors map start//
$custom-colors: (
  "custom-color": #900
);

$theme-colors: map-merge($theme-colors, $custom-colors);
$theme-colors: map-merge($theme-colors, $oranges);//oranges BS 上面已有定義
$theme-colors: map-merge($theme-colors, $grays);

//自訂義 colors map end//


//使用

class="bg-orange-100"
class="bg-100"  -> gray key

```

### 取代顏色設定

直接在樣式中，插入變數就可以取代！！

```
.btn-outline-primary:hover {
  --bs-btn-hover-color: white;
}

```
