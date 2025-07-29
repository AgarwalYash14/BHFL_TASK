const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = 3000

const USER = {
    name: 'yash_agarwal',
    dob: '14082004',
    email: 'yash973.be22@chitkara.edu.in',
    roll_number: '2210990973',
}

function processData(inputArray) {
    let odd = []
    let even = []
    let alphabets = []
    let specials = []
    let sum = 0
    let letters = []

    inputArray.forEach((val) => {
        if (!isNaN(val)) {
            let num = parseInt(val)
            sum += num
            ;(num % 2 === 0 ? even : odd).push(val.toString())
        } else if (/^[a-zA-Z]+$/.test(val)) {
            alphabets.push(val.toUpperCase())
            letters.push(...val.toLowerCase())
        } else {
            specials.push(val)
        }
    })

    letters.reverse()
    concat = letters
        .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
        .join('')

    return {
        odd,
        even,
        alphabets,
        specials,
        sum: sum.toString(),
        concat,
    }
}

app.post('/bfhl', (req, res) => {
    const data = req.body.data

    if (!Array.isArray(data)) {
        return res
            .status(400)
            .json({ is_success: false, error: 'Data must be an array' })
    }

    const result = processData(data)

    res.status(200).json({
        is_success: true,
        user_id: `${USER.name}_${USER.dob}`,
        email: USER.email,
        roll_number: USER.roll_number,
        odd_numbers: result.odd,
        even_numbers: result.even,
        alphabets: result.alphabets,
        special_characters: result.specials,
        sum: result.sum,
        concat_string: result.concat,
    })
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
