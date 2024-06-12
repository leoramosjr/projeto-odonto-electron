import {
    Button,
    Flex,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Thead,
    Tr,
    Checkbox,
} from '@chakra-ui/react'
import Provider from '../index'
import { FiPlus } from 'react-icons/fi'
import Pagination from '../../components/Pagination'
import { useState } from 'react'

export default function Tasks(): JSX.Element {

    document.title = `Tarefas | • NR •`

    const [currentPage, setCurrentPage] = useState(1)

    return (
        <Provider>
            <Flex
                w="100%"
                h="77vh"
                direction="column"
                align="center"
                justify="space-between"
                gap="1rem"
            >
                <Flex
                    w="100%"
                    h="100%"
                    direction="column"
                    align="flex-start"
                    justify="flex-start"
                    gap="1rem"
                >
                    <Flex
                        w="100%"
                        align="center"
                        justify="space-between"
                        gap="1rem"
                    >
                        <Text
                            fontSize="1.5rem"
                            fontWeight="500"
                            fontFamily="Dm Sans"
                        >
                            Tarefas
                        </Text>
                        <Button
                            leftIcon={<FiPlus />}
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
                            Nova Tarefa
                        </Button>
                    </Flex>
                    <TableContainer
                        h="100%"
                        w="100%"
                        border="1px solid #DDD"
                        borderRadius="1rem"
                    >
                        <Table>
                            <Thead>
                                <Tr w="100%" display="flex" justifyContent={"space-between"} px="1rem">
                                    <Td px="0" fontWeight="bold">Tarefa</Td>
                                    <Td px="0" fontWeight="bold">Data</Td>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr w="100%" display="flex" justifyContent={"space-between"} px="1rem">
                                    <Td px="0"><Checkbox colorScheme='teal'>Reunião com equipe de marketing</Checkbox></Td>
                                    <Td px="0">21/07/2021</Td>
                                </Tr>
                                <Tr w="100%" display="flex" justifyContent={"space-between"} px="1rem">
                                    <Td px="0"><Checkbox colorScheme='teal'>Reunião com equipe de marketing</Checkbox></Td>
                                    <Td px="0">21/07/2021</Td>
                                </Tr>
                                <Tr w="100%" display="flex" justifyContent={"space-between"} px="1rem">
                                    <Td px="0"><Checkbox colorScheme='teal'>Reunião com equipe de marketing</Checkbox></Td>
                                    <Td px="0">21/07/2021</Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Flex>
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={3}
                />
            </Flex>
        </Provider>
    )
}