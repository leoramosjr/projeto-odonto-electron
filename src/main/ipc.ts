import { ipcMain } from "electron";
import { IPC } from "../shared/constants/ipc";
import { ClientsData, CreateClientResponse, DeleteClientRequest, EditClientRequest, FetchAllClientsResponse, FetchClientRequest, FetchClientResponse } from "../shared/types/ipc";
import { store } from "./store";

ipcMain.handle(IPC.CLIENTS.FETCH_ALL,
    async (): Promise<FetchAllClientsResponse> => {
    return {
        data: Object.values(store.get('clients')),
    }
})

ipcMain.handle(IPC.CLIENTS.FETCH, async (_, { id }: FetchClientRequest): Promise<FetchClientResponse> => {
    const client = store.get(`clients.${id}`) as ClientsData

    return { data: client }
})

ipcMain.handle(IPC.CLIENTS.CREATE, async (_, newClient: ClientsData): Promise<CreateClientResponse> => {
        const clientsLength = Object.keys(store.get('clients')).length
        let lastId =  new Array(+6 + 1 - (clientsLength + '').length).join('0') + (clientsLength + 1);

        console.log("newClient: ", newClient)

        if (lastId.length > 6) {
            const newArray = lastId.slice(lastId.length - 6, lastId.length)
            lastId = newArray
        }

        const client: ClientsData = {
            id: lastId,
            cpf: newClient.cpf,
            name: newClient.name,
            email: newClient.email,
            birthDate: new Intl.DateTimeFormat('pt-BR').format(new Date(newClient.birthDate).setDate(new Date(newClient.birthDate).getDate() + 1)),
            phone: newClient.phone,
            address: newClient.address,
            recurrence: newClient.recurrence,
            job: newClient.job,
            origin: newClient.origin,
            firstQuery: new Intl.DateTimeFormat('pt-BR').format(new Date()),
            history: [],
            nextEvents: []
        }

        console.log("client: ", client)

        store.set(`clients.${client.id}`, client)

        return {
            data: client,
        }
    }
)

ipcMain.handle(IPC.CLIENTS.SAVE,
    async (_, { id, name, cpf, email, birthDate, phone, address, recurrence, job, origin, firstQuery, nextEvents }: EditClientRequest): Promise<void> => {
        store.set(`clients.${id}`, {
			id,
			cpf,
			name,
			email,
			birthDate,
			phone,
			address,
			recurrence,
			job,
			origin,
			firstQuery,
			history,
			nextEvents,
		},
    )}
)

ipcMain.handle(IPC.CLIENTS.DELETE,
    async (_, { id }: DeleteClientRequest): Promise<void> => {
        //@ts-ignore
        store.delete(`clients.${id}`)
    }
)
