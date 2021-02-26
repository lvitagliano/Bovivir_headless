import React, {Fragment, useEffect} from 'react'
import Link from 'next/link'

export default function Autogestion() {
    const step1 = 'step1'

    return (
        <Fragment>
        <Link href='/registration/[stepId]' as={`/registration/${step1}`}>
        <a>Registration</a>
        </Link>
        </Fragment>

    )
}