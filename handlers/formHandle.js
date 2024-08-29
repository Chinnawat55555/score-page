const sentRequest = (payload) => {
        const { student_id, password, test_type, room, ed_year } = payload;

        // URL of the API endpoint
        const apiUrl = "https://score-api.shorttermmemorykku.com/api/v1/scores"
        const params = `?student_id=${student_id}&password=${password}&test_type=${test_type}&room=${room}&ed_year=${ed_year}`
    
        // Making the GET request
        fetch(apiUrl+params)
            .then(response => {
                return response.json();
            })
            .then(res => {
                if (res.success) {
                    const resultDiv = document.getElementById('result');
                    const data = res.data[0];
                    resultDiv.innerHTML = `
                        <h2>ผลลัพธ์</h2>
                        <p>${data.score}</p>
                    `;
                } else if (!res.success && res.message === "invalid password") {
                    const resultDiv = document.getElementById('result');
                    resultDiv.innerHTML = `
                        <h2>ผลลัพธ์</h2>
                        <p>รหัสผ่านไม่ถูกต้อง</p>
                    `;
                }
            })
            .catch(error => {
                const resultDiv = document.getElementById('result');
                resultDiv.innerHTML = `
                    <h2>ผลลัพธ์</h2>
                    <p>ไม่พบการค้นหา</p>
                `;
            });
}

const formHandle = (event) => {
    event.preventDefault();
    const student_id = event.target.elements["student_id"].value;
    const password = event.target.elements["password"].value;
    const room = event.target.elements["room"].value;
    const test_type = event.target.elements["test_type"].value;
    const ed_year = event.target.elements["ed_year"].value;

    const fotmData = {
        student_id,
        password,
        room,
        test_type,
        ed_year,
    }

    sentRequest(fotmData)
}