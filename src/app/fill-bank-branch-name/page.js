'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Autosuggest from 'react-autosuggest';
import Image from 'next/image';

import Header from '@/components/Header';
import Volume from '@/images/volume-circle.svg';
import Check from '@/images/check-green.svg';
import ButtonBlue from '@/components/ButtonBlue';
import ButtonSmall from '@/components/ButtonSmall';
import { getVoices, speakText, stopSpeaking } from '@/utils/speak';
import fetchData from '@/utils/fetchData';
import Footer from '@/components/Footer';

export default function fillBankBranchName() {
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [selectedButton, setSelectedButton] = useState(null);
  const [isInput, setIsInput] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showError, setShowError] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [branches, setBranches] = useState([]);
  const [value, setValue] = useState('');
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingSmall, setLoadingSmall] = useState(false);
  const [user, setUser] = useState({});

  const router = useRouter();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    setUser(userInfo);

    if (userInfo?.bank_branch_name) {
      setValue(userInfo?.bank_branch_name);
    }

    if (userInfo?.bank_branch_code) {
      setSelectedBranch({
        branch_name: userInfo?.bank_branch_name,
        branch_code: userInfo?.bank_branch_code,
      });
    }

    if (userInfo?.bank_branch_type) {
      setSelectedButton(userInfo?.bank_branch_type);
    }

    fetchData('/data/branch_names.json').then((data) => setBranches(data));
  }, []);

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

  const handleButtonClick = (button) => {
    setSelectedButton(button);
    setShowError(false);
  };

  const handleSubmit = () => {
    setLoading(true);
    if (selectedButton && selectedBranch) {
      user.bank_branch_name = selectedBranch?.branch_name;
      user.bank_branch_code = selectedBranch?.branch_code;
      user.bank_branch_type = selectedButton;
      localStorage.setItem('userInfo', JSON.stringify(user));
      setTimeout(() => {
        router.push('/select-event');
      }, 500);
    } else if (selectedButton && value.length !== 0) {
      user.bank_branch_name = value;
      user.bank_branch_code = null;
      user.bank_branch_type = selectedButton;
      localStorage.setItem('userInfo', JSON.stringify(user));
      setTimeout(() => {
        router.push('/select-event');
      }, 500);
    } else {
      if (!selectedButton) {
        setShowError(true);
      }

      if (value === '') {
        setIsInput(true);
      }
      setLoading(false);
    }
  };

  const getSuggestions = (value, data) => {
    const bankCode = user?.bank_code;
    const inputValue = convertToHalfWidth(value.trim().toLowerCase());
    let list1 = data.filter(
      (item) =>
        item.branch_name.toLowerCase().includes(inputValue) &&
        item.bank_code == bankCode
    );

    let list2 = data.filter(
      (item) =>
        item.branch_name_katakana.toLowerCase().includes(inputValue) &&
        item.bank_code == bankCode
    );
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

  const getSuggestionValue = (suggestion) => suggestion.branch_name;

  const renderSuggestion = (suggestion) => (
    <div className="bank-branch-item" key={suggestion.id}>
      {suggestion.branch_name}
    </div>
  );

  const renderSuggestionsContainer = ({ containerProps, children }) => {
    const items = children?.props?.item;
    return (
      <div
        {...containerProps}
        key={items?.id}
        className={children ? 'suggest-branch-container' : ''}
      >
        {children}
      </div>
    );
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
    setSelectedBranch(null);
    setIsInput(false);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    setSelectedBranch(suggestion);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value, branches));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: 'テキスト',
    value,
    onChange,
  };

  return (
    <main className="flex flex-col h-dvh items-center">
      <Header
        title="支店名をご入力ください"
        volumeWhite={false}
        titleColor="primary"
        bg="white"
        textAlign="start"
        voice={selectedVoice}
      />

      <div className="border-t border-light h-full w-full overflow-scroll">
        <div className="flex justify-between w-full py-5 px-6 border-t border-gray">
          <p className="text-primary font-bold tracking-wider w-[88%]">
            支店名
          </p>
          <Image
            onClick={() => {
              speak('支店名');
            }}
            src={Volume}
            className="ml-5 cursor-pointer"
            alt="icon volume"
          />
        </div>
        <div className="w-full px-6 relative">
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            onSuggestionSelected={onSuggestionSelected}
            getSuggestionValue={getSuggestionValue}
            renderSuggestionsContainer={renderSuggestionsContainer}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            theme={{
              input: {
                height: 50,
                width: '87%',
                border: '2px solid #DDDDDD',
                borderRadius: 5,
                paddingLeft: 15,
                backgroundColor: isInput ? '#FFE0E0' : '',
              },
            }}
          />
        </div>

        <div className="flex justify-between w-full mt-5 mb-2 px-6 relative">
          {selectedButton === 'branch' && (
            <Image
              src={Check}
              className="ml-5 absolute top-3.5 left-3.5"
              alt="icon check"
            />
          )}
          <button
            className={`${
              selectedButton === 'branch'
                ? 'bg-sky'
                : showError
                ? 'bg-warningInput'
                : ''
            }
          w-[88%] text-primary border-2 border-primary rounded h-[50px] p-2 text-start font-bold pl-8`}
            onClick={() => handleButtonClick('branch')}
          >
            支店
          </button>
          <Image
            onClick={() => {
              speak('支店');
            }}
            src={Volume}
            className="ml-5 cursor-pointer"
            alt="icon volume"
          />
        </div>
        <div className="flex justify-between w-full mt-5 mb-2 px-6 relative">
          {selectedButton === 'head-office' && (
            <Image
              src={Check}
              className="ml-5 absolute top-3.5 left-3.5"
              alt="icon check"
            />
          )}
          <button
            className={`${
              selectedButton === 'head-office'
                ? 'bg-sky'
                : showError
                ? 'bg-warningInput'
                : ''
            } w-[88%] text-primary border-2 border-primary rounded h-[50px] p-2 text-start font-bold pl-8`}
            onClick={() => handleButtonClick('head-office')}
          >
            本店
          </button>
          <Image
            onClick={() => {
              speak('本店');
            }}
            src={Volume}
            className="ml-5 cursor-pointer"
            alt="icon volume"
          />
        </div>
        <div className="flex justify-between w-full mt-5 mb-2 px-6 relative">
          {selectedButton === 'sub-office' && (
            <Image
              src={Check}
              className="ml-5 absolute top-3.5 left-3.5"
              alt="icon check"
            />
          )}
          <button
            className={`${
              selectedButton === 'sub-office'
                ? 'bg-sky'
                : showError
                ? 'bg-warningInput'
                : ''
            } w-[88%] text-primary border-2 border-primary rounded h-[50px] p-2 text-start font-bold pl-8`}
            onClick={() => handleButtonClick('sub-office')}
          >
            出張所
          </button>
          <Image
            onClick={() => {
              speak('出張所');
            }}
            src={Volume}
            className="ml-5 cursor-pointer"
            alt="icon volume"
          />
        </div>
      </div>

      <div className="flex justify-center w-full px-6 mt-1">
        {isInput ? (
          <p className="text-error font-bold tracking-wider">
            未入力の項目があります
          </p>
        ) : (
          showError && (
            <p className="text-error font-bold tracking-wider">
              項目を選択してください
            </p>
          )
        )}
      </div>

      <div className="w-full py-2 px-6">
        <ButtonBlue loading={loading} name="次へ進む" onClick={handleSubmit} />
      </div>
      <div>
        <ButtonSmall
          loading={loadingSmall}
          name="前に戻る"
          onClick={() => {
            setLoadingSmall(true);
            setTimeout(() => {
              router.push('/fill-financial-institution-name');
            }, 500);
          }}
        />
      </div>

      <Footer />
    </main>
  );
}
