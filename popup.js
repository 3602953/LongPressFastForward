document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('speedInput');
    const saveBtn = document.getElementById('saveBtn');
    const status = document.getElementById('status');

    // 读取当前倍速
    chrome.storage.sync.get({ speedMultiplier: 3 }, ({ speedMultiplier }) => {
    input.value = speedMultiplier;
    });

    saveBtn.addEventListener('click', () => {
    const newVal = parseFloat(input.value);
    if (isNaN(newVal) || newVal < 1) {
        status.textContent = '请输入 ≥1 的数字';
        status.textContent = 'Please enter a number greater than or equal to 1';
        return;
    }

    chrome.storage.sync.set({ speedMultiplier: newVal }, () => {
        status.textContent = `保存成功 Saved`;
        setTimeout(() => status.textContent = '', 1500);
    });
    });
});
