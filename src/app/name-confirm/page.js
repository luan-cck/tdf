'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import Header from '@/components/Header';
import Volume from '@/images/volume-circle.svg';
import ButtonBlue from '@/components/ButtonBlue';
import { getVoices, speakText, stopSpeaking } from '@/utils/speak';
import ButtonSmall from '@/components/ButtonSmall';
import { useRouter } from 'next/navigation';

export default function NameConfirm() {
  const [isError, setIserror] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingSmall, setLoadingSmall] = useState(false);
  const [name, setName] = useState('');
  const [user, setUser] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    setUser(userInfo);

    if (userInfo?.customer_name) {
      setName(userInfo?.customer_name);
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

  const inputChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length > 100) {
      setIserror(true);
    } else {
      setIserror(false);
    }
    setName(inputValue);
  };

  const handleSubmit = () => {
    if (!isError) {
      setLoading(true);
      if (name.length > 0) {
        user.customer_name = name;
        localStorage.setItem('userInfo', JSON.stringify(user));
      }

      setTimeout(() => {
        router.push('/age-option');
      }, 500);
    }
  };

  return (
    <div className="h-dvh pb-6 flex flex-col justify-between">
      <Header
        title="ご契約者さまの氏名をご確認ください"
        bg="white"
        volumeWhite={false}
        titleColor="primary"
        textAlign="start"
        voice={selectedVoice}
      />

      <div className="px-6 border-t border-light h-full overflow-scroll max-[375px]:mb-32">
        <div className="flex items-center mt-4 mb-4">
          <h2 className="text-primary font-bold">氏名</h2>
          <h1 className="text-xl font-bold ml-8">{user?.contractor_name}</h1>
        </div>

        <div className="flex items-center mt-9">
          <div className="w-[88%]">
            <h2 className="text-primary font-bold">
              改姓がある場合は以下にご入力ください
            </h2>
            <h2 className="text-primary font-bold">
              ※当社にご登録いただいている内容を表示しています。
            </h2>
            <h2 className="text-primary font-bold mb-4">
              ※新旧字体の相違はご入力不要です。
            </h2>
          </div>
          <div className="shrink-0 w-[12%]">
            <Image
              onClick={() => {
                speak(
                  '改姓がある場合は以下にご入力ください当社にご登録いただいている内容を表示しています。新旧字体の相違はご入力不要です。'
                );
              }}
              className="ml-auto cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-[88%]">
            {isError && (
              <p className="text-error text-sm mb-2">
                文字数を超えて入力しました
              </p>
            )}
            <input
              onChange={inputChange}
              value={name}
              className="border-2 border-light px-4 py-2 w-full rounded-md"
              placeholder="保険　大樹"
              type="text"
            />
          </div>
          <div className="shrink-0 w-[12%]"></div>
        </div>
      </div>
      <div className="w-full fixed bottom-0 text-center bg-white">
        <div className="px-6">
          <ButtonBlue
            name="次へ進む"
            onClick={handleSubmit}
            loading={loading}
          />

          <ButtonSmall
            loading={loadingSmall}
            name="前に戻る"
            onClick={() => {
              setLoadingSmall(true);
              setTimeout(() => {
                router.push('/security-number');
              }, 500);
            }}
          />
        </div>

        <p className="text-[10px] mt-2">
          Copyright,Ｔ&Ｄ Financial Life Insurance Company. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
