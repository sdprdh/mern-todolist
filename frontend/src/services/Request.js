const base_url = import.meta.env.VITE_API_URL;

const request = async ({ url, method = 'GET', body }) => {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${base_url}/api/${url}`, options);

        const data = await response.json();

        return data;
    } catch (error) {
        return error.message;
    }
};

export default request;
