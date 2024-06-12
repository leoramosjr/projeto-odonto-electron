import { contextBridge, ipcRenderer } from 'electron'
import { ElectronAPI, electronAPI } from '@electron-toolkit/preload'
import { IPC } from '../shared/constants/ipc'
import { CreateClientResponse, FetchAllClientsResponse, FetchClientResponse } from '../shared/types/ipc'

declare global {
  export interface Window {
    electron: ElectronAPI
    api: typeof api
  }
}

// Custom APIs for renderer
const api = {
  fetchClientList(): Promise<FetchAllClientsResponse> {
    return ipcRenderer.invoke(IPC.CLIENTS.FETCH_ALL)
  },

  fetchClient(id: string): Promise<FetchClientResponse> {
    return ipcRenderer.invoke(IPC.CLIENTS.FETCH, { id })
  },

  createClient(): Promise<CreateClientResponse> {
    return ipcRenderer.invoke(IPC.CLIENTS.CREATE)
  },
  
  editClient(id: string): Promise<void> {
    return ipcRenderer.invoke(IPC.CLIENTS.SAVE, { id })
  },

  deleteClient(id: string): Promise<void> {
    return ipcRenderer.invoke(IPC.CLIENTS.DELETE, { id })
  }

}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  
  window.electron = electronAPI
  
  window.api = api
}
