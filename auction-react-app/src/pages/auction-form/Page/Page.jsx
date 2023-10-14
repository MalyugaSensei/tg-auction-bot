import { AuctionForm } from '@/features/auction-form/ui/form'
import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

export const Page = () => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <h1 className='text-center pb-3'>Создать лот</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <AuctionForm />
        </Col>
      </Row>
    </Container>
  )
}