export function getSeason() {
    const month = new Date().getMonth();
    if (month < 2 || month === 11) return 'summer';
    if (month < 5) return 'spring';
    if (month < 8) return 'summer';
    return 'autumn';
}
