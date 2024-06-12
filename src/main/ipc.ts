import { ipcMain } from "electron";
import { randomUUID } from 'node:crypto'
import { IPC } from "../shared/constants/ipc";
import { ClientsData, CreateClientResponse, DeleteClientRequest, EditClientRequest, FetchAllClientsResponse, FetchClientRequest, FetchClientResponse } from "../shared/types/ipc";
import { store } from "./store";

ipcMain.handle(
    IPC.CLIENTS.FETCH_ALL,
    async (): Promise<FetchAllClientsResponse> => {
    return {
        data: Object.values(store.get('clients')),
    }
})

ipcMain.handle(
    IPC.CLIENTS.FETCH,
    async (_, { id }: FetchClientRequest): Promise<FetchClientResponse> => {
        const client = store.get(`clients.${id}`) as ClientsData

        return {
            data: client,
        }
    }
)

ipcMain.handle(
    IPC.CLIENTS.CREATE,
    async (): Promise<CreateClientResponse> => {
        const id = randomUUID()
        const client: ClientsData = {
            id,
            name: '',
            cpf: '',
            email: '',
            birthDate: '',
            phone: '',
            address: '',
            firstQuery: '',
            lastQuery: '',
            nextQuery: '',
            recurrence: '',
            job: '',
            origin: '',
            history: [],
        }

        store.set(`clients.${id}`, client)
    
        return {
            data: client,
        }
    }
)

ipcMain.handle(
    IPC.CLIENTS.SAVE,
    async (_, { id, name, cpf, email, birthDate, phone, address, recurrence, job, origin }: EditClientRequest): Promise<void> => {
        store.set(`clients.${id}`, {
            name,
            cpf,
            email,
            birthDate,
            phone,
            address,
            recurrence,
            job,
            origin,
        })
    }
)

ipcMain.handle(
    IPC.CLIENTS.DELETE,
    async (_, { id }: DeleteClientRequest): Promise<void> => {
        //@ts-ignore
        store.delete(`clients.${id}`)
    }
)
