// Here lies CORS middleware for the Client-Server comm
import * as cors from 'cors'

const whitelist = new Set(['https://example.com', 'http://localhost:3000'])
const corsOptions: cors.CorsOptions = {
  optionsSuccessStatus: 200, // This prevent some legacy browsers (IE11, various SmartTVs) choke on 204
  origin: function (origin: any, callback) {
    if (whitelist.has(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true, // Access-Control-Allow-Credential. Remember to set it on Client side React (withCredentials for axios)
}

export default corsOptions
