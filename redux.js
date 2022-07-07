import { createStore ,combineReducers } from "redux";

// ******** Insurance Company REDUX example ******* //

// * Action Creators
const createPolicy = (name, amount) => {
    return {
        type: 'CREATE_POLICY',
        payload: {
            name: name,
            amount: amount,
        }
    };
}

const createClaim = (name, amountOfMoneyToCollect) => {
    return {
        type: 'CREATE_CLAIM',
        payload: {
            name: name,
            amountOfMoneyToCollect: amountOfMoneyToCollect
        }
    }
};

const deletePolicy = (name) => {
    return {
        type: 'DELETE_POLICY',
        payload: {
            name: name
        }
    };
};

// * Reducers (Departments)
const claimsHistory = (oldListOfClaims = [], action) => {
    if (action.type === 'CREATE_CLAIM') {
        return [...oldListOfClaims, action.payload];
    }

    return oldListOfClaims;
};

const accounting = (moneyBag = 100, action) => {
    if (action.type === 'CREATE_CLAIM') {
        return moneyBag - action.payload.amountOfMoneyToCollect;
    } else if( action.type === 'CREATE_POLICY') {
        return moneyBag + action.payload.amount
    }

    return moneyBag;
}

const policies = (listOfPolicies = [], action) => {
    if (action.type === 'CREATE_POLICY') {
      return [...listOfPolicies, action.payload.name];
    } else if (action.type === 'DELETE_POLICY') {
      return listOfPolicies.filter(name => name !== action.payload.name);
    }
    
    return listOfPolicies;
};

// Combining Reducers
const ourDepartments = combineReducers({
    accounting: accounting,
    claimsHistory: claimsHistory,
    policies: policies
})

const store = createStore(ourDepartments);

store.dispatch(createPolicy('Bob', 20));
store.dispatch(createPolicy('John', 40));
store.dispatch(createClaim('Bob', 30));
store.dispatch(deletePolicy('Bob', 30));

console.log(store.getState());