'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Logo from '@/images/logo.svg';
import Footer from '@/components/Footer';
import Volume from '@/images/volume-circle.svg';
import Check from '@/images/check-green.svg';
import { getVoices, speakText, stopSpeaking } from '@/utils/speak';
import ButtonSmall from '@/components/ButtonSmall';

export default function CancelContractSuccess() {
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

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
    <main className="flex flex-col min-h-screen items-center h-dvh">
      <div className="w-full">
        <div className="h-[60px] flex items-center px-6 shadow-xml">
          <Image width={178} src={Logo} alt="Logo" />
        </div>
      </div>

      <div className="w-full px-6 border-light m-auto py-5 gap-3 content-center">
        <div className="flex justify-center">
          <p className="text-primary font-bold tracking-wider text-center text-[26px]">
            受付完了
          </p>
        </div>
        <div className="flex justify-between mt-5 items-center">
          <div className="w-[90%]">
            <p className="font-bold tracking-wider w-full">
              受付手続きは以上となります。
            </p>
            <p className="font-bold tracking-wider w-full mb-2">
              これより解約手続きを進めさせていただきます。
            </p>
            <p className="font-bold tracking-wider w-full mb-2">
              お手続き完了後、ご解約の完了通知を郵送させていただきます。
            </p>
            <p className="font-bold tracking-wider w-full mb-2">
              受付内容に不備等がない場合、１～２営業日ほどでご指定の口座にお振込みいたします。
            </p>
            <p className="font-bold tracking-wider w-full">
              お手続きいただき、ありがとうございました。
            </p>
          </div>
          <div className="w-[10%]">
            <Image
              onClick={() => {
                speak(
                  `受付手続きは以上となります。
                  これより解約手続きを進めさせていただきます。
                  お手続き完了後、
                  ご解約の完了通知を郵送させていただきます。
                  受付内容に不備等がない場合、
                  １～２営業日ほどでご指定の口座にお振込みいたします。
                  お手続きいただき、ありがとうございました。
                  `
                );
              }}
              src={Volume}
              className="cursor-pointer place-self-end ml-auto"
              alt="icon volume"
            />
          </div>
        </div>
      </div>

      <div className="px-6 text-center">
        <p className="text-sm mb-1">※ スマートフォンの画面を閉じてください。</p>
        <p className="text-sm">
          ※ 「戻る」ボタンによる変更・再送信はできません。
        </p>
      </div>

      <Footer />
    </main>
  );
}
