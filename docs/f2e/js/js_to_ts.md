# javascript to typescript

## 引入討論

- [2021 LINE|導入 TypeScript 應考慮之效益與成本](https://engineering.linecorp.com/zh-hant/blog/benefits-and-costs-to-consider-when-installing-typescript)
- [2020 medium,React|TypeScript：從嘗試到暫緩 ](https://medium.com/ichef/typescript-%E5%BE%9E%E5%98%97%E8%A9%A6%E5%88%B0%E6%9A%AB%E7%B7%A9-331f883f5f9a)



## 類型工具
- [Typescript 中的 Partial, Readonly, Record, Pick](https://juejin.cn/post/6844904066489778183)
- [Typescript 高级类型 Record](https://juejin.cn/post/6844904066489778183)
- [ ]TBD 研究

## key-value 定義
- [ts 属性名不确定的情况如何下定义类型](https://blog.csdn.net/qq_34703156/article/details/122968275)

```
export type Params {
  [key:string]:string
}

```

## 枚舉字串

```
export enum ClockMode {
  Rest = 'rest',
  Work = 'work',
}
 const clockModeStr = computed<ClockMode>(() => {
      return runningMode.value ? ClockMode.Rest : ClockMode.Work;
    });
```


## API 請求類型改寫

優勢：

- 類型安全：透過 T 泛型參數，呼叫者可以明確指定傳回資料的類型，避免了手動型別斷言或型別檢查。
- 預設類型：D = any 指定了 body 參數的預設類型為 any，如果呼叫者沒有指定 D，則 body 預設為 any 類型。
- 靈活性：呼叫者可以根據特定需求自訂 T 和 D 的類型，從而獲得更精確的類型推斷。
```
import axios, { type AxiosResponse } from 'axios';
//封裝axios
  post(url: string, body: any | null, opts?: RequestOptions) { /// [!code --] 
  //缺少類型檢查：body 和回傳值都是 any 類型，失去了 TypeScript 的類型保護。
 post<T, D = any>(url: string, body: D, opts?: RequestOptions): Promise<T> {  /// [!code ++] 
 //類型安全：透過指定 Promise<T>，你可以確保呼叫者知道這個函數的回傳值是異步的，解析後得到的結果是型別 T。
    FetchAct.setOptions(opts);

    return new Promise((resolve) => {
      FetchAct.setLoading(true, opts);
      axios
        .post<T>(url, body)  /// [!code ++]
        .then((response: AxiosResponse) => {
          FetchAct.setLoading(false, opts);
          FetchAct.sendMessage(response, opts);
          resolve(response.data);
          if (!response.data.success) {
            dataErr(response);
          }
        })
        .catch((err) => {
          FetchAct.setLoading(false, opts);
          catchErr(err);
        });
    });
  }
//如果你已經在 catchErr(err); 中處理了錯誤，並且不希望將錯誤進一步傳遞到呼叫方，那麼可以不使用 Promise.reject(err);

//調用端
interface logoutResponse {  /// [!code ++]
  success: boolean;
  message?: string;
}

const router = useRouter();
function logout() {
  const url = logoutApi;
  fetchAct.post(url, null).then((res: any) => { /// [!code --]
  fetchAct.post<logoutResponse>(url, null).then((res) => { /// [!code ++]
  //類型安全：response 的類型指定，可以確保你存取的資料結構是正確的。
    if (res.success) {
      router.push('/login');
    }
  });
}
// 錯誤已經在 catchErr 中處理，因此不再需要 .catch() 區塊

```

- T, D, 和 R 只是 TypeScript 泛型參數的常見約定，它們並不是固定的單字。你可以使用任何字母或單字來命名泛型參數，只要它們能清楚地表達參數的含義。

- 常見泛型參數命名約定
  - T: 通常表示 Type，即資料的類型。
  - D: 可以表示 Data，即請求的資料型態。
  - R: 可能表示 Response，即回應的類型。