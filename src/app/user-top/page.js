'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Volume from '@/images/volume-circle.svg';
import { getVoices, speakText, stopSpeaking } from '@/utils/speak';

import Logo from '@/images/logo-td.svg';
import ButtonBlue from '@/components/ButtonBlue';

export default function Home() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
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
    <main className="flex flex-col items-center h-dvh">
      <div className="pt-7 px-6 max-[375px]:pt-6">
        <Image src={Logo} alt="logo" />
      </div>
      <div className="px-6 mt-24 max-[375px]:mt-4 max-[375px]:mb-40 h-full overflow-scroll">
        <p className="font-bold">■ご請求について</p>
        <div className="flex items-center border-t border-b py-2">
          <div className="w-[88%]">
            <p>
              T&Dフィナンシャル生命の普通保険約款・特約条項に基づき、保険契約の解約を請求します。
            </p>
          </div>
          <div className="shrink-0 w-[12%]">
            <Image
              onClick={() => {
                speak(
                  'T&Dフィナンシャル生命の普通保険約款・特約条項に基づき、保険契約の解約を請求します。'
                );
              }}
              className="ml-auto cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        </div>
        <div className="flex items-center mt-4">
          <div className="w-[88%]">
            <p>【ご注意ください】</p>
            <p>
              画面に沿って表示内容をご確認のうえ必要事項をご入力ください。
              <br />
              「受付完了」画面が表示されましたら受付完了となります。表示される前に画面を閉じますと受付できませんのでご注意ください。
            </p>
          </div>
          <div className="shrink-0 w-[12%]">
            <Image
              onClick={() => {
                speak(
                  'ご注意ください。画面に沿って表示内容をご確認のうえ必要事項をご入力ください。「受付完了」画面が表示されましたら受付完了となります。表示される前に画面を閉じますと受付できませんのでご注意ください'
                );
              }}
              className="ml-auto cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        </div>
      </div>

      <div className="text-center w-full fixed bottom-0 pb-1 bg-white">
        <div className="px-6">
          <h2 className="text-start font-bold mb-4 text-[14px]">
            ※上記同意の上「手続きへ進む」をタップしてお進みください。
          </h2>
          <ButtonBlue
            name="手続きへ進む"
            onClick={() => {
              setLoading(true);
              const localToken = localStorage.getItem('token');
              const birthdaySuccess = localStorage.getItem('birthday');

              if (localToken && birthdaySuccess) {
                setTimeout(() => {
                  router.push('/security-number');
                }, 500);
              }
            }}
            loading={loading}
          />
        </div>

        <p className="text-[10px] mt-4">
          Copyright,Ｔ&Ｄ Financial Life Insurance Company. All Rights Reserved.
        </p>
      </div>
    </main>
  );
}
