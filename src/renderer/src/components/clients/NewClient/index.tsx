import {
    Flex,
    Text,
    Button,
    Stack,
    Radio,
    RadioGroup,
    useToast,
} from "@chakra-ui/react"
import Input from "../../base/Input";
import Select from "../../base/Select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ClientsData } from "../../../../../shared/types/ipc";
import { useState } from "react";
import { cpfMask } from "../../../utils/cpfMask";
import { phoneMask } from "../../../utils/phoneMask";

export default function NewClient({
    onClose,
} : {
    onClose: () => void
}): JSX.Element {

    const [recurrence, setRecurrence] = useState<string>("")
    const [newClientData, setNewClientData] = useState<any>()
    const queryClient = useQueryClient()
    const toast = useToast()
    
    const { mutateAsync: createNewClient } =
    useMutation({
      mutationFn: async () => {
        console.log("newClientData: ", newClientData)
        // @ts-ignore
        const response = await window.api.createClient(newClientData);
        console.log("response: ", response)
        return response.data;
      },
      onSuccess: (data) => {
        queryClient.setQueriesData({ queryKey: ["clients"]}, (clients: ClientsData[] | undefined) => {
          if (clients && clients.length >= 0) {
            return [...clients, data]
          }
          return [data]
        })
      },
    });

    return (
        <form
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                paddingBottom: '1.5rem',
                alignItems: 'flex-end',
            }}
            onSubmit={async (e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                const data = Object.fromEntries(formData.entries())
                const newClient = {
                    id: "",
                    name: data.nome.toString(),
                    cpf: data.cpf.toString(),
                    email: data.email.toString(),
                    birthDate: data.birthday.toString(),
                    phone: data.cellphone.toString(),
                    address: "",
                    recurrence: recurrence,
                    job: data.ocupacao.toString(),
                    origin: data.origem.toString(),
                    firstQuery: new Date().toISOString(),
                    history: [],
                    nextEvents: [],
                }
                setNewClientData(newClient)
                
                if(!newClient.name) return toast({
                    title: "Nome é obrigatório",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                })
                if(!newClient.birthDate) return toast({
                    title: "Data de nascimento é obrigatório",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                })
                if(!newClient.cpf) return toast({
                    title: "CPF é obrigatório",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                })

                await createNewClient().then(() => {
                    toast({
                        title: "Paciente criado com sucesso",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                    })
                    onClose()
                    return
                }).catch((error) => {
                    toast({
                        title: "Erro ao criar novo paciente",
                        description: error.message,
                        status: "error",
                        duration: 9000,
                        isClosable: true,
                    })
                    return
                })
                return
            }}
        >
            <Input
                name="nome"
                label="Nome Completo"
                type="text"
                placeholder="Nome"
            />
            <Input
                name="birthday"
                label="Data de Nascimento"
                type="date"
            />
            <Input
                name="cellphone"
                label="Telefone"
                type="phone"
                placeholder="+55 51 98888-8888"
                onChange={(e) => {
                    if (e.target.value.length <= 15) e.target.value = phoneMask(e.target.value)
                    else e.target.value = e.target.value.slice(0, 15)
                }}
            />
            <Input
                name="email"
                label="Email"
                type="email"
                placeholder="Email"
            />
            <Input
                name="cpf"
                label="CPF"
                type="cpf"
                placeholder="000.000.000-00"
                onChange={(e) => {
                    if (e.target.value.length <= 14) e.target.value = cpfMask(e.target.value)
                    else e.target.value = e.target.value.slice(0, 14)
                }}
            />
            <Input
                name="ocupacao"
                label="Ocupação"
                type="text"
                placeholder="Dontista"
            />
            <Select
                name="origem"
                label="Origem"
                optionsList={[
                    "Recomendação",
                    "Instagram",
                    "Google",
                    "Outros",
                ]}
            />
            <Flex direction="column" gap="0.5rem">
                <Text
                    fontSize="0.75rem"
                    color="#828282"
                    bgColor="white"
                >Recorrência</Text>
                <RadioGroup
                    colorScheme="green"
                    onChange={setRecurrence}
                    value={recurrence}
                >
                    <Stack
                        direction='row'
                        display='flex'
                        w='100%'
                        justifyContent='space-between'
                        wrap={'wrap'}
                    >
                        <Radio value='Mensal'>Mensal</Radio>
                        <Radio value='Bimestral'>Bimestral</Radio>
                        <Radio value='Trimestral'>Trimestral</Radio>
                        <Radio value='Semestral'>Semestral</Radio>
                        <Radio value='Anual'>Anual</Radio>
                    </Stack>
                </RadioGroup>
            </Flex>
            <Button
                type="submit"
                mt="1.5rem"
                w="8rem"
                h="2.5rem"
                borderRadius="0.5rem"
                bg="#43A29D"
                color="white"
                _hover={{
                    bg: '#52c8c2',
                }}
            >
                Cadastrar
            </Button>
        </form>
    )
}