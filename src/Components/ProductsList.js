import React from 'react'
import styled from 'styled-components'
import { productUpdateData } from '../Data/data'
import SingleProduct from './SingleProduct';

// General styled components
const ListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0 0 80%;
`

const UlWrapper = styled.ul`
    list-style: none;
`

const ListHeader = styled.div`
    display: flex;
    justify-content: space-between;
    background: lightgrey;
`

const ListHeaderItem = styled.span`
    flex: 0 0 20%;
    text-align: center;
    padding: 5px 0;
`

// General styled components end

const ProductsList = ({currentProductCode}) => {
    if(currentProductCode) {
        return (
            <ListWrapper>
                <ListHeader><ListHeaderItem>Product</ListHeaderItem><ListHeaderItem>Price</ListHeaderItem><ListHeaderItem>Vends</ListHeaderItem><ListHeaderItem>Revenue</ListHeaderItem><ListHeaderItem>Net Gain</ListHeaderItem></ListHeader>
                <UlWrapper>
                    {
                        productUpdateData.map((curr) => <SingleProduct key={curr.product_code} curr={curr} currentProductCode={currentProductCode} ></SingleProduct>)
                    }
                </UlWrapper>
            </ListWrapper>
        )
    } else {
        return (
            <ListWrapper></ListWrapper>
        )
    }
}

export default ProductsList