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

export default function SelectAppropriate() {
  const router = useRouter();
  const [isError, setIserror] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [samePerson, setSamePerson] = useState(false);
  const [diffPerson, setDiffPerson] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingSmall, setLoadingSmall] = useState(false);

  useEffect(() => {
    const samePerson = localStorage.getItem('samePerson');
    if (samePerson === 'samePerson') {
      setSamePerson(true);
    } else if (samePerson === 'diffPerson') {
      setDiffPerson(true);
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
    setLoading(true);
    if (!diffPerson && !samePerson) {
      setIserror(true);
      setLoading(false);
    } else {
      localStorage.setItem(
        'samePerson',
        samePerson ? 'samePerson' : 'diffPerson'
      );
      setTimeout(() => {
        router.push('/upload-file');
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
                setSamePerson(true);
                setDiffPerson(false);
                setIserror(false);
              }}
              className={`flex items-center border-2 border-primary px-4 h-[74px] rounded-md ${
                samePerson ? 'bg-sky' : isError && 'bg-warningInput'
              } relative`}
            >
              {samePerson && (
                <Image className="absolute" src={CheckedGreen} alt="checked" />
              )}
              <h2 className="text-primary font-bold ml-6">
                ご契約者さまと被保険者さまが同一
              </h2>
            </div>
          </div>
          <div className="shrink-0 w-2/12">
            <Image
              onClick={() => {
                speak('ご契約者さまと被保険者さまが同一');
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
                setSamePerson(false);
                setDiffPerson(true);
                setIserror(false);
              }}
              className={`flex items-center border-2 border-primary px-4 h-[74px] rounded-md ${
                diffPerson ? 'bg-sky' : isError && 'bg-warningInput'
              } relative`}
            >
              {diffPerson && (
                <Image className="absolute" src={CheckedGreen} alt="checked" />
              )}
              <h2 className="text-primary font-bold ml-6">
                ご契約者さまと被保険者さまが異なる
              </h2>
            </div>
          </div>
          <div className="shrink-0 w-2/12">
            <Image
              onClick={() => {
                speak('ご契約者さまと被保険者さまが異なる');
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
            loading={loading}
            name="次へ進む"
            onClick={handleSubmit}
          />

          <ButtonSmall
            loading={loadingSmall}
            name="前に戻る"
            onClick={() => {
              setLoadingSmall(true);
              setTimeout(() => {
                router.push('/age-option');
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
