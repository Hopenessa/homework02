import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import Greeting from './Greeting'
import type {UserType} from './HW3'

type GreetingContainerPropsType = {
    users: UserType[]
    addUserCallback: (name: string) => void
}

const emptyNameError = 'Ошибка! Введите имя!'

export const pureAddUser = (
    name: string,
    setError: (error: string) => void,
    setName: (name: string) => void,
    addUserCallback: (name: string) => void,
) => {
    if (name.trim()) {
        addUserCallback(name.trim())
        setName('')
        setError('')
    } else {
        setError(emptyNameError)
    }
}

export const pureOnBlur = (name: string, setError: (error: string) => void) => {
    if (!name.trim()) setError(emptyNameError)
}

export const pureOnEnter = (e: KeyboardEvent<HTMLInputElement>, addUser: () => void) => {
    if (e.key === 'Enter') addUser()
}

const GreetingContainer: React.FC<GreetingContainerPropsType> = ({
    users,
    addUserCallback,
}) => {
    const [name, setName] = useState<string>('')
    const [error, setError] = useState<string>('')

    const setNameCallback = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)

        if (error) setError('')
    }
    const addUser = () => {
        pureAddUser(name, setError, setName, addUserCallback)
    }

    const onBlur = () => {
        pureOnBlur(name, setError)
    }

    const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        pureOnEnter(e, addUser)
    }

    const totalUsers = users.length
    const lastUserName = users[totalUsers - 1]?.name

    return (
        <Greeting
            name={name}
            setNameCallback={setNameCallback}
            addUser={addUser}
            onBlur={onBlur}
            onEnter={onEnter}
            error={error}
            totalUsers={totalUsers}
            lastUserName={lastUserName}
        />
    )
}

export default GreetingContainer
