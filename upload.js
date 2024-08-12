const fetch = require('node-fetch')
let data = require('./data.json')

let sentRequest = (d) => {
    return new Promise((res, rej) => {
        var raw = JSON.stringify({
            "Sector": d["Sector"],
            "SID": d["SID"],
            "Physical_Hostname": d["Physical_Hostname"],
            "SAP_System_Type": d["SAP_System_Type"],
            "OS": d["OS"],
            "DB": d["DB"],
            "Threads": d["Threads"],
            "Cores": d["Cores"],
            "Sockets": d["Sockets"],
            "CPUs": d["CPUs"],
            "Main_RAM": d["Main_RAM"],
            "Swap_RAM": d["Swap_RAM"],
            "Total_RAM": d["Total_RAM"],
            "Instances": d["Instances"],
            "Local_Storage": d["Local_Storage"],
            "Kernel_Version": d["Kernel_Version"],
            "Patch_Number": d["Patch_Number"]
        });

        var requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:3000/push", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                res()
            })
            .catch(error => { console.log('error', error); res() });

    })
}

let start = async () => {

    for (let i = 0; i < data.length; i++) {
        await sentRequest(data[i])
    }
}

start()

