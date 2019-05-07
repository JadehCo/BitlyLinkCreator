const { request } = require('https')
const BitlyToken = "BITLY_API_TOKEN_HERE"

function BitlyLink(longURL) {
  return new Promise((resolve, reject) => {

    let sendData = JSON.stringify({
      long_url: longURL.toString()
    })

    let ReqObj = request({
      hostname: "api-ssl.bitly.com",
      path: "/v4/bitlinks",
      method: "POST",
      protocol: "https:",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${BitlyToken}`
      }
    }, res => {
      let body = ''
      res.on("data", c => body += c.toString())
      res.on('end', () => {
        let b = JSON.parse(body)
        if(b.link){
          resolve(b.link)
        } else reject("Empty Response")
      })
    })

    ReqObj.on('error', err => reject(err))
    ReqObj.write(sendData, () => ReqObj.end())
  })
}


// BitlyLink("https://jadeh.co/pay/457845455454545").then(link => {
//   console.log(link)
// }).catch(e => console.log(e))

module.exports = BitlyLink
