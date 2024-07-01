export interface ClientsData {
    id: string,
    name: string,
    cpf: string,
    email: string,
    birthDate: string,
    phone: string,
    address: string,
    firstQuery: string,
    recurrence: string,
    job: string,
    origin: string,
    history: {
      title: string,
      description: string,
      image?: string,
      createdAt: string,
      startTime: string,
      editedAt: string[],
    }[],
    nextEvents: {
        title: string,
        date: string,
        startTime: string,
        endTime: string,
    }[],
}

//Requests

export interface FetchClientRequest {
    id: string
}

export interface CreateClientRequest {
    data: ClientsData
}

export type EditClientRequest = ClientsData

//Responses

export interface FetchAllClientsResponse {
    data: ClientsData[]
}

export interface FetchClientResponse {
    data: ClientsData
}

export interface CreateClientResponse {
    data: ClientsData
}