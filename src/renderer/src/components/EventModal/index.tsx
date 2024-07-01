import {
    Flex,
    Button,
} from '@chakra-ui/react'
import Input from '../base/Input'
import Select from '../base/Select'
import { useQuery } from '@tanstack/react-query';
import { ClientsData } from '~/src/shared/types/ipc';

export default function EventModal({
    selectable = false,
    date = '',
} : {
    selectable?: boolean
    date?: string
}): JSX.Element {

    const { data } = useQuery({
        queryKey: ['clients'],
        queryFn: async () => {
            //@ts-ignore
            const response = await window.api.fetchClientList();
            return response.data;
        },
    });

    return (
        <Flex
            w="100%"
            minH="100%"
            direction="column"
            gap="1.5rem"
            px="1.5rem"
            pb="1rem"
        >
            <Select
                display={selectable ? "flex" : "none"}
                label="Paciente"
                optionsList={data?.map((client: ClientsData) => client.name) || []}
            />
            <Input
                label="Data"
                type="date"
                placeholder="Data"
                bold
                value={date}
                isEditing={date === ''}
            />
            <Input
                label="Nome do evento"
                type="text"
                placeholder="Nome do evento"
                bold
            />
            <Flex gap="1rem">
                <Input
                    label="Hora de início"
                    type="time"
                    placeholder="Hora de início"
                    bold
                />
                <Input
                    label="Hora de término"
                    type="time"
                    placeholder="Hora de término"
                    bold
                />
            </Flex>
            <Flex w="100%" justify="flex-end">
                <Button
                    bg="#43A29D"
                    color="white"
                    fontWeight="bold"
                    fontSize="0.875rem"
                    lineHeight="1.25rem"
                    transition="all 0.1s ease-in-out"
                    px="1.5rem"
                    _hover={{
                        bg: '#52c8c2',
                    }}
                >
                    Criar Evento
                </Button>
            </Flex>
        </Flex>
    )
}