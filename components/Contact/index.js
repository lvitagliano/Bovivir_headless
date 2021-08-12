import React from 'react'
import { Text, Title } from './styles'

export default function Contact(props) {
  const { data } = props
  return (
    <>
      <Title
        style={{ fontSize: '2.5rem', lineHeight: '1.225', color: '#404a57', letterSpacing: -2 }}
      >
        {data?.title}
      </Title>
      <Text dangerouslySetInnerHTML={{ __html: data?.content }} />
      <br />
    </>
  )
}
