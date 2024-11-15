'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Header from '@/components/Header';
import Volume from '@/images/volume-circle.svg';
import CheckGreen from '@/images/check-green.svg';
import ButtonBlue from '@/components/ButtonBlue';
import { getVoices, speakText, stopSpeaking } from '@/utils/speak';
import ButtonSmall from '@/components/ButtonSmall';

export default function NameRelationship() {
  const [isName, setIsName] = useState(false);
  const [isRelation, setIsRelation] = useState(false);
  const [isNameError, setIsNameError] = useState(false);
  const [isRelationError, setIsRelationError] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingSmall, setLoadingSmall] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [relationship, setRelationship] = useState('');
  const [name, setName] = useState('');
  const [user, setUser] = useState({});

  const router = useRouter();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    setUser(userInfo);

    if (userInfo?.customer_related_name) {
      setName(userInfo?.customer_related_name);
    }

    if (userInfo?.customer_relationship_type) {
      setRelationship(userInfo?.customer_relationship_type);
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

  const inputNameChange = (event) => {
    setIsNameError(false);
    const inputValue = event.target.value;
    setName(inputValue);

    if (inputValue.length > 50) {
      setIsName(false);
    } else {
      setIsName(true);
    }
  };

  const inputRelationChange = (event) => {
    setIsRelationError(false);
    const inputValue = event.target.value;
    setRelationship(inputValue);

    if (inputValue.length > 50) {
      setIsRelation(false);
    } else {
      setIsRelation(true);
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    if (name.length === 0) {
      setIsNameError(true);
      setLoading(false);
    }

    if (relationship.length === 0) {
      setIsRelationError(true);
      setLoading(false);
    }

    if (name.length !== 0 && relationship.length !== 0) {
      user.customer_related_name = name;
      user.customer_relationship_type = relationship;

      localStorage.setItem('userInfo', JSON.stringify(user));

      const chouhyouCode = user?.product_chouhyou_code;
      switch (chouhyouCode) {
        case '001D01':
          setTimeout(() => {
            router.push('/fill-financial-institution-name');
          }, 500);
          break;
        case '001D07':
          setTimeout(() => {
            router.push('/select-method-payment');
          }, 500);
          break;
        case '001D09':
          setTimeout(() => {
            router.push('/fill-financial-institution-name');
          }, 500);
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className="h-dvh pb-6 flex flex-col justify-between">
      <Header
        title="親権者さまの氏名と続柄をご入力ください"
        bg="white"
        volumeWhite={false}
        titleColor="primary"
        textAlign="start"
        voice={selectedVoice}
      />

      <div className="px-6 border-t border-light h-full">
        <div className="flex items-center mt-6 mb-2">
          <div className="w-10/12">
            <h2 className="text-primary font-bold">親権者さまの氏名</h2>
          </div>
          <div className="shrink-0 w-2/12">
            <Image
              onClick={() => {
                speak('親権者さまの氏名');
              }}
              className="ml-auto cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-[88%] relative">
            <input
              onChange={inputNameChange}
              value={name}
              className={`border-2 border-light px-4 py-2 w-full rounded-md ${
                isNameError && 'bg-warningInput'
              } ${isName && name && 'bg-sky'} ${
                name.length > 50 && 'bg-warningInput'
              }`}
              placeholder="テキスト"
              type="text"
            />

            {isName && name && (
              <Image
                className="absolute right-0 top-[-28px]"
                src={CheckGreen}
                alt="check green"
              />
            )}
          </div>
          <div className="shrink-0 w-[12%]"></div>
        </div>

        <div className="flex items-center mt-6 mb-2">
          <div className="w-10/12">
            <h2 className="text-primary font-bold">ご契約者さまとの続柄</h2>
          </div>
          <div className="shrink-0 w-2/12">
            <Image
              onClick={() => {
                speak('ご契約者さまとの続柄');
              }}
              className="ml-auto cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-[88%] relative">
            <input
              onChange={inputRelationChange}
              value={relationship}
              className={`border-2 border-light px-4 py-2 w-full rounded-md ${
                isRelationError && 'bg-warningInput'
              } ${isRelation && relationship && 'bg-sky'} ${
                relationship.length > 50 && 'bg-warningInput'
              }`}
              placeholder="テキスト"
              type="text"
            />

            {isRelation && relationship && (
              <Image
                className="absolute right-0 top-[-28px]"
                src={CheckGreen}
                alt="check green"
              />
            )}
          </div>
          <div className="shrink-0 w-[12%]"></div>
        </div>
      </div>
      <div className="w-full bottom-6 text-center">
        <div className="px-6">
          {(isNameError || isRelationError) && (
            <p className="text-error font-bold mb-2">未入力の項目があります</p>
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
              const skipParentIndent = localStorage.getItem('skipParentIndent');
              if (skipParentIndent) {
                setTimeout(() => {
                  router.push('/indent-document');
                }, 500);
              } else {
                setTimeout(() => {
                  router.push('/parental-indent-document');
                }, 500);
              }
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
