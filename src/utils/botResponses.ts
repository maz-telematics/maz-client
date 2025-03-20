export const getBotAnswer = (question: string): string => {
    const q = question.toLowerCase().trim();
    if (q.includes('телематика')) return 'Система телематики собирает данные о транспорте.';
    if (q.includes('как подключить')) return 'Установите устройство и настройте его в системе.';
    if (q.includes('контакты')) return 'Свяжитесь с нами: +375 (29) 177-12-11';
    return 'Не могу ответить. Позвоните: +375 (29) 177-12-11';
};