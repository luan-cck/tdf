'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import ExternalLink from '@/images/external-link.svg';
import Header from '@/components/Header';
import Volume from '@/images/volume-circle.svg';
import ButtonBlue from '@/components/ButtonBlue';
import { getVoices, speakText, stopSpeaking } from '@/utils/speak';

export default function DisinterMatters() {
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);

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
    <div className="flex h-dvh flex-col items-center pb-4">
      <Header
        title="不利益事項"
        volumeWhite={true}
        titleColor="white"
        textAlign="center"
        voice={selectedVoice}
      />

      <div className="overflow-y-scroll h-full px-6">
        <div className="flex items-center mt-4">
          <div className="w-10/12">
            <div className="border-2 border-primary h-16 flex items-center justify-center bg-mud">
              <h2 className="font-bold text-error">
                解約日は以下のお取扱いとなります。
              </h2>
            </div>
          </div>
          <div className="shrink-0 w-2/12">
            <Image
              onClick={() => {
                speak('解約日は以下のお取扱いとなります。');
              }}
              className="ml-auto cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        </div>

        <div className="flex items-center mt-4">
          <div className="w-3/6 text-center border-y border-r">
            <h2 className="text-xs font-bold h-5 flex items-center justify-center">
              受付日
            </h2>
          </div>
          <div className="w-3/6 text-center border-y">
            <h2 className="text-xs font-bold h-5 flex items-center justify-center">
              解約日
            </h2>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-3/6 text-center border-b border-r">
            <h2 className="text-xs  h-5 flex items-center justify-center">
              12時まで
            </h2>
          </div>
          <div className="w-3/6 text-center border-b">
            <h2 className="text-xs  h-5 flex items-center justify-center">
              受付日の当日
            </h2>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-3/6 text-center border-b border-r">
            <h2 className="text-xs h-5 flex items-center justify-center">
              12時以降
            </h2>
          </div>
          <div className="w-3/6 text-center border-b">
            <h2 className="text-xs h-5 flex items-center justify-center">
              受付日の翌営業日
            </h2>
          </div>
        </div>

        <p className="text-xs mt-1">
          ※ご請求内容に不備がある場合、不備が解消された日を解約日とします。
        </p>

        <div className="flex items-center mt-6">
          <div className="w-10/12">
            <div className="border-2 border-primary h-16 flex items-center justify-center bg-mud px-5">
              <h2 className="font-bold text-error text-center">
                解約はご契約者にとって不利益となる場合があります
              </h2>
            </div>
          </div>
          <div className="shrink-0 w-2/12">
            <Image
              onClick={() => {
                speak('解約はご契約者にとって不利益となる場合があります');
              }}
              className="ml-auto cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        </div>

        <div className="flex items-center mt-6">
          <div className="w-10/12">
            <h2 className="font-bold">
              解約払戻金額は一時払保険料を下回る可能性があります。
            </h2>
          </div>
          <div className="shrink-0 w-2/12">
            <Image
              onClick={() => {
                speak('解約払戻金額は一時払保険料を下回る可能性があります。');
              }}
              className="ml-auto cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        </div>

        <div className="flex mt-4">
          <div className="w-10/12">
            <p className="text-sm">
              ・解約払戻金額は、対象となる指標金利の変動により、一時払保険料を下回る可能性があります。
            </p>
            <p className="text-sm mt-2">
              また、ご契約の締結に必要な費用や解約控除が適用となる商品もあります。詳しくは「ご契約のしおり・約款」でご確認ください。
            </p>
          </div>
          <div className="shrink-0 w-2/12">
            <Image
              onClick={() => {
                speak(
                  `・解約払戻金額は、対象となる指標金利の変動により、一時払保険料を下回る可能性があります。また、ご契約の締結に必要な費用や解約控除が適用となる商品もあります。詳しくは「ご契約のしおり・約款」でご確認ください。`
                );
              }}
              className="ml-auto cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        </div>

        <div className="flex items-center mt-6">
          <div className="w-10/12">
            <h2 className="font-bold">
              解約された場合、解約日以後の死亡保障は無くなります
            </h2>
          </div>
          <div className="shrink-0 w-2/12">
            <Image
              onClick={() => {
                speak('解約された場合、解約日以後の死亡保障は無くなります');
              }}
              className="ml-auto cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        </div>

        <div className="flex items-center mt-6">
          <div className="w-10/12">
            <h2 className="font-bold">
              現在のご契約を解約して、新たにご契約のお申込みをされる場合、ご契約者にとって不利益となる場合があります
            </h2>
          </div>
          <div className="shrink-0 w-2/12">
            <Image
              onClick={() => {
                speak(
                  '現在のご契約を解約して、新たにご契約のお申込みをされる場合、ご契約者にとって不利益となる場合があります'
                );
              }}
              className="ml-auto cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        </div>

        <div className="flex items-center mt-6">
          <div className="w-10/12">
            <h2 className="font-bold">新たにご契約できない場合があります。</h2>
          </div>
          <div className="shrink-0 w-2/12">
            <Image
              onClick={() => {
                speak('新たにご契約できない場合があります。');
              }}
              className="ml-auto cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        </div>

        <div className="flex mt-2">
          <div className="w-10/12">
            <p className="text-sm">
              現在のご契約を解約し、後日新たにご契約のお申込みをされる場合、ご契約のお申込にあたっての被保険者の告知内容等によってはご加入できない場合があります。
            </p>
          </div>
          <div className="shrink-0 w-2/12">
            <Image
              onClick={() => {
                speak(
                  `現在のご契約を解約し、後日新たにご契約のお申込みをされる場合、ご契約のお申込にあたっての被保険者の告知内容等によってはご加入できない場合があります。`
                );
              }}
              className="ml-auto cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        </div>

        <div className="flex items-center mt-6">
          <div className="w-10/12">
            <h2 className="font-bold">
              ご資金が必要な場合などには、次のような方法もあります
            </h2>
          </div>
          <div className="shrink-0 w-2/12">
            <Image
              onClick={() => {
                speak('ご資金が必要な場合などには、次のような方法もあります');
              }}
              className="ml-auto cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        </div>

        <div className="flex items-center mt-6">
          <div className="w-10/12">
            <h2 className="font-bold">確定保険金額の払出</h2>
          </div>
          <div className="shrink-0 w-2/12">
            <Image
              onClick={() => {
                speak('確定保険金額の払出');
              }}
              className="ml-auto cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        </div>

        <div className="flex mt-2">
          <div className="w-10/12">
            <p className="text-sm">
              確定保険金額がある場合、確定保険金額をいつでも払い出すことができます。ただし、確定保険金額の一部を払い出すこと（金額の指定）はできません。
            </p>
            <p className="text-sm">
              ※払出に関してご不明な点がございましたら、当社お客さまサービスセンターまでご連絡ください。
            </p>
          </div>
          <div className="shrink-0 w-2/12">
            <Image
              onClick={() => {
                speak(
                  `確定保険金額がある場合、確定保険金額をいつでも払い出すことができます。ただし、確定保険金額の一部を払い出すこと（金額の指定）はできません。※払出に関してご不明な点がございましたら、当社お客さまサービスセンターまでご連絡ください。`
                );
              }}
              className="ml-auto cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        </div>

        <div className="flex items-center mt-6">
          <div className="w-10/12">
            <h2 className="font-bold">基本保険金額の減額</h2>
          </div>
          <div className="shrink-0 w-2/12">
            <Image
              onClick={() => {
                speak('基本保険金額の減額');
              }}
              className="ml-auto cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        </div>

        <div className="flex mt-2">
          <div className="w-10/12">
            <p className="text-sm">
              ご契約は、全部を解約されなくても、一部だけを解約することができます。
            </p>
            <p className="text-sm">
              ※基本保険金額の減額をご希望される場合には、当社お客さまサービスセンターまでご連絡ください。
            </p>
          </div>
          <div className="shrink-0 w-2/12">
            <Image
              onClick={() => {
                speak(
                  `ご契約は、全部を解約されなくても、一部だけを解約することができます。※基本保険金額の減額をご希望される場合には、当社お客さまサービスセンターまでご連絡ください。`
                );
              }}
              className="ml-auto cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        </div>

        <div className="flex items-center mt-6">
          <div className="w-10/12">
            <h2 className="font-bold">税金のお取扱いについて</h2>
          </div>
          <div className="shrink-0 w-2/12">
            <Image
              onClick={() => {
                speak('税金のお取扱いについて');
              }}
              className="ml-auto cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        </div>

        <div className="flex mt-2">
          <div className="w-10/12">
            <p className="text-sm">
              解約に際してお受取りになる解約払戻金額に関しましては、所得税等の課税対象となります。
            </p>
            <p className="text-sm">
              個別の税務の詳細については、お近くの税務署にご確認ください。
            </p>
          </div>
          <div className="shrink-0 w-2/12">
            <Image
              onClick={() => {
                speak(
                  `解約に際してお受取りになる解約払戻金額に関しましては、所得税等の課税対象となります。個別の税務の詳細については、お近くの税務署にご確認ください。`
                );
              }}
              className="ml-auto cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        </div>

        <div className="flex mt-2">
          <div className="w-10/12">
            <p className="text-sm">
              ※各種お取扱いにつきまして、詳しくは「ご契約のしおり・約款」でご確認ください。
            </p>
          </div>
          <div className="shrink-0 w-2/12">
            <Image
              onClick={() => {
                speak(
                  `※各種お取扱いにつきまして、詳しくは「ご契約のしおり・約款」でご確認ください。`
                );
              }}
              className="ml-auto cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        </div>
      </div>
      <div className="w-full bottom-6 text-center mt-4">
        <div className="px-6">
          <div className="flex items-center border-2 border-primary bg-grayLight px-4 h-[84px] mb-4">
            <div className="w-10/12">
              <h2 className="text-primary font-bold">医療照会同意書</h2>
              <p className="text-error text-xs">※必ずお読みください</p>
            </div>
            <div className="w-2/12">
              <Image
                className="ml-auto"
                src={ExternalLink}
                alt="external link"
              />
            </div>
          </div>

          <ButtonBlue loading={loading} name="同意します" />
        </div>

        <p className="text-[10px] mt-4">
          Copyright,Ｔ&Ｄ Financial Life Insurance Company. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
