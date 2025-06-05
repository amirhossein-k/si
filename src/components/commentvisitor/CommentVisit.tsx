'use client';

import { useEffect } from 'react';
import Typewriter from 'typewriter-effect/dist/core';
import GraphemeSplitter from 'grapheme-splitter';

const CommentVisit = () => {
  useEffect(() => {
    const app = document.getElementById('typewriter');

    const stringSplitter = (string: string) => {
      const splitter = new GraphemeSplitter();
      return splitter.splitGraphemes(string);
    };

    const typewriter = new Typewriter(app, {
      loop: true,
      delay: 75,
      stringSplitter,
    });

    typewriter
      .pauseFor(2000)
      .typeString(' <br/>کارفرما عزیز برای دیدن دیگر امکانات میتوانید به قسمت ورود کاربر رفته ')
      .pauseFor(300)
    //   .deleteChars(10)
      .typeString('<br/><br><strong>ایمیل:</strong> amir@gmail.com ')
      .typeString(
        '<strong>رمز عبور: <span style="color: #27ae60;">123456789</span> </strong>'
      )
      .pauseFor(3000)
      .start();

    // Cleanup to prevent memory leaks
    return () => {
      typewriter.stop();
    };
  }, []);

  return (
    <div className="flex justify-center items-center ">
      <div id="typewriter" className="text-2xl font-mono"></div>
    </div>
  );
};

export default CommentVisit;