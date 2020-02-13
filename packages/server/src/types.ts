/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express'
import * as http from 'http'

export interface Application extends express.Application {
  onClose?: () => Promise<any>
  onListen?: (server: http.Server) => Promise<any>
}

// Extend http.Server but completely replace close
export interface Server extends Omit<http.Server, 'close'> {
  originalClose: any
  app: Application
  close: (cb: (err?: Error) => void) => Promise<any>
}
