(() => {
    const HOLD_DELAY = 300;   // 长按阈值 (ms)
    let active = false;
    let isSpeedMode = false;
    let holdTimeout = null;
    let speedMultiplier = 3;  // 默认倍速

    // —— 从 storage 读初始值
    chrome.storage.sync.get({ speedMultiplier: 3 }, ({ speedMultiplier: stored }) => {
    speedMultiplier = stored;
    });
    // —— 监听 storage 改动
    chrome.storage.onChanged.addListener(changes => {
    if (changes.speedMultiplier) {
        speedMultiplier = changes.speedMultiplier.newValue;
    }
    });

    function skip(seconds) {
    const video = document.querySelector('video');
    if (video) video.currentTime = Math.max(0, video.currentTime + seconds);
    }

    function setSpeed(rate) {
    const video = document.querySelector('video');
    if (video) video.playbackRate = rate;
    showIndicator(rate);
    }

    // —— 浮窗 HTML+样式
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

    window.showIndicator = rate => {
        if (rate === 1) {
        indicator.style.opacity = '0';
        } else {
        indicator.textContent = rate.toFixed(1) + '×';
        indicator.style.opacity = '1';
        }
    };
    });

    // —— 捕获阶段拦截所有 keydown
    function onKeyDown(e) {
    if (e.code!=='ArrowRight' && e.code!=='ArrowLeft') return;
    const tag = document.activeElement.tagName;
    if (tag==='INPUT' || tag==='TEXTAREA' ||
        (tag==='DIV' && document.activeElement.isContentEditable))
        return;

    e.preventDefault();
    e.stopImmediatePropagation();

    if (!active) {
        active = true;
        holdTimeout = setTimeout(() => {
        isSpeedMode = true;
        setSpeed(speedMultiplier);
        holdTimeout = null;
        }, HOLD_DELAY);
    }
    }

    function onKeyUp(e) {
    if (e.code!=='ArrowRight' && e.code!=='ArrowLeft') return;
    e.preventDefault();
    e.stopImmediatePropagation();

    if (holdTimeout) {
        clearTimeout(holdTimeout);
        holdTimeout = null;
        // 点按
        skip(e.code==='ArrowRight'?5:-5);
    } else if (isSpeedMode) {
        // 长按结束，恢复
        setSpeed(1);
        isSpeedMode = false;
    }
    active = false;
    }

    window.addEventListener('keydown', onKeyDown, true);
    window.addEventListener('keyup',   onKeyUp,   true);
    window.addEventListener('beforeunload', () => {
    const ind = document.getElementById('speed-indicator');
    if (ind) ind.remove();
    });
})();
