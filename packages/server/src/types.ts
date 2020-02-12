import express from 'express'
import * as http from 'http'

declare global {
  namespace http {
    interface Server {
      originalClose: any,
      app: PubSweet.Application,
      close: (cb: (err?: Error) => void) => Promise<any>
    }
  }
}

declare namespace PubSweet {
  interface Application extends express.Application {
    onClose: () => Promise<any>,
    onListen: (server: http.Server) => Promise<any>
  }
}

export = PubSweet