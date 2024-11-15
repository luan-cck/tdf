'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getVoices, speakText, stopSpeaking } from '@/utils/speak';
import ButtonBlue from '@/components/ButtonBlue';
import ButtonSmall from '@/components/ButtonSmall';

import Logo from '@/images/logo.svg';
import ImageIcon from '@/images/image-icon.svg';
import ImagePreview from '@/images/image-preview.svg';
import ArrowIcon from '@/images/aroe-icon.svg';
import axios from '@/utils/API';
import Loading from '@/components/Loading';

export default function ConfirmCancelContract() {
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [previewImage, setPreviewImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingSmall, setLoadingSmall] = useState(false);
  const [samePerson, setSamePerson] = useState(null);
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});

  const router = useRouter();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const localToken = localStorage.getItem('token');
    const person = localStorage.getItem('samePerson');
    setUser(userInfo);
    setToken(localToken);
    setSamePerson(person);

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

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/request-form', user, {
        headers: {
          token: token,
        },
      });

      if (response.status === 200) {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('checkAge');
        localStorage.removeItem('samePerson');
        localStorage.removeItem('jpy');
        localStorage.removeItem('birthday');
        localStorage.removeItem('token');
        localStorage.removeItem('skipBankInfo');
        localStorage.removeItem('skipParentIndent');
        setLoading(false);
        router.push('/cancel-contract-success');
      }
    } catch (error) {
      setLoading(false);
      alert(error?.response?.data?.msg);
    }
  };

  const handlePreviewImage = (image) => {
    setImagePreview(image);
    setPreviewImage(true);
  };

  return (
    <main
      className={`flex flex-col min-h-screen items-center ${
        previewImage ? '' : 'h-dvh'
      }`}
    >
      {previewImage ? (
        <div className="w-full">
          <div className="h-[60px] flex items-center px-6 shadow-xml">
            <Image width={178} src={Logo} alt="Logo" />
          </div>
        </div>
      ) : (
        <>
          <Header
            title={
              <>
                入力内容をご確認の上、送信ボタンをタップしてください。
                <br />
                なお、送信後のお申出取消は承っておりません。
              </>
            }
            volumeWhite={false}
            titleColor="primary"
            bg="white"
            textAlign="start"
            voice={selectedVoice}
            voiceTitle={`入力内容をご確認の上、送信ボタンをタップしてください。
              なお、送信後のお申出取消は承っておりません。`}
          />
        </>
      )}

      {previewImage ? (
        <div className="w-full px-6 border-t border-light py-5 h-full overflow-scroll">
          <>
            {imagePreview ? (
              <img src={imagePreview} alt="Image preview" />
            ) : (
              <Image src={ImagePreview} alt="Image preview" />
            )}
          </>
        </div>
      ) : (
        <div className="w-full px-9 border-t border-light h-full pt-5 pb-24 mb-40 overflow-scroll">
          <div>
            <h3 className="text-primary font-bold mb-1">証券番号</h3>
            <h3 className="font-bold tracking-widest">{user?.policy_number}</h3>
          </div>

          <div className="mt-4">
            <h3 className="text-primary font-bold mb-1">ご契約者さまの氏名</h3>
            <h3 className="font-bold tracking-widest">
              {user?.contractor_name}
            </h3>
          </div>

          {user?.customer_name && (
            <div className="mt-4">
              <h3 className="text-primary font-bold mb-1">
                ご契約者さまの新氏名
              </h3>
              <h3 className="font-bold tracking-widest">
                {user?.customer_name}
              </h3>
            </div>
          )}

          <div className="mt-4">
            <h3 className="text-primary font-bold mb-1">ご契約者さまの年齢</h3>
            <h3 className="font-bold tracking-widest">
              {user?.customer_over_18 ? '18歳以上' : '18歳未満'}
            </h3>
          </div>

          {samePerson && (
            <div className="mt-4">
              <h3 className="text-primary font-bold mb-1">ご契約の形態</h3>
              <h3 className="font-bold tracking-widest">
                {samePerson === 'samePerson'
                  ? '被保険者さまと同一'
                  : '被保険者さまが異なる'}
              </h3>
            </div>
          )}

          <div className="mt-4">
            <h3 className="font-bold">ご契約者さまの本人確認書類</h3>
            <div
              className="flex items-center justify-between border-2 border-primary px-4 h-[50px] rounded-md cursor-pointer"
              onClick={() => {
                handlePreviewImage(user?.document_identity_document_front);
              }}
            >
              <Image className="" src={ImageIcon} alt="image icon" />

              <h2 className="text-primary font-bold">画像を確認する(表面)</h2>

              <Image className="" src={ArrowIcon} alt="image icon" />
            </div>

            {user?.document_identity_document_back && (
              <div
                className="flex items-center justify-between border-2 border-primary px-4 h-[50px] rounded-md mt-1 cursor-pointer"
                onClick={() => {
                  handlePreviewImage(user?.document_identity_document_back);
                }}
              >
                <Image className="" src={ImageIcon} alt="image icon" />

                <h2 className="text-primary font-bold">画像を確認する(裏面)</h2>

                <Image className="" src={ArrowIcon} alt="image icon" />
              </div>
            )}
          </div>

          {user?.document_contract_owner_identity_document_front && (
            <div className="mt-4">
              <h3 className="font-bold">被保険者さまの本人確認書類</h3>
              <div
                className="flex items-center justify-between border-2 border-primary px-4 h-[50px] rounded-md cursor-pointer"
                onClick={() => {
                  handlePreviewImage(
                    user?.document_contract_owner_identity_document_front
                  );
                }}
              >
                <Image className="" src={ImageIcon} alt="image icon" />

                <h2 className="text-primary font-bold">画像を確認する(表面)</h2>

                <Image className="" src={ArrowIcon} alt="image icon" />
              </div>

              {user?.document_contract_owner_identity_document_back && (
                <div
                  className="flex items-center justify-between border-2 border-primary px-4 h-[50px] rounded-md mt-1 cursor-pointer"
                  onClick={() => {
                    handlePreviewImage(
                      user?.document_contract_owner_identity_document_back
                    );
                  }}
                >
                  <Image className="" src={ImageIcon} alt="image icon" />

                  <h2 className="text-primary font-bold">
                    画像を確認する(裏面)
                  </h2>

                  <Image className="" src={ArrowIcon} alt="image icon" />
                </div>
              )}
            </div>
          )}

          {user?.document_parent_identity_document_front && (
            <div className="mt-4">
              <h3 className="font-bold">親権者さまの本人確認書類</h3>
              <div
                className="flex items-center justify-between border-2 border-primary px-4 h-[50px] rounded-md cursor-pointer"
                onClick={() => {
                  handlePreviewImage(
                    user?.document_parent_identity_document_front
                  );
                }}
              >
                <Image className="" src={ImageIcon} alt="image icon" />

                <h2 className="text-primary font-bold">画像を確認する(表面)</h2>

                <Image className="" src={ArrowIcon} alt="image icon" />
              </div>

              {user?.document_parent_identity_document_back && (
                <div
                  className="flex items-center justify-between border-2 border-primary px-4 h-[50px] rounded-md mt-1 cursor-pointer"
                  onClick={() => {
                    handlePreviewImage(
                      user?.document_parent_identity_document_back
                    );
                  }}
                >
                  <Image className="" src={ImageIcon} alt="image icon" />

                  <h2 className="text-primary font-bold">
                    画像を確認する(裏面)
                  </h2>

                  <Image className="" src={ArrowIcon} alt="image icon" />
                </div>
              )}
            </div>
          )}

          {user?.customer_related_name && (
            <div className="mt-4">
              <h3 className="text-primary font-bold mb-1">親権者さまの氏名</h3>
              <h3 className="font-bold tracking-widest">
                {user?.customer_related_name}
              </h3>
            </div>
          )}

          {user?.customer_relationship_type && (
            <div className="mt-4">
              <h3 className="text-primary font-bold mb-1">続柄</h3>
              <h3 className="font-bold tracking-widest">
                {user?.customer_relationship_type}
              </h3>
            </div>
          )}

          {user?.bank_currency && (
            <div className="mt-4">
              <h3 className="text-primary font-bold mb-1">支払通貨</h3>
              <h3 className="font-bold tracking-widest">
                {user?.bank_currency === 'usd_usa'
                  ? '米ドル'
                  : user?.bank_currency === 'usd_aus'
                  ? '豪ドル'
                  : user?.bank_currency === 'eur'
                  ? 'ユーロ'
                  : '円'}
              </h3>
            </div>
          )}

          {user?.bank_name && (
            <div className="mt-4">
              <h3 className="text-primary font-bold mb-1">金融機関名</h3>
              <h3 className="font-bold">{user?.bank_name}</h3>
            </div>
          )}

          {user?.bank_branch_name && (
            <div className="mt-4">
              <h3 className="text-primary font-bold mb-1">支店名</h3>
              <h3 className="font-bold">{user?.bank_branch_name}</h3>
            </div>
          )}

          {user?.bank_account_type && (
            <div className="mt-4">
              <h3 className="text-primary font-bold mb-1">種目</h3>
              <h3 className="font-bold">
                {user?.bank_account_type === 'normal'
                  ? '普通（総合）'
                  : user?.bank_account_type === 'temporary'
                  ? '当座'
                  : user?.bank_account_type === 'saving' && '貯蓄'}
              </h3>
            </div>
          )}

          {user?.bank_account_number && (
            <div className="mt-4">
              <h3 className="text-primary font-bold mb-1">口座番号</h3>
              <h3 className="font-bold tracking-widest">
                {user?.bank_account_number}
              </h3>
            </div>
          )}

          {user?.bank_account_name ? (
            <div className="mt-4">
              <h3 className="text-primary font-bold mb-1">口座名義人</h3>
              <h3 className="font-bold">{user?.bank_account_name}</h3>
            </div>
          ) : (
            <div className="mt-4">
              <h3 className="text-primary font-bold mb-1">金融機関名</h3>
              <h3 className="font-bold">※保険料振替口座を指定する</h3>
            </div>
          )}

          {user?.cancellation_reason != '資金が必要になった' &&
          user?.cancellation_reason != '他社の保険に入った' &&
          user?.cancellation_reason !=
            'T&Dフィナンシャル生命の他の保険に変更した（する）ため' &&
          user?.cancellation_reason != '運用成果の確保' &&
          user?.cancellation_reason !=
            '保険料払込困難（一時払いの契約を除く）' &&
          user?.cancellation_reason != '回答しない' ? (
            <div className="mt-4">
              <h3 className="text-primary font-bold mb-1">解約理由</h3>
              <h3 className="font-bold">その他</h3>
            </div>
          ) : (
            <div className="mt-4">
              <h3 className="text-primary font-bold mb-1">解約理由</h3>
              <h3 className="font-bold">{user?.cancellation_reason}</h3>
            </div>
          )}

          {user?.cancellation_reason != '資金が必要になった' &&
            user?.cancellation_reason != '他社の保険に入った' &&
            user?.cancellation_reason !=
              'T&Dフィナンシャル生命の他の保険に変更した（する）ため' &&
            user?.cancellation_reason != '運用成果の確保' &&
            user?.cancellation_reason !=
              '保険料払込困難（一時払いの契約を除く）' &&
            user?.cancellation_reason != '回答しない' && (
              <div className="mt-4">
                <h3 className="text-primary font-bold mb-1">
                  解約理由（その他）
                </h3>
                <h3 className="font-bold">{user?.cancellation_reason}</h3>
              </div>
            )}
        </div>
      )}

      {previewImage ? (
        <div className="w-full py-6 px-6 fixed bottom-0">
          <ButtonBlue
            name="戻る"
            onClick={() => {
              setPreviewImage(false);
            }}
          />
        </div>
      ) : (
        <div className="fixed bottom-0 bg-white">
          <div className="w-full pt-2 px-6">
            <ButtonBlue name="送信" onClick={handleSubmit} />
          </div>
          <div className="flex justify-center">
            <ButtonSmall
              loading={loadingSmall}
              name="前に戻る"
              onClick={() => {
                setLoadingSmall(true);
                setTimeout(() => {
                  router.push('/select-reason-cancel');
                }, 500);
              }}
            />
          </div>
          <Footer />
        </div>
      )}

      <Loading show={loading} />
    </main>
  );
}
