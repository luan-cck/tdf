'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Autosuggest from 'react-autosuggest';
import Image from 'next/image';

import Header from '@/components/Header';
import Volume from '@/images/volume-circle.svg';
import Check from '@/images/check-green.svg';
import { getVoices, speakText } from '@/utils/speak';
import ButtonBlue from '@/components/ButtonBlue';
import ButtonSmall from '@/components/ButtonSmall';
import fetchData from '@/utils/fetchData';
import Footer from '@/components/Footer';

export default function fillFinancialInstitutionName() {
  const [value, setValue] = useState('');
  const [banks, setBanks] = useState([]);
  const [showError, setShowError] = useState(false);
  const [checked, setChecked] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingSmall, setLoadingSmall] = useState(false);
  const [user, setUser] = useState(null);

  const router = useRouter();

  // const handleButtonClick = (button) => {
  //   setSelectedButton(button);
  //   setShowError(false);
  // };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const skipBankInfo = localStorage.getItem('skipBankInfo');

    setUser(userInfo);

    if (userInfo?.bank_name) {
      setValue(userInfo?.bank_name);
    }

    if (userInfo?.bank_code) {
      setSelectedBank({
        bank_name: userInfo?.bank_name,
        bank_code: userInfo?.bank_code,
      });
    }

    if (skipBankInfo && userInfo?.product_chouhyou_code === '001D09') {
      setChecked(true);
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

  useEffect(() => {
    fetchData('/data/bank_names.json').then((data) => setBanks(data));
  }, []);

  const speak = (text) => {
    if (!text) return;
    speakText(text, selectedVoice);
  };

  const handleSubmit = () => {
    setLoading(true);
    if (checked && user?.product_chouhyou_code === '001D09') {
      user.bank_name = null;
      user.bank_code = null;
      user.bank_branch_name = null;
      user.bank_branch_code = null;
      user.bank_branch_type = null;
      user.bank_account_number = null;
      user.bank_account_name = null;
      localStorage.setItem('userInfo', JSON.stringify(user));
      localStorage.setItem('skipBankInfo', true);
      setTimeout(() => {
        router.push('/select-reason-cancel');
      }, 500);
    } else {
      if (selectedBank) {
        user.bank_name = selectedBank?.bank_name;
        user.bank_code = selectedBank?.bank_code;
        localStorage.setItem('userInfo', JSON.stringify(user));
        localStorage.removeItem('skipBankInfo');
        setTimeout(() => {
          router.push('/fill-bank-branch-name');
        }, 500);
      } else if (value.length !== 0) {
        user.bank_name = value;
        user.bank_code = null;
        localStorage.setItem('userInfo', JSON.stringify(user));
        localStorage.removeItem('skipBankInfo');
        setTimeout(() => {
          router.push('/fill-bank-branch-name');
        }, 500);
      } else {
        setLoading(false);
        setShowError(true);
      }
    }
  };

  const handleChangeCheckbox = (event) => {
    const check = event.target.checked;
    setChecked(check);
    setShowError(false);
  };

  const getSuggestions = (value, data) => {
    const inputValue = convertToHalfWidth(value.trim().toLowerCase());
    // const inputLength = inputValue.length;

    let list1 = data.filter((item) =>
      item.bank_name_katakana.includes(inputValue)
    );
    let list2 = data.filter((item) => item.bank_name.includes(inputValue));
    return [...new Set([...list1, ...list2])];
  };

  const convertToHalfWidth = (string) => {
    let characters = getCharacters(string);
    let halfWidthString = '';
    characters.forEach((character) => {
      halfWidthString += mapToHankaku(character);
    });
    return halfWidthString;
  };

  const getCharacters = (string) => {
    return string.split('');
  };

  const mapToHankaku = (character) => {
    let zenHanMap = getZenkakuToHankakuMap();
    if (typeof zenHanMap[character] === 'undefined') {
      return character;
    } else {
      return zenHanMap[character];
    }
  };

  const getZenkakuToHankakuMap = () => {
    let zenHanMap = {
      ァ: 'ｧ',
      ア: 'ｱ',
      あ: 'ｱ',
      ィ: 'ｨ',
      イ: 'ｲ',
      い: 'ｲ',
      ゥ: 'ｩ',
      ウ: 'ｳ',
      う: 'ｳ',
      ェ: 'ｪ',
      エ: 'ｴ',
      え: 'ｴ',
      ォ: 'ｫ',
      オ: 'ｵ',
      お: 'ｵ',
      カ: 'ｶ',
      か: 'ｶ',
      ガ: 'ｶﾞ',
      が: 'ｶﾞ',
      キ: 'ｷ',
      き: 'ｷ',
      ギ: 'ｷﾞ',
      ぎ: 'ｷﾞ',
      ク: 'ｸ',
      く: 'ｸ',
      グ: 'ｸﾞ',
      ぐ: 'ｸﾞ',
      ケ: 'ｹ',
      け: 'ｹ',
      ゲ: 'ｹﾞ',
      げ: 'ｹﾞ',
      コ: 'ｺ',
      こ: 'ｺ',
      ゴ: 'ｺﾞ',
      ご: 'ｺﾞ',
      サ: 'ｻ',
      さ: 'ｻ',
      ザ: 'ｻﾞ',
      ざ: 'ｻﾞ',
      シ: 'ｼ',
      し: 'ｼ',
      ジ: 'ｼﾞ',
      じ: 'ｼﾞ',
      ス: 'ｽ',
      す: 'ｽ',
      ズ: 'ｽﾞ',
      ず: 'ｽﾞ',
      セ: 'ｾ',
      せ: 'ｾ',
      ゼ: 'ｾﾞ',
      ぜ: 'ｾﾞ',
      ソ: 'ｿ',
      そ: 'ｿ',
      ゾ: 'ｿﾞ',
      ぞ: 'ｿﾞ',
      タ: 'ﾀ',
      た: 'ﾀ',
      ダ: 'ﾀﾞ',
      だ: 'ﾀﾞ',
      チ: 'ﾁ',
      ち: 'ﾁ',
      ヂ: 'ﾁﾞ',
      ッ: 'ｯ',
      っ: 'ｯ',
      つ: 'ﾂ',
      ツ: 'ﾂ',
      ヅ: 'ﾂﾞ',
      づ: 'ﾂﾞ',
      テ: 'ﾃ',
      て: 'ﾃ',
      デ: 'ﾃﾞ',
      で: 'ﾃﾞ',
      ト: 'ﾄ',
      と: 'ﾄ',
      ド: 'ﾄﾞ',
      ど: 'ﾄﾞ',
      ナ: 'ﾅ',
      な: 'ﾅ',
      ニ: 'ﾆ',
      に: 'ﾆ',
      ヌ: 'ﾇ',
      ぬ: 'ﾇ',
      ネ: 'ﾈ',
      ね: 'ﾈ',
      ノ: 'ﾉ',
      の: 'ﾉ',
      ハ: 'ﾊ',
      は: 'ﾊ',
      バ: 'ﾊﾞ',
      ば: 'ﾊﾞ',
      パ: 'ﾊﾟ',
      ぱ: 'ﾊﾟ',
      ヒ: 'ﾋ',
      ひ: 'ﾋ',
      ビ: 'ﾋﾞ',
      び: 'ﾋﾞ',
      ピ: 'ﾋﾟ',
      ぴ: 'ﾋﾟ',
      フ: 'ﾌ',
      ふ: 'ﾌ',
      ブ: 'ﾌﾞ',
      ぶ: 'ﾌﾞ',
      プ: 'ﾌﾟ',
      ぷ: 'ﾌﾟ',
      ヘ: 'ﾍ',
      へ: 'ﾍ',
      ベ: 'ﾍﾞ',
      べ: 'ﾍﾞ',
      ペ: 'ﾍﾟ',
      ぺ: 'ﾍﾟ',
      ホ: 'ﾎ',
      ほ: 'ﾎ',
      ボ: 'ﾎﾞ',
      ぼ: 'ﾎﾞ',
      ポ: 'ﾎﾟ',
      ぽ: 'ﾎﾟ',
      マ: 'ﾏ',
      ま: 'ﾏ',
      ミ: 'ﾐ',
      み: 'ﾐ',
      ム: 'ﾑ',
      む: 'ﾑ',
      メ: 'ﾒ',
      め: 'ﾒ',
      モ: 'ﾓ',
      も: 'ﾓ',
      ャ: 'ｬ',
      や: 'ﾔ',
      ヤ: 'ﾔ',
      ゃ: 'ｬ',
      ュ: 'ｭ',
      ゆ: 'ﾕ',
      ユ: 'ﾕ',
      ゅ: 'ｭ',
      ョ: 'ｮ',
      よ: 'ﾖ',
      ヨ: 'ﾖ',
      ょ: 'ｮ',
      ラ: 'ﾗ',
      ら: 'ﾗ',
      リ: 'ﾘ',
      り: 'ﾘ',
      ル: 'ﾙ',
      る: 'ﾙ',
      レ: 'ﾚ',
      れ: 'ﾚ',
      ロ: 'ﾛ',
      ろ: 'ﾛ',
      ヮ: 'ﾜ',
      わ: 'ﾜ',
      ワ: 'ﾜ',
      ヲ: 'ｦ',
      を: 'ｦ',
      ン: 'ﾝ',
      ん: 'ﾝ',
      ヴ: 'ｳﾞ',
      ゔ: 'ｳﾞ',
      '・': '･',
      ー: 'ｰ',
    };
    return zenHanMap;
  };

  const getSuggestionValue = (suggestion) => suggestion.bank_name;

  const renderSuggestion = (suggestion) => (
    <div className="bank-branch-item" key={suggestion.id}>
      {suggestion.bank_name}
    </div>
  );

  function renderSuggestionsContainer({ containerProps, children }) {
    const items = children?.props?.item;
    return (
      <div
        {...containerProps}
        key={items?.id}
        className={children ? 'suggest-container' : ''}
      >
        {children}
      </div>
    );
  }

  const onChange = (event, { newValue }) => {
    setValue(newValue);
    setSelectedBank(null);
    setShowError(false);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value, banks));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    setSelectedBank(suggestion);
  };

  const inputProps = {
    placeholder: 'テキスト',
    value,
    onChange,
  };

  return (
    <main className="flex flex-col h-dvh items-center">
      <Header
        title={
          <>
            【振込先口座】
            <br />
            金融機関名をご入力ください
            <br />
            ※ご契約者さま名義の口座に限ります
          </>
        }
        volumeWhite={false}
        titleColor="primary"
        bg="white"
        textAlign="start"
        voice={selectedVoice}
        voiceTitle={
          '振込先の金融機関名をご入力ください  ご契約者さま名義の口座に限ります'
        }
      />

      <div className="border-t border-gray h-full w-full">
        {user?.product_chouhyou_code === '001D09' && (
          <div className="flex items-center px-6 py-4 border-b border-gray">
            <div className="w-[88%]">
              <h2 className="font-bold text-primary">
                保険料振替口座以外をご指定の場合はご入力ください。
              </h2>
              <h2 className="font-bold text-primary mt-1">
                ご入力のない場合は保険料振替口座にお振込みいたします。
              </h2>
              <h2 className="font-bold text-primary mt-1">
                ※この保険契約に対する解約払戻金はありません。
              </h2>
              <h2 className="font-bold text-primary mt-1">
                尚、その他に払戻金がある場合には、ご指定いただいた振込先口座にお振込みさせていただきます。
              </h2>
            </div>
            <div className="shrink-0 w-[12%]">
              <Image
                onClick={() => {
                  speak(
                    `
                  保険料振替口座以外をご指定の場合はご入力ください。
                  ご入力のない場合は保険料振替口座にお振込みいたします。
                  この保険契約に対する かいやくはらいもどしきん はありません。
                  尚、その他に はらいもどしきん がある場合には、ご指定いただいた振込先口座にお振込みさせていただきます。
                  `
                  );
                }}
                className="ml-auto cursor-pointer"
                src={Volume}
                alt="icon volume"
              />
            </div>
          </div>
        )}

        <div className="flex justify-between w-full py-5 px-6">
          <p className="text-primary font-bold tracking-wider">金融機関名</p>
          <Image
            onClick={() => {
              speak('金融機関名');
            }}
            src={Volume}
            className="ml-5 cursor-pointer"
            alt="icon volume"
          />
        </div>
        <div className="w-full px-6">
          {checked ? (
            <input
              className="w-[88%] h-[50px] pl-2 border-2 border-gray rounded"
              disabled
              placeholder="テキスト"
            />
          ) : (
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              renderSuggestionsContainer={renderSuggestionsContainer}
              inputProps={inputProps}
              onSuggestionSelected={onSuggestionSelected}
              theme={{
                input: {
                  height: 50,
                  width: '88%',
                  border: '2px solid #DDDDDD',
                  borderRadius: 5,
                  paddingLeft: 15,
                  backgroundColor: showError ? '#FFE0E0' : '',
                },
              }}
            />
          )}
        </div>

        {/* <div className="flex justify-between w-full mt-5 mb-2 px-6 relative">
          {selectedButton === 'button1' && (
            <Image
              src={Check}
              className="ml-5 absolute top-3.5 left-3.5"
              alt="icon check"
            />
          )}
          <button
            className={`${
              selectedButton === 'button1'
                ? 'bg-sky'
                : showError
                ? 'bg-warningInput'
                : ''
            }
          w-[88%] h-[50px] rounded text-primary border-2 border-primary p-2 text-start font-bold pl-8`}
            onClick={() => handleButtonClick('button1')}
          >
            銀行
          </button>
          <Image
            onClick={() => {
              speak('銀行');
            }}
            src={Volume}
            className="ml-5 cursor-pointer"
            alt="icon volume"
          />
        </div>

        <div className="flex justify-between w-full mt-5 mb-2 px-6 relative">
          {selectedButton === 'button2' && (
            <Image
              src={Check}
              className="ml-5 absolute top-3.5 left-3.5"
              alt="icon check"
            />
          )}
          <button
            className={`${
              selectedButton === 'button2'
                ? 'bg-sky'
                : showError
                ? 'bg-warningInput'
                : ''
            } w-[88%] h-[50px] rounded text-primary border-2 border-primary p-2 text-start font-bold pl-8`}
            onClick={() => handleButtonClick('button2')}
          >
            信託銀行
          </button>
          <Image
            onClick={() => {
              speak('信託銀行');
            }}
            src={Volume}
            className="ml-5 cursor-pointer"
            alt="icon volume"
          />
        </div>

        <div className="flex justify-between w-full mt-5 mb-2 px-6 relative">
          {selectedButton === 'button3' && (
            <Image
              src={Check}
              className="ml-5 absolute top-3.5 left-3.5"
              alt="icon check"
            />
          )}
          <button
            className={`${
              selectedButton === 'button3'
                ? 'bg-sky'
                : showError
                ? 'bg-warningInput'
                : ''
            } w-[88%] h-[50px] rounded text-primary border-2 border-primary p-2 text-start font-bold pl-8`}
            onClick={() => handleButtonClick('button3')}
          >
            信用金庫
          </button>
          <Image
            onClick={() => {
              speak('信用金庫');
            }}
            src={Volume}
            className="ml-5 cursor-pointer"
            alt="icon volume"
          />
        </div>

        <div className="flex justify-between w-full mt-5 mb-2 px-6 relative">
          {selectedButton === 'button4' && (
            <Image
              src={Check}
              className="ml-5 absolute top-3.5 left-3.5"
              alt="icon check"
            />
          )}
          <button
            className={`${
              selectedButton === 'button4'
                ? 'bg-sky'
                : showError
                ? 'bg-warningInput'
                : ''
            } w-[88%] h-[50px] rounded text-primary border-2 border-primary p-2 text-start font-bold pl-8`}
            onClick={() => handleButtonClick('button4')}
          >
            信用組合
          </button>
          <Image
            onClick={() => {
              speak('信用組合');
            }}
            src={Volume}
            className="ml-5 cursor-pointer"
            alt="icon volume"
          />
        </div>

        <div className="flex justify-between w-full mt-5 mb-2 px-6 relative">
          {selectedButton === 'button5' && (
            <Image
              src={Check}
              className="ml-5 absolute top-3.5 left-3.5"
              alt="icon check"
            />
          )}
          <button
            className={`${
              selectedButton === 'button5'
                ? 'bg-sky'
                : showError
                ? 'bg-warningInput'
                : ''
            } w-[88%] h-[50px] rounded text-primary border-2 border-primary p-2 text-start font-bold pl-8`}
            onClick={() => handleButtonClick('button5')}
          >
            農業協組
          </button>
          <Image
            onClick={() => {
              speak('農業協組');
            }}
            src={Volume}
            className="ml-5 cursor-pointer"
            alt="icon volume"
          />
        </div> */}
      </div>

      <div className="flex justify-center w-full px-6 mt-5">
        {user?.product_chouhyou_code === '001D09' && (
          <div className="flex items-center py-4 border-t border-b border-gray300 mb-4 mt-2 w-full">
            <div>
              <input
                id="check"
                type="checkbox"
                onChange={handleChangeCheckbox}
                checked={checked}
              />
              <label
                htmlFor="check"
                className="custom-checkbox cursor-pointer"
              ></label>
            </div>
            <h2 className="text-xl font-bold text-primary">
              保険料振替口座を指定する
            </h2>
          </div>
        )}
      </div>

      {showError && (
        <p className="text-error font-bold tracking-wider">
          未入力の項目があります
        </p>
      )}

      <div className="w-full py-2 px-6">
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

            if (user?.product_chouhyou_code === '001D07') {
              setTimeout(() => {
                router.push('/select-method-payment');
              }, 500);
            } else if (ageOption === 'under18') {
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
