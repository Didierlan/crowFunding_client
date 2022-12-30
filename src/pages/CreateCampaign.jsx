import React, { useState , useEffect} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { useStateContext } from '../context';

import { money } from '../assets';
import { CustomButton, FormField ,Loader } from '../components';
import { checkIfImage } from '../utils'

const CreateCampaign = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign , address } = useStateContext(); 


  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: '',

  });

  useEffect(() => {
    if(!address){
      navigate('/')
    }

  }, []);

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if(exists){
        setIsLoading(true);

        await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18)})

        setIsLoading(false);
        navigate('/')

      }else{
        alert('Provide valid image URL');
        setForm({...form , image: ''});
      }

    })







  }

  return (
    <div className='bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4'>

      {isLoading && <Loader /> }
      <div className='flex items-center justify-center flex-col rounded-[10px] bg-[#3a3a43] p-[16px] sm:min-w-[300px]'  >
        <h1 className='font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white'>Start a Campaign</h1>

      </div>

      <form onSubmit={handleSubmit} className='w-full mt-[65px] flex flex-col gap-[38px]'>
        <div className='flex flex-wrap gap-[40px]'>
          <FormField
            labelName='Your Name *'
            placeholder='Jhone Doe'
            inputType='text'
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e)}

          />

          <FormField
            labelName='Campaing Title '
            placeholder='white a title'
            inputType='text'
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title', e)}

          />


        </div>

        <FormField

          labelName='Story '
          placeholder='white a description'
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange('description', e)}

        />

        <div className=' flex w-full justify-start items-center bg-[#8c6dfd] rounded-[10px] p-4 h-[120px]'>
          <img src={money} alt='mone' className='w-[40px] h-[40px] object-contain' />
          <h4 className='font-epilogue text-white font-bold text-[25px] ml-[20px]'>You will get 100% of the raised amount</h4>
        </div>




        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange('target', e)}
          />
          <FormField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
          />
        </div>

        <FormField

          labelName='URL '
          placeholder=' Place image URL of your campaing'
          inputType='url'
          value={form.image}
          handleChange={(e) => handleFormFieldChange('image', e)}

        />


        <div className='flex justify-center items-center mt-[40px]'>
          <CustomButton
            btnType='submit'
            title='Submit new campaign'
            styles="bg-[#1dc071]"
          />

        </div>

      </form>
    </div>
  )
}

export default CreateCampaign