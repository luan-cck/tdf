'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Volume from '@/images/volume-circle.svg';
import { getVoices, speakText, stopSpeaking } from '@/utils/speak';
import ButtonBlue from '@/components/ButtonBlue';

export default function CancelContract() {
  const router = useRouter();

  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

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
    <main className="flex h-dvh flex-col items-center">
      <Header
        title="解約される前にご確認ください"
        volumeWhite={true}
        titleColor="white"
        textAlign="center"
        voice={selectedVoice}
      />

      <div className="border-t border-light h-full overflow-y-scroll pb-5">
        <div className="flex justify-between w-full py-5 px-6">
          <p className="text-error bg-mud p-3 py-5 font-bold tracking-wider border border-primary text-center w-full">
            解約日は以下のお取扱いとなります
          </p>
          <Image
            onClick={() => {
              speak('解約日は以下のお取扱いとなります');
            }}
            className="ml-5 cursor-pointer"
            src={Volume}
            alt="icon volume"
          />
        </div>

        <div className="justify-between w-full pb-5 px-6">
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
                午前12時前まで
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
                12時（正午）以降
              </h2>
            </div>
            <div className="w-3/6 text-center border-b">
              <h2 className="text-xs h-5 flex items-center justify-center">
                受付日の翌営業日
              </h2>
            </div>
          </div>
          <p className="text-black text-1.2 tracking-wider mt-2">
            ※ご請求内容に不備がある場合、不備が解消された日を解約日とします。
          </p>
        </div>

        <div className="flex justify-between w-full mt-5 px-6">
          <p className="text-error bg-mud p-3 font-bold tracking-wider border border-primary text-center w-full">
            {user?.product_syoken_num_upper == '073' ||
            user?.product_syoken_num_upper == '73' ||
            user?.product_syoken_num_upper == '225' ||
            user?.product_syoken_num_upper == '033' ||
            user?.product_syoken_num_upper == '33' ||
            user?.product_syoken_num_upper == '085' ||
            user?.product_syoken_num_upper == '85' ||
            user?.product_syoken_num_upper == '144' ||
            user?.product_syoken_num_upper == '165' ||
            user?.product_syoken_num_upper == '219' ||
            user?.product_syoken_num_upper == '022' ||
            user?.product_syoken_num_upper == '22' ||
            user?.product_syoken_num_upper == '032' ||
            user?.product_syoken_num_upper == '32' ||
            user?.product_syoken_num_upper == '075' ||
            user?.product_syoken_num_upper == '75' ||
            user?.product_syoken_num_upper == '134' ||
            user?.product_syoken_num_upper == '155' ||
            user?.product_syoken_num_upper == '215' ||
            user?.product_syoken_num_upper == '211' ||
            user?.product_syoken_num_upper == '223' ||
            user?.product_syoken_num_upper == '631' ||
            user?.product_syoken_num_upper == '638' ||
            user?.product_syoken_num_upper == '637' ||
            user?.product_syoken_num_upper == '639' ||
            user?.product_syoken_num_upper == '640' ||
            user?.product_syoken_num_upper == '641' ||
            user?.product_syoken_num_upper == '643' ||
            user?.product_syoken_num_upper == '647' ||
            user?.product_syoken_num_upper == '648' ||
            user?.product_syoken_num_upper == '635'
              ? '解約はご契約者さまにとって不利益となる場合があります'
              : '解約はご契約者にとって不利益となる場合があります'}
          </p>
          <Image
            onClick={() => {
              const text =
                user?.product_syoken_num_upper == '073' ||
                user?.product_syoken_num_upper == '73' ||
                user?.product_syoken_num_upper == '225' ||
                user?.product_syoken_num_upper == '033' ||
                user?.product_syoken_num_upper == '33' ||
                user?.product_syoken_num_upper == '085' ||
                user?.product_syoken_num_upper == '85' ||
                user?.product_syoken_num_upper == '144' ||
                user?.product_syoken_num_upper == '165' ||
                user?.product_syoken_num_upper == '219' ||
                user?.product_syoken_num_upper == '022' ||
                user?.product_syoken_num_upper == '22' ||
                user?.product_syoken_num_upper == '032' ||
                user?.product_syoken_num_upper == '32' ||
                user?.product_syoken_num_upper == '075' ||
                user?.product_syoken_num_upper == '75' ||
                user?.product_syoken_num_upper == '134' ||
                user?.product_syoken_num_upper == '155' ||
                user?.product_syoken_num_upper == '215' ||
                user?.product_syoken_num_upper == '211' ||
                user?.product_syoken_num_upper == '223' ||
                user?.product_syoken_num_upper == '631' ||
                user?.product_syoken_num_upper == '638' ||
                user?.product_syoken_num_upper == '637' ||
                user?.product_syoken_num_upper == '639' ||
                user?.product_syoken_num_upper == '640' ||
                user?.product_syoken_num_upper == '641' ||
                user?.product_syoken_num_upper == '643' ||
                user?.product_syoken_num_upper == '647' ||
                user?.product_syoken_num_upper == '648' ||
                user?.product_syoken_num_upper == '635'
                  ? '解約はご契約者さまにとって不利益となる場合があります'
                  : '解約はご契約者にとって不利益となる場合があります';

              speak(text);
            }}
            className="ml-5 cursor-pointer"
            src={Volume}
            alt="icon volume"
          />
        </div>

        {user?.product_syoken_num_upper == '518' ||
        (user?.product_syoken_num_upper == '225' &&
          user?.product_name?.includes('ハイブリッドアセットライフ') &&
          user?.product_name?.includes('HA型')) ||
        (user?.product_syoken_num_upper == '225' &&
          user?.product_name?.includes('ハイブリッドアセットライフ') &&
          user?.product_name?.includes('SO型')) ? (
          <div className="flex justify-between w-full mt-10 px-6">
            <p className="font-bold text-base">
              解約払戻金額は払込保険料累計額を下回ることがあります
            </p>
            <Image
              onClick={() => {
                speak(
                  'カイヤクハライモドシキンガクワ払込保険料累計額を下回ることがあります'
                );
              }}
              className="ml-5 cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        ) : (
          (user?.product_syoken_num_upper == '073' ||
            user?.product_syoken_num_upper == '73') && (
            <div className="flex justify-between w-full mt-10 px-6">
              <p className="font-bold text-base">
                解約払戻金額は一時払保険料を下回る可能性があります
              </p>
              <Image
                onClick={() => {
                  speak(
                    'カイヤクハライモドシキンガクワイチジバライ保険料を下回る可能性があります'
                  );
                }}
                className="ml-5 cursor-pointer"
                src={Volume}
                alt="icon volume"
              />
            </div>
          )
        )}

        {(user?.product_syoken_num_upper == '073' ||
          user?.product_syoken_num_upper == '73') &&
        user?.product_chouhyou_code === '001D01' ? (
          <div className="flex justify-between w-full mt-5 px-6">
            <div>
              <p className="text-sm">
                解約払戻金額は、当社の定める方法に基づいて、経過した年月数により計算された金額に保険金額等算出係数（※1）を乗じた金額になります。
              </p>
              <p className="text-sm mt-2">
                ※1 保険金額算出係数は以下の方法で計算した係数となります。
              </p>
              <p className="text-sm mt-2">円貨割合＋連動通貨割合×為替変動率</p>
            </div>
            <Image
              onClick={() => {
                speak(
                  `カイヤクハライモドシキンガクは、当社の定める方法に基づいて、経過した年月数により計算された金額に保険金額等算出係数 1 を乗じた金額になります。
                  1 保険金額算出係数はイカの方法で計算した係数となります。
                  円貨割合＋連動通貨割合×為替変動率
                  `
                );
              }}
              className="ml-5 cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        ) : (
          (user?.product_syoken_num_upper == '073' ||
            user?.product_syoken_num_upper == '73') &&
          user?.product_chouhyou_code === '001D07' && (
            <div className="flex justify-between w-full mt-5 px-6">
              <p className="text-sm mr-5">
                お払込みいただいた保険料は、保険金のお支払いや、ご契約の締結・維持に必要な経費にあてられるため、ご契約後一定期間内に解約された場合、解約払戻金は一時払保険料を下回ります。
              </p>
              <Image
                onClick={() => {
                  speak(
                    'お払込みいただいた保険料は、保険金のお支払いや、ご契約の締結・維持に必要な経費にあてられるため、ご契約後一定期間内に解約された場合、カイヤクハライモドシキンワイチジバライ保険料を下回ります。'
                  );
                }}
                className="ml-5 cursor-pointer"
                src={Volume}
                alt="icon volume"
              />
            </div>
          )
        )}

        {(user?.product_syoken_num_upper == '073' ||
          user?.product_syoken_num_upper == '73') && (
          <div className="flex justify-between w-full mt-6 px-6">
            <p className="font-bold text-base">
              ご契約を解約された場合、解約日以後の死亡保障は無くなります
            </p>
            <Image
              onClick={() => {
                speak(
                  'ご契約を解約された場合、解約日以後の死亡保障は無くなります'
                );
              }}
              className="ml-5 cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        )}

        {(user?.product_syoken_num_upper == '073' ||
          user?.product_syoken_num_upper == '73') &&
          user?.product_chouhyou_code === '001D01' && (
            <div className="flex justify-between w-full mt-10 px-6">
              <p className="font-bold text-base">
                外貨支払特約のお取扱いについて
              </p>
              <Image
                onClick={() => {
                  speak('外貨支払特約のお取扱いについて');
                }}
                className="ml-5 cursor-pointer"
                src={Volume}
                alt="icon volume"
              />
            </div>
          )}

        {((!user?.product_name?.includes('目標値到達後') &&
          user?.product_syoken_num_upper == '134') ||
          user?.product_syoken_num_upper == '032' ||
          user?.product_syoken_num_upper == '32' ||
          user?.product_syoken_num_upper == '075' ||
          user?.product_syoken_num_upper == '75' ||
          (user?.product_syoken_num_upper == '155' &&
            !user?.product_name?.includes('目標値到達後')) ||
          (user?.product_syoken_num_upper == '215' &&
            !user?.product_name?.includes('目標値到達後')) ||
          user?.product_syoken_num_upper == '033' ||
          user?.product_syoken_num_upper == '33' ||
          user?.product_syoken_num_upper == '085' ||
          user?.product_syoken_num_upper == '85' ||
          user?.product_syoken_num_upper == '144' ||
          user?.product_syoken_num_upper == '165' ||
          user?.product_syoken_num_upper == '219' ||
          user?.product_syoken_num_upper == '022' ||
          user?.product_syoken_num_upper == '22') && (
          <div className="flex justify-between w-full mt-5 px-6">
            <p className="font-bold text-base mx-auto">
              解約払戻金額は一時払保険料を下回る可能性があります
            </p>
            <Image
              onClick={() => {
                speak('解約払戻金額は一時払保険料を下回る可能性があります');
              }}
              className="ml-5 cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        )}

        {user?.product_syoken_num_upper == '635' && (
          <div className="flex justify-between w-full mt-10 px-6">
            <p className="font-bold text-base">
              解約払戻金は多くの場合、お払込払み保険料の合計額より少ない金額になります
            </p>
            <Image
              onClick={() => {
                speak(
                  '解約払戻金は多くの場合、お払込払み保険料の合計額より少ない金額になります'
                );
              }}
              className="ml-5 cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        )}

        {(user?.product_syoken_num_upper == '631' ||
          user?.product_syoken_num_upper == '638' ||
          user?.product_syoken_num_upper == '637' ||
          user?.product_syoken_num_upper == '639' ||
          user?.product_syoken_num_upper == '640' ||
          user?.product_syoken_num_upper == '641' ||
          user?.product_syoken_num_upper == '643' ||
          user?.product_syoken_num_upper == '647' ||
          user?.product_syoken_num_upper == '648') && (
          <div className="flex justify-between w-full mt-10 px-6">
            <p className="font-bold text-base">
              保険料払込期間中は解約払戻金がありません
            </p>
            <Image
              onClick={() => {
                speak('保険料払込期間中は解約払戻金がありません');
              }}
              className="ml-5 cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        )}

        {(user?.product_syoken_num_upper == '631' ||
          user?.product_syoken_num_upper == '638' ||
          user?.product_syoken_num_upper == '637' ||
          user?.product_syoken_num_upper == '639' ||
          user?.product_syoken_num_upper == '640' ||
          user?.product_syoken_num_upper == '641' ||
          user?.product_syoken_num_upper == '643' ||
          user?.product_syoken_num_upper == '647' ||
          user?.product_syoken_num_upper == '648') && (
          <>
            <div className="flex justify-between w-full mt-5 px-6">
              <p className="text-sm mr-5">
                ・保険料の払込方法（回数）が年払のご契約の場合、すでにお払込みいただいた保険料のうち、まだ経過していない月単位の期間に相当する払込保険料を払い戻しいたします。
                <br />
                ・健康給付特則を適用している契約において、健康給付金支払前の場合には解約払戻金をお支払いします。
              </p>
              <Image
                onClick={() => {
                  speak(
                    '・保険料の払込方法（回数）が年払のご契約の場合、すでにお払込みいただいた保険料のうち、まだ経過していない月単位の期間に相当する払込保険料を払い戻しいたします。・健康給付特則を適用している契約において、健康給付金支払前の場合には解約払戻金をお支払いします。'
                  );
                }}
                className="ml-5 cursor-pointer"
                src={Volume}
                alt="icon volume"
              />
            </div>
          </>
        )}

        {user?.product_syoken_num_upper == '635' && (
          <>
            <div className="flex justify-between w-full mt-5 px-6">
              <div>
                <p className="text-sm mr-5">
                  ・生命保険ではお払込みいただいた保険料が預貯金のようにそのまま積立てられているのではなく、その一部は年々の保険金等のお支払いに、また他の一部は生命保険の運営に必要な経費にそれぞれあてられ、これらを除いた残りを基準として定められた金額が解約の際に払い戻されます。
                </p>
                <p className="text-sm mr-5 mt-2">
                  ・したがって、特に、ご契約後しばらくの間は、保険料の大部分が保険金等のお支払いや、販売、診査、保険証券作成等の経費にあてられますので、解約されたときの解約払戻金は多くの場合、まったくないか、あってもごくわずかです。
                </p>
                <p className="text-sm mr-5 mt-2">
                  ・解約払戻金は契約年齢、性別、経過年数等によって異なります。
                </p>
                <p className="text-sm mr-5 mt-2">
                  ・ご契約者さまに対する貸付金がある場合、支払うべき金額から、その元利金を差し引きます。
                </p>
                <p className="text-sm mr-5 mt-2">
                  ・保険料の払込方法（回数）が年払のご契約の場合、すでにお払込みいただいた保険料のうち、まだ経過していない月単位の期間に相当する払込保険料を解約払戻金とともに払い戻します。
                </p>
                <p className="text-sm mr-5 mt-2">
                  ・保険料の前納をされている場合で前納保険料に残額があるときは、その残額を解約払戻金とともに払い戻します。
                </p>
              </div>
              <Image
                onClick={() => {
                  speak(
                    '生命保険ではお払込みいただいた保険料が預貯金のようにそのまま積立てられているのではなく、その一部は年々の保険金等のお支払いに、また他の一部は生命保険の運営に必要な経費にそれぞれあてられ、これらを除いた残りを基準として定められた金額が解約の際に払い戻されます。したがって、特に、ご契約後しばらくの間は、保険料の大部分が保険金等のお支払いや、販売、診査、保険証券作成等の経費にあてられますので、解約されたときの解約払戻金は多くの場合、まったくないか、あってもごくわずかです。解約払戻金は契約年齢、性別、経過年数等によって異なります。ご契約者さまに対する貸付金がある場合、支払うべき金額から、その元利金を差し引きます。保険料の払込方法（回数）が年払のご契約の場合、すでにお払込みいただいた保険料のうち、まだ経過していない月単位の期間に相当する払込保険料を解約払戻金とともに払い戻します。保険料の前納をされている場合で前納保険料に残額があるときは、その残額を解約払戻金とともに払い戻します。'
                  );
                }}
                className="ml-5 cursor-pointer"
                src={Volume}
                alt="icon volume"
              />
            </div>
          </>
        )}

        {(user?.product_syoken_num_upper == '635' ||
          user?.product_syoken_num_upper == '631' ||
          user?.product_syoken_num_upper == '638' ||
          user?.product_syoken_num_upper == '637' ||
          user?.product_syoken_num_upper == '639' ||
          user?.product_syoken_num_upper == '640' ||
          user?.product_syoken_num_upper == '641' ||
          user?.product_syoken_num_upper == '643' ||
          user?.product_syoken_num_upper == '647' ||
          user?.product_syoken_num_upper == '648') && (
          <div className="flex justify-between w-full mt-10 px-6">
            <p className="font-bold text-base">
              解約日以後の保障は無くなります
            </p>
            <Image
              onClick={() => {
                speak('解約日以後の保障は無くなります');
              }}
              className="ml-5 cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        )}

        {user?.product_syoken_num_upper == '635' && (
          <>
            <div className="flex justify-between w-full mt-5 px-6">
              <div>
                <p className="text-sm mr-5">
                  ・解約された場合、解約日以後の保障は無くなります。そのため、万一の場合に残されたご家族の生活資金等が不十分となる場合があります。
                </p>
                <p className="text-sm mr-5 mt-2">
                  ・ご契約を解約された場合、一度解約されたご契約を元に戻すことはできません。
                </p>
              </div>
              <Image
                onClick={() => {
                  speak(
                    '・解約された場合、解約日以後の保障は無くなります。そのため、万一の場合に残されたご家族の生活資金等が不十分となる場合があります。・ご契約を解約された場合、一度解約されたご契約を元に戻すことはできません。'
                  );
                }}
                className="ml-5 cursor-pointer"
                src={Volume}
                alt="icon volume"
              />
            </div>
          </>
        )}

        {(user?.product_syoken_num_upper == '631' ||
          user?.product_syoken_num_upper == '638' ||
          user?.product_syoken_num_upper == '637' ||
          user?.product_syoken_num_upper == '639' ||
          user?.product_syoken_num_upper == '640' ||
          user?.product_syoken_num_upper == '641' ||
          user?.product_syoken_num_upper == '643' ||
          user?.product_syoken_num_upper == '647' ||
          user?.product_syoken_num_upper == '648') && (
          <>
            <div className="flex justify-between w-full mt-5 px-6">
              <div>
                <p className="text-sm mr-5">
                  ・ご契約を解約された場合、解約日以後の保障は無くなります。そのため、ケガや病気に対する備えが不十分となる場合があります。
                </p>
                <p className="text-sm mr-5 mt-2">
                  ・ご契約を解約された場合、一度解約されたご契約を元に戻すことはできません。
                </p>
                <p className="text-sm mr-5 mt-2">
                  ・特則・特約が適用・付加されている場合、これらの特則・特約も解約され、解約日以後の保障は無くなります。
                </p>
              </div>
              <Image
                onClick={() => {
                  speak(
                    '・ご契約を解約された場合、解約日以後の保障は無くなります。そのため、ケガや病気に対する備えが不十分となる場合があります。・ご契約を解約された場合、一度解約されたご契約を元に戻すことはできません。・特則・特約が適用・付加されている場合、これらの特則・特約も解約され、解約日以後の保障は無くなります。'
                  );
                }}
                className="ml-5 cursor-pointer"
                src={Volume}
                alt="icon volume"
              />
            </div>
          </>
        )}

        <div
          className={`flex justify-between w-full px-6 ${
            user?.product_syoken_num_upper !== '073' && 'py-5'
          }`}
        >
          {(user?.product_syoken_num_upper == '033' ||
            user?.product_syoken_num_upper == '33' ||
            user?.product_syoken_num_upper == '085' ||
            user?.product_syoken_num_upper == '85' ||
            user?.product_syoken_num_upper == '144' ||
            user?.product_syoken_num_upper == '165' ||
            user?.product_syoken_num_upper == '219') && (
            <p className="text-sm">
              解約払戻金額は、対象となる指標金利の変動により、一時払保険料を下回る可能性があります。
              <br />
              また、ご契約の締結に必要な費用や解約控除が適用となる商品もあります。詳しくは「ご契約のしおり・約款」でご確認ください。
            </p>
          )}

          {(user?.product_syoken_num_upper == '22' ||
            user?.product_syoken_num_upper == '022') && (
            <p className="text-sm">
              解約払戻金額は、対象となる指標金利および連動通貨の為替レートの変動により、一時払保険料を下回る可能性があります。
            </p>
          )}

          {(user?.product_syoken_num_upper == '032' ||
            user?.product_syoken_num_upper == '32' ||
            user?.product_syoken_num_upper == '075' ||
            (user?.product_syoken_num_upper == '134' &&
              !user?.product_name?.includes('目標値到達後')) ||
            (user?.product_syoken_num_upper == '155' &&
              !user?.product_name?.includes('目標値到達後')) ||
            (user?.product_syoken_num_upper == '215' &&
              !user?.product_name?.includes('目標値到達後'))) && (
            <p className="text-sm">
              解約払戻金額は、対象となる指標金利および連動通貨の為替レートの変動により、一時払保険料を下回る可能性があります。
              <br />
              また、ご契約の締結に必要な費用や解約控除が適用となる商品もあります。詳しくは「ご契約のしおり・約款」でご確認ください。
            </p>
          )}

          {user?.product_syoken_num_upper == '225' && (
            <div>
              <p className="text-sm">
                ・解約払戻金額は最低保証がなく、特別勘定の運用実績および解約控除率の適用により一時払保険料を下回る可能性があります。
              </p>
              <p className="text-sm mt-2">
                ・解約払戻金額は、積立金額から解約控除額を差し引いた金額となります。また、解約払戻金額とお支払事由が生じた生存給付金（超過給付加算特約を付加した場合は、超過額。）を累計した金額の合計は、特別勘定の運用実績および解約控除率の適用により、一時払保険料を下回る可能性があります。
              </p>
              <p className="text-sm mt-2">
                ・解約日が特別勘定への繰入日前の場合には、基本保険金額に相当する金額を解約払戻金としてお支払いします。
              </p>
            </div>
          )}

          {user?.product_syoken_num_upper == '518' && (
            <p className="text-sm">
              ・解約払戻金額は最低保証がなく、特別勘定の運用実績および解約控除額の適用により払込保険料累計額を下回る可能性があります。
              <br />
              ・解約払戻金額は、積立金額から解約控除額を差し引いた金額となります。
              <br />
              ・解約日が特別勘定への繰入日前の場合には、基本保険金額に相当する金額を解約払戻金としてお支払いします。
            </p>
          )}

          {(user?.product_syoken_num_upper == '033' ||
            user?.product_syoken_num_upper == '33' ||
            user?.product_syoken_num_upper == '85' ||
            user?.product_syoken_num_upper == '085' ||
            user?.product_syoken_num_upper == '144' ||
            user?.product_syoken_num_upper == '165' ||
            user?.product_syoken_num_upper == '219') && (
            <Image
              onClick={() => {
                speak(
                  '解約払戻金額は、対象となる指標金利の変動により、一時払保険料を下回る可能性があります。また、ご契約の締結に必要な費用や解約控除が適用となる商品もあります。詳しくは「ご契約のしおり・約款」でご確認ください。'
                );
              }}
              className="ml-5 self-start"
              src={Volume}
              alt="icon volume"
            />
          )}
          {(user?.product_syoken_num_upper == '022' ||
            user?.product_syoken_num_upper == '22') && (
            <Image
              onClick={() => {
                speak(
                  '解約払戻金額は、対象となる指標金利および連動通貨の為替レートの変動により、一時払保険料を下回る可能性があります。'
                );
              }}
              className="ml-5 self-start"
              src={Volume}
              alt="icon volume"
            />
          )}
          {(user?.product_syoken_num_upper == '032' ||
            user?.product_syoken_num_upper == '32' ||
            user?.product_syoken_num_upper == '075' ||
            (user?.product_syoken_num_upper == '134' &&
              !user?.product_name?.includes('目標値到達後')) ||
            (user?.product_syoken_num_upper == '155' &&
              !user?.product_name?.includes('目標値到達後')) ||
            (user?.product_syoken_num_upper == '215' &&
              !user?.product_name?.includes('目標値到達後'))) && (
            <Image
              onClick={() => {
                speak(
                  '解約払戻金額は、対象となる指標金利および連動通貨の為替レートの変動により、一時払保険料を下回る可能性があります。また、ご契約の締結に必要な費用や解約控除が適用となる商品もあります。詳しくは「ご契約のしおり・約款」でご確認ください。'
                );
              }}
              className="ml-5 self-start"
              src={Volume}
              alt="icon volume"
            />
          )}
          {(user?.product_syoken_num_upper == '073' ||
            user?.product_syoken_num_upper == '73') &&
            user?.product_name?.includes('改定後（連動通貨特則あり）') && (
              <Image
                onClick={() => {
                  speak(
                    '・カイヤクハライモドシキンガクは、当社の定める方法に基づいて、経過した年月数により計算された金額に保険金額等算出係数（1）を乗じた金額になります。1 保険金額算出係数はイカの方法で計算した係数となります。円貨割合＋連動通貨割合×為替変動率'
                  );
                }}
                className="ml-5 self-start"
                src={Volume}
                alt="icon volume"
              />
            )}
          {user?.product_syoken_num_upper == '225' && (
            <Image
              onClick={() => {
                speak(
                  '・カイヤクハライモドシキンガクは最低保証がなく、特別勘定の運用実績および解約控除率の適用により一時払保険料を下回る可能性があります。・カイヤクハライモドシキンガクワ、積立金額から解約控除額を差し引いた金額となります。また、カイヤクハライモドシキンガクとお支払事由が生じた生存給付金（超過給付加算特約を付加した場合は、超過額。）を累計した金額の合計は、特別勘定の運用実績および解約控除率の適用により、一時払保険料を下回る可能性があります。・解約日が特別勘定への繰入日前の場合には、基本保険金額に相当する金額をカイヤクハライモドシキンとしてお支払いします。'
                );
              }}
              className="ml-5 self-start"
              src={Volume}
              alt="icon volume"
            />
          )}
          {user?.product_syoken_num_upper == '518' && (
            <Image
              onClick={() => {
                speak(
                  '・解約払戻金額は最低保証がなく、特別勘定の運用実績および解約控除額の適用により払込保険料累計額を下回る可能性があります。・解約払戻金額は、積立金額から解約控除額を差し引いた金額となります。・解約日が特別勘定への繰入日前の場合には、基本保険金額に相当する金額を解約払戻金としてお支払いします。 '
                );
              }}
              className="ml-5 self-start"
              src={Volume}
              alt="icon volume"
            />
          )}
        </div>

        {user?.product_syoken_num_upper == '518' ||
        (user?.product_syoken_num_upper == '225' &&
          user?.product_name?.includes('ハイブリッドアセットライフ') &&
          user?.product_name?.includes('HA型')) ||
        (user?.product_syoken_num_upper == '225' &&
          user?.product_name?.includes('ハイブリッドアセットライフ') &&
          user?.product_name?.includes('SO型')) ? (
          <div className="flex justify-between w-full mt-5 px-6">
            <p className="font-bold text-base">解約控除額について</p>
            <Image
              onClick={() => {
                speak('解約控除額について');
              }}
              className="ml-5 cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        ) : (
          ''
        )}

        {(user?.product_syoken_num_upper == '225' &&
          user?.product_name?.includes('ハイブリッドアセットライフ') &&
          user?.product_name?.includes('HA型')) ||
        (user?.product_syoken_num_upper == '225' &&
          user?.product_name?.includes('ハイブリッドアセットライフ') &&
          user?.product_name?.includes('SO型')) ? (
          <div className="flex justify-between w-full mt-5 px-6">
            <p className="text-sm mx-auto">
              契約日からの経過年数が10年未満で解約された場合の解約控除額は、解約日の基本保険金額に契約日からの経過年数に応じた解約控除率を乗じた金額となります。
            </p>
            <Image
              onClick={() => {
                speak(
                  '契約日からの経過年数が10年未満で解約された場合の解約控除額は、解約日の基本保険金額に契約日からの経過年数に応じた解約控除率を乗じた金額となります。'
                );
              }}
              className="ml-5 cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        ) : (
          ''
        )}

        {user?.product_syoken_num_upper == '518' && (
          <div className="flex justify-between w-full mt-5 px-6">
            <p className="text-sm mx-auto">
              契約日からの経過年数が10年未満で解約された場合には解約控除がかかります
            </p>
            <Image
              onClick={() => {
                speak(
                  '契約日からの経過年数が10年未満で解約された場合には解約控除がかかります'
                );
              }}
              className="ml-5 cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        )}

        {(((user?.product_syoken_num_upper == '073' ||
          user?.product_syoken_num_upper == '73') &&
          user?.product_name?.includes('改定後（連動通貨特則あり）')) ||
          user?.product_syoken_num_upper == '032' ||
          user?.product_syoken_num_upper == '32' ||
          user?.product_syoken_num_upper == '75' ||
          user?.product_syoken_num_upper == '075' ||
          (user?.product_syoken_num_upper == '134' &&
            !user?.product_name?.includes('目標値到達後')) ||
          (user?.product_syoken_num_upper == '155' &&
            !user?.product_name?.includes('目標値到達後')) ||
          (user?.product_syoken_num_upper == '215' &&
            !user?.product_name?.includes('目標値到達後'))) && (
          <div className="flex justify-between w-full mt-5 px-6">
            <p className="font-bold text-base">
              外貨支払特約のお取扱いについて
            </p>
            <Image
              onClick={() => {
                speak('外貨支払特約のお取扱いについて');
              }}
              className="ml-5 cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        )}

        {user?.product_chouhyou_code == '001D01' &&
          (user?.product_syoken_num_upper == '073' ||
            user?.product_syoken_num_upper == '73') && (
            <>
              <div className="flex justify-between w-full mt-5 px-6">
                <p className="text-sm">
                  <span className="font-bold">
                    解約払戻金は、豪ドル、米ドル、ユーロでお受取りいただけます
                  </span>
                </p>
                <Image
                  onClick={() => {
                    speak(
                      `
                      カイヤクハライモドシキンは、豪ドル、米ドル、ユーロでお受取りいただけます
                      外貨支払特約を付加されている場合、つぎの①または②の金額を、『ご指定の支払通貨』でお受取りいただけます。
                      支払通貨は、『豪ドル、米ドルまたはユーロのいずれか１つの通貨』となります。
                      ①カイヤクハライモドシキンのうち連動通貨割合に応じた金額
                      ②カイヤクハライモドシキンの全額
                      `
                    );
                  }}
                  className="ml-5 cursor-pointer"
                  src={Volume}
                  alt="icon volume"
                />
              </div>
              <div className="flex justify-between w-full mt-5 px-6">
                <div>
                  <p className="text-sm mr-10">
                    外貨支払特約を付加されている場合、つぎの①または②の金額を、『ご指定の支払通貨』でお受取りいただけます。
                  </p>
                  <p className="text-sm mr-10 mt-2">
                    支払通貨は、『豪ドル、米ドルまたはユーロのいずれか１つの通貨』となります。
                  </p>
                  <p className="text-sm mr-10 mt-2">
                    ①解約払戻金のうち連動通貨割合に応じた金額
                  </p>
                  <p className="text-sm mr-10 mt-2">②解約払戻金の全額</p>
                </div>
              </div>
            </>
          )}

        {(user?.product_syoken_num_upper == '032' ||
          user?.product_syoken_num_upper == '32' ||
          user?.product_syoken_num_upper == '075' ||
          (user?.product_syoken_num_upper == '134' &&
            !user?.product_name?.includes('目標値到達後')) ||
          (user?.product_syoken_num_upper == '155' &&
            !user?.product_name?.includes('目標値到達後')) ||
          (user?.product_syoken_num_upper == '215' &&
            !user?.product_name?.includes('目標値到達後'))) && (
          <div className="flex justify-between w-full mt-5 px-6">
            <p className="text-sm">
              <span className="font-bold">ご指定の支払通貨でのお受取り</span>
              <br />
              <br />
              外貨支払特約を付加されている場合、解約払戻金額はご指定の支払通貨でお支払いします。
            </p>
            <Image
              onClick={() => {
                speak(
                  `ご指定の支払通貨でのお受取り  
                  外貨支払特約を付加されている場合、解約払戻
                  金額はご指定の支払通貨でお支払いします。`
                );
              }}
              className="ml-5 cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        )}

        {((user?.product_syoken_num_upper == '223' &&
          user?.product_name.includes('目標値到達後')) ||
          user?.product_syoken_num_upper == '211' ||
          user?.product_syoken_num_upper == '215' ||
          user?.product_syoken_num_upper == '155' ||
          user?.product_syoken_num_upper == '134' ||
          user?.product_syoken_num_upper == '219' ||
          user?.product_syoken_num_upper == '165' ||
          user?.product_syoken_num_upper == '144' ||
          user?.product_syoken_num_upper == '085' ||
          user?.product_syoken_num_upper == '033' ||
          user?.product_syoken_num_upper == '33' ||
          user?.product_syoken_num_upper == '85' ||
          user?.product_syoken_num_upper == '032' ||
          user?.product_syoken_num_upper == '32' ||
          user?.product_syoken_num_upper == '075' ||
          user?.product_syoken_num_upper == '75' ||
          user?.product_syoken_num_upper == '22' ||
          user?.product_syoken_num_upper == '022') && (
          <div className="flex justify-between w-full mt-5 mb-10 px-6">
            <p className="font-bold text-base mx-auto">
              解約された場合、解約日以後の死亡保障は無くなります
            </p>
            <Image
              onClick={() => {
                speak('解約された場合、解約日以後の死亡保障は無くなります');
              }}
              className="ml-5 cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        )}

        <div className="flex justify-between w-full mt-5 px-6">
          <p className="font-bold text-base mx-auto">
            {user?.product_syoken_num_upper == '631' ||
            user?.product_syoken_num_upper == '637' ||
            user?.product_syoken_num_upper == '638' ||
            user?.product_syoken_num_upper == '639' ||
            user?.product_syoken_num_upper == '640' ||
            user?.product_syoken_num_upper == '641' ||
            user?.product_syoken_num_upper == '643' ||
            user?.product_syoken_num_upper == '647' ||
            user?.product_syoken_num_upper == '648'
              ? '現在のご契約を解約し、新たにご契約のお申込みをされる場合、ご契約者さまにとって次のような不利益となる場合があります'
              : '現在のご契約を解約して、新たにご契約のお申込みをされる場合、ご契約者さまにとって不利益となる場合があります'}
          </p>
          <Image
            onClick={() => {
              if (
                user?.product_syoken_num_upper == '631' ||
                user?.product_syoken_num_upper == '637' ||
                user?.product_syoken_num_upper == '638' ||
                user?.product_syoken_num_upper == '639' ||
                user?.product_syoken_num_upper == '640' ||
                user?.product_syoken_num_upper == '641' ||
                user?.product_syoken_num_upper == '643' ||
                user?.product_syoken_num_upper == '647' ||
                user?.product_syoken_num_upper == '648'
              ) {
                speak(
                  '現在のご契約を解約し、新たにご契約のお申込みをされる場合、ご契約者さまにとって次のような不利益となる場合があります'
                );
              } else {
                speak(
                  '現在のご契約を解約して、新たにご契約のお申込みをされる場合、ご契約者さまにとって不利益となる場合があります'
                );
              }
            }}
            className="ml-5 cursor-pointer"
            src={Volume}
            alt="icon volume"
          />
        </div>

        <div className="flex justify-between w-full mt-5 px-6">
          <p className="font-bold text-sm">
            {user?.product_syoken_num_upper == '073' ||
            user?.product_syoken_num_upper == '73' ||
            (user?.product_syoken_num_upper == '225' &&
              user?.product_name?.includes('ハイブリッドアセットライフ') &&
              user?.product_name?.includes('HA型')) ||
            (user?.product_syoken_num_upper == '225' &&
              user?.product_name?.includes('ハイブリッドアセットライフ') &&
              user?.product_name?.includes('SO型')) ||
            user?.product_syoken_num_upper == '033' ||
            user?.product_syoken_num_upper == '33' ||
            user?.product_syoken_num_upper == '085' ||
            user?.product_syoken_num_upper == '85' ||
            user?.product_syoken_num_upper == '144' ||
            user?.product_syoken_num_upper == '165' ||
            user?.product_syoken_num_upper == '219' ||
            user?.product_syoken_num_upper == '022' ||
            user?.product_syoken_num_upper == '22' ||
            user?.product_syoken_num_upper == '032' ||
            user?.product_syoken_num_upper == '32' ||
            user?.product_syoken_num_upper == '075' ||
            (user?.product_syoken_num_upper == '134' &&
              !user?.product_name?.includes('目標値到達後')) ||
            (user?.product_syoken_num_upper == '155' &&
              !user?.product_name?.includes('目標値到達後')) ||
            (user?.product_syoken_num_upper == '215' &&
              !user?.product_name?.includes('目標値到達後')) ||
            user?.product_syoken_num_upper == '631' ||
            user?.product_syoken_num_upper == '635' ||
            user?.product_syoken_num_upper == '637' ||
            user?.product_syoken_num_upper == '638' ||
            user?.product_syoken_num_upper == '639' ||
            user?.product_syoken_num_upper == '640' ||
            user?.product_syoken_num_upper == '641' ||
            user?.product_syoken_num_upper == '643' ||
            user?.product_syoken_num_upper == '647' ||
            user?.product_syoken_num_upper == '648'
              ? '新たにご契約できない場合があります'
              : '新たにご契約できない場合があります。'}
          </p>
          <Image
            onClick={() => {
              const text1 =
                user?.product_syoken_num_upper == '073' ||
                user?.product_syoken_num_upper == '73' ||
                (user?.product_syoken_num_upper == '225' &&
                  user?.product_name?.includes('ハイブリッドアセットライフ') &&
                  user?.product_name?.includes('HA型')) ||
                (user?.product_syoken_num_upper == '225' &&
                  user?.product_name?.includes('ハイブリッドアセットライフ') &&
                  user?.product_name?.includes('SO型')) ||
                user?.product_syoken_num_upper == '033' ||
                user?.product_syoken_num_upper == '33' ||
                user?.product_syoken_num_upper == '085' ||
                user?.product_syoken_num_upper == '85' ||
                user?.product_syoken_num_upper == '144' ||
                user?.product_syoken_num_upper == '165' ||
                user?.product_syoken_num_upper == '219' ||
                user?.product_syoken_num_upper == '022' ||
                user?.product_syoken_num_upper == '22' ||
                user?.product_syoken_num_upper == '032' ||
                user?.product_syoken_num_upper == '32' ||
                user?.product_syoken_num_upper == '075' ||
                user?.product_syoken_num_upper == '75' ||
                (user?.product_syoken_num_upper == '134' &&
                  !user?.product_name?.includes('目標値到達後')) ||
                (user?.product_syoken_num_upper == '155' &&
                  !user?.product_name?.includes('目標値到達後')) ||
                (user?.product_syoken_num_upper == '215' &&
                  !user?.product_name?.includes('目標値到達後')) ||
                user?.product_syoken_num_upper == '631' ||
                user?.product_syoken_num_upper == '635' ||
                user?.product_syoken_num_upper == '637' ||
                user?.product_syoken_num_upper == '638' ||
                user?.product_syoken_num_upper == '639' ||
                user?.product_syoken_num_upper == '640' ||
                user?.product_syoken_num_upper == '641' ||
                user?.product_syoken_num_upper == '643' ||
                user?.product_syoken_num_upper == '647' ||
                user?.product_syoken_num_upper == '648'
                  ? '新たにご契約できない場合があります'
                  : '新たにご契約できない場合があります。';

              const text2 =
                user?.product_syoken_num_upper == '073' ||
                user?.product_syoken_num_upper == '73' ||
                (user?.product_syoken_num_upper == '225' &&
                  user?.product_name?.includes('ハイブリッドアセットライフ') &&
                  user?.product_name?.includes('HA型')) ||
                (user?.product_syoken_num_upper == '225' &&
                  user?.product_name?.includes('ハイブリッドアセットライフ') &&
                  user?.product_name?.includes('SO型')) ||
                user?.product_syoken_num_upper == '033' ||
                user?.product_syoken_num_upper == '33' ||
                user?.product_syoken_num_upper == '085' ||
                user?.product_syoken_num_upper == '85' ||
                user?.product_syoken_num_upper == '144' ||
                user?.product_syoken_num_upper == '165' ||
                user?.product_syoken_num_upper == '219' ||
                user?.product_syoken_num_upper == '022' ||
                user?.product_syoken_num_upper == '22' ||
                user?.product_syoken_num_upper == '032' ||
                user?.product_syoken_num_upper == '32' ||
                user?.product_syoken_num_upper == '075' ||
                user?.product_syoken_num_upper == '75' ||
                user?.product_syoken_num_upper == '134' ||
                user?.product_syoken_num_upper == '155' ||
                user?.product_syoken_num_upper == '215'
                  ? '現在のご契約を解約し、後日新たにご契約のお申込みをされる場合、ご契約のお申込にあたっての被保険者さまの告知内容等によってはご加入できない場合があります。'
                  : '現在のご契約を解約し、後日新たにご契約のお申込みをされる場合、ご契約のお申込にあたっての被保険者の告知内容等によってはご加入できない場合があります。';

              speak(
                `${text1} ${
                  user?.product_syoken_num_upper == '631' ||
                  user?.product_syoken_num_upper == '635' ||
                  user?.product_syoken_num_upper == '637' ||
                  user?.product_syoken_num_upper == '638' ||
                  user?.product_syoken_num_upper == '639' ||
                  user?.product_syoken_num_upper == '640' ||
                  user?.product_syoken_num_upper == '641' ||
                  user?.product_syoken_num_upper == '643' ||
                  user?.product_syoken_num_upper == '647' ||
                  user?.product_syoken_num_upper == '648'
                    ? '現在のご契約を解約し、後日新たにご契約のお申込みをされる場合、被保険者さまの健康状態や職業等により新たにご契約できない場合があります。'
                    : text2
                }`
              );
            }}
            className="ml-5 cursor-pointer"
            src={Volume}
            alt="icon volume"
          />
        </div>

        {user?.product_syoken_num_upper == '631' ||
        user?.product_syoken_num_upper == '635' ||
        user?.product_syoken_num_upper == '637' ||
        user?.product_syoken_num_upper == '638' ||
        user?.product_syoken_num_upper == '639' ||
        user?.product_syoken_num_upper == '640' ||
        user?.product_syoken_num_upper == '641' ||
        user?.product_syoken_num_upper == '643' ||
        user?.product_syoken_num_upper == '647' ||
        user?.product_syoken_num_upper == '648' ? (
          <div className="flex justify-between w-full mt-5 px-6">
            <p className="text-sm mr-10">
              現在のご契約を解約し、後日新たにご契約のお申込みをされる場合、被保険者さまの健康状態や職業等により新たにご契約できない場合があります。
            </p>
          </div>
        ) : (
          <div className="flex justify-between w-full mt-5 px-6">
            <p className="text-sm mr-10">
              {user?.product_syoken_num_upper == '073' ||
              user?.product_syoken_num_upper == '73' ||
              (user?.product_syoken_num_upper == '225' &&
                user?.product_name?.includes('ハイブリッドアセットライフ') &&
                user?.product_name?.includes('HA型')) ||
              (user?.product_syoken_num_upper == '225' &&
                user?.product_name?.includes('ハイブリッドアセットライフ') &&
                user?.product_name?.includes('SO型')) ||
              user?.product_syoken_num_upper == '033' ||
              user?.product_syoken_num_upper == '33' ||
              user?.product_syoken_num_upper == '085' ||
              user?.product_syoken_num_upper == '85' ||
              user?.product_syoken_num_upper == '144' ||
              user?.product_syoken_num_upper == '165' ||
              user?.product_syoken_num_upper == '219' ||
              user?.product_syoken_num_upper == '022' ||
              user?.product_syoken_num_upper == '22' ||
              user?.product_syoken_num_upper == '032' ||
              user?.product_syoken_num_upper == '32' ||
              user?.product_syoken_num_upper == '075' ||
              user?.product_syoken_num_upper == '75' ||
              user?.product_syoken_num_upper == '134' ||
              user?.product_syoken_num_upper == '155' ||
              user?.product_syoken_num_upper == '215'
                ? '現在のご契約を解約し、後日新たにご契約のお申込みをされる場合、ご契約のお申込にあたっての被保険者さまの告知内容等によってはご加入できない場合があります。'
                : '現在のご契約を解約し、後日新たにご契約のお申込みをされる場合、ご契約のお申込にあたっての被保険者の告知内容等によってはご加入できない場合があります。'}
            </p>
          </div>
        )}

        {(user?.product_syoken_num_upper == '631' ||
          user?.product_syoken_num_upper == '638' ||
          user?.product_syoken_num_upper == '637' ||
          user?.product_syoken_num_upper == '639' ||
          user?.product_syoken_num_upper == '640' ||
          user?.product_syoken_num_upper == '641' ||
          user?.product_syoken_num_upper == '643' ||
          user?.product_syoken_num_upper == '647' ||
          user?.product_syoken_num_upper == '648') && (
          <>
            <div className="flex justify-between w-full mt-5 px-6">
              <p className="font-bold text-sm">
                保険料が高くなる場合があります
              </p>
              <Image
                onClick={() => {
                  speak(
                    '保険料が高くなる場合があります 現在のご契約を解約し、後日新たにご契約のお申込みをされる場合、被保険者さまのご年齢が上がること等により保険料が高くなる場合があります。'
                  );
                }}
                className="ml-5 cursor-pointer"
                src={Volume}
                alt="icon volume"
              />
            </div>

            <div className="flex justify-between w-full mt-5 px-6">
              <p className="text-sm mr-10">
                現在のご契約を解約し、後日新たにご契約のお申込みをされる場合、被保険者さまのご年齢が上がること等により保険料が高くなる場合があります。
              </p>
            </div>
          </>
        )}

        {(user?.product_syoken_num_upper == '631' ||
          user?.product_syoken_num_upper == '638' ||
          user?.product_syoken_num_upper == '637' ||
          user?.product_syoken_num_upper == '639' ||
          user?.product_syoken_num_upper == '640' ||
          user?.product_syoken_num_upper == '641' ||
          user?.product_syoken_num_upper == '643' ||
          user?.product_syoken_num_upper == '647' ||
          user?.product_syoken_num_upper == '648') && (
          <>
            <div className="flex justify-between w-full mt-5 px-6">
              <p className="font-bold text-sm">
                保険金・給付金等が支払われない場合があります
              </p>
              <Image
                onClick={() => {
                  speak(
                    '保険金・給付金等が支払われない場合があります ・新たにお申込みのご契約について告知義務違反があった場合、新たなご契約が解除されたり、保険金・給付金等が支払われない場合があります。・新たなご契約について、責任開始日から所定の期間内に被保険者さまが自死された場合などには、保険金が支払われない場合があります。・新たにお申込みのご契約について、がんによる保障はご契約から一定期間経過後に開始される場合があります。（例：「保険契約または特約の責任開始期の属する日からその日を含めて91日目」等）'
                  );
                }}
                className="ml-5 cursor-pointer"
                src={Volume}
                alt="icon volume"
              />
            </div>

            <div className="flex justify-between w-full mt-5 px-6">
              <div>
                <p className="text-sm mr-10">
                  ・新たにお申込みのご契約について告知義務違反があった場合、新たなご契約が解除されたり、保険金・給付金等が支払われない場合があります。
                </p>
                <p className="text-sm mr-10 mt-2">
                  ・新たなご契約について、責任開始日から所定の期間内に被保険者さまが自死された場合などには、保険金が支払われない場合があります。
                </p>
                <p className="text-sm mr-10 mt-2">
                  ・新たにお申込みのご契約について、がんによる保障はご契約から一定期間経過後に開始される場合があります。
                </p>
                <p className="text-sm mr-10 mt-2">
                  （例：「保険契約または特約の責任開始期の属する日からその日を含めて91日目」等）
                </p>
              </div>
            </div>
          </>
        )}

        {(user?.product_syoken_num_upper == '631' ||
          user?.product_syoken_num_upper == '638' ||
          user?.product_syoken_num_upper == '637' ||
          user?.product_syoken_num_upper == '639' ||
          user?.product_syoken_num_upper == '640' ||
          user?.product_syoken_num_upper == '641' ||
          user?.product_syoken_num_upper == '643' ||
          user?.product_syoken_num_upper == '647' ||
          user?.product_syoken_num_upper == '648') && (
          <div className="flex justify-between w-full mt-10 px-6">
            <p className="font-bold text-base">
              保険料のお払込みが困難な場合、以下のような方法もあります
            </p>
            <Image
              onClick={() => {
                speak(
                  '保険料のお払込みが困難な場合、以下のような方法もあります'
                );
              }}
              className="ml-5 cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        )}

        {(user?.product_syoken_num_upper == '631' ||
          user?.product_syoken_num_upper == '638' ||
          user?.product_syoken_num_upper == '637' ||
          user?.product_syoken_num_upper == '639' ||
          user?.product_syoken_num_upper == '640' ||
          user?.product_syoken_num_upper == '641' ||
          user?.product_syoken_num_upper == '643' ||
          user?.product_syoken_num_upper == '647' ||
          user?.product_syoken_num_upper == '648') && (
          <>
            <div className="flex justify-between w-full mt-5 px-6">
              <p className="font-bold text-sm">減額</p>
              <Image
                onClick={() => {
                  speak(
                    '減額 ご契約は全部を解約されなくても、一部だけを解約（減額）することもできます。この場合、一部解約（減額）された保障に相当する保険料が軽減されます。（解約払戻金はありません）'
                  );
                }}
                className="ml-5 cursor-pointer"
                src={Volume}
                alt="icon volume"
              />
            </div>

            <div className="flex justify-between w-full mt-5 px-6">
              <p className="text-sm mr-10">
                ご契約は全部を解約されなくても、一部だけを解約（減額）することもできます。
                <br />
                この場合、一部解約（減額）された保障に相当する保険料が軽減されます。（解約払戻金はありません）
              </p>
            </div>
          </>
        )}

        {(user?.product_syoken_num_upper == '631' ||
          user?.product_syoken_num_upper == '638' ||
          user?.product_syoken_num_upper == '637' ||
          user?.product_syoken_num_upper == '639' ||
          user?.product_syoken_num_upper == '640' ||
          user?.product_syoken_num_upper == '641' ||
          user?.product_syoken_num_upper == '643' ||
          user?.product_syoken_num_upper == '647' ||
          user?.product_syoken_num_upper == '648') && (
          <>
            <div className="flex justify-between w-full mt-10 px-6">
              <p className="font-bold text-base">
                請求していない保険金・給付金・年金等がないかご確認ください
              </p>
              <Image
                onClick={() => {
                  speak(
                    '請求していない保険金・給付金・年金等がないかご確認ください 各種お取扱いにつきまして、詳しくは「ご契約のしおり・約款」でご確認ください。'
                  );
                }}
                className="ml-5 cursor-pointer"
                src={Volume}
                alt="icon volume"
              />
            </div>

            <div className="flex justify-between w-full mt-5 px-6">
              <p className="text-sm mr-10">
                ※各種お取扱いにつきまして、詳しくは「ご契約のしおり・約款」でご確認ください。
              </p>
            </div>
          </>
        )}

        {user?.product_syoken_num_upper == '635' && (
          <>
            <div className="flex justify-between w-full mt-5 px-6">
              <p className="font-bold text-sm">
                保険金が支払われない場合があります
              </p>
              <Image
                onClick={() => {
                  speak(
                    '保険金が支払われない場合があります ・新たにお申込みのご契約について告知義務違反があった場合、新たなご契約が解除されたり、保険金・給付金等が支払われない場合があります。新たなご契約について、責任開始日から所定の期間内に被保険者さまが自死された場合などには、保険金が支払われない場合があります。'
                  );
                }}
                className="ml-5 cursor-pointer"
                src={Volume}
                alt="icon volume"
              />
            </div>

            <div className="flex justify-between w-full mt-5 px-6">
              <p className="text-sm mr-10">
                ・新たにお申込みのご契約について告知義務違反があった場合、新たなご契約が解除されたり、保険金・給付金等が支払われない場合があります。
                <br />
                ・新たなご契約について、責任開始日から所定の期間内に被保険者さまが自死された場合などには、保険金が支払われない場合があります。
              </p>
            </div>
          </>
        )}

        {user?.product_syoken_num_upper == '635' && (
          <div className="flex justify-between w-full mt-10 px-6">
            <p className="font-bold text-base">
              一時的に資金がご入用な場合には、以下のような方法もあります
            </p>
            <Image
              onClick={() => {
                speak(
                  '一時的に資金がご入用な場合には、以下のような方法もあります'
                );
              }}
              className="ml-5 cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        )}

        {user?.product_syoken_num_upper == '635' && (
          <>
            <div className="flex justify-between w-full mt-5 px-6">
              <p className="font-bold text-sm">契約者貸付制度のご利用</p>
              <Image
                onClick={() => {
                  speak(
                    '契約者貸付制度のご利用 保障を継続したまま解約払戻金額の一定の範囲内で、ご契約者さまに対する貸付の制度をご利用いただけます。'
                  );
                }}
                className="ml-5 cursor-pointer"
                src={Volume}
                alt="icon volume"
              />
            </div>

            <div className="flex justify-between w-full mt-5 px-6">
              <p className="text-sm mr-10">
                保障を継続したまま解約払戻金額の一定の範囲内で、ご契約者さまに対する貸付の制度をご利用いただけます。
              </p>
            </div>
          </>
        )}
        {user?.product_syoken_num_upper == '635' && (
          <div className="flex justify-between w-full mt-10 px-6">
            <p className="font-bold text-base">
              保険料のお払込みが困難な場合、以下のような方法もあります
            </p>
            <Image
              onClick={() => {
                speak(
                  '保険料のお払込みが困難な場合、以下のような方法もあります'
                );
              }}
              className="ml-5 cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        )}

        {user?.product_syoken_num_upper == '635' && (
          <>
            <div className="flex justify-between w-full mt-5 px-6">
              <p className="font-bold text-sm">基本保険金額の減額</p>
              <Image
                onClick={() => {
                  speak(
                    '基本保険金額の減額 ご契約は全部を解約されなくても、一部だけを解約することもできます。基本保険金額を減額することで、保険料払込金額を減らすことができます。'
                  );
                }}
                className="ml-5 cursor-pointer"
                src={Volume}
                alt="icon volume"
              />
            </div>

            <div className="flex justify-between w-full mt-5 px-6">
              <div>
                <p className="text-sm mr-10">
                  ・ご契約は全部を解約されなくても、一部だけを解約することもできます。
                </p>
                <p className="text-sm mr-10 mt-2">
                  ・基本保険金額を減額することで、保険料払込金額を減らすことができます。
                </p>
              </div>
            </div>
          </>
        )}

        {user?.product_syoken_num_upper == '635' && (
          <>
            <div className="flex justify-between w-full mt-5 px-6">
              <p className="font-bold text-sm">払済保険への変更</p>
              <Image
                onClick={() => {
                  speak(
                    '払済保険への変更 変更時の解約払戻金を一時払保険料に充当した、保険料払込済の終身保険に変更します。変更後の基本保険金額は変更時の解約払戻金額(ご契約者さまに対する貸付金があるときはその元利合計額を解約払戻金から差し引いた残額)を基準として定めます。変更後の死亡保険金額は変更後の基本保険金額と同額になります。'
                  );
                }}
                className="ml-5 cursor-pointer"
                src={Volume}
                alt="icon volume"
              />
            </div>

            <div className="flex justify-between w-full mt-5 px-6">
              <div>
                <p className="text-sm mr-10">
                  ・変更時の解約払戻金を一時払保険料に充当した、保険料払込済の終身保険に変更します。
                </p>
                <p className="text-sm mr-10 mt-2">
                  ・変更後の基本保険金額は変更時の解約払戻金額(ご契約者さまに対する貸付金があるときはその元利合計額を解約払戻金から差し引いた残額)を基準として定めます。
                </p>
                <p className="text-sm mr-10 mt-2">
                  ・変更後の死亡保険金額は変更後の基本保険金額と同額になります。
                </p>
              </div>
            </div>
          </>
        )}

        {user?.product_syoken_num_upper == '635' && (
          <>
            <div className="flex justify-between w-full mt-5 px-6">
              <p className="font-bold text-sm">延長保険への変更</p>
              <Image
                onClick={() => {
                  speak(
                    '延長保険への変更 変更時の解約払戻金を一時払保険料に充当した、保険料払込済の定期保険(延長定期保険)に変更します。変更後の保険期間は変更時の解約払戻金額を基準として定めます。基本保険金額・死亡保険金額は変更されません。ご契約の状況などによってはお取扱いできない場合があります。各種お取扱いにつきまして、詳しくは「ご契約のしおり・約款」でご確認ください。'
                  );
                }}
                className="ml-5 cursor-pointer"
                src={Volume}
                alt="icon volume"
              />
            </div>

            <div className="flex justify-between w-full mt-5 px-6">
              <div>
                <p className="text-sm mr-10">
                  ・変更時の解約払戻金を一時払保険料に充当した、保険料払込済の定期保険(延長定期保険)に変更します。
                </p>
                <p className="text-sm mr-10 mt-2">
                  ・変更後の保険期間は変更時の解約払戻金額を基準として定めます。
                </p>
                <p className="text-sm mr-10 mt-2">
                  ・基本保険金額・死亡保険金額は変更されません。
                </p>
                <p className="text-sm mr-10 mt-2">
                  ※ご契約の状況などによってはお取扱いできない場合があります。各種お取扱いにつきまして、詳しくは「ご契約のしおり・約款」でご確認ください。
                </p>
              </div>
            </div>
          </>
        )}

        {user?.product_syoken_num_upper == '518' ||
        (user?.product_syoken_num_upper == '225' &&
          user?.product_name?.includes('ハイブリッドアセットライフ') &&
          user?.product_name?.includes('HA型')) ||
        (user?.product_syoken_num_upper == '225' &&
          user?.product_name?.includes('ハイブリッドアセットライフ') &&
          user?.product_name?.includes('SO型')) ? (
          <>
            <div className="flex justify-between w-full mt-5 px-6">
              <p>
                <span className="font-bold text-sm">
                  解約控除期間などの起算日は新たなご契約の契約日からとなります
                </span>
              </p>
              <Image
                onClick={() => {
                  speak(
                    '解約控除期間などの起算日はアラタナご契約の契約日からとなります カイヤクゴまもなく新たにご契約された場合は、解約控除期間の起算日はアラタナご契約の契約日からとなります。'
                  );
                }}
                className="ml-5 cursor-pointer"
                src={Volume}
                alt="icon volume"
              />
            </div>
            <div className="flex justify-between w-full mt-5 px-6">
              <p className="text-sm mr-10">
                解約後まもなく新たにご契約された場合は、解約控除期間の起算日は新たなご契約の契約日からとなります。
              </p>
            </div>
          </>
        ) : (
          ''
        )}

        {(user?.product_syoken_num_upper == '225' &&
          user?.product_name?.includes('ハイブリッドアセットライフ') &&
          user?.product_name?.includes('HA型')) ||
        (user?.product_syoken_num_upper == '225' &&
          user?.product_name?.includes('ハイブリッドアセットライフ') &&
          user?.product_name?.includes('SO型')) ? (
          <div className="flex justify-between w-full mt-5 px-6">
            <p>
              <span className="font-bold text-sm">
                ご資金が必要な場合など積立金をお引出しになりたい方には、次のような方法もあります
              </span>
            </p>
            <Image
              onClick={() => {
                speak(
                  'ご資金が必要な場合など積立金をお引出しになりたいカタには、次のようなホウホウもあります '
                );
              }}
              className="ml-5 cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        ) : (
          ''
        )}

        {(user?.product_syoken_num_upper == '73' ||
          user?.product_syoken_num_upper == '073') && (
          <>
            <div className="flex justify-between w-full mt-5 px-6">
              <p>
                <span className="font-bold text-sm">
                  保険金が支払われない場合があります
                </span>
              </p>
              <Image
                onClick={() => {
                  speak(
                    '保険金が支払われない場合があります ・アラタナご契約のお申込みにあたって告知義務違反があった場合、アラタナご契約が解除されたり、保険金が支払われない場合があります。・アラタナご契約について、責任開始日から所定の期間内に被保険者さまが自死された場合などには、保険金が支払われない場合があります。'
                  );
                }}
                className="ml-5 cursor-pointer"
                src={Volume}
                alt="icon volume"
              />
            </div>
            <div className="flex justify-between w-full mt-5 px-6">
              <div>
                <p className="text-sm mr-10">
                  ・新たなご契約のお申込みにあたって告知義務違反があった場合、新たなご契約が解除されたり、保険金が支払われない場合があります。
                </p>
                <p className="text-sm mr-10 mt-2">
                  ・新たなご契約について、責任開始日から所定の期間内に被保険者さまが自死された場合などには、保険金が支払われない場合があります。
                </p>
              </div>
            </div>
          </>
        )}

        {(user?.product_syoken_num_upper == '033' ||
          user?.product_syoken_num_upper == '33' ||
          user?.product_syoken_num_upper == '85' ||
          user?.product_syoken_num_upper == '085' ||
          user?.product_syoken_num_upper == '144' ||
          user?.product_syoken_num_upper == '165' ||
          user?.product_syoken_num_upper == '219' ||
          user?.product_syoken_num_upper == '022' ||
          user?.product_syoken_num_upper == '22' ||
          user?.product_syoken_num_upper == '32' ||
          user?.product_syoken_num_upper == '032' ||
          user?.product_syoken_num_upper == '075' ||
          user?.product_syoken_num_upper == '75' ||
          user?.product_syoken_num_upper == '134' ||
          user?.product_syoken_num_upper == '155' ||
          user?.product_syoken_num_upper == '215' ||
          user?.product_syoken_num_upper == '073' ||
          user?.product_syoken_num_upper == '73' ||
          user?.product_syoken_num_upper == '134' ||
          user?.product_syoken_num_upper == '155' ||
          user?.product_syoken_num_upper == '215' ||
          user?.product_syoken_num_upper == '211' ||
          (user?.product_syoken_num_upper == '223' &&
            user?.product_name.includes('目標値到達後')) ||
          (user?.product_syoken_num_upper == '225' &&
            !user?.product_name?.includes('ハイブリッドアセットライフ')) ||
          user?.product_syoken_num_upper == '518') && (
          <div className="flex justify-between w-full mt-8 px-6">
            <p className="font-bold text-base">
              ご資金が必要な場合などには、次のような方法もあります
            </p>
            <Image
              onClick={() => {
                speak('ご資金が必要な場合などには、次のような方法もあります');
              }}
              className="ml-5 cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        )}

        {user?.product_syoken_num_upper == '518' ||
        (user?.product_syoken_num_upper == '225' &&
          user?.product_name?.includes('ハイブリッドアセットライフ') &&
          user?.product_name?.includes('HA型')) ||
        (user?.product_syoken_num_upper == '225' &&
          user?.product_name?.includes('ハイブリッドアセットライフ') &&
          user?.product_name?.includes('SO型')) ? (
          <>
            <div className="flex justify-between w-full mt-5 px-6">
              <p className="font-bold text-sm">積立金額の減額</p>
              <Image
                onClick={() => {
                  if (user?.product_syoken_num_upper == '518') {
                    speak(
                      `積立金額の減額 ・ご契約は、全部を解約されなくても、一部だけを解約することができます。(積立金額の減額) 積立金額を減額する場合には、積立金額と同じ割合で基本保険金額および各特別勘定の積立金額も減額されるものとします。 ・死亡保険金最低保証特約を付加している場合、最低保証金額は減額される金額と同額が減額されます。 ただし、減額後の最低保証金額が負の値となる場合には、最低保証金額はゼロとします。 ・カイヤクハライモドシキンガク、減額日における減額対象となる積立金額から解約控除額を差し引いた金額が支払われます。 ・減額日が特別勘定への繰入日前のカイヤクハライモドシキンガク、減額する基本保険金額相当額が支払われます。`
                    );
                  } else {
                    speak(
                      `積立金額の減額 ・ご契約は、全部を解約されなくても、一部だけを解約することができます。(積立金額の減額) 積立金額を減額する場合には、積立金額と同じ割合で基本保険金額および各特別勘定の積立金額も減額されるものとします。 ・カイヤクハライモドシキンガクワ、減額日における減額対象となる積立金額から解約控除額を差し引いた金額が支払われます。 ・減額日が特別勘定への繰入日前のカイヤクハライモドシキンガクワ、減額する基本保険金額相当額が支払われます。・契約日からの経過年数が10年未満で減額された場合の解約控除額ワ、「積立金額の減額部分に対応する基本保険金額に解約控除率を乗じた金額となります。（解約控除率ワ「ご契約のしおり・約款」をご確認ください。）`
                    );
                  }
                }}
                className="ml-5 cursor-pointer"
                src={Volume}
                alt="icon volume"
              />
            </div>
            <div className="flex justify-between w-full mt-5 px-6">
              <div>
                <p className="text-sm mr-10">
                  ・ご契約は、全部を解約されなくても、一部だけを解約することができます。(積立金額の減額)
                </p>
                <p className="text-sm mr-10 mt-2">
                  積立金額を減額する場合には、積立金額と同じ割合で基本保険金額および各特別勘定の積立金額も減額されるものとします。
                </p>
                {user?.product_syoken_num_upper == '518' && (
                  <>
                    <p className="text-sm mr-10 mt-2">
                      ・死亡保険金最低保証特約を付加している場合、最低保証金額は減額される金額と同額が減額されます。
                    </p>
                    <p className="text-sm mr-10 mt-2">
                      ただし、減額後の最低保証金額が負の値となる場合には、最低保証金額はゼロとします。
                    </p>
                  </>
                )}
                <p className="text-sm mr-10 mt-2">
                  ・解約払戻金額は、減額日における減額対象となる積立金額から解約控除額を差し引いた金額が支払われます。
                </p>
                <p className="text-sm mr-10 mt-2">
                  ・減額日が特別勘定への繰入日前の解約払戻金額は、減額する基本保険金額相当額が支払われます。
                </p>
                {user?.product_syoken_num_upper == '225' && (
                  <p className="text-sm mr-10 mt-2">
                    ・契約日からの経過年数が10年未満で減額された場合の解約控除額は、「積立金額の減額部分に対応する基本保険金額に解約控除率を乗じた金額となります。（解約控除率は「ご契約のしおり・約款」をご確認ください。）
                  </p>
                )}
              </div>
            </div>
          </>
        ) : (
          ''
        )}

        {user?.product_syoken_num_upper == '518' ||
        (user?.product_syoken_num_upper == '225' &&
          user?.product_name?.includes('ハイブリッドアセットライフ') &&
          user?.product_name?.includes('HA型')) ||
        (user?.product_syoken_num_upper == '225' &&
          user?.product_name?.includes('ハイブリッドアセットライフ') &&
          user?.product_name?.includes('SO型')) ? (
          <div className="flex justify-between w-full mt-8 px-6">
            <p className="font-bold text-base">
              運用成果を確定させたい方には、次のような方法もあります
            </p>
            <Image
              onClick={() => {
                speak(
                  '運用成果を確定させたいカタには、次のようなホウホウもあります'
                );
              }}
              className="ml-5 cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        ) : (
          ''
        )}

        {user?.product_syoken_num_upper == '518' ||
        (user?.product_syoken_num_upper == '225' &&
          user?.product_name?.includes('ハイブリッドアセットライフ') &&
          user?.product_name?.includes('HA型')) ||
        (user?.product_syoken_num_upper == '225' &&
          user?.product_name?.includes('ハイブリッドアセットライフ') &&
          user?.product_name?.includes('SO型')) ? (
          <>
            <div className="flex justify-between w-full mt-5 px-6">
              <p className="font-bold text-sm">終身保険移行特約の付加</p>
              <Image
                onClick={() => {
                  speak(
                    '終身保険移行特約の付加 ・終身保険移行特約を付加し、終身保険に移行した場合、特別勘定から一般勘定に移行されます。 ・一般勘定に移行された場合、死亡保険金額ワ、移行日の前日におけるカイヤクハライモドシキンガクを基準として、終身保険に移行した日における当社の定める率を適用した金額となります。・カイヤクハライモドシキンガクワ、移行日の前日におけるカイヤクハライモドシキンガクを基準として、終身保険に移行した日からの経過年月数により計算された金額となります。'
                  );
                }}
                className="ml-5 cursor-pointer"
                src={Volume}
                alt="icon volume"
              />
            </div>
            <div className="flex justify-between w-full mt-5 px-6">
              <div>
                <p className="text-sm mr-10">
                  ・終身保険移行特約を付加し、終身保険に移行した場合、特別勘定から一般勘定に移行されます。
                </p>
                <p className="text-sm mr-10 mt-2">
                  ・一般勘定に移行された場合、死亡保険金額は、移行日の前日における解約払戻金額を基準として、終身保険に移行した日における当社の定める率を適用した金額となります。
                </p>
                <p className="text-sm mr-10 mt-2">
                  ・解約払戻金額は、移行日の前日における解約払戻金額を基準として、終身保険に移行した日からの経過年月数により計算された金額となります。
                </p>
              </div>
            </div>
          </>
        ) : (
          ''
        )}

        {(user?.product_syoken_num_upper == '033' ||
          user?.product_syoken_num_upper == '33' ||
          user?.product_syoken_num_upper == '85' ||
          user?.product_syoken_num_upper == '085' ||
          user?.product_syoken_num_upper == '144' ||
          user?.product_syoken_num_upper == '165' ||
          user?.product_syoken_num_upper == '219' ||
          user?.product_syoken_num_upper == '032' ||
          user?.product_syoken_num_upper == '32' ||
          user?.product_syoken_num_upper == '75' ||
          user?.product_syoken_num_upper == '075' ||
          user?.product_syoken_num_upper == '134' ||
          user?.product_syoken_num_upper == '134' ||
          user?.product_syoken_num_upper == '155' ||
          user?.product_syoken_num_upper == '215' ||
          user?.product_syoken_num_upper == '134') && (
          <>
            <div className="flex justify-between w-full mt-5 px-6">
              <p className="font-bold text-sm">確定保険金額の払出</p>
              <Image
                onClick={() => {
                  if (user?.product_name.includes('目標値到達後')) {
                    speak(
                      '確定保険金額の払出 確定保険金額がある場合、確定保険金額をいつでも払い出すことができます。ただし、確定保険金額の一部を払い出すこと（金額の指定）はできません。確定保険金額の払出をご希望される場合には、当社お客さまサービスセンターまでご連絡ください。'
                    );
                  } else {
                    speak(
                      '確定保険金額の払出 確定保険金額がある場合、確定保険金額をいつでも払い出すことができます。ただし、確定保険金額の一部を払い出すこと（金額の指定）はできません。払出に関してご不明な点がございましたら、当社お客さまサービスセンターまでご連絡ください。'
                    );
                  }
                }}
                className="ml-5 cursor-pointer"
                src={Volume}
                alt="icon volume"
              />
            </div>
            <div className="flex justify-between w-full mt-5 px-6">
              <p className="text-sm mr-10">
                確定保険金額がある場合、確定保険金額をいつでも払い出すことができます。ただし、確定保険金額の一部を払い出すこと（金額の指定）はできません。
                <br />
                {user?.product_name.includes('目標値到達後')
                  ? '※確定保険金額の払出をご希望される場合には、当社お客さまサービスセンターまでご連絡ください。'
                  : '※払出に関してご不明な点がございましたら、当社お客さまサービスセンターまでご連絡ください。'}
              </p>
            </div>
          </>
        )}

        {(user?.product_syoken_num_upper == '022' ||
          user?.product_syoken_num_upper == '22') && (
          <>
            <div className="flex justify-between w-full mt-5 px-6">
              <p className="font-bold text-sm">増加保険金額の引き出し</p>
              <Image
                onClick={() => {
                  speak(
                    '増加保険金額の引き出し 増加保険金額がある場合、増加保険金額をいつでも引き出すことができます。ただし、増加保険金額の一部を引き出すこと（金額の指定）はできません。'
                  );
                }}
                className="ml-5 cursor-pointer"
                src={Volume}
                alt="icon volume"
              />
            </div>

            <div className="flex justify-between w-full mt-5 px-6">
              <p className="text-sm mr-10">
                増加保険金額がある場合、増加保険金額をいつでも引き出すことができます。ただし、増加保険金額の一部を引き出すこと（金額の指定）はできません。
              </p>
            </div>
          </>
        )}

        {(user?.product_syoken_num_upper == '022' ||
          user?.product_syoken_num_upper == '22' ||
          user?.product_syoken_num_upper == '033' ||
          user?.product_syoken_num_upper == '33' ||
          user?.product_syoken_num_upper == '85' ||
          user?.product_syoken_num_upper == '085' ||
          user?.product_syoken_num_upper == '144' ||
          user?.product_syoken_num_upper == '165' ||
          user?.product_syoken_num_upper == '219' ||
          user?.product_syoken_num_upper == '032' ||
          user?.product_syoken_num_upper == '32' ||
          user?.product_syoken_num_upper == '075' ||
          user?.product_syoken_num_upper == '75' ||
          user?.product_syoken_num_upper == '134' ||
          user?.product_syoken_num_upper == '134' ||
          user?.product_syoken_num_upper == '155' ||
          user?.product_syoken_num_upper == '215' ||
          user?.product_syoken_num_upper == '134') && (
          <>
            <div className="flex justify-between w-full mt-5 px-6">
              <p className="font-bold text-sm">基本保険金額の減額</p>
              <Image
                onClick={() => {
                  speak(
                    '基本保険金額の減額 ご契約は、全部を解約されなくても、一部だけを解約することができます。 基本保険金額の減額をご希望される場合には、当社お客さまサービスセンターまでご連絡ください。'
                  );
                }}
                className="ml-5 cursor-pointer"
                src={Volume}
                alt="icon volume"
              />
            </div>

            <div className="flex justify-between w-full mt-5 px-6">
              <p className="text-sm mr-10">
                ご契約は、全部を解約されなくても、一部だけを解約することができます。
                <br />
                ※基本保険金額の減額をご希望される場合には、当社お客さまサービスセンターまでご連絡ください。
              </p>
            </div>
          </>
        )}

        {((user?.product_syoken_num_upper == '223' &&
          user?.product_name.includes('目標値到達後')) ||
          user?.product_syoken_num_upper == '211') && (
          <>
            <div className="flex justify-between w-full mt-5 px-6">
              <p className="font-bold text-sm">基本保険金額の減額</p>
              <Image
                onClick={() => {
                  speak(
                    '基本保険金額の減額 ご契約は、全部を解約されなくても、一部だけを解約（減額）することができます。 基本保険金額の減額をご希望される場合には、当社お客さまサービスセンターまでご連絡ください。'
                  );
                }}
                className="ml-5 cursor-pointer"
                src={Volume}
                alt="icon volume"
              />
            </div>

            <div className="flex justify-between w-full mt-5 px-6">
              <p className="text-sm mr-10">
                ご契約は、全部を解約されなくても、一部だけを解約（減額）することができます。
                <br />
                ※基本保険金額の減額をご希望される場合には、当社お客さまサービスセンターまでご連絡ください。
              </p>
            </div>
          </>
        )}

        {(user?.product_syoken_num_upper == '073' ||
          user?.product_syoken_num_upper == '73') && (
          <>
            <div className="flex justify-between w-full mt-5 px-6">
              <p className="font-bold text-sm">基本保険金額の減額</p>
              <Image
                onClick={() => {
                  if (user?.product_chouhyou_code == '001D07') {
                    speak(
                      '基本保険金額の減額 ご契約は全部を解約されなくても、一部だけを解約することもできます。（基本保険金額の減額）この場合、当社が減額請求書などの請求を受け付けた日の基本保険金額の減額部分に相当する金額がカイヤクハライモドシキンガクとして支払われます。基本保険金額の減額をご希望される場合には、当社お客さまサービスセンターまでご連絡ください。'
                    );
                  } else {
                    speak(
                      '基本保険金額の減額 ご契約は全部を解約されなくても、一部だけを解約することもできます。（基本保険金額の減額）基本保険金額の減額をご希望される場合には、当社お客さまサービスセンターまでご連絡ください。'
                    );
                  }
                }}
                className="ml-5 cursor-pointer"
                src={Volume}
                alt="icon volume"
              />
            </div>

            <div className="flex justify-between w-full mt-5 px-6">
              <div>
                <p className="text-sm mr-10">
                  ご契約は全部を解約されなくても、一部だけを解約することもできます。（基本保険金額の減額）
                </p>
                {user?.product_chouhyou_code == '001D01' ? (
                  <p className="text-sm mr-10 mt-2">
                    ※基本保険金額の減額をご希望される場合には、当社お客さまサービスセンターまでご連絡ください。
                  </p>
                ) : (
                  <p className="text-sm mr-10 mt-2">
                    この場合、当社が減額請求書などの請求を受け付けた日の基本保険金額の減額部分に相当する金額が解約払戻金額として支払われます。
                    <br />
                    ※基本保険金額の減額をご希望される場合には、当社お客さまサービスセンターまでご連絡ください。
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {((user?.product_syoken_num_upper == '223' &&
          user?.product_name.includes('目標値到達後')) ||
          user?.product_syoken_num_upper == '211' ||
          user?.product_syoken_num_upper == '73' ||
          user?.product_syoken_num_upper == '073' ||
          user?.product_syoken_num_upper == '022' ||
          user?.product_syoken_num_upper == '22' ||
          user?.product_syoken_num_upper == '033' ||
          user?.product_syoken_num_upper == '33' ||
          user?.product_syoken_num_upper == '085' ||
          user?.product_syoken_num_upper == '85' ||
          user?.product_syoken_num_upper == '144' ||
          user?.product_syoken_num_upper == '165' ||
          user?.product_syoken_num_upper == '219' ||
          user?.product_syoken_num_upper == '032' ||
          user?.product_syoken_num_upper == '32' ||
          user?.product_syoken_num_upper == '075' ||
          user?.product_syoken_num_upper == '75' ||
          user?.product_syoken_num_upper == '155' ||
          user?.product_syoken_num_upper == '215' ||
          user?.product_syoken_num_upper == '134') && (
          <>
            <div className="flex justify-between w-full mt-10 px-6">
              <p className="font-bold text-base">税金のお取扱いについて</p>
              <Image
                onClick={() => {
                  speak(
                    '税金のお取扱いについて 解約に際してお受取りになるカイヤクハライモドシキンガクに関しましては、所得税等の課税対象となります。個別の税務の詳細については、お近くの税務署にご確認ください。 各種お取扱いにつきまして、詳しくは「ご契約のしおり・約款」でご確認ください。'
                  );
                }}
                className="ml-5 cursor-pointer"
                src={Volume}
                alt="icon volume"
              />
            </div>

            <div className="flex justify-between w-full mt-5 px-6">
              <div>
                <p className="text-sm mr-10">
                  解約に際してお受取りになる解約払戻金額に関しましては、所得税等の課税対象となります。個別の税務の詳細については、お近くの税務署にご確認ください。
                </p>
                <p className="text-sm mr-10 mt-2">
                  ※各種お取扱いにつきまして、詳しくは「ご契約のしおり・約款」でご確認ください。
                </p>
              </div>
            </div>
          </>
        )}

        {(user?.product_syoken_num_upper == '518' ||
          user?.product_syoken_num_upper == '225') && (
          <>
            <div className="flex justify-between w-full mt-10 px-6">
              <p className="font-bold text-base">税金のお取扱いについて</p>
              <Image
                onClick={() => {
                  const text =
                    (user?.product_name?.includes(
                      'ハイブリッドアセットライフ'
                    ) &&
                      user?.product_name?.includes('HA型')) ||
                    (user?.product_name?.includes(
                      'ハイブリッドアセットライフ'
                    ) &&
                      user?.product_name?.includes('SO型'))
                      ? 'カイヤクハライモドシキンと払込保険料残額 との差額（解約差益）に対し、所得税（一時所得）および住民税が課税されます。払込保険料残額とは一時払保険料から必要経費の合計額を差し引いた金額（負の場合はゼロ）のことをいいます。'
                      : 'カイヤクハライモドシキンと払込保険料残額 との差額（解約差益）が、所得税（一時所得）および住民税、または源泉分離課税の対象となります。払込保険料残額とは一時払保険料から、必要経費の合計額を差し引いた金額（負の場合はゼロ）のことをいいます。';

                  speak(
                    `税金のお取扱いについて ${text} 税金のお取扱いの詳細に関しましては、所轄の税務署等にお問い合わせください。 各種お取扱いにつきまして、詳しくは「ご契約のしおり・約款」でご確認ください。`
                  );
                }}
                className="ml-5 cursor-pointer"
                src={Volume}
                alt="icon volume"
              />
            </div>

            <div className="flex justify-between w-full mt-5 px-6">
              <div>
                {(user?.product_name?.includes('ハイブリッドアセットライフ') &&
                  user?.product_name?.includes('HA型')) ||
                (user?.product_name?.includes('ハイブリッドアセットライフ') &&
                  user?.product_name?.includes('SO型')) ? (
                  <>
                    <p className="text-sm mr-10">
                      解約払戻金と払込保険料残額（※）との差額（解約差益）に対し、所得税（一時所得）および住民税が課税されます。
                    </p>
                    <p className="text-sm mr-10 mt-2">
                      ※払込保険料残額とは一時払保険料から必要経費の合計額を差し引いた金額（負の場合はゼロ）のことをいいます。
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm mr-10">
                      ・解約払戻金と払込保険料残額（※）との差額（解約差益）が、所得税（一時所得）および住民税、または源泉分離課税の対象となります。
                    </p>
                    <p className="text-sm mr-10 mt-2">
                      ※払込保険料残額とは一時払保険料から、必要経費の合計額を差し引いた金額（負の場合はゼロ）のことをいいます。
                    </p>
                  </>
                )}
                <p className="text-sm mr-10 mt-2">
                  税金のお取扱いの詳細に関しましては、所轄の税務署等にお問い合わせください。
                </p>
                <p className="text-sm mr-10 mt-2">
                  ※各種お取扱いにつきまして、詳しくは「ご契約のしおり・約款」でご確認ください。
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="w-full py-2 px-6">
        <ButtonBlue
          loading={loading}
          name="確認しました"
          onClick={() => {
            setLoading(true);
            setTimeout(() => {
              router.push('/personal-info');
            }, 500);
          }}
        />
      </div>
      <Footer />
    </main>
  );
}
