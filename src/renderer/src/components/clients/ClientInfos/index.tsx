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
        <></>
    )
}