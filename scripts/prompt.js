const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// pretending to be like the browser's prompt
function prompt (question) {
  return new Promise((resolve, reject) => {
    rl.question(question, (answer) => {
      resolve(answer)
    })
  })
}

// so user can properly close out the readline when done
function close () {
  rl.close()
}

module.exports = {
  prompt,
  close
}

