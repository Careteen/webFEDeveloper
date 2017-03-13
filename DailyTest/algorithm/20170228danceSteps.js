// 跳台阶问题

function jumpStep(n) {
    if (n <= 0) {
        return -1;
    }
    if (n === 1) {
        return 1;
    }
    if (n === 2) {
        return 2;
    }
    return jumpStep(n - 1) + jumpStep(n - 2);
}
jumpStep(5);
