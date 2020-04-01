import React from 'react'
import { currentProducts } from '../Data/data'
import styled from 'styled-components'

const ListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 20%;
`

const SingleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    padding: 5px 0;
    border-bottom: 1px solid lightgrey;
`

const ProductDetails = styled.div`
    display: flex;
    flex-direction: column;
`

const ProductName = styled.span`
    color: black;
    font-size: 0.8rem;
    font-weight: bold;
`

const ProductCode = styled.span`
    color: grey;
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
    font-weight: bold;
`

const ProductPrice = styled.span`
    color: black;
    font-size: 0.8rem;
    font-weight: bold;
`

const ProductVends = styled.span`
    color: black;
    font-size: 0.8rem;
    font-weight: bold;
`

const ProductRevenue = styled.span`
    color: black;
    font-size: 0.8rem;
    font-weight: bold;
`

const ProductCols = styled.span`
    color: black;
    font-size: 0.8rem;
    font-weight: bold;
`

const Image = styled.img`
    margin: 0 5px;
    width: 40px;
    object-fit: contain;
`

const ListHeader = styled.div`
    background: lightgrey;
    text-align: center;
    padding: 5px
`

const SelectProducts = ({setCurrentProduct, productCode}) => {
    return (
        <ListWrapper>
            <ListHeader>Selected Products</ListHeader>
            {currentProducts.map((curr) => 
                
                <SingleWrapper key={curr.product_code} onClick={() => setCurrentProduct(productCode = curr.product_code)}>
                    <Image src={'https://cdn.vendinganalytics.com/reyes-ccb/tb/' + curr.product_code + '.png'} alt={curr.product_name} />
                    <ProductDetails>
                        <ProductName>{curr.product_name}</ProductName>
                        <ProductCode>{curr.product_code}</ProductCode>
                        <ProductPrice>Price: ${curr.price / 100}</ProductPrice>
                        <ProductVends>Vends: 7.68</ProductVends>
                        <ProductRevenue>Revenue: ${curr.price / 100 * curr.average_sales}</ProductRevenue>
                        <ProductCols>Cols: 8/10</ProductCols>
                    </ProductDetails>
                </SingleWrapper>
            )}

        </ListWrapper>
    )
}
export default SelectProducts;