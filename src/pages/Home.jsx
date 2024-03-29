import React, { useState, useEffect } from 'react'
import { useStateContext } from '../context'
import { DisplayCampaigns } from '../components'
import { Footer } from '../components'

const Home = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaings] = useState([]);

  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaings = async () => {
    setIsLoading(true)
    const data = await getCampaigns();
    setCampaings(data)
    setIsLoading(false)
    

  }

  useEffect(() => {
    if (contract) fetchCampaings();

  }, [address, contract]);

  return (
    <div>
    <DisplayCampaigns
      title='All campaigns'
      isLoading={isLoading}
      campaigns={campaigns}
      text={'.'}


    />


</div>
  )
}

export default Home