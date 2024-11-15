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

export default function Home() {
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingSmall, setLoadingSmall] = useState(false);
  const [user, setUser] = useState({});

  const router = useRouter();

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
      switch (selectedButton) {
        case 'yen':
          user.bank_currency = selectedButton;
          localStorage.setItem('userInfo', JSON.stringify(user));
          localStorage.setItem('jpy', true);
          setTimeout(() => {
            router.push('/fill-financial-institution-name');
          }, 500);
          break;
        case 'usd_usa':
          user.bank_currency = selectedButton;
          localStorage.setItem('userInfo', JSON.stringify(user));
          localStorage.setItem('jpy', false);
          setTimeout(() => {
            router.push('/fill-financial-institution-name');
          }, 500);
          break;
        case 'usd_aus':
          user.bank_currency = selectedButton;
          localStorage.setItem('userInfo', JSON.stringify(user));
          localStorage.setItem('jpy', false);
          setTimeout(() => {
            router.push('/fill-financial-institution-name');
          }, 500);
          break;
        case 'eur':
          user.bank_currency = selectedButton;
          localStorage.setItem('userInfo', JSON.stringify(user));
          localStorage.setItem('jpy', false);
          setTimeout(() => {
            router.push('/fill-financial-institution-name');
          }, 500);
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    setUser(userInfo);

    if (userInfo?.bank_currency) {
      setSelectedButton(userInfo?.bank_currency);
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

  return (
    <main className="flex flex-col h-dvh items-center">
      <Header
        title="支払通貸をご選択ください"
        volumeWhite={false}
        titleColor="primary"
        bg="white"
        textAlign="start"
        voice={selectedVoice}
      />
      <div className="border-t border-light h-full overflow-scroll">
        <div className="flex justify-between w-full mt-5 px-6 relative">
          {selectedButton === 'yen' && (
            <Image
              src={Check}
              className="ml-5 absolute top-3.5 left-3.5"
              alt="icon check"
            />
          )}
          <button
            className={`${
              selectedButton === 'yen'
                ? 'bg-sky'
                : showError
                ? 'bg-warningInput'
                : ''
            }
          w-[88%] text-primary border-2 border-primary rounded h-[50px] p-2 text-start font-bold pl-8`}
            onClick={() => handleButtonClick('yen')}
          >
            円
          </button>
          <Image
            onClick={() => {
              speak('円');
            }}
            src={Volume}
            className="ml-5 cursor-pointer"
            alt="icon volume"
          />
        </div>

        <div className="flex justify-between w-full mt-5 px-6 relative">
          {selectedButton === 'usd_usa' && (
            <Image
              src={Check}
              className="ml-5 absolute top-3.5 left-3.5"
              alt="icon check"
            />
          )}
          <button
            className={`${
              selectedButton === 'usd_usa'
                ? 'bg-sky'
                : showError
                ? 'bg-warningInput'
                : ''
            } w-[88%] text-primary border-2 border-primary rounded h-[50px] p-2 text-start font-bold pl-8`}
            onClick={() => handleButtonClick('usd_usa')}
          >
            米ドル
          </button>
          <Image
            onClick={() => {
              speak('米ドル');
            }}
            src={Volume}
            className="ml-5 cursor-pointer"
            alt="icon volume"
          />
        </div>

        <div className="flex justify-between w-full mt-5 px-6 relative">
          {selectedButton === 'usd_aus' && (
            <Image
              src={Check}
              className="ml-5 absolute top-3.5 left-3.5"
              alt="icon check"
            />
          )}
          <button
            className={`${
              selectedButton === 'usd_aus'
                ? 'bg-sky'
                : showError
                ? 'bg-warningInput'
                : ''
            } w-[88%] text-primary border-2 border-primary rounded h-[50px] p-2 text-start font-bold pl-8`}
            onClick={() => handleButtonClick('usd_aus')}
          >
            豪ドル
          </button>
          <Image
            onClick={() => {
              speak('豪ドル');
            }}
            src={Volume}
            className="ml-5 cursor-pointer"
            alt="icon volume"
          />
        </div>

        <div className="flex justify-between w-full mt-5 px-6 relative">
          {selectedButton === 'eur' && (
            <Image
              src={Check}
              className="ml-5 absolute top-3.5 left-3.5"
              alt="icon check"
            />
          )}
          <button
            className={`${
              selectedButton === 'eur'
                ? 'bg-sky'
                : showError
                ? 'bg-warningInput'
                : ''
            } w-[88%] text-primary border-2 border-primary rounded h-[50px] p-2 text-start font-bold pl-8`}
            onClick={() => handleButtonClick('eur')}
          >
            ユーロ
          </button>
          <Image
            onClick={() => {
              speak('ユーロ');
            }}
            src={Volume}
            className="ml-5 cursor-pointer"
            alt="icon volume"
          />
        </div>

        <div className="flex justify-between w-full my-5 px-6">
          <div>
            <p className="text-primary font-bold tracking-wider mb-2">
              上記の支払通貨による支払を請求いたします。
            </p>
            <p className="text-primary font-bold tracking-wider">
              ※外貨支払特約を解約、付加または変更し、上記の支払通貨により支払を請求します。付加または変更で、新遺族年金支払特約が付加されている場合は、同特約を解約します。
            </p>
          </div>
          <Image
            onClick={() => {
              speak(
                `上記の支払通貨による支払を請求いたします。外貨支払特約を解約、付加または変更し、上記の支払通貨により支払を請求します。付加または変更で、新遺族年金支払特約が付加されている場合は、同特約を解約します。`
              );
            }}
            src={Volume}
            className="ml-5 cursor-pointer"
            alt="icon volume"
          />
        </div>
      </div>

      <div className="w-full mt-2 py-2 px-6">
        {showError && (
          <p className="text-error font-bold mb-2 text-center">
            項目を選択してください
          </p>
        )}
        <ButtonBlue loading={loading} name="次へ進む" onClick={handleSubmit} />
      </div>
      <div>
        <ButtonSmall
          loading={loadingSmall}
          name="前に戻る"
          onClick={() => {
            setLoadingSmall(true);
            const ageOption = localStorage.getItem('checkAge');
            const samePerson = localStorage.getItem('samePerson');

            if (ageOption === 'under18') {
              setTimeout(() => {
                router.push('/name-relationship');
              }, 500);
            } else if (ageOption === 'above18' && samePerson === 'diffPerson') {
              setTimeout(() => {
                router.push('/indent-document');
              }, 500);
            } else {
              setTimeout(() => {
                router.push('/upload-file');
              }, 500);
            }
          }}
        />
      </div>

      <Footer />
    </main>
  );
}
