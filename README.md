# xyks 小猿口算逃课打法 (🚧WIP)

```
口算对小学森过于幼稚，但是对大学生刚刚好
(什么？社畜就不能玩了？还有王法吗?)
```
## 需求分析
```
社畜实在没时间玩，最短的时间装最大的B，参与一把排行榜赶紧跑路享受周末。
```

## 环境搭建
```
Android Emulator (MuMu12)
frida x86_64 15.2.2
```
💡理论上任何能够hook Java层代码的环境均可实现，使用模拟器相对方便，无需纠结于[frida](https://github.com/frida/frida) 版本
逆向环境配置可参照[xyks](https://github.com/xmexg/xyks) 项目，再次感谢，省了不少时间

## Usage
```
python xyks.py
(然后手搓一把)
```

## 核心方案
口算练习模块使用Java 层代码实现
口算PK模块用的webview vue框架实现

```
最快的办法当然是直接修改成绩，老年人的手速当然是打不过年轻人和纯视觉的
```

### 口算练习
口算练习排行榜的核心指标为手速，以下省去一堆逆向分析脏活累活
连蒙带猜 
最终定位到成绩提交的类为 com.fenbi.android.leo.exercise.data.d2
耗时字段 costTime
直接上钩子 将costTime锁定为0
然鹅最终结果并没有发生变化，猜测可能还有一个记录总耗时的字段
翻到 com.fenbi.android.leo.exercise.data.p1 也有一个costTime
不过这个字段没有set方法，hook construct 就可以解决
核心代码位于 interceptor.js

最终效果

但是目前低于0.21秒的成绩都不会被系统以及排行榜承认
所以需要调整js中的耗时在210ms左右

### 口算PK
这个模块 可以参考xyks，使用算法助手开启webview，在 bh5\leo-web-oral-pk\exercise_d4addc92615b5f1c.js的saveLocalResult 打上断点，用console hook一下saveLocalResult
修改costTime即可。但是存在的问题是必须要手动做完题才能触发，很可能在老年人做题过程中被对方秒了，不像练习没有时长限制。
一个很好的思路是在获取题目后接emit("finishExercise")，使用js补齐答案，直接进行提交。
做题思路位于 pk.js，不过因为ROI并不高，最终没有动力写下去了（逃，享受周末）。

## TODO

- [ ] frida 的hook 可以改写未 LSPosed 进行集成

- [ ] 半自动的做题方式还可以优化为全自动

PRs are welcome

## 免责声明
本项目无任何收费项目，禁止用于任何商业行为，仅供学习交流使用，侵删

## reference
[xyks](https://github.com/xmexg/xyks) 小猿口算逆向笔记

[frida](https://github.com/frida/frida) Dynamic instrumentation toolkit for developers, reverse-engineers, and security researchers.