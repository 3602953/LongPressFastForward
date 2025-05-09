(() => {
    const HOLD_DELAY = 300;   // 长按阈值 (ms)
    let active = false;
    let isSpeedMode = false;
    let holdTimeout = null;
    let speedMultiplier = 3;
    let direction = null;
    let hasVideo = false;

    // 检查页面是否有视频元素
    function checkForVideo() {
        const video = document.querySelector('video');
        hasVideo = !!video;
        if (!hasVideo) {
            // 如果页面没有视频，移除事件监听器
            window.removeEventListener('keydown', onKeyDown, true);
            window.removeEventListener('keyup', onKeyUp, true);
        } else {
            // 如果页面有视频，添加事件监听器
            window.addEventListener('keydown', onKeyDown, true);
            window.addEventListener('keyup', onKeyUp, true);
        }
    }

    // 初始检查
    checkForVideo();

    // 监听DOM变化，检测视频元素的添加和移除
    const observer = new MutationObserver(() => {
        checkForVideo();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // 获取并监听倍速值
    chrome.storage.sync.get({ speedMultiplier: 3 }, ({ speedMultiplier: stored }) => {
        speedMultiplier = stored;
    });

    chrome.storage.onChanged.addListener(changes => {
        if (changes.speedMultiplier) {
            speedMultiplier = changes.speedMultiplier.newValue;
        }
    });

    // 跳过时间
    function skip(seconds) {
        const video = document.querySelector('video');
        if (video) video.currentTime = Math.max(0, video.currentTime + seconds);
    }

    // 设置倍速播放，支持负向"伪倒放"
    function setSpeed(rate) {
        const video = document.querySelector('video');
        if (!video) return;

        if (rate > 0) {
            video.playbackRate = rate;
            clearInterval(window.backwardTimer);
            window.backwardTimer = null;
        } else {
            video.playbackRate = 1;
            clearInterval(window.backwardTimer);
            window.backwardTimer = setInterval(() => {
                if (video.currentTime > 0.1) {
                    video.currentTime -= 0.1 * Math.abs(rate);
                } else {
                    video.currentTime = 0;
                }
            }, 100);
        }
        video.play();
        showIndicator(`${Math.abs(rate)}× ${rate > 0 ? '→' : '←'}`);
    }

    // 显示倍速浮窗
    document.addEventListener('DOMContentLoaded', () => {
        const indicator = document.createElement('div');
        indicator.id = 'speed-indicator';
        Object.assign(indicator.style, {
            position: 'fixed',
            bottom: '20px',
            right:  '20px',
            background: 'rgba(0,0,0,0.7)',
            color:      '#fff',
            padding:    '6px 10px',
            borderRadius:'4px',
            fontSize:   '14px',
            fontFamily: 'sans-serif',
            zIndex:     '999999',
            pointerEvents:'none',
            transition: 'opacity 0.3s',
            opacity:    '0',
        });
        document.body.appendChild(indicator);

        window.showIndicator = (text) => {
            indicator.textContent = text;
            indicator.style.opacity = text === '1' ? '0' : '1';
        };
    });

    // 键盘事件拦截
    function onKeyDown(e) {
        if (!hasVideo) return;
        if (e.code !== 'ArrowRight' && e.code !== 'ArrowLeft') return;
        const tag = document.activeElement.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || (tag === 'DIV' && document.activeElement.isContentEditable)) return;

        e.preventDefault();
        e.stopImmediatePropagation();

        if (!active) {
            active = true;
            direction = e.code === 'ArrowRight' ? 'forward' : 'backward';
            holdTimeout = setTimeout(() => {
                isSpeedMode = true;
                const multiplier = direction === 'forward' ? speedMultiplier : -speedMultiplier;
                setSpeed(multiplier);
                holdTimeout = null;
            }, HOLD_DELAY);
        }
    }

    function onKeyUp(e) {
        if (!hasVideo) return;
        if (e.code !== 'ArrowRight' && e.code !== 'ArrowLeft') return;
        e.preventDefault();
        e.stopImmediatePropagation();

        if (holdTimeout) {
            clearTimeout(holdTimeout);
            holdTimeout = null;
            skip(e.code === 'ArrowRight' ? 5 : -5);
        } else if (isSpeedMode) {
            setSpeed(1);
            clearInterval(window.backwardTimer);
            window.backwardTimer = null;
            showIndicator('1');
            isSpeedMode = false;
        }

        active = false;
        direction = null;
    }

    window.addEventListener('beforeunload', () => {
        const ind = document.getElementById('speed-indicator');
        if (ind) ind.remove();
        clearInterval(window.backwardTimer);
        observer.disconnect();
    });
})();
