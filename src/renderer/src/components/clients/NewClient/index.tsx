import {
    Flex,
    Text,
    Button,
    Stack,
    Radio,
    RadioGroup,
} from "@chakra-ui/react"
import Input from "../../base/Input";
import Select from "../../base/Select";

export default function NewClient({
    onClose,
} : {
    onClose: () => void
}): JSX.Element {

    return (
        <form
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                paddingBottom: '1.5rem',
                alignItems: 'flex-end',
            }}
            onSubmit={(event) => {
                event.preventDefault()
            }}
        >
            <Input
                name="prontuario"
                label="Número de Prontuário"
                type="text"
                placeholder="Prontuário"
            />
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
                <RadioGroup colorScheme="green">
                    <Stack
                        direction='row'
                        display='flex'
                        w='100%'
                        justifyContent='space-between'
                        wrap={'wrap'}
                    >
                        <Radio value='mensal'>Mensal</Radio>
                        <Radio value='bimestral'>Bimestral</Radio>
                        <Radio value='trimestral'>Trimestral</Radio>
                        <Radio value='semestral'>Semestral</Radio>
                        <Radio value='anual'>Anual</Radio>
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
                onClick={() => onClose()}
            >
                Cadastrar
            </Button>
        </form>
    )
}