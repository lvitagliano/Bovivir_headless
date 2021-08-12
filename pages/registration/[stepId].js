import React, { Fragment,useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from "react-hook-form"
import { BillingData } from '../../components/FormAutogestion/BillingData';
import { PaymentData } from '../../components/FormAutogestion/PaymentData';
import { PersonalData } from '../../components/FormAutogestion/PersonalData';
import { Selection } from '../../components/FormAutogestion/Selection';
import { ShippingData } from '../../components/FormAutogestion/ShippingData';
import Congratulations from '../../components/FormAutogestion/Congratulations';
import { FORMSTEP } from '../../constants/form';
import { setStep } from '../../store/actions/registerAction'
import { useDispatch, useSelector } from "react-redux"
import styled from 'styled-components'
import Button from "../../components/Commons/Button"

const Registration = () => {
    const router = useRouter();
    const dispatch = useDispatch()
    const steps = FORMSTEP.find(item => item.step === router.query.stepId);
    const { register, errors, handleSubmit, watch, control } = useForm({mode: 'all',reValidateMode: 'onChange'});

    const nextStep = () => {
        let id = steps.id + 1
        let step = FORMSTEP.find(item => item.id === id);
        router.push(`/registration/${step.step}`,`/registration/${step.step}`,{shallow:true})
    }

    const onSubmit = (data, e) => {
        e.preventDefault();
        dispatch(setStep({currentStep:steps.id,...data}))
        nextStep()
    }
 
    const renderStep = (items) => (
        <div>
         {items === 1 && <Selection         errors={errors} control={control} step={steps.step} register={register} watch={watch}/>}
         {items === 2 && <PersonalData      errors={errors} control={control} step={steps.step} register={register} watch={watch}/>}
         {items === 3 && <ShippingData      errors={errors} control={control} step={steps.step} register={register} watch={watch}/>}
         {items === 4 && <BillingData       errors={errors} control={control} step={steps.step} register={register} watch={watch}/>}
         {items === 5 && <PaymentData       errors={errors} control={control} step={steps.step} register={register} watch={watch}/>}
         {items === 6 && <Congratulations   errors={errors} control={control} step={steps.step} register={register} watch={watch}/>}
        </div>
    )

    return (
        <Fragment>
             <form onSubmit={handleSubmit(onSubmit)}>
            {
                renderStep(steps.id)
            }
            {
                steps.id <= FORMSTEP.length && <Button disabled={Object.keys(errors).length} style={{display:'flex', margin:'30px auto'}}>
                    {Object.keys(errors).length ?
                        <div>Continuar</div>:
                        <div ><input type="submit" style={{display: "none"}} /> Continuasr</div>
                    }               
                </Button>
            }

         </form>
        </Fragment>
    )
}

export default Registration
