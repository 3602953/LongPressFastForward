document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('speedInput');
    const saveBtn = document.getElementById('saveBtn');
    const status = document.getElementById('status');

    // 读取已保存的值（默认 3）
    chrome.storage.sync.get({ speedMultiplier: 3 }, ({ speedMultiplier }) => {
    input.value = speedMultiplier;
    });

    saveBtn.addEventListener('click', () => {
    let val = parseFloat(input.value);
    if (isNaN(val) || val < 1) {
        alert('请输入不小于 1 的数字');
        return;
    }
    chrome.storage.sync.set({ speedMultiplier: val }, () => {
        status.style.display = 'block';
        setTimeout(() => status.style.display = 'none', 1000);
    });
    });
});
