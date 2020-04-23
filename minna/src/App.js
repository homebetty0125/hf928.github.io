import React, { useReducer } from 'react';
import { Container, Box, Grid, Button, FormControl, InputLabel, OutlinedInput, InputAdornment, FormHelperText } from '@material-ui/core';


const initState = {
    amount: '',
    exrate: localStorage.getItem('exrate') ? localStorage.getItem('exrate') : '1',
    minFee: localStorage.getItem('minFee') ? localStorage.getItem('minFee') : '200',
    maxFee: localStorage.getItem('maxFee') ? localStorage.getItem('maxFee') : '800',
    feeRate: localStorage.getItem('feeRate') ? localStorage.getItem('feeRate') : '0.0005',
    cableFee: '',
    totalAmount: '0'
};

const stateReducer = (state, action) => {

    const newState = { ...state };

    console.log(action.payload);
    

    switch (action.type) {

        case 'UPDATE_AMOUNT':

            newState.amount = action.payload;

            break;

        case 'UPDATE_EXRATE':

            newState.exrate = action.payload;
            localStorage.setItem('exrate', action.payload);

            break;

        case 'UPDATE_MINFEE':

            newState.minFee = action.payload;
            localStorage.setItem('minFee', action.payload);

            break;

        case 'UPDATE_MAXFEE':

            newState.maxFee = action.payload;
            localStorage.setItem('maxFee', action.payload);

            break;

        case 'UPDATE_FEERATE':

            newState.feeRate = action.payload;
            localStorage.setItem('feeRate', action.payload);

            break;

        case 'UPDATE_CABLEFEE':

            newState.cableFee = action.payload;

            break;

        case 'RESET':

            newState.amount = initState.amount;
            newState.cableFee = initState.cableFee;

            break;

        default:
            
            throw new Error('Something went wrong.');

    }

    const amountTWD = +newState.amount * +newState.exrate;
    let fee = amountTWD * +newState.feeRate;

    if (fee > +newState.maxFee) fee = +newState.maxFee;
    if (fee < +newState.minFee) fee = +newState.minFee;

    fee += +newState.cableFee;

    newState.totalAmount = amountTWD + fee;

    return newState;

};

function App() {

    const [state, dispatch] = useReducer(stateReducer, initState);

    const handleChange = (e, type) => dispatch({ type, payload: e.target.value });

    const handleReset = () => dispatch({ type: 'RESET' });
        
    return (

        <div>

            <Container fixed>
                <Box m={2}>
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item xs={12} sm={12} md={12}>
                            <Box m={2}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-amount">匯款金額</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        type="number"
                                        value={state.amount}
                                        onChange={(e) => handleChange(e, 'UPDATE_AMOUNT')}
                                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                        labelWidth={65}
                                    />
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <Box m={2}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-exrate">兌台幣匯率</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-exrate"
                                        type="number"
                                        value={state.exrate}
                                        onChange={(e) => handleChange(e, 'UPDATE_EXRATE')}
                                        labelWidth={80}
                                    />
                                    <FormHelperText>預設 1(台幣兌台幣), 美金約填 30, 以此類推</FormHelperText>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <Box m={2}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-minFee">最低手續費金額</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-minFee"
                                        type="number"
                                        value={state.minFee}
                                        onChange={(e) => handleChange(e, 'UPDATE_MINFEE')}
                                        startAdornment={<InputAdornment position="start">NTD$</InputAdornment>}
                                        labelWidth={115}
                                    />
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <Box m={2}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-maxFee">最高手續費金額</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-maxFee"
                                        type="number"
                                        value={state.maxFee}
                                        onChange={(e) => handleChange(e, 'UPDATE_MAXFEE')}
                                        startAdornment={<InputAdornment position="start">NTD$</InputAdornment>}
                                        labelWidth={115}
                                    />
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <Box m={2}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-feeRate">手續費比例</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-feeRate"
                                        type="number"
                                        value={state.feeRate}
                                        onChange={(e) => handleChange(e, 'UPDATE_FEERATE')}
                                        labelWidth={80}
                                    />
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <Box m={2}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-cableFee">郵電費</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-cableFee"
                                        type="number"
                                        value={state.cableFee}
                                        onChange={(e) => handleChange(e, 'UPDATE_CABLEFEE')}
                                        startAdornment={<InputAdornment position="start">NTD$</InputAdornment>}
                                        labelWidth={50}
                                    />
                                    <FormHelperText>一般 NTD$ 300, 全額 NTD$ 600</FormHelperText>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <Box m={2}>
                                <strong>總收費 NTD$ <span >{Math.ceil(state.totalAmount).toString().replace(/\d(?=(?:\d{3})+\b)/g, '$&,')}</span></strong>
                            </Box>
                        </Grid> 
                        <Grid item xs={12} sm={12} md={12}>
                            <Box m={2}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleReset('RESET')}
                                >
                                    重置
                                </Button>
                            </Box>
                        </Grid> 
                    </Grid>
                </Box>
            </Container>
            
        </div>
        
    );
}

export default App;