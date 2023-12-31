import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';

import Wifi from '../assets/icons/wifi.svg';
import Cog from '../assets/icons/cog-icon.svg';
import Active from '../assets/icons/active.png';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';




export default function Dashboard() {

  const { data: activeWIFI } = useQuery('activeWIFI', async () => {
    const response = await axios.get(`/printer/getactiveWiFi`);
    return response.data;
  });
  
  const { data: activeTemplateData } = useQuery('activeTemplate', async () => {
    const response = await axios.get(`/templates/getActiveTemplate`);
    return response.data;
  });
  
  const { data: printerInfo } = useQuery('printerInfo', async () => {
    const response = await axios.get(`/printer/getPrinterInfo`);
    return response.data;
  });

  return (
    <Layout>
      <div className="h-full w-full flex justify-center items-center">
        <div className='w-[54rem] h-[80%] max-w-full max-h-full p-8 rounded-2xl shadow-main flex flex-col gap-12 overflow-scroll'>

          {/* Now Printing section */}
          <div className='w-full h-min'>
            <h2 className='ml-3 text-customGray font-medium'>Now Printing</h2>
            <div className='w-full h-full border border-b-color rounded-2xl p-4'>
              <div className='w-full h-full rounded-lg shadow-pane flex justify-between items-center px-8'>
                <img src={Cog} alt="templates" className="w-5 h-5" />
                <div className='flex flex-col text-center flex-1'>
                  <p className='text-sm font-light text-customGray'>File Name:</p>
                  <p className='text-sm'>{activeTemplateData?.document_name ? activeTemplateData?.document_name : 'n/a' }</p>
                </div>
                <div className='flex flex-col text-center flex-1'>
                  <p className='text-sm font-light text-customGray'>Size:</p>
                  <p className='text-sm'>n/a</p>
                </div>
                <div className='flex flex-col text-center flex-1'>
                  <p className='text-sm font-light text-customGray'>Print Count:</p>
                  <p className='text-sm'>{activeTemplateData?.print_count ? activeTemplateData?.print_count : 'n/a' }</p>
                </div>
                <div className='flex flex-col text-center flex-1'>
                  <p className='text-sm font-light text-customGray'>Last Updated:</p>
                  <p className='text-sm'>{activeTemplateData?.update_date ? activeTemplateData.update_date.replace(/:\d{2}$/, '') : 'n/a' }</p>
                </div>
                <img src={Active} alt="templates" className="w-7 h-7" />
              </div>
            </div>
          </div>

          {/* Printer Status */}
          <div className='w-full h-full flex gap-4'>
            <div className="h-full w-3/5 flex flex-col gap-8 justify-between">
              <div className='h-full flex flex-col'>
                <h2 className='ml-3 text-customGray font-medium'>Printer Status</h2>
                <div className='w-full h-full border border-b-color rounded-2xl p-4 flex justify-between text-center'>
                  <div className="w-1/3 flex flex-col justify-center">
                    <p className='font-light text-customGray text-sm '>Temperature:</p>
                    <p className='font-medium text-lg'>39</p>
                  </div>
                  <div className="w-1/3 flex flex-col justify-center border-l border-r border-b-color">
                    <p className='font-light text-customGray text-sm '>Humidity:</p>
                    <p className='font-medium text-lg'>10%</p>
                  </div>
                  <div className="w-1/3 flex flex-col justify-center">
                    <p className='font-light text-customGray text-sm '>Ink Level:</p>
                    <div className='font-medium text-lg flex items-center justify-center gap-1'>
                      5cm
                      <p className='text-customGray text-sm'>/7cm</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* WiFi Connections */}
              <div className=' flex flex-col'>
                <h2 className='ml-3 text-customGray font-medium'>WiFi Connections</h2>
                <div className='w-full h-fit border border-b-color rounded-2xl px-8 py-4 flex justify-between items-center'>
                  <div className='flex items-center gap-4'>
                    <img src={Wifi} alt="templates" className="w-5 h-5" />
                    <div>
                      <p>{activeWIFI ? activeWIFI : 'n/a' }</p>
                      <p className='text-xs text-customBlue'>connected</p>
                    </div>
                  </div>
                  <Link to='/wifi-setting' className='text-xs'>
                    Settings
                  </Link>
                </div>
              </div>

              {/* Firmware Update */}
              <div className='h-full flex flex-col'>
                <h2 className='ml-3 text-customGray font-medium'>Firmware Update</h2>
                <div className='w-full h-full border border-b-color rounded-2xl px-8 py-4 flex justify-between items-center'>
                  <div className='flex flex-col items-center'>
                      <p className='text-xl text-customBlue'>{printerInfo ? printerInfo.frimware_version : 0}</p>
                      <p className='text-sm text-customGray font-semibold'>Firmware Version</p>
                  </div>
                  <div className='text-xs text-customGreen'>
                    Update
                  </div>
                </div>
              </div>

            </div>

            {/* Recent Activity */}
            <div className='w-2/5 h-full flex flex-col'>
              <h2 className='ml-3 text-customGray font-medium'>Recent Activity</h2>
              <div className='w-full h-full border border-b-color rounded-2xl p-4'>
                <div className='w-full h-min border-t border-b-color mt-[2.5rem]'></div>
                <div className='w-full h-min border-t border-b-color mt-[2.5rem]'></div>
                <div className='w-full h-min border-t border-b-color mt-[2.5rem]'></div>
                <div className='w-full h-min border-t border-b-color mt-[2.5rem]'></div>
                <div className='w-full h-min border-t border-b-color mt-[2.5rem]'></div>
                <div className='w-full h-min border-t border-b-color mt-[2.5rem]'></div>
              </div>
            </div>
          </div>
            
        </div>
      </div>
    </Layout>
  );
};
