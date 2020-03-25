import React, {Component} from 'react'
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../UI/Modal/Modal'
import OrderSummary from '../../components/OrderSummary/OrderSummary';
const INGREDIENTS_PRICE = {
    salad : 0.5,
    cheese : 0.4,
    meat : 1.3,
    bacon : 0.7
};


class BurgerBuilder extends Component {

    state = {
        ingredients : {
            salad : 0,
            bacon  : 0,
            meat    : 0,
            cheese  : 0
        },
        totalPrice : 4,
        purchasable : false,
        purchasing  :   false
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients).map(key => ingredients[key])
        .reduce((sum, num)=>sum+num, 0);
        this.setState({purchasable : sum>0})
    }
    addIngredientsHandler = (type) => {
        let ingredients = {...this.state.ingredients};
        ingredients[type] = ingredients[type] +1;
        let totalPrice = this.state.totalPrice + INGREDIENTS_PRICE[type];
        this.setState({ingredients : ingredients, totalPrice : totalPrice});
        this.updatePurchaseState (ingredients);
    }

    removeIngredientsHandler = (type) => {
        let ingredients = {...this.state.ingredients};
        ingredients[type] = (ingredients[type] !== 0) ? ingredients[type] -1 : ingredients[type];
        let totalPrice = this.state.totalPrice - INGREDIENTS_PRICE[type];
        this.setState({ingredients : ingredients, totalPrice, totalPrice});
        this.updatePurchaseState (ingredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing : true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing : false})

    }
    purchaseContinueHandler = () => {
        alert("You continue")
        
        this.setState({purchasing : false})
    }
    render() {
        const disableInfo = {...this.state.ingredients};
        for(let key in disableInfo) 
            disableInfo[key] = disableInfo[key] <= 0;
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                    ingredient={this.state.ingredients}
                    cancel={this.purchaseCancelHandler}
                    continue={this.purchaseContinueHandler}
                    total={this.state.totalPrice}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                price={this.state.totalPrice}
                ingredientAdded={this.addIngredientsHandler}
                ingredientRemove = {this.removeIngredientsHandler}
                purchasable={this.state.purchasable}
                purchasing = {this.purchaseHandler}
                disableInfo={disableInfo}

                />
            </Aux>
        );
    }
}

export default BurgerBuilder;