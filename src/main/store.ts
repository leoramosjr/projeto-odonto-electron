import Store from 'electron-store'
import { ClientsData } from '../shared/types/ipc'

interface StoreType {
  clients: Record<string, ClientsData>
}

export const store = new Store<StoreType>({
    defaults: {
        clients: {}
    },
})