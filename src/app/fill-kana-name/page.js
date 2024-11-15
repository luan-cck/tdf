'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import Header from '@/components/Header';
import Check from '@/images/check-green.svg';
import Volume from '@/images/volume-circle.svg';
import { getVoices, speakText, stopSpeaking } from '@/utils/speak';
import ButtonBlue from '@/components/ButtonBlue';
import ButtonSmall from '@/components/ButtonSmall';
import Footer from '@/components/Footer';

export default function fillKanaName() {
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showInput1Error, setShowInput1Error] = useState(false);
  const [showInput2Error, setShowInput2Error] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingSmall, setLoadingSmall] = useState(false);
  const [input1Value, setInput1Value] = useState('');
  const [input2Value, setInput2Value] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isJpy, setIsJpy] = useState('true');
  const [user, setUser] = useState({});

  const router = useRouter();

  const inputChange = (e) => {
    const regex = /^[a-zA-Z\s]+$/;
    const value = e.target.value;
    setInputValue(value);
    if (regex.test(value)) {
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  const input1Change = (e) => {
    const regex = /^[\u3040-\u309F\u30A0-\u30FF]+$/;
    const value = e.target.value;
    setInput1Value(value);
    if (regex.test(value)) {
      setShowInput1Error(false);
    } else {
      setShowInput1Error(true);
    }
  };

  const input2Change = (e) => {
    const regex = /^[\u3040-\u309F\u30A0-\u30FF]+$/;
    const value = e.target.value;
    setInput2Value(value);
    if (regex.test(value)) {
      setShowInput2Error(false);
    } else {
      setShowInput2Error(true);
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    if (isJpy === 'true') {
      if (!input1Value) {
        setShowInput1Error(true);
        setLoading(false);
      }

      if (!input2Value) {
        setLoading(false);
        setShowInput2Error(true);
      }

      if (!showInput1Error && !showInput2Error && input1Value && input2Value) {
        user.bank_account_name = input1Value + ' ' + input2Value;
        localStorage.setItem('userInfo', JSON.stringify(user));
        setTimeout(() => {
          router.push('/select-reason-cancel');
        }, 500);
      }
    } else {
      if (!inputValue) {
        setLoading(false);
        setShowError(true);
      }

      if (!showError && inputValue) {
        user.bank_account_name = inputValue;
        localStorage.setItem('userInfo', JSON.stringify(user));
        setTimeout(() => {
          router.push('/select-reason-cancel');
        }, 500);
      }
    }
  };

  useEffect(() => {
    const jpy = localStorage.getItem('jpy');
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    setUser(userInfo);
    if (jpy) {
      setIsJpy(jpy);
    }

    if (userInfo?.bank_account_name) {
      if (
        userInfo?.bank_currency === 'usd_usa' ||
        userInfo?.bank_currency === 'usd_aus' ||
        userInfo?.bank_currency === 'eur'
      ) {
        setInputValue(userInfo?.bank_account_name);
      } else {
        setInput1Value(userInfo?.bank_account_name?.split(' ')[0]);
        setInput2Value(userInfo?.bank_account_name?.split(' ')[1]);
      }
    }

    getVoices().then((availableVoices) => {
      // female voice
      const femaleVoices = availableVoices.filter((voice) =>
        voice.name.toLowerCase().includes('kyoko')
      );
      const japaneseFemaleVoice = femaleVoices.find(
        (voice) => voice.lang === 'ja-JP'
      );
      if (japaneseFemaleVoice) {
        setSelectedVoice(japaneseFemaleVoice);
      }
    });
  }, []);

  const speak = (text) => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      if (!text) return;
      speakText(text, selectedVoice, () => setIsSpeaking(false));
      setIsSpeaking(true);
    }
  };

  return (
    <main className="flex flex-col h-dvh items-center">
      <Header
        title={
          isJpy === 'true'
            ? '口座名義人さまの氏名（全角カナ）をご入力ください'
            : '口座名義人さまの氏名（アルファベット）をご入力ください'
        }
        subTitle="※ご契約者さま名義以外の口座はご指定いただけません"
        volumeWhite={false}
        titleColor="primary"
        bg="white"
        textAlign="start"
        voice={selectedVoice}
        voiceTitle={`${
          isJpy === 'true'
            ? '口座名義人さまの氏名（全角カナ）をご入力ください'
            : '口座名義人さまの氏名（アルファベット）をご入力ください'
        } ご契約者さま名義以外の口座はご指定いただけません`}
      />

      <div className="border-t border-light w-full h-full">
        {isJpy === 'true' ? (
          <div className="w-full py-5 px-6">
            <div>
              <p className="mb-2 font-bold">姓</p>
              <div className="flex items-center">
                <input
                  onChange={input1Change}
                  className={`${
                    showInput1Error
                      ? 'bg-warningInput'
                      : input1Value
                      ? 'bg-sky'
                      : ''
                  } w-[88%] h-[50px] pl-2 border-2 border-gray rounded`}
                  value={input1Value}
                  placeholder="セイホ"
                />
                {input1Value && !showInput1Error && (
                  <Image src={Check} className="ml-auto" alt="icon check" />
                )}
              </div>
              <p className="mt-2 font-bold">例）セイホ</p>
            </div>

            <div className="mt-6">
              <p className="mb-2 font-bold">名</p>
              <div className="flex items-center">
                <input
                  onChange={input2Change}
                  className={`${
                    showInput2Error
                      ? 'bg-warningInput'
                      : input2Value
                      ? 'bg-sky'
                      : ''
                  } w-[88%] h-[50px] pl-2 border-2 border-gray rounded`}
                  value={input2Value}
                  placeholder="ダイキ"
                />
                {input2Value && !showInput2Error && (
                  <Image src={Check} className="ml-auto" alt="icon check" />
                )}
              </div>
              <p className="mt-2 font-bold">例）ダイキ</p>
            </div>
          </div>
        ) : (
          <div className="row justify-between w-full py-5 px-6">
            <div className="flex justify-between w-full">
              <input
                className={`${
                  showError ? 'bg-warningInput' : inputValue ? 'bg-sky' : ''
                } w-[88%] h-[50px] rounded border-2 border-gray p-2 text-start`}
                placeholder="SEIHO DAIKI"
                value={inputValue}
                onChange={inputChange}
              />
              {inputValue && !showError && (
                <Image src={Check} className="ml-auto" alt="icon check" />
              )}
            </div>
            <p className="w-80 text-xsm font-bold tracking-wider mt-2">
              例）SEIHO DAIKI
            </p>

            <div className="flex mt-4">
              <div className="w-[88%]">
                <h2 className="font-bold">
                  ※通帳等のとおりにアルファベットでご入力ください。
                </h2>
              </div>
              <div className="shrink-0 w-[12%]">
                <Image
                  onClick={() => {
                    speak('通帳等のとおりにアルファベットでご入力ください。');
                  }}
                  className="ml-auto cursor-pointer"
                  src={Volume}
                  alt="icon volume"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center w-full px-6 mt-1">
        {((showInput1Error && input1Value.length === 0) ||
          (showInput2Error && input2Value.length === 0)) && (
          <p className="text-error font-bold tracking-wider">
            未入力の項目があります
          </p>
        )}

        {isJpy !== 'true' && showError && inputValue.length === 0 && (
          <p className="text-error font-bold tracking-wider">
            未入力の項目があります
          </p>
        )}
      </div>

      <div className="w-full py-2 px-6">
        <ButtonBlue loading={loading} name="次へ進む" onClick={handleSubmit} />
      </div>
      <div>
        <ButtonSmall
          loading={loadingSmall}
          name="前に戻る"
          onClick={() => {
            setLoadingSmall(true);
            setTimeout(() => {
              router.push('/fill-account-number');
            }, 500);
          }}
        />
      </div>
      <Footer />
    </main>
  );
}
