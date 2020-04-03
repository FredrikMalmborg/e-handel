import React from "react";
import ProductGrid from "./productGrid/productGrid";
import ProductView from "./productView/productView";

import { Switch, Route } from "react-router-dom";
import { Product } from "../../interfaces&types/interfaces";
import Register from "./register/register";
import { ProductContext } from "../../contexts/productContext";

interface Props {
	handleClick?: () => void;
	handleClose?: () => void;
	setRegisterValue: (value: boolean) => void
}
interface State {
	products: Product[];
}
const product: Product[] = [];
class MainView extends React.Component<Props, State> {

	render() {

		return (
			<Switch>

				<Route exact path="/">
					<ProductGrid handleClick={this.props.handleClick} />
				</Route>

				<Route path="/productview/:serial" render={(props) =>
					<ProductView {...props}
						handleClick={this.props.handleClick}
						handleClose={this.props.handleClose}
						product={product}
					/>}
				/>
				<Route path="/register">
					<ProductContext.Consumer>
						{value => (
							<Register
								setRegisterValue={this.props.setRegisterValue}
								productList={value.cart}
							/>
						)}
					</ProductContext.Consumer>
				</Route>


				<Route>something went wrong</Route>
			</Switch>
		);
	}
}

export default MainView;
