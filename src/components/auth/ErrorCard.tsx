import React from 'react'
import CardWrapper from './CardWrapper'
import { FaExclamationTriangle } from 'react-icons/fa'

const ErrorCard = () => {
    return (
        <CardWrapper
        headerLabel='Oops! Something went wrong!'
        backButtonHref='/auth/login'
        backButtonLabel='Back to login'
        >
        <div className='w-full flex justify-center items-center'>
        <FaExclamationTriangle className='text-destructive text-5xl'/>
        </div>
        </CardWrapper>
    )
}

export default ErrorCard