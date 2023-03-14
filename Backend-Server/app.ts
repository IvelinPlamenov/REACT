const express = require('express')
const cors = require('cors')

import {Application, json} from "express";
import {Routes} from "./Routes";

const app: Application = express()
app.use(cors())
app.use(json())
app.use(express.json())
app.listen(3001, () =>{
    console.log('Connected')
})

app.use("/bdj",Routes);



