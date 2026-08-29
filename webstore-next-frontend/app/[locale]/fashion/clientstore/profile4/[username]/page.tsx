"use client"
import UserProfile from '@/client-components-fashion/info-details/UserProfile'
import { useParams } from 'next/navigation';
import React from 'react'

export default function page() {
    const params = useParams<{ username : string }>();
    return (
        <UserProfile key={0} username={params.username}/>
    )
}
