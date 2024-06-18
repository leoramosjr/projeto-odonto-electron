import {
    Flex,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Tr,
} from '@chakra-ui/react';
import Input from '../../base/Input';
import Select from '../../base/Select';
import { useState } from 'react';
import { ClientsData } from '~/src/shared/types/ipc';
import { cpfMask } from '../../../utils/cpfMask';
import { phoneMask } from '../../../utils/phoneMask';

interface IHistory {
    title: string,
    description: string,
    createdAt: string,
    image?: string,
    editedAt: string[],
}

export default function ClientInfos({
    isEditing,
    userData,
} : {
    isEditing: boolean,
    userData: ClientsData, 
}): JSX.Element {

    const [data, setData] = useState<ClientsData>(userData!)
    return (
        <Flex w="100%" gap="2rem">
            <Flex direction="column" w="70%" gap="1rem">
                <Text
                    fontSize="1.5rem"
                    fontWeight="700"
                    fontFamily="Dm Sans"
                    color="#1A202C"
                    mb="0.5rem"
                >
                    Informações do Paciente
                </Text>
                <Flex w="100%" gap="2rem">
                    <Input
                        isEditing={isEditing}
                        bold
                        label="Data de Nascimento"
                        placeholder="04/10/1998"
                        value={data?.birthDate}
                        onChange={(e) => {
                            setData({
                                ...data,
                                birthDate: Intl.DateTimeFormat('en-US').format(new Date(e.target.value)),
                            });
                        }}
                    />
                    <Input
                        isEditing={isEditing}
                        bold
                        label="Telefone"
                        placeholder="+55 51 993043856"
                        value={data?.phone}
                        onChange={(e) => {
                            if (e.target.value.length <= 15) setData({
                                ...data,
                                phone: phoneMask(e.target.value),
                            });
                            else e.target.value = e.target.value.slice(0, 15)
                        }}
                    />
                </Flex>
                <Flex w="100%" gap="2rem">
                    <Input
                        isEditing={isEditing}
                        bold
                        label="Endereço de Email"
                        placeholder="victor.mondin@gmail.com"
                        value={data?.email}
                        onChange={(e) => {
                            setData({
                                ...data,
                                email: e.target.value,
                            });
                        }}
                    />
                    <Input
                        isEditing={isEditing}
                        bold
                        label="CPF"
                        placeholder="000.000.000-00"
                        value={data?.cpf}
                        onChange={(e) => {
                            if (e.target.value.length <= 14) setData({
                                ...data,
                                cpf: cpfMask(e.target.value),
                            });
                            else e.target.value = e.target.value.slice(0, 14)
                        }}
                    />
                </Flex>
                <Flex w="100%" gap="2rem">
                    <Input
                        isEditing={isEditing}
                        bold
                        label="Ocupação"
                        placeholder="Engenheiro de beleza"
                        value={data?.job}
                        onChange={(e) => {
                            setData({
                                ...data,
                                job: e.target.value,
                            });
                        }}
                    />
                    <Input
                        isEditing={isEditing}
                        bold
                        label="Endereço"
                        placeholder="Travbessa Tia Carmem, 123"
                        value={data?.address}
                        onChange={(e) => {
                            setData({
                                ...data,
                                address: e.target.value,
                            });
                        }}
                    />
                </Flex>
                <Flex w="100%" gap="2rem">
                    <Select
                        isEditing={isEditing}
                        bold
                        label="Origem"
                        value={data?.origin}
                        onChange={(e) => {
                            setData({
                                ...data,
                                origin: e.target.value,
                            });
                        }}
                        optionsList={[
                            "Recomendação",
                            "Instagram",
                            "Google",
                            "Outros",
                        ]}
                    />
                    <Input
                        isEditing={isEditing}
                        bold
                        label="Primeira Consulta"
                        placeholder="23/09/2023"
                        value={data?.firstQuery}
                        onChange={(e) => {
                            setData({
                                ...data,
                                firstQuery: Intl.DateTimeFormat('en-US').format(new Date(e.target.value)),
                            });
                        }}
                    />
                </Flex>
                <Flex w="calc(50% - 1rem)">
                    <Select
                        isEditing={isEditing}
                        bold
                        label="Recorrência"
                        value={data?.recurrence}
                        onChange={(e) => {
                            setData({
                                ...data,
                                recurrence: e.target.value,
                            });
                        }}
                        optionsList={[
                            "Mensal",
                            "Bimestral",
                            "Trimestral",
                            "Semestral",
                            "Anual",
                        ]}
                    />
                </Flex>
            </Flex>
            <Flex direction="column" w="30%" gap="1.5rem" maxH={"22rem"}>
                <Text
                    fontSize="1.5rem"
                    fontWeight="700"
                    fontFamily="Dm Sans"
                    color="#1A202C"
                    mb="0.5rem"
                >
                    Controle de Retornos
                </Text>
                <Text
                    hidden={userData?.nextEvents === null || userData?.nextEvents && (userData?.nextEvents?.length !== 0)}
                    fontSize="1rem"
                    fontWeight="500"
                    fontFamily="Dm Sans"
                    color="#1A202C"
                >
                    Nenhum retorno agendado
                </Text>
                <TableContainer
                    hidden={!userData?.nextEvents}
                    w="100%"
                    overflowY="auto"
                    h="100%"
                >
                    <Table size="sm">
                        <Tbody width="100%">
                            {userData?.nextEvents?.map((item, index) => {
                                return (
                                    <Tr
                                        display="flex"
                                        w="100%"
                                        key={index}
                                        justifyContent="space-between"
                                        backgroundColor={index % 2 === 0 ? '#FFFFFF' : '#FAFAFA'}
                                        border="none"
                                        borderBottom="1px solid #E2E8F0"
                                    >
                                        <Td
                                            py="0.6875rem"
                                            fontSize="1rem"
                                            fontWeight="400"
                                            gap="1rem"
                                            borderBottom="none"
                                        >
                                            <Flex
                                                align="center"
                                                gap="0.5rem"
                                            >
                                                <Text
                                                    as="span"
                                                    fontSize="1rem"
                                                    fontWeight="700"
                                                >
                                                    {index + 1}-
                                                </Text>
                                                {item.title}
                                            </Flex>
                                        </Td>
                                        <Td
                                            py="0.6875rem"
                                            fontSize="1rem"
                                            fontWeight="600"
                                            borderBottom="none"
                                        >
                                            {item.date.split('/')[0] + '/' + item.date.split('/')[1]}
                                        </Td>
                                        <Td
                                            py="0.6875rem"
                                            fontSize="1rem"
                                            fontWeight="600"
                                            borderBottom="none"
                                        >
                                            {item.startTime}
                                        </Td>
                                    </Tr>
                                );
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Flex>
        </Flex>
    )
}