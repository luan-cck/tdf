'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Header from '@/components/Header';
import ButtonBlue from '@/components/ButtonBlue';
import Volume from '@/images/volume-circle.svg';
import { getVoices, speakText, stopSpeaking } from '@/utils/speak';
import ButtonSmall from '@/components/ButtonSmall';

export default function SecurityNumber() {
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingSmall, setLoadingSmall] = useState(false);
  const [user, setUser] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    setUser(userInfo);

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
    <div className="h-dvh pb-2 flex flex-col justify-between">
      <Header
        title="証券番号をご確認ください"
        subTitle="※内容に相違ない場合は「次へ進む」を押してください（次画面以降も同様）"
        bg="white"
        volumeWhite={false}
        titleColor="primary"
        textAlign="start"
        voice={selectedVoice}
        voiceTitle="証券番号をご確認ください 内容に相違ない場合は「次へ進む」を押してください"
      />

      <div className="px-6 border-t border-light h-full">
        <div className="flex items-center mt-4 mb-4">
          <div className="w-10/12">
            <p className="border-2 border-light px-4 h-[50px] w-full rounded-md flex items-center">
              {user?.policy_number}
            </p>
          </div>
          <div className="shrink-0 w-2/12"></div>
        </div>

        <div className="flex items-center mt-4 mb-4">
          <div className="w-10/12">
            <h2 className="text-primary font-bold">
              ※証券番号に相違がある場合、お手数ですが当社お客さまサービスセンターまでご連絡ください。
            </h2>
          </div>
          <div className="shrink-0 w-2/12">
            <Image
              onClick={() => {
                speak(
                  '証券番号に相違がある場合、お手数ですが当社お客さまサービスセンターまでご連絡ください。'
                );
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
          <ButtonBlue
            loading={loading}
            name="次へ進む"
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                router.push('/name-confirm');
              }, 500);
            }}
          />

          <ButtonSmall
            loading={loadingSmall}
            name="前に戻る"
            onClick={() => {
              setLoadingSmall(true);
              setTimeout(() => {
                router.push('/');
              }, 500);
            }}
          />
        </div>

        <p className="text-[10px] mt-4">
          Copyright,Ｔ&Ｄ Financial Life Insurance Company. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
