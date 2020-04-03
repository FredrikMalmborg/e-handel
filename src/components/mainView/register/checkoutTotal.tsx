import React from "react";
import {
	createStyles,
	makeStyles,
	Grid,
	Typography,
	Button,
	Divider
} from "@material-ui/core";
import { DeliveryOption, baseDelivery } from "./deliveryOptions/deliveryAPI";
import { PaymentOption, basePayment } from "./paymentOptions/paymentAPI";
import { RegisterInputValues } from "./registerAPI";
import ErrorIcon from '@material-ui/icons/Error';

interface Props {
	useAlternate: boolean
	orderInputs: RegisterInputValues
	itemTotal: { totalValue: number; itemAmount: number };
	delivery: DeliveryOption;
	payment: PaymentOption;
}

const useStyles = makeStyles(() =>
	createStyles({
		totalWrapper: {
			width: "100%",
			display: "flex",
			flexDirection: "column",
			alignItems: "center"
		},
		progressBar: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-evenly',
			alignItems: 'center',
		},
		errorMsg: {
			color: 'red',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			'& .MuiSvgIcon-fontSizeSmall': {
				margin: '0 .3rem .3rem 0'
			}
		}
	})
);

const checkErrorsInInfo = (props: Props) => {
	return (props.orderInputs.firstName.error ||
		props.orderInputs.lastName.error ||
		props.orderInputs.mobileNumber.error ||
		props.orderInputs.address.error ||
		props.orderInputs.postal.error ||
		props.orderInputs.city.error)
}

const checkErrorsInPay = (props: Props) => {
	if (props.payment.name === 'Card' && !props.useAlternate) {
		return (props.orderInputs.firstName.error ||
			props.orderInputs.lastName.error ||
			props.orderInputs.CVC.error ||
			props.orderInputs.cardNumber.error ||
			props.orderInputs.cardMonth.error ||
			props.orderInputs.cardYear.error)
	} else if (props.payment.name === 'Card' && props.useAlternate) {
		return (props.orderInputs.altFirstName.error ||
			props.orderInputs.altLastName.error ||
			props.orderInputs.CVC.error ||
			props.orderInputs.cardNumber.error ||
			props.orderInputs.cardMonth.error ||
			props.orderInputs.cardYear.error)
	} else if (props.payment.name === 'Swish' && !props.useAlternate) {
		return (props.orderInputs.mobileNumber.error)
	} else if (props.payment.name === 'Swish' && props.useAlternate) {
		return (props.orderInputs.altMobileNumber.error)
	}
}

export default function CheckoutTotal(props: Props) {
	const classes = useStyles();

	return (
		<>
			<Grid container xs={12}>
				<Grid item xs={12} className={classes.progressBar}>
					{(checkErrorsInInfo(props)) ?
						<div className={classes.errorMsg}>
							<ErrorIcon fontSize="small" />
							< Typography variant="body2" align="center">
								Error in "Your Information"
							</Typography>
						</div>
						: null
					}
					{(checkErrorsInPay(props)) ?
						<div className={classes.errorMsg}>
							<ErrorIcon fontSize="small" />
							< Typography variant="body2" align="center">
								Error in "Payment"
							</Typography>
						</div>
						: null
					}
					<Typography variant="body2" align="center">
						{props.payment != basePayment
							? `Payment option: ${props.payment.name}`
							: `No payment option chosen`}
					</Typography>
					<Typography variant="body2" align="center">
						{props.delivery != baseDelivery
							? `Shipping: ${props.delivery.name}`
							: `No delivery option chosen`}
					</Typography>
					<Divider style={{ margin: "1rem 0" }} />
				</Grid>
				<Grid item xs={6}>
					<Typography variant="body1">
						{`${props.itemTotal.itemAmount} Items:`}
					</Typography>
					<Typography variant="body1">
						{`excl. VAT: ${(props.itemTotal.totalValue * 0.8).toFixed(2)}:-`}
					</Typography>
					{(typeof props.delivery.price === "number") ?
						< Typography variant="body1">
							{`Shipping: +${(props.delivery.price).toFixed(2)}:-`}
						</Typography>
						: null
					}
					<Typography variant="body1">
						{`VAT: +${(props.itemTotal.totalValue * 0.2).toFixed(2)}:-`}
					</Typography>
				</Grid>
				<Grid
					item
					container
					xs={6}
					direction="row"
					alignItems="center"
					justify="center"
					style={{ borderLeft: "1px solid #0002" }}>
					<Typography variant="h6" align="center">
						{`Total: ${
							typeof props.delivery.price === "number"
								? (props.itemTotal.totalValue + props.delivery.price).toFixed(2)
								: "Not completed"
							}`}
					</Typography>
				</Grid>
				<Grid
					item
					container
					xs={12}
					direction="column"
					alignItems="center"
					justify="center">
					<Button
						disabled={
							((props.delivery != baseDelivery && props.payment != basePayment) &&
								!checkErrorsInInfo(props) &&
								!checkErrorsInPay(props))
								? false
								: true
						}
						variant="contained"
						color="primary"
						style={{ padding: ".5rem 2rem", margin: "3rem" }}>
						confirm
					</Button>
				</Grid>
			</Grid>
		</>
	);
}
