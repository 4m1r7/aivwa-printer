import React, { useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import Wifi from '../assets/icons/wifi.svg';
import { useQuery } from 'react-query';

export default function WifiSetting() {

    const { data: allSSIDs } = useQuery('AllSSIDs', async () => {
        const response = await axios.get(`/ssid/getAll`);
        return response.data;
    });


  return (
    <Layout>
      <div className="h-full w-full flex justify-center items-center">
        <div className='w-96 h-min max-w-full max-h-full p-8 rounded-2xl shadow-main flex flex-col justify-center gap-12 overflow-scroll'>
          <div className='w-full h-full'>
            <h2 className='ml-3 text-customGray font-medium'>Choose a network to connect</h2>
            <div className='relative w-full h-full border border-b-color rounded-2xl p-6 flex flex-col justify-center items-center gap-5'>
                {allSSIDs && allSSIDs.map( (item :any) => {
                    return(
                        <div className='w-full flex items-center gap-4 bg-customGrayLight border border-transparent hover:border-customGray cursor-pointer rounded-lg py-2 px-4'>
                            <img src={Wifi} alt="templates" className="w-5 h-5" />
                            <div>
                                <p>{item.SSID}</p>
                                <p className='text-xs text-customBlue'>saved</p>
                            </div>
                        </div>
                    )
                })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
