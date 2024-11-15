'use client';
import { useEffect, useState } from 'react';
import { useSpeech } from 'react-text-to-speech';
import Image from 'next/image';

import Eyes from '@/images/eyes.svg';
import Volume from '@/images/volume-circle.svg';
import ButtonBlue from '@/components/ButtonBlue';
import Header from '@/components/Header';
import { getVoices, speakText, stopSpeaking } from '@/utils/speak';

export default function AuthError() {
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const textSpeak =
    'ごけいやくしゃさまのほんにんかくにんがかんりょうできませんでした。おてすうをおかけいたしますが。おきゃくさまさーびすせんたーえ。おといあわせください。おきゃくさまさーびすせんたー。ぜろいちにぜろさんぜろにごななに。うけつけじかん。くじからごじ。どにちしゅくじつをのぞく';

  const { speechStatus, start, stop } = useSpeech({
    text: textSpeak,
    lang: 'ja-JP',
    voiceURI: 'Google 日本語',
  });

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

  // const speak = (text) => {
  //   if (isSpeaking) {
  //     stopSpeaking();
  //     setIsSpeaking(false);
  //   } else {
  //     if (!text) return;
  //     speakText(text, selectedVoice, () => setIsSpeaking(false));
  //     setIsSpeaking(true);
  //   }
  // };

  return (
    <div className="h-dvh pb-6 flex flex-col justify-between">
      <Header
        title="ご本人確認"
        volumeWhite={true}
        titleColor="white"
        textAlign="center"
        voice={selectedVoice}
        voiceTitle="ごほんにん。かくにん"
      />
      <div className="px-6">
        <div className="flex items-center mb-6">
          <div className="w-10/12">
            <p className="font-bold text-primary">
              ご契約者さまの本人確認が完了できませんでした。
            </p>
            <p className="font-bold text-primary">
              お手数をおかけいたしますが、
            </p>
            <p className="font-bold text-primary">
              お客さまサービスセンターへお問い合わせください。
            </p>
          </div>
          <div className="shrink-0 w-2/12">
            <Image
              onClick={() => {
                if (speechStatus !== 'started') {
                  start();
                } else {
                  stop();
                }
              }}
              className="ml-auto cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        </div>

        <div className="w-[265px] text-center mx-auto border border-primary rounded-2xl h-[135px] flex flex-col justify-center">
          <p className="font-bold text-primary mb-2">
            【お客さまサービスセンター】
          </p>
          <div className="flex items-center justify-center">
            <Image src={Eyes} alt="eyes" />
            <a
              href="tel:0120-302-572"
              className="font-bold text-primary underline ml-2"
            >
              0120-302-572
            </a>
          </div>
          <p className="font-bold text-primary">受付時間 9：00～17：00</p>
          <p className="font-bold text-primary">（土・日・祝日等を除く）</p>
        </div>
      </div>
      <div className="w-full bottom-6 text-center max-[375px]:mt-4">
        <div className="px-6">
          <ButtonBlue name="閉じる" />
        </div>

        <p className="text-[10px] mt-4">
          Copyright,Ｔ&Ｄ Financial Life Insurance Company. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
