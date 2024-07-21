const APIClient = (endpoint, method, data, resCallback, resError) => $.ajax({
    url: endpoint,
    type: method,
    data: data,
    dataType: 'json',
    success: (data) => {
        resCallback(data);
    },
    error: (error) => {
        resError(error)
    }
});

export default APIClient;