// Install typings
//

const http = require('https')
const fs = require('fs')
const path = require('path')

const TYPINGS_DIR = path.join(__dirname, '../typings')
const TYPING_SOURCES = [
  ['sequencer.d.ts', 'https://raw.githubusercontent.com/fantasycalendar/FoundryVTT-Sequencer/refs/tags/3.6.1/typings/types.d.ts']
]

for (const pair of TYPING_SOURCES) {
  const fileDest = path.join(TYPINGS_DIR, pair[0])
  const file = fs.createWriteStream(fileDest)

  console.log(`Downloading ${pair[0]}...`)

  http.get(pair[1], (response) => {
    response.pipe(file)

    file.on('finish', () => {
      file.close()
      console.log('Done!')
    })
  })
}
