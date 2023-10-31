import React, { useRef, useState } from 'react';
import Layout from '../components/Layout';

import ToggleSwitch from '../components/ToggleSwith';
import NumberInput from '../components/NumberInput';
import ColoredSquares from '../components/ProgressSquares';
import Refresh from '../assets/icons/refresh.svg';
import Edit from '../assets/icons/edit.svg';
import { SERVER_IP } from '../helpers/config';
import axios from 'axios';
import { useQuery } from 'react-query';


export default function Settings() {

  const apiKeyRef = useRef<HTMLParagraphElement>(null);
  const [copied, setCopied] = useState(false);
  
  const { data: printerInfo } = useQuery('printerSettings', async () => {
    const response = await axios.get(`http://${SERVER_IP}/printer/getPrinterSettings`);
    return response.data;
  });



  const handleCopyToClipboard = async () => {
    try {

      await navigator.clipboard.writeText(apiKeyRef.current?.textContent ?? '');

      setCopied(true);

      // Revert copied text to copy after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 1500);

    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };


  return (
    <Layout>
      <div className="h-full w-full flex justify-center items-center">
        <div className='w-[60rem] h-[80%] max-w-full max-h-full p-8 rounded-2xl shadow-main flex flex-col gap-4  overflow-scroll'>

          {/* Top Container */}
          <div className="w-full flex gap-4">

            {/* Printer */}
            <div className='w-[45%] h-min'>

              <h2 className='h-[8%] ml-3 text-customGray font-medium'>Printer</h2>
              <div className='w-full h-[92%] border border-b-color rounded-2xl p-4 flex flex-col gap-3'>

                <div className="w-full h-min flex">
                  <div className="w-5/12 flex items-center font-light">Printer Status</div>
                  <div className="w-7/12">
                    <ToggleSwitch
                      toggleStatus = {(printerInfo?.printer_status ? printerInfo.printer_status : 'off' ) === 'on'}
                      apiRoute="/printer/setPrinterSettings"
                      property="printer_status"
                    />
                  </div>
                </div>
                
                <div className="w-full h-min flex">
                  <div className="w-5/12 flex items-center font-light">Printer Auto ON</div>
                  <div className="w-7/12">
                    <ToggleSwitch
                      toggleStatus = {(printerInfo?.printer_auto_on ? printerInfo.printer_auto_on : 'off' ) === 'on'}
                      apiRoute="/printer/setPrinterSettings"
                      property="printer_auto_on"
                    />
                  </div>
                </div>
                
                <div className="w-full h-min flex">
                  <div className="w-5/12 flex items-center font-light">Print Speed</div>
                  <div className="w-7/12 flex items-center gap-2">
                    <div className='w-24'>
                      <NumberInput currentValue={(printerInfo?.printspeed ? printerInfo.printspeed : 0 )} />
                    </div>
                    <p className='text-micro text-customGray'>meter/minute</p>
                  </div>
                </div>
                
                <div className="w-full h-min flex">
                  <div className="w-5/12 flex items-center font-light">Encoder Steps</div>
                  <div className="w-7/12 flex items-center gap-2">
                    <div className='w-24'>
                      <NumberInput currentValue={(printerInfo?.encoder_steps ? printerInfo.encoder_steps : 0 )} />
                    </div>
                    <p className='text-micro text-customGray'>step/milimeter</p>
                  </div>
                </div>
                
                <div className="w-full h-min flex">
                  <div className="w-5/12 flex items-center font-light">Print mirror</div>
                  <div className="w-7/12">
                    <ToggleSwitch
                      toggleStatus = {(printerInfo?.print_mirror ? printerInfo.print_mirror : 'off' ) === 'on'}
                      apiRoute="/printer/setPrinterSettings"
                      property="printer_auto_on"
                    />
                  </div>
                </div>
                
                <div className="w-full h-min flex">
                  <div className="w-5/12 flex items-center font-light">Ink Opacity</div>
                  <div className="w-7/12">
                    <ColoredSquares progress={printerInfo?.ink_opacity ? printerInfo.ink_opacity : 0} total={5} />
                  </div>
                </div>
                
              </div>

            </div>

            {/* Security */}
            <div className='w-[55%] h-full'>

              <h2 className='h-[8%] ml-3 text-customGray font-medium'>Security</h2>
              <div className='h-[92%] w-full border border-b-color rounded-2xl p-4 flex flex-col justify-between gap-3'>

                <div className="w-full h-min flex">
                  <div className="w-5/12 flex items-center font-light">Login Required</div>
                  <div className="w-7/12">
                    {/* <ToggleSwitch /> */}
                  </div>
                </div>
                
                <div className="w-full h-min flex">
                  <div className="w-5/12 flex items-center font-light">Login Username</div>
                  <div className="w-7/12">
                    <input type="text" className='w-full px-2 py-[.4rem] text-sm border border-customGray rounded-lg' />
                  </div>
                </div>
                
                <div className="w-full h-min flex">
                  <div className="w-5/12 flex items-center font-light">Login Password</div>
                  <div className="w-7/12 flex items-center gap-2">
                    <input type="text" className='w-full px-2 py-[.4rem] text-sm border border-customGray rounded-lg' />
                  </div>
                </div>
                
                <div className="w-full h-min flex">
                  <div className="w-5/12 flex items-center font-light">API Security Required</div>
                  <div className="w-7/12 flex items-center gap-2">
                    {/* <ToggleSwitch /> */}
                  </div>
                </div>
                
                <div className="w-full h-min flex">
                  <div className="w-5/12 flex items-center font-light">API Security key</div>
                  <div className="w-7/12 relative flex items-center">
                    <p ref={apiKeyRef} className='w-full px-2 py-[.4rem] text-sm text-customGrayDark border border-customGray rounded-lg'>Lgbd-OSDB-3vdW-Emps</p>
                    {copied ? <span className="text-green-500 text-pico absolute right-9">Copied!</span> : <span onClick={handleCopyToClipboard} className="text-customGrayDark text-pico absolute right-10 cursor-pointer">Copy</span>}
                    <img src={Refresh} alt="refresh" className="w-4 h-4 absolute right-3 cursor-pointer" />
                  </div>
                </div>
                
              </div>
            </div>
          </div>

          {/* Middle Container */}
          <div className='w-full h-full border border-b-color rounded-2xl py-auto px-10 flex justify-evenly items-center'>
            
            <div className='flex flex-col justify-center items-center gap-0 pt-2'>
              <p className="text-customBlue text-xl font-extralight">{printerInfo?.frimware_version ? printerInfo.frimware_version : 'n/a'}</p>
              <p className="text-customGreen text-micro font-semibold opacity-30">Update</p>
              <p className="text-sm text-customGrayDark font-semibold">Firmware Version</p>
            </div>
            
            <div className='flex flex-col justify-center items-center'>
              <p className="text-customBlue text-4xl font-extralight">{printerInfo?.total_print_count ? printerInfo.total_print_count : 'n/a'}</p>
              <p className="text-sm text-customGrayDark font-semibold">Total Print Count</p>
            </div>

            <div className='flex flex-col justify-center items-center pt-3'>
              <pre className="text-customBlue text-center font-extralight leading-5">{printerInfo?.frimware_update_date ? printerInfo.frimware_update_date.replace(' ', '\n') : 'n/a' }</pre>
              <p className="text-sm text-customGrayDark font-semibold">Firmware Date</p>
            </div>
            
          </div>


          {/* Bottom Container */}
          <div className="w-full flex gap-4">

            {/* Left */}
            <div className='w-[55%] h-full border border-b-color rounded-2xl px-8 py-4 flex flex-col gap-1'>
              
              <div className='flex gap-2 items-center text-sm'>
                <p className='pr-1'>Printer Name:</p>
                <p className='text-customBlue'>{printerInfo?.printer_name ? printerInfo.printer_name : 'n/a'}</p>
                <img src={Edit} alt="templates" className="w-4 h-4" />
              </div>

              <div className='flex gap-2 items-center text-sm'>
                <p className='pr-1'>Printer Serial:</p>
                <p className='text-customBlue'>{printerInfo?.printer_serial ? printerInfo.printer_serial : 'n/a'}</p>
              </div>

              <div className='flex gap-2 items-center text-sm'>
                <p>Printer Model:</p>
                <p className='text-customBlue'>1.2.3.4.5.6</p>
              </div>

            </div>

            {/* Right */}
            <div className='w-[45%] h-full border border-b-color rounded-2xl px-8 py-4 flex flex-col gap-1'>
              <div className='flex gap-2 items-center text-sm  opacity-40'>
                <p className='pr-1'>Printer Name:</p>
                <p className='text-customBlue'>Aivwa</p>
                <img src={Edit} alt="templates" className="w-4 h-4" />
              </div>

              <div className='flex gap-2 items-center text-sm  opacity-40'>
                <p className='pr-1'>Printer Serial:</p>
                <p className='text-customBlue'>123456789</p>
              </div>

              <div className='flex gap-2 items-center text-sm  opacity-40'>
                <p>Printer Model:</p>
                <p className='text-customBlue'>1.2.3.4.5.6</p>
              </div>
            </div>
          </div>
        </div>
            
      </div>
    </Layout>
  );
};
