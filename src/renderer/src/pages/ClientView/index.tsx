import {
    Flex,
    Text,
    Button,
    Table,
    TableContainer,
    Tbody,
    Td,
    Thead,
    Tr,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react';
import { FiEdit, FiCheckSquare } from 'react-icons/fi';
import Provider from '../index.js';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import PostModal from '../../components/clients/PostModal';
import EventModal from '../../components/EventModal';
import ClientInfos from '../../components/clients/ClientInfos';
import { useState } from 'react';

interface IHistory {
    title: string,
    description: string,
    createdAt: string,
    image?: string,
    startTime: string,
    editedAt: string[],
}

export default function ClientView(): JSX.Element {

    const userId = useParams()

    const { data } = useQuery({
        queryKey: ['clients', userId.id],
        queryFn: async () => {
            const response = await window.api.fetchClient({id: userId.id!});
            return response.data;
        },
    });

    const { isOpen: isOpen, onOpen: onOpen, onClose: onClose } = useDisclosure();
    const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2} = useDisclosure();
    const { isOpen: isOpen3, onOpen: onOpen3, onClose: onClose3} = useDisclosure();
    const [isEditing, setIsEditing] = useState(false)
    const [activePost, setActivePost] = useState<IHistory | null>(null)
    
    document.title = `${data?.name} | • NR •`

    return (
        <Provider>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent minW="57.5rem">
                    <ModalHeader fontWeight={"bold"} fontSize={"1.5rem"}>Nova Postagem</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {data && <PostModal
                            data={
                                {
                                    title: "",
                                    description: "",
                                    createdAt: "",
                                    image: "",
                                    startTime: "",
                                    editedAt: [],
                                }
                            }
                        />}
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Modal isOpen={isOpen2} onClose={onClose2}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontWeight={"bold"} fontSize={"1.5rem"}>Novo Evento</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {data && <EventModal />}
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Modal isOpen={isOpen3} onClose={onClose3}>
                <ModalOverlay />
                <ModalContent minW="57.5rem">
                    <ModalHeader fontWeight={"bold"} fontSize={"1.5rem"}>{activePost?.title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {data && <PostModal data={activePost!} editable />}
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Flex
                w="100%"
                minH="100%"
                direction="column"
                justify="space-between"
                align="flex-start"
                gap="2rem"
                px="3.375rem"
                overflowY="auto"
            >
                <Flex
                    w="100%"
                    align="center"
                    justify="space-between"
                >
                    <Flex align="center" gap="1.5rem">
                        <Flex
                            w="5.75rem !important"
                            h="5.75rem !important"
                            bg="#066964"
                            borderRadius="50%"
                            justify="center"
                            align="center"
                        >
                            <Text
                                fontSize="2rem"
                                fontWeight="600"
                                fontFamily="Dm Sans"
                                color="white"
                                letterSpacing="0.00644rem"
                                lineHeight="1.6rem"
                                textAlign="center"
                            >
                                {data?.name && data.name.includes(" ") ? data.name[0] + data.name.split(" ")[1][0] : data?.name[0]}
                            </Text>
                        </Flex>
                        <Text
                            fontSize="1.5rem"
                            fontWeight="700"
                            flexWrap="wrap"
                            wordBreak="break-word"
                        >
                            {data?.name} | {data?.id}
                        </Text>
                        <Flex>
                            <FiEdit
                                size="1.5rem"
                                color="#B5B5B5"
                                style={{
                                    cursor: 'pointer',
                                    display: isEditing ? 'none' : 'block'
                                }}
                                onClick={() => setIsEditing(true)}
                            />
                            <FiCheckSquare
                                size="1.5rem"
                                color="#B5B5B5"
                                style={{
                                    cursor: 'pointer',
                                    display: isEditing ? 'block' : 'none'
                                }}
                                onClick={() => setIsEditing(false)}
                            />
                        </Flex>
                    </Flex>
                    <Flex gap="2rem">
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
                            onClick={onOpen2}
                        >
                            Criar Evento
                        </Button>
                        <Button
                            bg="#054945"
                            color="white"
                            fontWeight="bold"
                            fontSize="0.875rem"
                            lineHeight="1.25rem"
                            transition="all 0.1s ease-in-out"
                            px="1.5rem"
                            _hover={{
                                bg: '#52c8c2',
                            }}
                            onClick={onOpen}
                        >
                            Criar Postagem
                        </Button>
                    </Flex>
                </Flex>
                <Flex
                    w="100%"
                    align="flex-start"
                    justify="flex-start"
                    gap="1.5rem"
                    direction="column"
                >
                    <ClientInfos isEditing={isEditing} userData={data!} />
                    <Text
                        fontSize="1.5rem"
                        fontWeight="700"
                        fontFamily="Dm Sans"
                        color="#1A202C"
                    >
                        Postagens
                    </Text>
                    <Text
                        hidden={data?.history.length !== 0}
                        fontSize="1rem"
                        fontWeight="500"
                        fontFamily="Dm Sans"
                        color="#1A202C"
                    >
                        Nenhuma postagem encontrada
                    </Text>
                    <TableContainer w="100%" hidden={data?.history.length === 0}>
                        <Table>
                            <Thead>
                                <Tr w="100%" display="flex" justifyContent={"space-between"} px="1rem">
                                    <Td px="0" fontWeight="bold">Postagem</Td>
                                    <Flex w="30%" justify="space-between">
                                        <Td px="0" fontWeight="bold">Data de Criação</Td>
                                        <Td px="0" fontWeight="bold">Última Edição</Td>
                                    </Flex>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data?.history?.map((item, index: number) => (
                                    <Tr
                                        px="1rem"
                                        key={index}
                                        w="100%"
                                        display="flex"
                                        justifyContent={"space-between"}
                                        onClick={() => {
                                            setActivePost(item)
                                            onOpen3()
                                        }}
                                        backgroundColor={index % 2 === 0 ? '#FFFFFF' : '#FAFAFA'}
                                        borderBottom="1px solid #E2E8F0"
                                        cursor="pointer"
                                        _hover={{
                                            backgroundColor: '#F5F5F5'
                                        }}
                                        transition="all 0.2s ease-in-out"
                                    >
                                        <Td px="0">{item.title ?? ''}</Td>
                                        <Flex w="30%" justify="space-between">
                                            <Td px="0" fontSize="1rem" fontWeight="600">{item.createdAt ?? ''}</Td>
                                            <Td px="0" fontSize="1rem" fontWeight="600">{item.editedAt[0] ?? ''}</Td>
                                        </Flex>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Flex>
            </Flex>
        </Provider>
    )
}