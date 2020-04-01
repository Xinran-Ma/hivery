import React from 'react';
import { createStore } from "redux";
import { connect, Provider } from "react-redux";
import styled from 'styled-components';
import './App.css'
import SelectedProducts from './Components/SelectedProducts';
import ProductsList from './Components/ProductsList';
import { SET_CURRENT_PRODUCT } from './ActionTypes';

const initialState = {
	currentProductCode: ''
}

let store = createStore(reducer, initialState);
store.subscribe(() => console.log(store.getState()));

function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_CURRENT_PRODUCT:
			
			return {
				...state,
				currentProductCode: action.value
			}

		default:
			return state;
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setCurrentProduct: productCode => dispatch({ type: SET_CURRENT_PRODUCT, value: productCode }),
	};
};

const ConnectedSelectedProducts = connect(
	state => state,
	mapDispatchToProps,
)(SelectedProducts);

const ConnectedProductsList = connect(
	state => state,
	mapDispatchToProps,
)(ProductsList);

const AppWrapper = styled.div`
	display: flex;
	flex-direction: row;
`

function App() {
	return (
		<AppWrapper>
			<Provider store={store}>
				<ConnectedSelectedProducts />
				<ConnectedProductsList />
			</Provider>
			

		</AppWrapper>
	);
}

export default App;
