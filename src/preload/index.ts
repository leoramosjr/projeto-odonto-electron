import { contextBridge, ipcRenderer } from 'electron'
import { ElectronAPI, electronAPI } from '@electron-toolkit/preload'

declare global {
  export interface Window {
    electron: ElectronAPI
    api: typeof api
  }
}

// Custom APIs for renderer
const api = {
  fetchClientList(): Promise<Array<{
    id: number,
    name: string,
    email: string,
    birthDate: string,
    phone: string,
    address: string,
    firstQuery: string,
    lastQuery: string,
    nextQuery: string,
    recurrence: string,
    job: string,
    origin: string,
    history: {
      title: string,
      description: string,
      createdAt: string,
      editedAt: string[],
    }[]
  }>> {
    return ipcRenderer.invoke('fetch-client-list')
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
