export const baseUrl = "http://localhost:5000/api"; // Базовый URL для API запросов

export const postRequest = async (url, body) => { // Функция для выполнения POST запросов
    const response = await fetch(url, {      // Выполнение fetch-запроса с методом POST
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body,
    })

    const data = await  response.json();// Парсинг ответа в формате JSON

    if (!response.ok) {
        let message;
        if (data?.message) {  // Если в ответе есть поле message, используем его, иначе используем весь ответ
            message = data.message;
        } else {
            message = data;
        }
        return {error: true, message};
    }

    return data;
};

export const getRequest = async (url) => {

    const response = await fetch(url);

    const data = await response.json();

    if(!response.ok){
        let message = "An error occurred..";

        if(data?.message){
            message = data.message;
        }
        return {error: true, message}
    }

    return data;
}