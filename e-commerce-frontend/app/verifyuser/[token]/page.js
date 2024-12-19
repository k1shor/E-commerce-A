'use client'
import { verifyEmail } from '@/app/api/userAPI'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
    let { token } = useParams()

    let [success, setSuccess] = useState('')
    let [error, setError] = useState('')
    // console.log(token)

    useEffect(() => {
        verifyEmail(token)
            .then(data => {

                if (data.error) {
                    setError(data.error)
                }
                else {

                    setSuccess(data)
                }
            })
    }, [])

    const showError = () => {
        return <div className='bg-red-200 text-center py-5'>{error}</div>
    }
    const showSuccess = () => {
        return <div className='bg-red-200 text-center py-5'>{success}</div>
    }

    return (
        <div>
            {showError()}
            {showSuccess()}
        </div>
    )
}

export default page