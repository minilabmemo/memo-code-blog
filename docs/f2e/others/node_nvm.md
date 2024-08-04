

# NVM

NVM 全名 Node Version Manager 


## 預設 node 版本
如果你裝了多個版本，每次打開新專案，預設版本可能不是最新的，你可以更改預設 node 版本


要更改 `nvm` 的默認 Node.js 版本，可以使用 `nvm alias default <version>` 命令，其中 `<version>` 是你想設置為默認的 Node.js 版本號。根據你的列表，你有以下幾個選擇：

- v14.17.0
- v18.16.1
- v20.9.0
- v20.13.1

例如，如果你想將默認版本設置為 `v20.13.1`，你可以執行以下命令：

```bash
nvm alias default v20.13.1
```

這樣，當你打開新的終端窗口或執行 `nvm use default` 時，`nvm` 會自動切換到 `v20.13.1` 版本。

確認更改是否成功，你可以再次執行 `nvm ls`，應該會看到 `default -> v20.13.1`：

```bash
$ nvm ls
       v14.17.0
       v18.16.1
        v20.9.0
->     v20.13.1
         system
default -> v20.13.1
iojs -> N/A (default)
unstable -> N/A (default)
node -> stable (-> v20.13.1) (default)
stable -> 20.13 (-> v20.13.1) (default)
```

希望這能幫助你成功更改默認的 Node.js 版本！

## 專案內設定
版本「EX:v20.13.1」紀錄在.nvmr 檔案，使用 nvm use 可快速切換（如未安裝該版本可能提示 nvm install）。
