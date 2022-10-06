const { parse } = require('csv-parse');
const fs = require('fs');

const planetasHabitaveis = []

const habitavel = (planeta) =>{
    return planeta['koi_disposition'] === 'CONFIRMED'
    && planeta['koi_insol'] > 0.36 && planeta['koi_insol'] < 1.11
    && planeta['koi_prad'] < 1.6 
}

fs.createReadStream('kepler_data.csv')
    .pipe(parse({
        comment: '#',
        columns: true,
    }))
    .on('data', (data) => {
        if(habitavel(data)){
            planetasHabitaveis.push(data)
        }
        

    })
    .on('error', (err) => {
        console.log(err)
    })
    .on('end', () => {
        console.log(planetasHabitaveis.map((planeta) => {
            return planeta['kepler_name']
        }))
        console.log(`${planetasHabitaveis.length} planetas hábitaveis encontrados!`)
    })

