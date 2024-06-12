import {
    Flex,
    Textarea,
    Input,
    Button,
    Text,
} from '@chakra-ui/react'
import { useState } from 'react'

export default function PostModal(): JSX.Element {

    const [fileName, setFileName] = useState('')

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
                justify="flex-start"
                fontSize={"1.25rem"}
                fontWeight={"500"}
            >
                Descrição
            </Flex>
            <Textarea
                w="100%"
                minH="10rem"
                maxH="20rem"
                placeholder="Descreva o que aconteceu"
                resize="none"
            />
            <Flex
                w="100%"
                justify="flex-end"
                gap="1rem"
                align="center"
            >
                <Text
                    align="center"
                    fontSize="0.875rem"
                    color="#C6C6C6"
                >
                    {fileName}
                </Text>
                <Input
                    display="none"
                    id="file"
                    type="file"
                    accept='.png, .jpg, .jpeg, .pdf'
                    onChange={(e) => {
                        console.log(e.target.files)
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
                    _hover={{
                        bg: '#52c8c2',
                    }}
                >
                    <label htmlFor="file" style={{cursor: "pointer",}}>Adicionar Imagem</label>
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
                >
                    Publicar
                </Button>
            </Flex>
        </Flex>
    )
}