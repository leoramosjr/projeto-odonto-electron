import {
    Flex,
    Input as ChakraInput,
    Button,
    Text,
} from '@chakra-ui/react'
import { useState } from 'react'
import { FiEdit, FiCheckSquare } from 'react-icons/fi';
import Input from '../../base/Input';
import Textarea from '../../base/Textarea';

interface IHistory {
    title: string,
    description: string,
    createdAt: string,
    image?: string,
    startTime: string,
    editedAt: string[],
}

export default function PostModal({data, editable = false} : {data: IHistory, editable?: boolean}): JSX.Element {

    const [fileName, setFileName] = useState('')
    const [isEditing, setIsEditing] = useState(false)

    return (
        <Flex
            w="fit-content"
            minW="57.5rem"
            minH="100%"
            direction="column"
            align="center"
            justify="center"
            gap="1.5rem"
            px="1.5rem"
            transform="translateX(-1.5rem)"
            pb="1rem"
        >
            <Flex
                w="100%"
                align="center"
                justify="space-between"
            >
                <Flex
                    w="fit-content"
                    gap="1rem"
                >
                    <Input
                        isEditing={editable ? isEditing : true}
                        label="Criado em"
                        w="11rem"
                        value={data?.createdAt.split('/').reverse().join('-')}
                        type="date"
                    />
                    <Input
                        isEditing={editable ? isEditing : true}
                        label="Hora de início"
                        w="11rem"
                        type="time"
                        value={data?.startTime}
                        bold
                    />
                </Flex>
                <Flex h="fit-content" align="center" hidden={!editable} gap="2rem">
                    <Input
                        display={data.editedAt.length === 0 ? 'none' : 'block'}
                        isEditing={false}
                        label="Última alteração"
                        w="10rem"
                        type="date"
                        value={data.editedAt[data.editedAt.length - 1]?.split('/').reverse().join('-')}
                    />
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
            <Textarea
                isEditing={editable ? isEditing : true}
                label="Descrição"
                w="100%"
                minH="10rem"
                maxH="20rem"
                placeholder="Descreva o que aconteceu"
                resize="none"
                value={data.description}
            />
            <Flex
                w="100%"
                justify="flex-end"
                gap="1rem"
                align="center"
            >
                <Flex
                    gap="1rem"
                    align="center"
                    hidden={editable && !isEditing && !data.image}
                >
                    <Text
                        align="center"
                        fontSize="0.875rem"
                        color="#C6C6C6"
                    >
                        {fileName}
                    </Text>
                    <ChakraInput
                        isDisabled={editable ? isEditing : true}
                        display="none"
                        id="file"
                        type="file"
                        accept='.png, .jpg, .jpeg, .pdf'
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]?.name) {
                                setFileName(e.target.files[0].name)
                            }
                        }}
                    />
                    <Button
                        as="label"
                        htmlFor="file"
                        cursor="pointer"
                        bg="#43A29D"
                        color="white"
                        fontWeight="bold"
                        fontSize="0.875rem"
                        lineHeight="1.25rem"
                        transition="all 0.1s ease-in-out"
                        px="1.5rem"
                        onClick={() => document.getElementById("file")?.click()}
                        _hover={{
                            bg: '#52c8c2',
                        }}
                    >
                        {editable ? isEditing ? !data.image ? "Adicionar imagem" : "Alterar imagem" : "Ver imagem" : "Adicionar imagem"}
                    </Button>
                    <Button
                        hidden={editable}
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
                    >
                        Publicar
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    )
}