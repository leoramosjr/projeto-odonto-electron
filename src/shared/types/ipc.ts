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

//REquests

export interface FetchClientRequest {
    id: string
}

export interface EditClientRequest extends ClientsData {
}

export interface DeleteClientRequest {
    id: string
}

//Responses

export interface FetchAllClientsResponse {
    data: ClientsData[]
}

export interface FetchClientResponse {
    data: ClientsData
}

export interface CreateClientRequest {
    data: ClientsData
}

export interface CreateClientResponse {
    data: ClientsData
}