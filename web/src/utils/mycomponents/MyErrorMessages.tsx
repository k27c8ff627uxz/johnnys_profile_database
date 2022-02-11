import React from 'react';
import MyErrorMessage from './MyErrorMessage';

interface MyErrorMessagesProps {
  errorState: string | null;
  texts: {[key: string]: string[]};
}

const MyErrorMessages = (props: MyErrorMessagesProps) => {
  const { errorState, texts } = props;
  return (
    <React.Fragment>
      {errorState !== null &&
        <MyErrorMessage text={texts[errorState]} />
      }
    </React.Fragment>
  );
};

export default MyErrorMessages;
