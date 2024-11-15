'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import Eyes from '@/images/eyes.svg';
import Header from '@/components/Header';
import Volume from '@/images/volume-circle.svg';
import ButtonBlue from '@/components/ButtonBlue';
import { getVoices, speakText, stopSpeaking } from '@/utils/speak';

export default function PersonalInfo() {
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [end, setEnd] = useState(true);

  const router = useRouter();

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

  const handleSubmit = () => {
    setLoading(true);
    const prefix = '生涯プレミアム';
    const productName = user?.product_name ? user?.product_name : '';
    if (productName.startsWith(prefix)) {
      setTimeout(() => {
        router.push('/select-appropriate');
      }, 500);
    } else {
      setTimeout(() => {
        router.push('/upload-file');
      }, 500);
    }
  };

  const handleScroll = (e) => {
    const scroll = e.target.offsetHeight + e.target.scrollTop;
    const height = e.target.scrollHeight - 1;
    if (scroll >= height) {
      setEnd(false);
    }
  };

  return (
    <div className="flex h-dvh flex-col items-center pb-4">
      <Header
        title="個人情報のお取扱いについて"
        volumeWhite={true}
        titleColor="white"
        textAlign="center"
        voice={selectedVoice}
      />

      <div className="px-6 overflow-y-scroll h-full" onScroll={handleScroll}>
        <div className="flex mt-4">
          <div className="w-[88%]">
            <h2 className="font-bold text-sm">
              1.当社がお客さまから取得する個人情報の利用目的
            </h2>
          </div>
          <div className="shrink-0 w-[12%]">
            <Image
              onClick={() => {
                speak('1.当社がお客さまから取得する個人情報の利用目的');
              }}
              className="ml-auto cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        </div>

        <div className="flex mt-2">
          <div className="w-[88%]">
            <p className="text-sm">
              ●
              当社は、お客さまから取得する個人情報をつぎの目的のために業務上必要な範囲で利用いたします。
            </p>
          </div>
          <div className="shrink-0 w-[12%]"></div>
        </div>

        <div className="flex mt-2">
          <div className="w-[88%]">
            <p className="text-sm">
              ①
              各種保険契約のお引受け、ご継続・維持管理、保険金・給付金などのお支払い
            </p>
            <p className="text-sm mt-2">
              ②
              関連会社・提携会社を含む各種商品・サービスのご案内・提供(*)、ご契約の維持管理
            </p>
            <p className="text-sm mt-2">
              ③ 当社業務に関する情報提供・運営管理、商品・サービスの充実
            </p>
            <p className="text-sm mt-2">④ その他保険に関連・付随する業務(*)</p>
            <p className="text-sm mt-2">
              (*)お客さまの取引履歴やウェブサイトの閲覧履歴を分析して、お客さまのニーズにあった各種商品・サービスに関する広告等の配信等をすることを含みます。
            </p>
          </div>
          <div className="shrink-0 w-[12%]"></div>
        </div>

        <div className="flex mt-2">
          <div className="w-[88%]">
            <p className="text-sm">
              ※ただし、個人番号および特定個人情報については、保険取引に関する支払調書等作成事務に必要な範囲でのみ利用いたします。
            </p>
            <p className="text-sm mt-2">
              ※当社はお客さまから取得した個人情報を、ご契約が締結に至らなかった場合や解約、保険期間満了など保険契約が消滅した後も、各種保険契約のお引受け、取引履歴の確認、各種照会などへの対応、その他保険に関連・付随する業務などのために保持いたします。なお、取得した申込関係書類などについての返却はいたしません。
            </p>
          </div>
          <div className="shrink-0 w-[12%]"></div>
        </div>

        <div className="flex mt-4">
          <div className="w-[88%]">
            <h2 className="font-bold text-sm">
              2.「契約内容登録制度・契約内容照会制度」について
            </h2>
          </div>
          <div className="shrink-0 w-[12%]">
            <Image
              onClick={() => {
                speak('2.「契約内容登録制度・契約内容照会制度」について');
              }}
              className="ml-auto cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        </div>

        <div className="flex mt-2">
          <div className="w-[88%]">
            <p className="text-sm">
              〇
              当社は、一般社団法人生命保険協会、一般社団法人生命保険協会加盟の他の各生命保険会社および全国共済農業協同組合連合会とともに、保険契約もしくは共済契約または特約付加(以下「保険契約等」といいます。)のお引受けの判断あるいは保険金、給付金もしくは共済金等のお支払いの判断の参考とすることを目的として、「契約内容登録制度」(全国共済棗業協同組合連合会との間では「契約内容照会制度」といいます。)に基づき、当社の保険契約等に関する登録事項を共同して利用しております。
            </p>
          </div>
          <div className="shrink-0 w-[12%]"></div>
        </div>

        <div className="flex mt-4">
          <div className="w-[88%]">
            <h2 className="font-bold text-sm">
              3.「支払査定時照会制度」について
            </h2>
          </div>
          <div className="shrink-0 w-[12%]">
            <Image
              onClick={() => {
                speak('3.「支払査定時照会制度」について');
              }}
              className="ml-auto cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        </div>

        <div className="flex mt-2">
          <div className="w-[88%]">
            <p className="text-sm">
              〇
              当社は、一般社団法人生命保険協会、一般社団法人生命保険協会加盟の各生命保険会社、全国共済農業協同組合連合会、全国労働者共済生活協同組合連合会および日本コープ共済生活協同組合連合会(以下「各生命保険会社など」といいます)とともに、お支払いなどの判断の参考とすることを目的として、「支払査定時照会制度」に基づき、当社を含む各生命保険会社などの保有する保険契約などに関する(1)被保険者の氏名、生年月日、性別、住所(2)保険事故発生日、死亡日、入院日・退院日、対象となる保険事故(照会を受けた日から5年以内)(3)保険種類、契約日、復活日、消滅日、保険契約者の氏名および被保険者との続柄、死亡保険金など受取人の氏名および被保険者との続柄、死亡保険金額、給付金日額、各特約内容、保険料および払込方法などを共同して利用しております。
            </p>
            <p className="text-sm mt-2">
              詳しくは、一般社団法人生命保険協会のホームページをご覧ください。
            </p>
          </div>
          <div className="shrink-0 w-[12%]"></div>
        </div>

        <div className="flex mt-6">
          <div className="w-[88%]">
            <h2 className="font-bold text-sm">
              最新の内容については、当社ホームページ
              <br />
              (https://www.tdf-life.co.jp)をご覧ください。
            </h2>
          </div>
          <div className="shrink-0 w-[12%]"></div>
        </div>

        <div className="flex mt-6">
          <div className="w-[88%]">
            <h2 className="font-bold text-center">お問い合わせ窓口</h2>
          </div>
          <div className="shrink-0 w-[12%]">
            <Image
              onClick={() => {
                speak('お問い合わせ窓口');
              }}
              className="ml-auto cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        </div>

        <div className="flex mt-2">
          <div className="w-[88%]">
            <p className="text-sm">
              ・当社では、
              お客さまの個人情報に関するお問い合わせ窓口を設けています。
              保有個人データの開示・訂正・利用停止などのご請求、その他個人情報に関するご照会先などは、下記「フリーダイヤル」へご連絡ください。
            </p>
          </div>
          <div className="shrink-0 w-[12%]"></div>
        </div>

        <div className="w-[265px] text-center mx-auto border-2 border-primary rounded-2xl h-[135px] flex flex-col justify-center mt-6">
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
      <div className="w-full bottom-6 text-center mt-6">
        <div className="px-6">
          <ButtonBlue
            loading={loading}
            name="同意します"
            onClick={handleSubmit}
            disable={end}
          />
        </div>

        <p className="text-[10px] mt-4">
          Copyright,Ｔ&Ｄ Financial Life Insurance Company. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
