'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSpeech } from 'react-text-to-speech';
import Image from 'next/image';

import axios from '@/utils/API';
import Header from '@/components/Header';
import Volume from '@/images/volume-circle.svg';
import ButtonBlue from '@/components/ButtonBlue';
import { getVoices, speakText, stopSpeaking } from '@/utils/speak';
import formatDate from '@/utils/formatDate';
import Loading from '@/components/Loading';

export default function Auth() {
  const [isError, setIserror] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [birthday, setBirthday] = useState('');
  const pathname = usePathname();
  const token = pathname.split('/')[2];

  const router = useRouter();

  const textSpeak =
    'ごけいやくしゃさまのほんにんかくにんのため。せいねんがっぴを。せいれき。はんかくすうじはちけたでごにゅうりょくください';

  const { speechStatus, start, stop } = useSpeech({
    text: textSpeak,
    lang: 'ja-JP',
    voiceURI: 'Google 日本語',
  });

  useEffect(() => {
    setLoading(true);
    if (token) {
      const checkToken = async () => {
        setLoading(true);
        try {
          const response = await axios.post(
            '/request-form/verify',
            {},
            {
              headers: {
                token: token,
              },
            }
          );

          if (response.status === 200) {
            localStorage.removeItem('checkAge');
            localStorage.removeItem('samePerson');
            localStorage.removeItem('jpy');
            localStorage.removeItem('birthday');
            localStorage.removeItem('userInfo');
            localStorage.removeItem('skipBankInfo');
            localStorage.removeItem('skipParentIndent');
            localStorage.setItem('token', token);
            setLoading(false);
          }
        } catch (error) {
          setLoading(false);
          if (error.response.status === 400) {
            router.push('/auth/link');
          }
        }
      };

      checkToken();
    } else {
      setLoading(false);
      router.push('/auth/error');
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

  const inputChange = (event) => {
    const regex = /^\d{1,8}$/;
    const inputValue = event.target.value;

    if (inputValue.length <= 8) {
      setBirthday(inputValue);

      if (regex.test(inputValue)) {
        setIserror(false);
      } else {
        setIserror(true);
      }
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const tokenLocal = localStorage.getItem('token');
    const birthdayFormat = formatDate(birthday);
    try {
      const response = await axios.post(
        '/request-form/verify-birthday',
        {
          birthday: birthdayFormat,
        },
        {
          headers: {
            token: tokenLocal,
          },
        }
      );

      if (response.status === 200) {
        const userInfo = response?.data?.data;
        userInfo.birthday = formatDate(birthday);
        localStorage.setItem('birthday', 'success');
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        router.push('/user-top');
      }
    } catch (error) {
      setIserror(true);
      if (error?.response?.data?.msg === 'トークンが不正です。') {
        router.push('/auth/error');
      }
      setLoading(false);
    }
  };

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
        <div className="flex items-center mt-4 mb-4">
          <div className="w-[88%]">
            <p className="font-bold text-primary">
              ご契約者さまの本人確認のため、生年月日（西暦）を半角数字8桁でご入力ください。
            </p>
            <p className="font-bold text-primary mt-2">
              例） 生年月日が「昭和30年1月7日」の場合　⇒　「19550107」と入力
            </p>
          </div>
          <div className="shrink-0 w-[12%]">
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

        {isError && (
          <p className="text-error mb-4 text-sm">入力内容をご確認ください</p>
        )}
        <input
          className="border-2 rounded h-50 w-[88%] pl-4 border-light"
          type="tel"
          name="password"
          onChange={inputChange}
          value={birthday}
          placeholder="19550107"
        />
      </div>
      <div className="w-full bottom-6 text-center">
        <div className="px-6">
          <ButtonBlue name="送信" onClick={handleSubmit} />
        </div>

        <p className="text-[10px] mt-4">
          Copyright,Ｔ&Ｄ Financial Life Insurance Company.All Rights Reserved.
        </p>
      </div>

      <Loading show={loading} />
    </div>
  );
}
