'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import axios from '@/utils/API';
import Header from '@/components/Header';
import Check from '@/images/check-green.svg';
import Volume from '@/images/volume-circle.svg';
import ButtonBlue from '@/components/ButtonBlue';
import IdImage from '@/images/id-image.svg';
import ImageIcon from '@/images/image-icon.svg';
import ArrowIcon from '@/images/aroe-icon.svg';
import { getVoices, speakText, stopSpeaking } from '@/utils/speak';
import ButtonSmall from '@/components/ButtonSmall';
import { convertToJPG } from '@/utils/convertToJpg';
import { compressImage } from '@/utils/compressImage';
import Loading from '@/components/Loading';

export default function UploadFile() {
  const router = useRouter();
  const [isError, setIserror] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedFileFront, setSelectedFileFront] = useState(null);
  const [selectedFileBack, setSelectedFileBack] = useState(null);
  const [checkAge, setCheckAge] = useState(null);
  const [user, setUser] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingSmall, setLoadingSmall] = useState(false);
  const [disable, setDisable] = useState(false);
  const [token, setToken] = useState(null);

  const fileInputRefFront = useRef(null);
  const fileInputRefBack = useRef(null);

  useEffect(() => {
    const tokenItem = localStorage.getItem('token');
    const age = localStorage.getItem('checkAge');
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    setCheckAge(age);
    setUser(userInfo);
    setToken(tokenItem);

    if (userInfo?.document_identity_document_front) {
      setSelectedFileFront(userInfo?.document_identity_document_front);
    }

    if (userInfo?.document_identity_document_back) {
      setSelectedFileBack(userInfo?.document_identity_document_back);
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

  const handleButtonClickFront = () => {
    fileInputRefFront.current.click();
    setIserror(false);
  };

  const handleButtonClickBack = () => {
    fileInputRefBack.current.click();
    setIserror(false);
  };

  const handleFileChangeFront = async (event) => {
    const file = event.target.files[0];

    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        const compressedImage = await compressImage(file);
        const jpgImage = await convertToJPG(compressedImage);
        try {
          setShowModal(true);
          const response = await axios.post(
            '/upload',
            {
              file: jpgImage,
            },
            {
              headers: {
                'content-type': 'multipart/form-data',
                token: token,
              },
            }
          );

          if (response?.status === 200) {
            setShowModal(false);
            setSelectedFileFront(response?.data?.data);
          }
        } catch (error) {
          setShowModal(false);
          alert(error?.response?.data?.msg);
        }
      } else {
        const jpgImage = await convertToJPG(file);

        try {
          setShowModal(true);
          const response = await axios.post(
            '/upload',
            {
              file: jpgImage,
            },
            {
              headers: {
                'content-type': 'multipart/form-data',
                token: token,
              },
            }
          );

          if (response?.status === 200) {
            setShowModal(false);
            setSelectedFileFront(response?.data?.data);
          }
        } catch (error) {
          setShowModal(false);
          alert(error?.response?.data?.msg);
        }
      }
    }
  };

  const handleFileChangeBack = async (event) => {
    const file = event.target.files[0];

    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        const compressedImage = await compressImage(file);
        const jpgImage = await convertToJPG(compressedImage);
        try {
          setShowModal(true);
          const response = await axios.post(
            '/upload',
            {
              file: jpgImage,
            },
            {
              headers: {
                'content-type': 'multipart/form-data',
                token: token,
              },
            }
          );

          if (response?.status === 200) {
            setShowModal(false);
            setSelectedFileBack(response?.data?.data);
          }
        } catch (error) {
          setShowModal(false);
          alert(error?.response?.data?.msg);
        }
      } else {
        const jpgImage = await convertToJPG(file);
        try {
          setShowModal(true);
          const response = await axios.post(
            '/upload',
            {
              file: jpgImage,
            },
            {
              headers: {
                'content-type': 'multipart/form-data',
                token: token,
              },
            }
          );

          if (response?.status === 200) {
            setShowModal(false);
            setSelectedFileBack(response?.data?.data);
          }
        } catch (error) {
          setShowModal(false);
          alert(error?.response?.data?.msg);
        }
      }
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setDisable(true);
    const prefix = '生涯プレミアム';
    const productName = user?.product_name ? user?.product_name : '';
    const samePerson = localStorage.getItem('samePerson');

    if (selectedFileFront) {
      user.document_identity_document_front = selectedFileFront;
    }

    if (selectedFileBack) {
      user.document_identity_document_back = selectedFileBack;
    }

    if (!selectedFileFront) {
      setIserror(true);
      setDisable(false);
      setLoading(false);
    } else if (checkAge === 'under18') {
      if (samePerson === 'samePerson' && productName.startsWith(prefix)) {
        if (user?.document_contract_owner_identity_document_front) {
          user.document_contract_owner_identity_document_front = null;
        }

        if (user?.document_contract_owner_identity_document_back) {
          user.document_contract_owner_identity_document_back = null;
        }

        localStorage.setItem('userInfo', JSON.stringify(user));
        setTimeout(() => {
          router.push('/parental-indent-document');
        }, 500);
      } else if (
        samePerson === 'diffPerson' &&
        productName.startsWith(prefix)
      ) {
        localStorage.setItem('userInfo', JSON.stringify(user));
        setTimeout(() => {
          router.push('/indent-document');
        }, 500);
      } else {
        localStorage.setItem('userInfo', JSON.stringify(user));
        setTimeout(() => {
          router.push('/parental-indent-document');
        }, 500);
      }
    } else {
      const chouhyouCode = user?.product_chouhyou_code;
      switch (chouhyouCode) {
        case '001D01':
          if (samePerson === 'samePerson' && productName.startsWith(prefix)) {
            if (user?.document_contract_owner_identity_document_front) {
              user.document_contract_owner_identity_document_front = null;
            }

            if (user?.document_contract_owner_identity_document_back) {
              user.document_contract_owner_identity_document_back = null;
            }

            if (user?.document_parent_identity_document_front) {
              user.document_parent_identity_document_front = null;
            }

            if (user?.document_parent_identity_document_back) {
              user.document_parent_identity_document_back = null;
            }

            if (user?.customer_related_name) {
              user.customer_related_name = null;
              user.customer_relationship_type = null;
            }

            localStorage.setItem('userInfo', JSON.stringify(user));
            setTimeout(() => {
              router.push('/fill-financial-institution-name');
            }, 500);
          } else if (
            samePerson === 'diffPerson' &&
            productName.startsWith(prefix)
          ) {
            if (user?.document_parent_identity_document_front) {
              user.document_parent_identity_document_front = null;
            }

            if (user?.document_parent_identity_document_back) {
              user.document_parent_identity_document_back = null;
            }

            if (user?.customer_related_name) {
              user.customer_related_name = null;
              user.customer_relationship_type = null;
            }

            localStorage.setItem('userInfo', JSON.stringify(user));
            setTimeout(() => {
              router.push('/indent-document');
            }, 500);
          } else {
            if (user?.document_parent_identity_document_front) {
              user.document_parent_identity_document_front = null;
            }

            if (user?.document_parent_identity_document_back) {
              user.document_parent_identity_document_back = null;
            }

            if (user?.customer_related_name) {
              user.customer_related_name = null;
              user.customer_relationship_type = null;
            }

            localStorage.setItem('userInfo', JSON.stringify(user));
            setTimeout(() => {
              router.push('/fill-financial-institution-name');
            }, 500);
          }
          break;
        case '001D07':
          if (samePerson === 'samePerson' && productName.startsWith(prefix)) {
            if (user?.document_contract_owner_identity_document_front) {
              user.document_contract_owner_identity_document_front = null;
            }

            if (user?.document_contract_owner_identity_document_back) {
              user.document_contract_owner_identity_document_back = null;
            }

            if (user?.document_parent_identity_document_front) {
              user.document_parent_identity_document_front = null;
            }

            if (user?.document_parent_identity_document_back) {
              user.document_parent_identity_document_back = null;
            }

            if (user?.customer_related_name) {
              user.customer_related_name = null;
              user.customer_relationship_type = null;
            }

            localStorage.setItem('userInfo', JSON.stringify(user));
            setTimeout(() => {
              router.push('/select-method-payment');
            }, 500);
          } else if (
            samePerson === 'diffPerson' &&
            productName.startsWith(prefix)
          ) {
            if (user?.document_parent_identity_document_front) {
              user.document_parent_identity_document_front = null;
            }

            if (user?.document_parent_identity_document_back) {
              user.document_parent_identity_document_back = null;
            }

            if (user?.customer_related_name) {
              user.customer_related_name = null;
              user.customer_relationship_type = null;
            }

            localStorage.setItem('userInfo', JSON.stringify(user));
            setTimeout(() => {
              router.push('/indent-document');
            }, 500);
          } else {
            if (user?.document_parent_identity_document_front) {
              user.document_parent_identity_document_front = null;
            }

            if (user?.document_parent_identity_document_back) {
              user.document_parent_identity_document_back = null;
            }

            if (user?.customer_related_name) {
              user.customer_related_name = null;
              user.customer_relationship_type = null;
            }

            localStorage.setItem('userInfo', JSON.stringify(user));
            setTimeout(() => {
              router.push('/select-method-payment');
            }, 500);
          }
          break;
        case '001D09':
          if (samePerson === 'samePerson' && productName.startsWith(prefix)) {
            if (user?.document_contract_owner_identity_document_front) {
              user.document_contract_owner_identity_document_front = null;
            }

            if (user?.document_contract_owner_identity_document_back) {
              user.document_contract_owner_identity_document_back = null;
            }

            if (user?.document_parent_identity_document_front) {
              user.document_parent_identity_document_front = null;
            }

            if (user?.document_parent_identity_document_back) {
              user.document_parent_identity_document_back = null;
            }

            if (user?.customer_related_name) {
              user.customer_related_name = null;
              user.customer_relationship_type = null;
            }

            localStorage.setItem('userInfo', JSON.stringify(user));
            setTimeout(() => {
              router.push('/fill-financial-institution-name');
            }, 500);
          } else if (
            samePerson === 'diffPerson' &&
            productName.startsWith(prefix)
          ) {
            if (user?.document_parent_identity_document_front) {
              user.document_parent_identity_document_front = null;
            }

            if (user?.document_parent_identity_document_back) {
              user.document_parent_identity_document_back = null;
            }

            if (user?.customer_related_name) {
              user.customer_related_name = null;
              user.customer_relationship_type = null;
            }

            localStorage.setItem('userInfo', JSON.stringify(user));
            setTimeout(() => {
              router.push('/indent-document');
            }, 500);
          } else {
            if (user?.document_parent_identity_document_front) {
              user.document_parent_identity_document_front = null;
            }

            if (user?.document_parent_identity_document_back) {
              user.document_parent_identity_document_back = null;
            }

            if (user?.customer_related_name) {
              user.customer_related_name = null;
              user.customer_relationship_type = null;
            }

            localStorage.setItem('userInfo', JSON.stringify(user));
            setTimeout(() => {
              router.push('/fill-financial-institution-name');
            }, 500);
          }
          break;
        default:
          break;
      }
    }
  };
  return (
    <div className="flex h-dvh flex-col items-center pb-2">
      <Header
        title="ご契約者さまの本人確認書類をご提出ください"
        bg="white"
        volumeWhite={false}
        titleColor="primary"
        textAlign="start"
        voice={selectedVoice}
      />

      <div className="px-6 border-t border-light h-full overflow-scroll">
        <div className="flex items-center mt-4 mb-4">
          <div className="w-11/12 mx-auto">
            <div
              onClick={handleButtonClickFront}
              className={`flex items-center justify-between border-2 border-primary px-4 max-[375px]:px-1 h-16 rounded-md cursor-pointer ${
                isError && !selectedFileFront && 'bg-warningInput'
              } ${selectedFileFront && 'bg-sky'}`}
            >
              <div className="flex">
                {selectedFileFront && (
                  <Image src={Check} className="mr-2" alt="icon check" />
                )}
                <Image src={ImageIcon} alt="image icon" />
              </div>

              <h2 className="text-primary font-bold">
                画像ファイルの提出(表面)
              </h2>

              <Image className="" src={ArrowIcon} alt="image icon" />

              <input
                type="file"
                ref={fileInputRefFront}
                hidden
                accept="image/*"
                onChange={handleFileChangeFront}
              />
            </div>
          </div>
        </div>

        <div className="flex mt-6">
          <div className="w-[88%]">
            <h2 className="font-bold">
              以下いずれか一点の公的書類を撮影し画像をご提出ください。健康保険証の場合は以下注意点をご覧の上ご提出ください。当社到達時点で有効であることが必要です。
            </h2>
          </div>
          <div className="shrink-0 w-[12%]">
            <Image
              onClick={() => {
                speak(
                  '以下いずれか一点の公的書類を撮影し画像をご提出ください。健康保険証の場合は以下注意点をご覧の上ご提出ください。当社到達時点で有効であることが必要です。'
                );
              }}
              className="ml-auto cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>
        </div>

        <div className="py-4 px-2 my-4 border-2 border-primary bg-lightOrange">
          <div className="flex items-center w-fit mx-auto">
            <h2 className="font-bold mr-1">《有効な本人確認書類》</h2>
            <Image
              onClick={() => {
                speak('有効な本人確認書類');
              }}
              className="ml-auto cursor-pointer"
              src={Volume}
              alt="icon volume"
            />
          </div>

          <div className="mt-4 mx-2 pb-4 mb-4 border-b border-primary">
            <p className="text-xs">
              <strong className="text-primary text-base mr-2">
                ① 運転免許証
              </strong>
              裏面に現住所がある場合は
            </p>
            <p className="text-xs mt-1">
              <strong className="text-primary text-base mr-2">
                ② 健康保険証
              </strong>
              裏面の撮影も必要です。
            </p>
          </div>

          <div className="flex items-center mx-2">
            <h2 className="text-primary text-xsm mr-2 font-bold shrink-0 text-center">
              <span className="text-base">③</span>マイナンバーカード
              <br />
              (顔写真付き)
            </h2>
            <p className="text-xs">
              通知カードは使用できません。 <br />
              裏面の撮影は不要です。
            </p>
          </div>

          <div className="text-center mt-4 text-error font-bold">
            <h1>「健康保険証」の場合は以下に注意して</h1>
            <h1>撮影をしてください。</h1>
          </div>

          <div className="mt-4 mx-2 text-sm font-bold">
            <h1>
              「健康保険証」の場合は以下の手順にしたがってアップロードください。
            </h1>
          </div>

          <p className="text-sm my-4">【手順】</p>

          <div className="mx-4 text-sm">
            <p>①「健康保険証」を撮影します。</p>
            <p>
              ※裏面に住所欄がある場合は、住所をご記入のうえ、裏面も撮影してください。
            </p>
          </div>
          <div className="mx-4 text-sm mt-2">
            <p>
              ②撮影した「健康保険証」の「記号・番号・保険者番号」の箇所を画像編集アプリ等で黒く塗りつぶしてください。
            </p>
          </div>
          <div className="mx-4 text-sm mt-2">
            <p>※QRコードがある場合は、QRコードも黒く塗りつぶししてください。</p>
          </div>

          <div className="flex items-center w-fit mx-auto my-4">
            <h2 className="font-bold mr-1">カード型保険証＜添付例＞</h2>
          </div>

          <div>
            <Image className="mx-auto" src={IdImage} alt="id image" />
          </div>

          <p className="text-[10px] mx-2 mt-2">
            ※「QRコード」は株式会社デンソーウェーブの登録商標です。
          </p>
        </div>

        <div className="w-11/12 mx-auto">
          <div
            onClick={handleButtonClickBack}
            className={`flex items-center justify-between border-2 border-primary px-4 max-[375px]:px-1 h-16 rounded-md mb-5 cursor-pointer ${
              selectedFileBack && 'bg-sky'
            }`}
          >
            <div className="flex">
              {selectedFileBack && (
                <Image src={Check} className="mr-2" alt="icon check" />
              )}
              <Image src={ImageIcon} alt="image icon" />
            </div>

            <h2 className="text-primary font-bold">画像ファイルの提出(裏面)</h2>

            <Image src={ArrowIcon} alt="image icon" />

            <input
              type="file"
              ref={fileInputRefBack}
              hidden
              accept="image/*"
              onChange={handleFileChangeBack}
            />
          </div>
        </div>
      </div>
      <div className="w-full bottom-6 text-center">
        <div className="px-6">
          {isError && (
            <p className="text-error font-bold mb-2">
              本人確認書類を添付してください
            </p>
          )}

          <ButtonBlue
            name="次へ進む"
            onClick={handleSubmit}
            loading={loading}
            disable={disable}
          />

          <ButtonSmall
            name="前に戻る"
            onClick={() => {
              setLoadingSmall(true);
              setTimeout(() => {
                router.push('/age-option');
              }, 500);
            }}
            loading={loadingSmall}
          />
        </div>

        <p className="text-[10px] mt-4">
          Copyright,Ｔ&Ｄ Financial Life Insurance Company. All Rights Reserved.
        </p>
      </div>

      <Loading show={showModal} />
    </div>
  );
}
