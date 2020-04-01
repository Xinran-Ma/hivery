import React, {useState} from 'react'
import styled from 'styled-components'
import { currentProducts } from '../Data/data'
import axios from 'axios';

// General styled components
const LiWrapper = styled.li`
    display: flex;
    flex-direction: column;
    padding: 5px 0;
    border-bottom: 1px solid lightgrey;
`

const GeneralInfoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const NameAndCodeWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const ProductName = styled.span`
    color: black;
    font-size: 0.8rem;
`

const ProductCode = styled.span`
    color: grey;
    font-size: 0.8rem;
`

const ProductPrice = styled.span`
    color: black;
    font-size: 0.8rem;
    flex: 0 0 20%;
    text-align: center;
`

const ProductVends = styled.span`
    color: black;
    font-size: 0.8rem;
    flex: 0 0 20%;
    text-align: center;
`

const ProductRevenue = styled.span`
    color: black;
    font-size: 0.8rem;
    flex: 0 0 20%;
    text-align: center;
`

const TableRow = styled.div`
    display: flex;
    flex-direction: row;
    margin: 0.5rem 0;
`

const TableRowTitle = styled.span`
    flex: 0 0 20%;
    font-size: 0.8rem;
    text-align: right;
`

const TableNetGainTitle = styled.span`
    flex: 0 0 20%;
    font-size: 0.8rem;
    color: blue;
    text-align: right;
`

const Image = styled.img`
    max-height: 70px;
    max-width: 24px;
    object-fit: contain;
`

const ImageTitleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex: 0 0 20%;
`

// General styled components end

const SingleProduct = ({curr, currentProductCode}) => {

    // Set the default first expandable level panel's status
    const [LevelOnePanelState, setLevelOnePanel] = useState(-1);

    // Set the default second expandable level panel's status
    const [LevelTwoPanelState, setLevelTwoPanel] = useState(-1);
    
    const selectedProduct = currentProducts.find(element => element.product_code === currentProductCode)
    let cannibalisedSum = 0
    if(curr.cannibalised) {
        cannibalisedSum = curr.cannibalised.products.reduce((acc, cur) => acc + cur.revenue, 0).toFixed(2)
    }
    let netGain = ((selectedProduct.average_sales * selectedProduct.price / 100) - (curr.average_sales * curr.price / 100) - cannibalisedSum).toFixed(2)
    
    const replacedProductRevenueNum = (curr.cannibalised ? curr.cannibalised.replacedProductRevenue : 0).toFixed(2)

    const addedProductRevenueNum = (curr.cannibalised ? curr.cannibalised.addedProductRevenue : 0).toFixed(2)
    // Special conditional styled components

    const ProductNetGain = styled.span`
        color: ${netGain > 0 ? 'green' : 'red'};
        font-size: 0.8rem;
        flex: 0 0 20%;
        text-align: center;
    `
    const TableRowBar = styled.span`
        flex: 0 0 70%;
        text-align: right;
        color: white;
        padding: 2px;
        margin: 0 10px;
        font-size: 0.8rem;
        background-color: ${curr.cannibalised && curr.cannibalised.addedProductRevenue > 0 ? 'green' : 'red' }
    `

    const TableNetGainBar = styled.span`
        flex: 0 0 70%;
        text-align: right;
        color: white;
        padding: 2px;
        margin: 0 10px;
        font-size: 0.8rem;
        background-color: ${netGain > 0 ? 'blue' : 'grey' }
    `

    const DetailsInfoWrapper = styled.div`
        display: ${LevelOnePanelState > 0 ? 'block' : 'none'};
    `

    const NetGainDetails = styled.div`
        flex-direction: row;
        margin: 0.5rem 0;
        display: ${LevelTwoPanelState > 0 ? 'flex' : 'none'};
    `

    // Special conditional styled components end

    return (
        <LiWrapper key={curr.product_code}>
            <GeneralInfoWrapper onClick={() => setLevelOnePanel(LevelOnePanelState * -1)}>
                <ImageTitleWrapper>
                    <Image src={'https://cdn.vendinganalytics.com/reyes-ccb/tb/' + curr.product_code + '.png'} alt={curr.product_name} />
                    <NameAndCodeWrapper>
                        <ProductName>{curr.product_name}</ProductName>
                        <ProductCode>{curr.product_code}</ProductCode>
                    </NameAndCodeWrapper>
                </ImageTitleWrapper>
                
                <ProductPrice>${curr.price / 100}</ProductPrice>
                <ProductVends>7.68</ProductVends>
                <ProductRevenue>${(curr.price / 100 * curr.average_sales).toFixed(2)}</ProductRevenue>
                <ProductNetGain>{netGain < 0 ? '-$' + Math.abs(netGain) : '$' + netGain}</ProductNetGain>
            </GeneralInfoWrapper>
            <DetailsInfoWrapper>
                <TableRow>
                    <TableRowTitle>Added Product</TableRowTitle><TableRowBar style={{ maxWidth: Math.abs(addedProductRevenueNum) / 20 * 100 + '%' }}>{netGain < 0 ? '-$' + Math.abs(addedProductRevenueNum) : '$' + addedProductRevenueNum}</TableRowBar>
                </TableRow>
                <TableRow>
                    <TableRowTitle>Replaced Product(s)</TableRowTitle><TableRowBar style={{ maxWidth: Math.abs(replacedProductRevenueNum) / 20 * 100 + '%' }}>{netGain < 0 ? '-$' + Math.abs(replacedProductRevenueNum) : '$' + replacedProductRevenueNum}</TableRowBar>
                </TableRow>
                <TableRow>
                    <TableRowTitle>Cannibalised Product(s)</TableRowTitle><TableRowBar style={{ maxWidth: Math.abs(cannibalisedSum) / 20 * 100 + '%' }}>{cannibalisedSum < 0 ? '-$' + Math.abs(cannibalisedSum) : '$' + cannibalisedSum}</TableRowBar>
                </TableRow>
                {
                    curr.cannibalised ? 
                    curr.cannibalised.products.map(currentProduct => {
                        return (
                            <NetGainDetails key={currentProduct.code}>
                                <TableRowTitle>{currentProduct.name}</TableRowTitle><TableRowBar style={{ maxWidth: Math.abs(currentProduct.revenue) / 20 * 100 + '%' }}> </TableRowBar>
                            </NetGainDetails>
                        )
                    })
                    :
                    false
                }
                <TableRow onClick={() => setLevelTwoPanel(LevelTwoPanelState * -1)}>
                    <TableNetGainTitle>Net Gain</TableNetGainTitle><TableNetGainBar style={{ maxWidth: Math.abs(netGain) / 20 * 100 + '%' }}>{netGain < 0 ? '-$' + Math.abs(netGain) : '$' + netGain}</TableNetGainBar>
                </TableRow>
            </DetailsInfoWrapper>
        </LiWrapper>
    )
}

export default SingleProduct