'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import Header from '@/components/Header';
import Volume from '@/images/volume-circle.svg';
import ButtonBlue from '@/components/ButtonBlue';
import CheckedGreen from '@/images/check-green.svg';
import { getVoices, speakText, stopSpeaking } from '@/utils/speak';
import ButtonSmall from '@/components/ButtonSmall';

export default function AgeOption() {
  const router = useRouter();
  const [isError, setIserror] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [under18, setUnder18] = useState(false);
  const [above18, setAbove18] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingSmall, setLoadingSmall] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    setUser(userInfo);

    if (userInfo?.customer_over_18) {
      setAbove18(true);
    } else if (userInfo?.customer_over_18 === false) {
      setUnder18(true);
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

  const handleSubmit = () => {
    if (!under18 && !above18) {
      setIserror(true);
    } else {
      setLoading(true);
      localStorage.setItem('checkAge', under18 ? 'under18' : 'above18');
      user.customer_over_18 = under18 ? false : true;
      localStorage.setItem('userInfo', JSON.stringify(user));
      setTimeout(() => {
        router.push('/cancel-contract');
      }, 500);
    }
  };

  return (
    <div className="h-dvh pb-6 flex flex-col justify-between">
      <Header
        title="該当する項目を選択してください"
        bg="white"
        volumeWhite={false}
        titleColor="primary"
        textAlign="start"
        voice={selectedVoice}
      />

      <div className="px-6 border-t border-light h-full">
        <div className="flex items-center mt-4 mb-4">
          <div className="w-10/12">
            <div
              onClick={() => {
                setAbove18(true);
                setUnder18(false);
                setIserror(false);
              }}
              className={`flex items-center border-2 border-primary px-4 h-[50px] rounded-md ${
                above18 ? 'bg-sky' : isError && 'bg-warningInput'
              } relative`}
            >
              {above18 && (
                <Image className="absolute" src={CheckedGreen} alt="checked" />
              )}
              <h2 className="text-primary font-bold ml-6">
                ご契約者さまが18歳以上
              </h2>
            </div>
          </div>
          <div className="shrink-0 w-2/12">
            <Image
              onClick={() => {
                speak('ご契約者さまが18歳以上');
              }}
              className="ml-auto cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        </div>

        <div className="flex items-center mt-4 mb-4">
          <div className="w-10/12">
            <div
              onClick={() => {
                setAbove18(false);
                setUnder18(true);
                setIserror(false);
              }}
              className={`flex items-center border-2 border-primary px-4 h-[50px] rounded-md ${
                under18 ? 'bg-sky' : isError && 'bg-warningInput'
              } relative`}
            >
              {under18 && (
                <Image className="absolute" src={CheckedGreen} alt="checked" />
              )}
              <h2 className="text-primary font-bold ml-6">
                ご契約者さまが18歳未満
              </h2>
            </div>
          </div>
          <div className="shrink-0 w-2/12">
            <Image
              onClick={() => {
                speak('ご契約者さまが18歳未満');
              }}
              className="ml-auto cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-[88%]">
            <h2 className="text-primary font-bold">
              ※ご選択によりお手続き内容が異なります。
            </h2>
          </div>
          <div className="shrink-0 w-[12%]">
            <Image
              onClick={() => {
                speak('ご選択によりお手続き内容が異なります。');
              }}
              className="ml-auto cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        </div>
      </div>
      <div className="w-full bottom-6 text-center">
        <div className="px-6">
          {isError && (
            <p className="text-error font-bold mb-2">項目を選択してください</p>
          )}

          <ButtonBlue
            name="次へ進む"
            onClick={handleSubmit}
            loading={loading}
          />

          <ButtonSmall
            name="前に戻る"
            onClick={() => {
              setLoadingSmall(true);
              setTimeout(() => {
                router.push('/name-confirm');
              }, 500);
            }}
            loading={loadingSmall}
          />
        </div>

        <p className="text-[10px] mt-4">
          Copyright,Ｔ&Ｄ Financial Life Insurance Company. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
