const postData = async (url, data) => {
    // Async-await, синхронизирует присвоение result, перед тем как его вернет функция
    // вплоть до 30 секунд
    const result = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await result.json();

};

const getResource = async (url) => {
    // Async-await, синхронизирует присвоение result, перед тем как его вернет функция
    // вплоть до 30 секунд
    const result = await fetch(url);

    // Обработка поведения фетча при ошибках HTTP протокола
    // 2 свойства промиса возврощающегося от фетч .ok status
    // С результатом чтото не Ок=))
    if (!result.ok) {
        // Объект ошибки
        throw new Error(`Could not fetch ${url}, status ${result.status}`);
    }

    return await result.json();

};

export { postData };
export { getResource };