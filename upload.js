const fetch = require('node-fetch')
let data = require('./data.json')

console.log(data.yeah[0][1])
let sentRequest = (i, j) => {
    return new Promise((res, rej) => {
        var raw = JSON.stringify({
            "url": data.yeah[i][j]
        });

        var requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:3000/url", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result + " at " + i + "  " + j)
                res()
            })
            .catch(error => { console.log('error', error); res() });

    })
}

let start = async () => {

    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < data.yeah[i].length; j++) {
            await sentRequest(i, j)
        }
    }
}

start()

