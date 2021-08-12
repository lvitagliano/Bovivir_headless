import * as types from '../actionTypes';

const initialState = {
    step1: {},
    step2: {
        name:'',
        lastName:'',
        areacod:'',
        tel:'',
        email:'',
        days:'1',
        monsths:'1',
        years:'1990'
    },
    step3: {
        street: '',
        number: '',
        zipCode: '',
        floor: '',
        apartm: '',
        nbhood: '',
        zone: '',
        state: '67',
        country: 'Argentina',
        additional: '',
    },
    step4: {
        voucherType: '1',
        cuit: '',
        dni: '',
        hasClubNacion: false,
        cardNumber: '',
    },
    step5: {},
    currentStep:1,
    loading:true,
    error:null, 
    pointHOP: []
}

export const registerReducer = (state=initialState, action) => {
    switch (action.type) {
        case types.SET_STEP:{
            const step = action.payload.step;
            delete action.payload[action.payload.step];
            const data = action.payload;
            return {
                ...state,
                [step]: data,
                currentStep:action.payload.currentStep,
                loading:false,
                error:null
            }
        }
        default:
            return state
    }
}