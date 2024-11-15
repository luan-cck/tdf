'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import Header from '@/components/Header';
import Volume from '@/images/volume-circle.svg';
import Check from '@/images/check-green.svg';
import { getVoices, speakText, stopSpeaking } from '@/utils/speak';
import ButtonBlue from '@/components/ButtonBlue';
import ButtonSmall from '@/components/ButtonSmall';
import Footer from '@/components/Footer';

export default function SelectEvent() {
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingSmall, setLoadingSmall] = useState(false);
  const [user, setUser] = useState({});

  const router = useRouter();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    setUser(userInfo);

    if (userInfo?.bank_account_type) {
      setSelectedButton(userInfo?.bank_account_type);
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

  const handleButtonClick = (button) => {
    setSelectedButton(button);
    setShowError(false);
  };

  const handleSubmit = () => {
    setLoading(true);
    if (!selectedButton) {
      setShowError(true);
      setLoading(false);
    } else {
      user.bank_account_type = selectedButton;
      localStorage.setItem('userInfo', JSON.stringify(user));
      setTimeout(() => {
        router.push('/fill-account-number');
      }, 500);
    }
  };

  return (
    <main className="flex flex-col h-dvh items-center">
      <Header
        title="種目をご選択ください"
        volumeWhite={false}
        titleColor="primary"
        bg="white"
        textAlign="start"
        voice={selectedVoice}
      />

      <div className="border-t border-light h-full w-full">
        <div className="flex justify-between w-full mt-5 mb-2 px-6 relative">
          {selectedButton === 'normal' && (
            <Image
              src={Check}
              className="ml-5 absolute top-3.5 left-3.5"
              alt="icon check"
            />
          )}
          <button
            className={`${
              selectedButton === 'normal'
                ? 'bg-sky'
                : showError
                ? 'bg-warningInput'
                : ''
            }
          w-[88%] h-[50px] text-primary border-2 border-primary p-2 text-start font-bold pl-8 rounded-md`}
            onClick={() => handleButtonClick('normal')}
          >
            普通（総合）
          </button>
          <Image
            onClick={() => {
              speak('普通（総合）');
            }}
            src={Volume}
            className="ml-5 cursor-pointer"
            alt="icon volume"
          />
        </div>
        <div className="flex justify-between w-full mt-5 mb-2 px-6 relative">
          {selectedButton === 'temporary' && (
            <Image
              src={Check}
              className="ml-5 absolute top-3.5 left-3.5"
              alt="icon check"
            />
          )}
          <button
            className={`${
              selectedButton === 'temporary'
                ? 'bg-sky'
                : showError
                ? 'bg-warningInput'
                : ''
            } w-[88%] h-[50px] text-primary border-2 border-primary p-2 text-start font-bold pl-8 rounded-md`}
            onClick={() => handleButtonClick('temporary')}
          >
            当座
          </button>
          <Image
            onClick={() => {
              speak('当座');
            }}
            src={Volume}
            className="ml-5 cursor-pointer"
            alt="icon volume"
          />
        </div>
        <div className="flex justify-between w-full mt-5 mb-2 px-6 relative">
          {selectedButton === 'saving' && (
            <Image
              src={Check}
              className="ml-5 absolute top-3.5 left-3.5"
              alt="icon check"
            />
          )}
          <button
            className={`${
              selectedButton === 'saving'
                ? 'bg-sky'
                : showError
                ? 'bg-warningInput'
                : ''
            } w-[88%] h-[50px] text-primary border-2 border-primary p-2 text-start font-bold pl-8 rounded-md`}
            onClick={() => handleButtonClick('saving')}
          >
            貯蓄
          </button>
          <Image
            onClick={() => {
              speak('貯蓄');
            }}
            src={Volume}
            className="ml-5 cursor-pointer"
            alt="icon volume"
          />
        </div>
      </div>

      <div className="w-full py-2 px-6">
        {showError && (
          <div className="flex justify-center w-full my-4">
            <p className="text-error font-bold tracking-wider">
              項目を選択してください
            </p>
          </div>
        )}
        <ButtonBlue loading={loading} name="次へ進む" onClick={handleSubmit} />
      </div>
      <div>
        <ButtonSmall
          loading={loadingSmall}
          name="前に戻る"
          onClick={() => {
            setLoadingSmall(true);
            setTimeout(() => {
              router.push('/fill-bank-branch-name');
            }, 500);
          }}
        />
      </div>
      <Footer />
    </main>
  );
}
