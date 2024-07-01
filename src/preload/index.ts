import { contextBridge, ipcRenderer } from 'electron'
import { IPC } from '../shared/constants/ipc'
import {
  CreateClientRequest,
  CreateClientResponse,
  EditClientRequest,
  FetchAllClientsResponse,
  FetchClientRequest,
  FetchClientResponse
} from '../shared/types/ipc'

declare global {
  export interface Window {
    api: typeof api
  }
}

// Custom APIs for renderer
export const api = {
  fetchClientList(): Promise<FetchAllClientsResponse> {
    return ipcRenderer.invoke(IPC.CLIENTS.FETCH_ALL)
  },

  fetchClient(req: FetchClientRequest): Promise<FetchClientResponse> {
    return ipcRenderer.invoke(IPC.CLIENTS.FETCH, req)
  },

  createClient(req: CreateClientRequest): Promise<CreateClientResponse> {
    return ipcRenderer.invoke(IPC.CLIENTS.CREATE, req)
  },
  
  editClient(req: EditClientRequest): Promise<void> {
    return ipcRenderer.invoke(IPC.CLIENTS.SAVE, req)
  },

}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.api = api
}