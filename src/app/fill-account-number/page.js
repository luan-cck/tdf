'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import Header from '@/components/Header';
import Check from '@/images/check-green.svg';
import { getVoices, speakText, stopSpeaking } from '@/utils/speak';
import ButtonBlue from '@/components/ButtonBlue';
import ButtonSmall from '@/components/ButtonSmall';
import Footer from '@/components/Footer';

export default function fillAccountNumber() {
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showError, setShowError] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [checkValue, setCheckValue] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingSmall, setLoadingSmall] = useState(false);
  const [isJpy, setIsJpy] = useState('true');
  const [user, setUser] = useState({});

  const router = useRouter();

  useEffect(() => {
    const jpy = localStorage.getItem('jpy');
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (jpy) {
      setIsJpy(jpy);
    }
    setUser(userInfo);

    if (userInfo?.bank_account_number) {
      setInputValue(userInfo?.bank_account_number);
      setCheckValue(true);
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

  const inputChange = (e) => {
    const value = e.target.value;
    const regex = isJpy === 'true' ? /\b\d{7}\b/ : /^\d+$/;
    setInputValue(value);
    if (regex.test(value)) {
      setCheckValue(true);
      setShowError(false);
    } else {
      setCheckValue(false);
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    if (!inputValue) {
      setShowError(true);
      setCheckValue(false);
      setLoading(false);
    } else {
      if (inputValue.length !== 7 && isJpy === 'true') {
        setShowError(true);
        setCheckValue(false);
        setLoading(false);
      } else {
        if (checkValue && inputValue) {
          setShowError(false);
          user.bank_account_number = inputValue;
          localStorage.setItem('userInfo', JSON.stringify(user));
          setTimeout(() => {
            router.push('/fill-kana-name');
          }, 500);
        } else {
          setLoading(false);
        }
      }
    }
  };

  return (
    <main className="flex flex-col h-dvh items-center">
      <Header
        title="口座番号をご入力ください"
        volumeWhite={false}
        titleColor="primary"
        bg="white"
        textAlign="start"
        voice={selectedVoice}
      />
      <div className="border-t border-light w-full h-full overflow-y-scroll">
        <div className="row justify-between w-full py-5 px-6">
          <div className="flex justify-between w-full">
            <input
              className={`${
                showError
                  ? 'bg-warningInput'
                  : checkValue
                  ? 'bg-sky'
                  : !checkValue && inputValue.length !== 0 && 'bg-warningInput'
              } w-[88%] border-2 border-gray rounded p-2 text-start`}
              type="tel"
              placeholder="1234567"
              value={inputValue}
              onChange={inputChange}
            />
            {checkValue && (
              <Image src={Check} className="ml-auto" alt="icon check" />
            )}
          </div>
          {isJpy === 'true' && (
            <p
              className={`w-[88%] font-bold tracking-wider mt-2 ${
                showError && 'text-error'
              }`}
            >
              ※口座番号が7桁に満たない場合には、先頭に0を入力して7桁でご入力ください。
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-center w-full px-6 mt-1">
        {showError && inputValue.length === 0 && (
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
              router.push('/select-event');
            }, 500);
          }}
        />
      </div>
      <Footer />
    </main>
  );
}
