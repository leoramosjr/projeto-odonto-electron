import {
    Flex,
    Text,
    Button as ChakraButton,
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
import { ClientsData, EditClientRequest } from '~/src/shared/types/ipc';
import Provider from '../index.js';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import PostModal from '../../components/clients/PostModal';
import EventModal from '../../components/EventModal';
import { useEffect, useState } from 'react';
import Input from '../../components/base/Input';
import { cpfMask } from '../../utils/cpfMask.js';
import { phoneMask } from '../../utils/phoneMask.js';
import Select from '../../components/base/Select.js';
import { useMutation } from '@tanstack/react-query';

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
    const [editData, setEditData] = useState<ClientsData>(data!)
    
    document.title = `${data?.name} | • NR •`

    const { isPending: isCreatingDocument, mutateAsync: editClient } =
    useMutation({
      mutationFn: async () => {
        const newData = {
            id: editData.id,
            name: editData.name,
            cpf: editData.cpf,
            email: editData.email,
            birthDate: editData.birthDate,
            phone: editData.phone,
            address: editData.address,
            recurrence: editData.recurrence,
            job: editData.job,
            origin: editData.origin,
            firstQuery: editData.firstQuery,
            history: data?.history,
            nextEvents: data?.nextEvents,
        }
        const response = await window.api.editClient(newData! as unknown as EditClientRequest);
        console.log("response: ", response)
      },
      onSuccess: (data) => {
        console.log("data: ", data)
      },
    });

    useEffect(() => {
        if (isEditing === false) {
            editClient()
        }
    }, [isEditing])

    return (
        <Provider>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent minW="57.5rem">
                    <ModalHeader fontWeight={"bold"} fontSize={"1.5rem"}>Nova Postagem</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {data && <PostModal
                            data={{
                                title: "",
                                description: "",
                                createdAt: "",
                                image: "",
                                startTime: "",
                                editedAt: [],
                            }}
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
                        <ChakraButton
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
                        </ChakraButton>
                        <ChakraButton
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
                        </ChakraButton>
                    </Flex>
                </Flex>
                <Flex
                    w="100%"
                    align="flex-start"
                    justify="flex-start"
                    gap="1.5rem"
                    direction="column"
                >
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
                                    value={editData?.birthDate}
                                    onChange={(e) => {
                                        setEditData({
                                            ...editData,
                                            birthDate: Intl.DateTimeFormat('en-US').format(new Date(e.target.value)),
                                        });
                                    }}
                                />
                                <Input
                                    isEditing={isEditing}
                                    bold
                                    label="Telefone"
                                    placeholder="+55 51 993043856"
                                    value={editData?.phone}
                                    onChange={(e) => {
                                        if (e.target.value.length <= 15) setEditData({
                                            ...editData,
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
                                    value={editData?.email}
                                    onChange={(e) => {
                                        setEditData({
                                            ...editData,
                                            email: e.target.value,
                                        });
                                    }}
                                />
                                <Input
                                    isEditing={isEditing}
                                    bold
                                    label="CPF"
                                    placeholder="000.000.000-00"
                                    value={editData?.cpf}
                                    onChange={(e) => {
                                        if (e.target.value.length <= 14) setEditData({
                                            ...editData,
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
                                    value={editData?.job}
                                    onChange={(e) => {
                                        setEditData({
                                            ...editData,
                                            job: e.target.value,
                                        });
                                    }}
                                />
                                <Input
                                    isEditing={isEditing}
                                    bold
                                    label="Endereço"
                                    placeholder="Travbessa Tia Carmem, 123"
                                    value={editData?.address}
                                    onChange={(e) => {
                                        setEditData({
                                            ...editData,
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
                                    value={editData?.origin}
                                    onChange={(e) => {
                                        setEditData({
                                            ...editData,
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
                                    value={editData?.firstQuery}
                                    onChange={(e) => {
                                        setEditData({
                                            ...editData,
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
                                    value={editData?.recurrence}
                                    onChange={(e) => {
                                        setEditData({
                                            ...editData,
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
                                hidden={data?.nextEvents === null || data?.nextEvents && (data?.nextEvents?.length !== 0)}
                                fontSize="1rem"
                                fontWeight="500"
                                fontFamily="Dm Sans"
                                color="#1A202C"
                            >
                                Nenhum retorno agendado
                            </Text>
                            <TableContainer
                                hidden={!data?.nextEvents}
                                w="100%"
                                overflowY="auto"
                                h="100%"
                            >
                                <Table size="sm">
                                    <Tbody width="100%">
                                        {data?.nextEvents?.map((item, index) => {
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
                                <Tr
                                    w="100%"
                                    display="flex"
                                    justifyContent={"space-between"}
                                    px="1rem"
                                    borderBottom="1px solid #E2E8F0"
                                >
                                    <Td px="0" fontWeight="bold" border="none">Postagem</Td>
                                    <Flex w="30%" justify="space-between">
                                        <Td px="0" fontWeight="bold" border="none">Data de Criação</Td>
                                        <Td px="0" fontWeight="bold" border="none">Última Edição</Td>
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