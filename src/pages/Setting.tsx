import { useEffect, useRef, useState } from 'react';
import Layout from '../components/Layout';

import ToggleSwitch from '../components/ToggleSwith';
import ColoredSquares from '../components/ProgressSquares';
import Edit from '../assets/icons/edit.svg';
import axios from 'axios';
import { useQuery } from 'react-query';
import LiveNumberInput from '../components/LiveNumberInput';


export default function Settings() {

  const [authToken, setAuthToken] = useState('');

  const [infoButtonText, setInfoButtonText] = useState('Update');
  // Printer Settings States
  const [printerStatus, setPrinterStatus] = useState(false);
  const [autoOn, setAutoOn] = useState(false);
  const [printMirror, setPrintMirror] = useState(false);
  const [printSpeed, setPrintSpeed] = useState(0);
  const [encodeSteps, setEncodeSteps] = useState(0);
  const [inkOpacity, setInkOpacity] = useState(0);
  
  
  const [SecurityButtonText, setSecurityButtonText] = useState('Update');
  // Security Settings States
  const [authStatus, setAuthStatus] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const { data: printerInfo } = useQuery('printerSettings', async () => {
    const response = await axios.get(`/printer/getPrinterSettings`);
    return response.data;
  });

  const { data: AuthRequired } = useQuery('authRequired', async () => {
    const response = await axios.get('/authenticationConfig/getAll');
    return response.data;
  });

  const { data: AuthInfo } = useQuery('authInfo', async () => {
    const response = await axios.get(`/user/getById?id=2`);
    return response.data;
  });

  // Ref to track if the printer info initial setup is done
  const initialPrinterInfoSetup = useRef(false);
  // Populate Printer Settings States
  useEffect(() => {
    // Only set state if initial setup has not been done
    if (printerInfo && !initialPrinterInfoSetup.current) {
      setPrinterStatus(printerInfo?.printer_status || false);
      setAutoOn(printerInfo?.printer_auto_on || false);
      setPrintMirror(printerInfo?.print_mirror || false);
      setPrintSpeed(printerInfo?.printspeed || 0);
      setEncodeSteps(printerInfo?.encoder_steps || 0);
      setInkOpacity(printerInfo?.ink_opacity || 0);

      initialPrinterInfoSetup.current = true;
    }
  }, [printerInfo]);


  // Ref to track if the printer info initial setup is done
  const initialAuthRequiredSetup = useRef(false);
  // Set Auth required switch
  useEffect(() => {
    if (AuthRequired && !initialAuthRequiredSetup.current) {
      setAuthStatus(AuthRequired || false);

      initialAuthRequiredSetup.current = true;
    }
  }, [AuthRequired]);

  
  // Ref to track if the printer info initial setup is done
  const initialPrinterAuthSetup = useRef(false);
  // Set printer auth info states
  useEffect(() => {
    if (AuthInfo && !initialPrinterAuthSetup.current) {
      setUsername(AuthInfo?.username || '');
      setPassword(AuthInfo?.password || '');

      initialPrinterAuthSetup.current = true;
    }
  }, [AuthInfo]);


  // Grab auth token if it exists
  useEffect(() => {
    const token = localStorage.getItem('aivwa-printer-auth-token');
    
    if (token) {
      setAuthToken(token);
    }
  }, []);


  const handlePrinterStatusUpdate = () => {
    setInfoButtonText('Updating...');
    const settings = [
      { "setting": "printer_status", "value": printerStatus ? 'on' : 'off' },
      { "setting": "printer_auto_on", "value": autoOn ? 'on' : 'off' },
      { "setting": "print_mirror", "value": printMirror ? 'on' : 'off' },
      { "setting": "printspeed", "value": printSpeed },
      { "setting": "encoder_steps", "value": encodeSteps },
      { "setting": "ink_opacity", "value": inkOpacity }
    ];

    // Convert the output object to JSON
    const outputJSON = JSON.stringify(settings);


    axios.post('/printer/setPrinterSettings', null, {
      params: {
          settings: outputJSON
      },
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setInfoButtonText('Success!');
          setTimeout(() => setInfoButtonText('Update'), 2000);
        } else {
          throw new Error('Non-200 status code');
        }
      })
      .catch((error) => {
        console.error('Error updating status:', error);
        setInfoButtonText('Failed');
        setTimeout(() => setInfoButtonText('Update'), 2000);
      });
  }
  

  const handleSecurityUpdate = () => {
    setSecurityButtonText('Updating...');
    const authSettings = [
      { "parameter": "username", "value": authStatus ? 'on' : 'off' },
      { "parameter": "username", "value": username },
      { "parameter": "password", "value": password },
    ];
    axios
      .post('/printer/AuthenticationConfig', { authSettings }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setSecurityButtonText('Success!');
          setTimeout(() => setSecurityButtonText('Update'), 2000);
        } else {
          throw new Error('Non-200 status code');
        }
      })
      .catch((error) => {
        console.error('Error updating status:', error);
        setSecurityButtonText('Failed');
        setTimeout(() => setSecurityButtonText('Update'), 2000);
      });
  }



  
  return (
    <Layout>
      <div className="h-full w-full flex justify-center items-center">
        <div className='w-[60rem] h-[80%] max-w-full max-h-full p-8 rounded-2xl shadow-main flex flex-col gap-4  overflow-scroll'>

          {/* Top Container */}
          <div className="w-full flex gap-4">

            {/* Printer */}
            <div className='w-[45%] h-min relative'>

              <h2 className='h-[8%] ml-3 text-customGray font-medium'>Printer</h2>
              <div className='w-full h-[92%] border border-b-color rounded-2xl p-4 flex flex-col gap-3'>

                <div className="w-full h-min flex">
                  <div className="w-5/12 flex items-center font-light">Printer Status</div>
                  <div className="w-7/12">
                    <ToggleSwitch
                      toggleStatus = {printerStatus}
                      setToggleStatus = {setPrinterStatus}
                    />
                  </div>
                </div>
                
                <div className="w-full h-min flex">
                  <div className="w-5/12 flex items-center font-light">Printer Auto ON</div>
                  <div className="w-7/12">
                    <ToggleSwitch
                      toggleStatus = {autoOn}
                      setToggleStatus = {setAutoOn}
                    />
                  </div>
                </div>
                
                <div className="w-full h-min flex">
                  <div className="w-5/12 flex items-center font-light">Print Speed</div>
                  <div className="w-7/12 flex items-center gap-2">
                    <div className='w-24'>
                      <LiveNumberInput
                        inputValue={printSpeed}
                        setInputValue={setPrintSpeed}
                      />
                    </div>
                    <p className='text-micro text-customGray'>meter/minute</p>
                  </div>
                </div>
                
                <div className="w-full h-min flex">
                  <div className="w-5/12 flex items-center font-light">Encoder Steps</div>
                  <div className="w-7/12 flex items-center gap-2">
                    <div className='w-24'>
                      <LiveNumberInput
                        inputValue={encodeSteps}
                        setInputValue={setEncodeSteps}
                      />
                    </div>
                    <p className='text-micro text-customGray'>step/milimeter</p>
                  </div>
                </div>
                
                <div className="w-full h-min flex">
                  <div className="w-5/12 flex items-center font-light">Print mirror</div>
                  <div className="w-7/12">
                    <ToggleSwitch
                      toggleStatus = {printMirror}
                      setToggleStatus = {setPrintMirror}
                    />
                  </div>
                </div>
                
                <div className="w-full h-min flex">
                  <div className="w-5/12 flex items-center font-light">Ink Opacity</div>
                  <div className="w-7/12">
                    <ColoredSquares progress={inkOpacity} setProgress={setInkOpacity} total={5} />
                  </div>
                </div>

                <button
                  className='absolute bottom-[.3rem] right-[1rem] font-sm text-white bg-customBlue text-xs font-normal px-4 py-[.6rem] rounded-lg rounded-br-xl translate-x-3'
                  onClick={handlePrinterStatusUpdate}
                >
                  {infoButtonText}
                </button>
                
              </div>

            </div>

            {/* Security */}
            <div className='w-[55%] h-full'>

              <h2 className='h-[8%] ml-3 text-customGray font-medium'>Security</h2>
              <div className='h-[92%] w-full relative border border-b-color rounded-2xl p-4 flex flex-col justify-start gap-3'>

                <div className="w-full h-min flex">
                  <div className="w-5/12 flex items-center font-light">Login Required</div>
                  <div className="w-7/12">
                    <ToggleSwitch
                      toggleStatus = {authStatus}
                      setToggleStatus = {setAuthStatus}
                    />
                  </div>
                </div>
                
                <div className="w-full h-min flex">
                  <div className="w-5/12 flex items-center font-light">Login Username</div>
                  <div className="w-7/12">
                    <input
                      type="text"
                      className='w-full px-2 py-[.4rem] text-sm border border-customGray rounded-lg'
                      placeholder={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="w-full h-min flex">
                  <div className="w-5/12 flex items-center font-light">Login Password</div>
                  <div className="w-7/12 flex items-center gap-2">
                    <input
                      type="text"
                      className='w-full px-2 py-[.4rem] text-sm border border-customGray rounded-lg'
                      placeholder={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  className='absolute bottom-[.22rem] right-[.93rem] font-sm text-white bg-customBlue text-xs font-normal px-4 py-[.6rem] rounded-lg rounded-br-xl translate-x-3'
                  onClick={handleSecurityUpdate}
                >
                    {SecurityButtonText}
                </button>

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
