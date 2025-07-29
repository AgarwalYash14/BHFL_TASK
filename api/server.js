const express = require('express')
const app = express()
app.use(express.json())

const USER = {
    name: 'yash_agarwal',
    dob: '14082004',
    email: 'yash973.be22@chitkara.edu.in',
    roll_number: '2210990973',
}

function processData(data) {
    let odd = [],
        even = [],
        alpha = [],
        special = [],
        sum = 0,
        chars = []

    data.forEach((val) => {
        if (!isNaN(val)) {
            const num = parseInt(val)
            sum += num
            ;(num % 2 === 0 ? even : odd).push(val.toString())
        } else if (/^[a-zA-Z]+$/.test(val)) {
            alpha.push(val.toUpperCase())
            chars.push(...val.toLowerCase())
        } else {
            special.push(val)
        }
    })

    chars.reverse()
    const concat = chars
        .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
        .join('')

    return { odd, even, alpha, special, sum: sum.toString(), concat }
}

app.post('/bfhl', (req, res) => {
    const { data } = req.body
    if (!Array.isArray(data)) {
        return res
            .status(400)
            .json({ is_success: false, error: 'Invalid input' })
    }
    const r = processData(data)
    res.status(200).json({
        is_success: true,
        user_id: `${USER.name}_${USER.dob}`,
        email: USER.email,
        roll_number: USER.roll_number,
        odd_numbers: r.odd,
        even_numbers: r.even,
        alphabets: r.alpha,
        special_characters: r.special,
        sum: r.sum,
        concat_string: r.concat,
    })
})

module.exports = app
