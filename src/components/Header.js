'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

import Logo from '@/images/logo.svg';
import Volume from '@/images/volume-circle.svg';
import VolumeWhite from '@/images/volume.svg';
import { speakText, stopSpeaking } from '@/utils/speak';

export default function Header({
  title,
  subTitle = '',
  bg = 'primary',
  volumeWhite,
  titleColor,
  textAlign,
  voice,
  voiceTitle
}) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = (text) => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      if (!text) return;
      speakText(text, voice, () => setIsSpeaking(false));
      setIsSpeaking(true);
    }
  };

  return (
    <div className="w-full">
      <div className="h-[60px] flex items-center px-6 shadow-xml">
        <Image width={178} src={Logo} alt="Logo" />
      </div>

      <div className={`bg-${bg} flex items-center px-6 py-[20px]`}>
        <div className="w-11/12">
          <h2 className={`text-${titleColor} text-${textAlign} font-bold`}>
            {title}
          </h2>
          {subTitle !== '' && (
            <h2 className={`text-${titleColor} text-${textAlign} font-bold`}>
              {subTitle}
            </h2>
          )}
        </div>
        <Image
          onClick={() => {
            voiceTitle
              ? speak(voiceTitle)
              : speak(title + subTitle)
          }}
          className="ml-auto cursor-pointer"
          src={volumeWhite ? VolumeWhite : Volume}
          alt="icon volume"
        />
      </div>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  bg: PropTypes.string.isRequired,
  height: PropTypes.number,
  volumeWhite: PropTypes.bool.isRequired,
  titleColor: PropTypes.string.isRequired,
  textAlign: PropTypes.string.isRequired,
  voice: PropTypes.object.isRequired,
  subTitle: PropTypes.string,
  voiceTitle: PropTypes.string,
};
