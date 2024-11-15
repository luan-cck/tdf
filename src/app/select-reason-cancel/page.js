'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Volume from '@/images/volume-circle.svg';
import Check from '@/images/check-green.svg';
import { getVoices, speakText, stopSpeaking } from '@/utils/speak';
import ButtonSmall from '@/components/ButtonSmall';
import ButtonBlue from '@/components/ButtonBlue';
import { maxLengthReasonCancel } from '@/utils/constants';

export default function SelectReasonCancel() {
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showError, setShowError] = useState(false);
  const [inputEmpty, setInputEmpty] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingSmall, setLoadingSmall] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [user, setUser] = useState({});

  const router = useRouter();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    setUser(userInfo);

    if (userInfo?.cancellation_reason) {
      switch (userInfo?.cancellation_reason) {
        case '資金が必要になった':
          setSelectedButton(userInfo?.cancellation_reason);
          break;
        case '他社の保険に入った':
          setSelectedButton(userInfo?.cancellation_reason);
          break;
        case 'T&Dフィナンシャル生命の他の保険に変更した（する）ため':
          setSelectedButton(userInfo?.cancellation_reason);
          break;
        case '運用成果の確保':
          setSelectedButton(userInfo?.cancellation_reason);
          break;
        case '保険料払込困難（一時払いの契約を除く）':
          setSelectedButton(userInfo?.cancellation_reason);
          break;
        case '回答しない':
          setSelectedButton(userInfo?.cancellation_reason);
          break;
        default:
          setSelectedButton('その他');
          setInputValue(userInfo?.cancellation_reason);
          break;
      }
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

  const inputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value) {
      setShowError(false);
    }
  };

  const remainingChars = maxLengthReasonCancel - inputValue.length;

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
      if (selectedButton === 'その他' && inputValue.length === 0) {
        setInputEmpty(true);
        setLoading(false);
        return;
      }

      if (selectedButton === 'その他') {
        user.cancellation_reason = inputValue;
      } else {
        user.cancellation_reason = selectedButton;
      }
      localStorage.setItem('userInfo', JSON.stringify(user));
      setTimeout(() => {
        router.push('/confirm-cancel-contract');
      }, 500);
    }
  };

  return (
    <main className="flex flex-col h-dvh items-center">
      <Header
        title="ご解約理由をお差支えのない範囲でご選択ください"
        volumeWhite={false}
        titleColor="primary"
        bg="white"
        textAlign="start"
        voice={selectedVoice}
      />

      <div className="border-t border-light w-full h-full overflow-y-scroll">
        <div className="flex justify-between w-full mt-5 mb-2 px-6 relative">
          {selectedButton === '資金が必要になった' && (
            <Image
              src={Check}
              className="ml-5 absolute top-3.5 left-3.5"
              alt="icon check"
            />
          )}
          <button
            className={`${
              selectedButton === '資金が必要になった'
                ? 'bg-sky'
                : showError
                ? 'bg-warningInput'
                : ''
            }
          w-[88%] rounded text-primary border-2 border-primary p-2 text-start font-bold pl-8`}
            onClick={() => handleButtonClick('資金が必要になった')}
          >
            1.資金が必要になった
          </button>
          <Image
            onClick={() => {
              speak('資金が必要になった');
            }}
            src={Volume}
            className="ml-5 cursor-pointer"
            alt="icon volume"
          />
        </div>

        <div className="flex justify-between w-full mt-5 mb-2 px-6 relative">
          {selectedButton === '他社の保険に入った' && (
            <Image
              src={Check}
              className="ml-5 absolute top-3.5 left-3.5"
              alt="icon check"
            />
          )}
          <button
            className={`${
              selectedButton === '他社の保険に入った'
                ? 'bg-sky'
                : showError
                ? 'bg-warningInput'
                : ''
            } w-[88%] rounded text-primary border-2 border-primary p-2 text-start font-bold pl-8`}
            onClick={() => handleButtonClick('他社の保険に入った')}
          >
            2.他社の保険に入った
          </button>
          <Image
            onClick={() => {
              speak('他社の保険に入った');
            }}
            src={Volume}
            className="ml-5 cursor-pointer"
            alt="icon volume"
          />
        </div>

        <div className="flex justify-between w-full mt-5 mb-2 px-6 relative">
          {selectedButton ===
            'T&Dフィナンシャル生命の他の保険に変更した（する）ため' && (
            <Image
              src={Check}
              className="ml-5 absolute top-3.5 left-3.5"
              alt="icon check"
            />
          )}
          <button
            className={`${
              selectedButton ===
              'T&Dフィナンシャル生命の他の保険に変更した（する）ため'
                ? 'bg-sky'
                : showError
                ? 'bg-warningInput'
                : ''
            } w-[88%] rounded text-primary border-2 border-primary p-2 text-start font-bold pl-8`}
            onClick={() =>
              handleButtonClick(
                'T&Dフィナンシャル生命の他の保険に変更した（する）ため'
              )
            }
          >
            3.T&Dフィナンシャル生命の他の保険に変更した（する）ため
          </button>
          <Image
            onClick={() => {
              speak('T&Dフィナンシャル生命の他の保険に変更した（する）ため');
            }}
            src={Volume}
            className="ml-5 cursor-pointer"
            alt="icon volume"
          />
        </div>

        <div className="flex justify-between w-full mt-5 mb-2 px-6 relative">
          {selectedButton === '運用成果の確保' && (
            <Image
              src={Check}
              className="ml-5 absolute top-3.5 left-3.5"
              alt="icon check"
            />
          )}
          <button
            className={`${
              selectedButton === '運用成果の確保'
                ? 'bg-sky'
                : showError
                ? 'bg-warningInput'
                : ''
            } w-[88%] rounded text-primary border-2 border-primary p-2 text-start font-bold pl-8`}
            onClick={() => handleButtonClick('運用成果の確保')}
          >
            4.運用成果の確保
          </button>
          <Image
            onClick={() => {
              speak('運用成果の確保');
            }}
            src={Volume}
            className="ml-5 cursor-pointer"
            alt="icon volume"
          />
        </div>

        <div className="flex justify-between w-full mt-5 mb-2 px-6 relative">
          {selectedButton === '保険料払込困難（一時払いの契約を除く）' && (
            <Image
              src={Check}
              className="ml-5 absolute top-3.5 left-3.5"
              alt="icon check"
            />
          )}
          <button
            className={`${
              selectedButton === '保険料払込困難（一時払いの契約を除く）'
                ? 'bg-sky'
                : showError
                ? 'bg-warningInput'
                : ''
            } w-[88%] rounded text-primary border-2 border-primary p-2 text-start font-bold pl-8`}
            onClick={() =>
              handleButtonClick('保険料払込困難（一時払いの契約を除く）')
            }
          >
            5.保険料払込困難（一時払いの契約を除く）
          </button>
          <Image
            onClick={() => {
              speak('保険料払込困難（一時払いの契約を除く）');
            }}
            src={Volume}
            className="ml-5 cursor-pointer"
            alt="icon volume"
          />
        </div>

        <div className="flex justify-between w-full mt-5 mb-2 px-6 relative">
          {selectedButton === 'その他' && (
            <Image
              src={Check}
              className="ml-5 absolute top-3.5 left-3.5"
              alt="icon check"
            />
          )}
          <button
            className={`${
              selectedButton === 'その他'
                ? 'bg-sky'
                : showError
                ? 'bg-warningInput'
                : ''
            } w-[88%] rounded text-primary border-2 border-primary p-2 text-start font-bold pl-8`}
            onClick={() => handleButtonClick('その他')}
          >
            6.その他
          </button>
          <Image
            onClick={() => {
              speak('その他');
            }}
            src={Volume}
            className="ml-5 cursor-pointer"
            alt="icon volume"
          />
        </div>
        {selectedButton === 'その他' && (
          <div className="w-full px-6 self-start">
            <textarea
              className={`${
                inputValue ? 'bg-sky' : inputEmpty ? 'bg-warningInput' : ''
              } w-[88%] rounded border-2 border-primary p-2 text-start`}
              value={inputValue}
              onChange={inputChange}
              rows="5"
              maxLength={maxLengthReasonCancel}
            />
            <p className="w-[88%] text-xs text-grayLight text-end">
              {remainingChars}/{maxLengthReasonCancel}
            </p>
          </div>
        )}

        <div className="flex justify-between w-full mt-5 mb-2 px-6 relative">
          {selectedButton === '回答しない' && (
            <Image
              src={Check}
              className="ml-5 absolute top-3.5 left-3.5"
              alt="icon check"
            />
          )}
          <button
            className={`${
              selectedButton === '回答しない'
                ? 'bg-sky'
                : showError
                ? 'bg-warningInput'
                : ''
            } w-[88%] rounded text-primary border-2 border-primary p-2 text-start font-bold pl-8`}
            onClick={() => handleButtonClick('回答しない')}
          >
            7.回答しない
          </button>
          <Image
            onClick={() => {
              speak('回答しない');
            }}
            src={Volume}
            className="ml-5 cursor-pointer"
            alt="icon volume"
          />
        </div>
      </div>

      <div className="flex justify-center w-full px-6 mt-5">
        {showError && (
          <p className="text-error font-bold tracking-wider">
            項目を選択してください
          </p>
        )}
      </div>

      <div className="w-full py-2 px-6">
        <ButtonBlue name="次へ進む" onClick={handleSubmit} loading={loading} />
      </div>
      <div>
        <ButtonSmall
          name="前に戻る"
          onClick={() => {
            const skipBankInfo = localStorage.getItem('skipBankInfo');
            setLoadingSmall(true);
            if (skipBankInfo && user?.product_chouhyou_code === '001D09') {
              setTimeout(() => {
                router.push('/fill-financial-institution-name');
              }, 500);
            } else {
              setTimeout(() => {
                router.push('/fill-kana-name');
              }, 500);
            }
          }}
          loading={loadingSmall}
        />
      </div>
      <Footer />
    </main>
  );
}
