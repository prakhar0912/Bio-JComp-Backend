const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fetch = require('node-fetch');
const { json } = require('body-parser');
const Entry = require('./models/Entry')

const app = express()
const uri = "mongodb://localhost:27017/BioDB"

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', '*')
        return res.status(200).json({})
    }
    next()
})


app.get("/", (req, res) => {
    res.send("This is the home page")
})

app.post('/push', async (req, res) => {
    const entry = new Entry({
        Gene_Name: req.body["Gene_Name"],
        Transcript: req.body["Transcript"],
        Census_Tier_1: req.body["Census_Tier_1"],
        Sample_Name: req.body["Sample_Name"],
        Sample_ID: req.body["Sample_ID"],
        AA_Mutation: req.body["AA_Mutation"],
        CDS_Mutation: req.body["CDS_Mutation"],
        Primary_Tissue: req.body["Primary_Tissue"],
        Tissue_Subtype_1: req.body["Tissue_Subtype_1"],
        Tissue_Subtype_2: req.body["Tissue_Subtype_2"],
        Histology: req.body["Histology"],
        Histology_Subtype_1: req.body["Histology_Subtype_1"],
        Histology_Subtype_2: req.body["Histology_Subtype_2"],
        Pubmed_Id: req.body["Pubmed_Id"],
        CGP_Study: req.body["CGP_Study"],
        Somatic_Status: req.body["Somatic_Status"],
        Sample_Type: req.body["Sample_Type"],
        Zygosity: req.body["Zygosity"],
        Genomic_Coordinates: req.body["Genomic_Coordinates"]
    })

    try {
        const savedEntry = await entry.save()
        res.status(200).json(savedEntry)
    }
    catch (err) {
        res.status(500).json(err)
    }
})

app.use("/url", (req, res) => {
    let a = req.body.url


    let url = `
https://cancer.sanger.ac.uk/cosmic/gene/positive&export=json&sEcho=1&iColumns=19&sColumns=&iDisplayStart=0&iDisplayLength=30&mDataProp_0=0&sSearch_0=&bRegex_0=false&bSearchable_0=true&bSortable_0=true&mDataProp_1=1&sSearch_1=&bRegex_1=false&bSearchable_1=true&bSortable_1=true&mDataProp_2=2&sSearch_2=&bRegex_2=false&bSearchable_2=true&bSortable_2=true&mDataProp_3=3&sSearch_3=&bRegex_3=false&bSearchable_3=true&bSortable_3=true&mDataProp_4=4&sSearch_4=&bRegex_4=false&bSearchable_4=true&bSortable_4=true&mDataProp_5=5&sSearch_5=&bRegex_5=false&bSearchable_5=true&bSortable_5=true&mDataProp_6=6&sSearch_6=&bRegex_6=false&bSearchable_6=true&bSortable_6=true&mDataProp_7=7&sSearch_7=&bRegex_7=false&bSearchable_7=true&bSortable_7=true&mDataProp_8=8&sSearch_8=&bRegex_8=false&bSearchable_8=true&bSortable_8=true&mDataProp_9=9&sSearch_9=&bRegex_9=false&bSearchable_9=true&bSortable_9=true&mDataProp_10=10&sSearch_10=&bRegex_10=false&bSearchable_10=true&bSortable_10=true&mDataProp_11=11&sSearch_11=&bRegex_11=false&bSearchable_11=true&bSortable_11=true&mDataProp_12=12&sSearch_12=&bRegex_12=false&bSearchable_12=true&bSortable_12=true&mDataProp_13=13&sSearch_13=&bRegex_13=false&bSearchable_13=true&bSortable_13=true&mDataProp_14=14&sSearch_14=&bRegex_14=false&bSearchable_14=true&bSortable_14=true&mDataProp_15=15&sSearch_15=&bRegex_15=false&bSearchable_15=true&bSortable_15=true&mDataProp_16=16&sSearch_16=&bRegex_16=false&bSearchable_16=true&bSortable_16=true&mDataProp_17=17&sSearch_17=&bRegex_17=false&bSearchable_17=true&bSortable_17=true&mDataProp_18=18&sSearch_18=&bRegex_18=false&bSearchable_18=true&bSortable_18=true&sSearch=&bRegex=false&iSortCol_0=0&sSortDir_0=asc&iSortingCols=1
`
    let loc = a.indexOf('?')
    let loc2 = a.indexOf('#')
    let b = a.substring(loc, loc2)
    let position = url.indexOf('&')
    var output = [url.slice(0, position), b, url.slice(position)].join('');
    // console.log(output)

    try {
        let opts = {
            headers: {
                cookie: 'Pagesmith={"z":"n","a":"e"}; _ga=GA1.4.1538689886.1621940239; CookieControl={"necessaryCookies":["cosmic_session","genome_version","ordering-*","visibility-*","_hjIncludedInSample","Pagesmith","piwik_ignore"],"optionalCookies":{"cosmic-analytics":"accepted","cosmic-social":"accepted"},"initialState":{"type":"closed"},"statement":{},"consentDate":1621940239227,"consentExpiry":180,"interactedWith":true,"user":"3F01B7D9-D624-40B2-A783-41920FD1CFAC"}; _ga=GA1.3.1538689886.1621940239; _gid=GA1.4.1155377871.1622105756; cosmic_session=57655798233834854344498347367305755; _pk_id.1.8ee0=6838868bdadf63d9.1622144356.1.1622144356.1622144356.; _pk_ses.1.8ee0=*'
            }
        }
        fetch(output, opts)
            .then(res => res.text())
            .then(async (text) => {
                let done = await processData(text, output)
                if (done.code == 200) {
                    res.status(200).json("Works")
                }
                else {
                    res.status(500).json("Inside Not Works")
                }
            })
            .catch((err) => {
                res.status(400).json("Wrong URL")
            })
    }
    catch {
        res.status(500).json("Not Works")
    }
})

const pagination = (model) => {
    return async (req, res, next) => {
        const start = parseInt(req.query.start)
        const limit = parseInt(req.query.limit)

        const startIndex = start
        const endIndex = start + limit

        const results = {}

        let total, query

        if (req.body.type == 'all') {
            total = await model.countDocuments()
        }
        else if (req.body.type == 'search') {
            query = (req.body.query)
            if (Object.keys(query)[0] == "_id") {
                total = 1
            }
            else {
                total = await model.countDocuments(query)
            }
        }
        results.total = total

        if (endIndex < total) {
            results.next = {
                start: start + limit
            }
        }

        if (startIndex - limit >= 0) {
            results.previous = {
                start: start - limit
            }
        }
        try {
            if (req.body.type == 'all') {
                results.results = await model.find().limit(limit).skip(startIndex)
                res.paginatedResults = results
            }
            else if (req.body.type == 'search') {
                if (Object.keys(query)[0] == "_id") {
                    results.results = [await model.findById(query._id)]
                }
                else {
                    results.results = await model.find(query).limit(limit).skip(startIndex)
                }
                res.paginatedResults = results
            }
            next()
        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    }
}




app.use("/entries", pagination(Entry), async (req, res) => {
    res.status(200).json(res.paginatedResults)
})

app.patch("/update", async (req, res) => {
    const entry = await Entry.findById(req.body._id)
    let data = req.body
    Object.keys(data).map((key) => {
        if (key !== '_id' && key !== '__v' && key !== 'show') {
            entry[key] = data[key]
        }
    })
    const newEntry = await entry.save()
    res.status(200).json(newEntry)
})

app.delete("/delete", async (req, res) => {
    const entry = await Entry.findByIdAndDelete(req.body._id)
    res.status(200).json(entry)
})


const processData = async (data, url) => {
    return new Promise(async (res, rej) => {

        data = data.split('\n')
        for (let i = 0; i < data.length; i++) {
            data[i] = data[i].split('\t')
        }

        if(data.length == 2){
            console.log(url)
        }

        let flag = 0

        for (let i = 1; i < data.length - 1; i++) {
            const entry = new Entry({
                Gene_Name: data[i][0],
                Transcript: data[i][1],
                Census_Tier_1: data[i][2],
                Sample_Name: data[i][3],
                Sample_ID: data[i][4],
                AA_Mutation: data[i][5],
                CDS_Mutation: data[i][6],
                Primary_Tissue: data[i][7],
                Tissue_Subtype_1: data[i][8],
                Tissue_Subtype_2: data[i][9],
                Histology: data[i][10],
                Histology_Subtype_1: data[i][11],
                Histology_Subtype_2: data[i][12],
                Pubmed_Id: data[i][13],
                CGP_Study: data[i][14],
                Somatic_Status: data[i][15],
                Sample_Type: data[i][16],
                Zygosity: data[i][17],
                Genomic_Coordinates: data[i][18]
            })

            try {
                await entry.save()
                flag++
            }
            catch (err) {
                console.log("Error in entry number" + i)
            }
        }
        if (flag == data.length - 2) {
            res({
                code: 200,
                message: "Success"
            });
        }
        else {
            res({
                code: 400,
                message: "Failed"
            })
        }
    })

}



//connect to the DB
mongoose.connect(uri, { useUnifiedTopology: true }, (err) => {
    if (err) console.error(err)
    else console.log('connected!')
})

app.listen(3000)