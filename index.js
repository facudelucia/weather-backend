const express = require('express')
require("dotenv").config();
const axios = require('axios')
const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json())


app.get('/v1/location', async (req, res) => {
    try {
        const { data } = await axios('http://ip-api.com/json')
        res.status(200).json({
            'ok': true,
            data
        })
    } catch (error) {
        res.status(500).json({
            'ok': false,
            'msg': 'Internal server error'
        })
    }
})

app.get('/v1/current/:city?', async (req, res) => {
    try {
        var city = req.params.city
        if (!city) {
            const { data: dataLocation } = await axios('http://ip-api.com/json')
            let lat = dataLocation.lat
            let lon = dataLocation.lon
            const { data } = await axios(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.API_KEY}`)
            res.status(200).json({
                'ok': true,
                data
            })
        } else {
            const { data } = await axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.API_KEY}`)
            res.status(200).json({
                'ok': true,
                data
            })
        }
    } catch (error) {
        if(error?.response?.data?.cod && error?.response?.data?.message){
            res.status(error?.response?.data?.cod).json({
                'ok': false,
                'msg': error?.response?.data?.message
            })
        }else{
            res.status(500).json({
                'ok': false,
                'msg': 'Internal server error'
            })
        }
    }
})

app.get('/v1/forecast/:city?', async (req, res) => {
    try {
        var city = req.params.city
        if (!city) {
            const { data: dataLocation } = await axios('http://ip-api.com/json')
            let lat = dataLocation.lat
            let lon = dataLocation.lon
            const { data } = await axios(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.API_KEY}`)
            res.status(200).json({
                'ok': true,
                data
            })
        } else {
            const { data } = await axios(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${process.env.API_KEY}`)
            res.status(200).json({
                'ok': true,
                data
            })
        }
    } catch (error) {
        if(error?.response?.data?.cod && error?.response?.data?.message){
            res.status(error?.response?.data?.cod).json({
                'ok': false,
                'msg': error?.response?.data?.message
            })
        }else{
            res.status(500).json({
                'ok': false,
                'msg': 'Internal server error'
            })
        }
    }
})

const port = process.env.PORT || 4000

app.listen(port, () => console.log(`listening on port ${port}`))


module.exports = app