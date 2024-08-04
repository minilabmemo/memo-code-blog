---
title: "[python 01]安裝與執行 python"
tags:
  - python
  - vscode
categories:
  - [Backend,python]
date: 2021-02-10 16:42:58
---

>純紀錄 python 與在 vscode 快速執行 python 


<!--more-->

## 安裝 python
Python 的安裝有分兩種：一種到 Python 官網下載後安裝即可，另一種便是使用 Anaconda 安裝，Anaconda 會幫你管理 Python 的環境及函式庫，是一個 all-in-one 的 Python 開發環境，很適合初學者。

Python 3.8.5 (default, Sep  3 2020, 21:29:08) [MSC v.1916 64 bit (AMD64)] :: Anaconda, Inc. on win32

安裝完就會有 Anaconda-Navigator
應用中也會有 Jupyter，可以在網頁上執行 Python 程式碼還有 Spyder 等等，你也可以從中看到安裝

pip 的基本功能就是安裝套件 The Python Package Installer（下面再詳細介紹）
>pip --version
pip 20.2.4 from D:\ProgramData\Anaconda3\lib\site-packages\pip (python 3.8)


ref:[Python 教學第 0 章-Anaconda 完整安裝教學及搭建 vscode 開發環境](https://www.woodowlab.com/python-tutorial-0-anaconda/)


### mac 環境
mac 內建但版本可能較舊，先確認版本
```
$ python3 --version
Python 3.11.4
```





## vscode
vscode
1.plugin 安裝 python
2.新增檔案 xxx.py

```
print("Hello world! Python")
print("By Eyelash")
```
- 「如果沒裝 1 的話也會跳出建議喔」
- 這時就可以對檔案按下 Run，就會在終端機執行了。


## pip 安裝模組
安裝模組
$ pip install 模組名
移除模組
$ pip uninstall 模組名
搜尋模組
$ pip search 模組名
開發時將已安裝模組名稱和版本號存成列表，以便下次安裝使用
$ pip freeze > requirements.txt
根據 requirements.txt 列表安裝模組
$ pip install -r requirements.txt

Ref:
https://blog.techbridge.cc/2017/06/03/python-web-flask101-tutorial-introduction-and-environment-setup/


-  範例
```
mac 環境
 pip3 install flask
```