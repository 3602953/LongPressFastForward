# Video Long Press Fast Forward Controller 🔥  
🎬 一个 Chrome 插件，帮助你更高效地观看视频：  
🎬 A Chrome extension to help you watch videos more efficiently:

- 🚀 长按 ←/→ 启动自定义倍速（默认 3×，可配置）  
  🚀 Hold ← / → to enter a custom playback speed (default is 3×, configurable)

- ✅ 松开自动恢复 1×，带浮窗提示当前速度  
  ✅ Release the key to restore to 1× speed, with an on-screen speed indicator

- 🌐 支持所有视频网站（包括但不限于 YouTube、Netflix、Zoom recordings 等）
  🌐 Works on all video websites (including but not limited to YouTube, Netflix, Zoom recordings, etc.)

---

## 🛠 安装方式（开发者模式）  Installation (Developer Mode)

1. 克隆或下载本项目，并进行解压：  
   Clone or download this project:
   ```bash
   git clone https://github.com/3602953/LongPressFastForward.git
   ```
   and upzip the file

2. 打开 Chrome 浏览器，输入 `chrome://extensions`  
   Open Chrome and go to `chrome://extensions`

3. 打开右上角"开发者模式"  
   Enable "Developer Mode" at the top-right corner

<img width="1340" alt="image" src="https://github.com/user-attachments/assets/cbd228a5-6748-4505-a0c5-7890bec4bb59" />

5. 点击"加载已解压的扩展程序"，选择本项目文件夹  
   Click "Load unpacked" and select this project folder

<img width="1340" alt="image" src="https://github.com/user-attachments/assets/56cb9398-4f15-40ee-a356-6ebf026eea06" />

6. 打开任意视频网站，尽情体验！  
   Open any video website and enjoy!

---

## ⚙ 自定义倍速  Customize Playback Speed

1. 点击工具栏图标，输入你喜欢的倍速值（如 2.5、4.0）
Click the icon from the toolbar → Enter your desired speed (e.g. 2.5, 4.0)

<img width="304" alt="image" src="https://github.com/user-attachments/assets/eadbf9a9-21c2-41ee-a75c-7bade9327dd9" />

2. 点击扩展图标 → "选项" → 输入你喜欢的倍速值（如 2.5、4.0）  
Click the extension icon → "Options" → Enter your desired speed (e.g. 2.5, 4.0)

<img width="750" alt="image" src="https://github.com/user-attachments/assets/7963efff-eff3-40b5-b0d7-2584fb5ac153" />
<img width="396" alt="image" src="https://github.com/user-attachments/assets/3d9d154a-7e41-424f-800e-b6babb95d118" />

---

## 💡 特点  Features

- 支持键盘操作，无需鼠标点击  
  Keyboard control, no mouse needed

- 自动拦截视频网站原生长按快进  
  Overrides default long-press skip behavior on video websites

- 支持浮窗实时显示当前速度  
  On-screen indicator shows current playback speed

- 设置页可自定义长按倍速值  
  Options page allows customizing the hold speed value

- 支持所有主流视频网站  
  Works on all major video platforms

---

## 📦 文件结构  Project Structure

```
.
├── manifest.json          # 插件描述  Extension manifest
│                          
├── contentScript.js       # 主功能逻辑  Main keyboard and speed logic
│                          
├── options.html           # 设置页面  Settings page UI
│                          
├── options.js             # 设置逻辑  Logic for saving custom speed
│
├── popup.html             # 工具栏弹窗UI Toolbar popup UI
│
├── popup.js               # 工具栏弹窗逻辑 Toolbar popup logic
│                          
├── icons/                 # 图标素材  Icon assets
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
│                          
└── README.md              # 项目说明文档  Project documentation
                           
```

---

## 📢 联系与反馈  Feedback & Contribution

如果你喜欢这个插件，欢迎 Star⭐、Fork🍴、PR💬！  
If you like this extension, feel free to Star ⭐, Fork 🍴, or contribute via PR 💬!

如果发现问题或想提建议，请在 [Issues](https://github.com/3602953/Youtube_LongPressFastForward/issues) 留言～  
If you have suggestions or bugs to report, open an [Issue](https://github.com/3602953/Youtube_LongPressFastForward/issues)!
