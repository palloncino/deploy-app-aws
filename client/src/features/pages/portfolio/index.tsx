import { useEffect, useState } from 'react';
import { PortfolioContent } from './view';
import { Spinner } from '../../spinner';
import { throttle } from 'lodash';
import { Singleton as Authorization } from '../../../auth';

export function Portfolio() {
  const auth = Authorization.getInstance();

  const clientId = auth.getProp('email');

  const [data, setData] = useState({
    id: 'content-editable-summary',
    html: '',
  });

  useEffect(() => {
    getHTML();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isAdmin = () => {
    if (clientId === `${process.env.REACT_APP_ADMIN_EMAIL}`) return true;
    return false;
  };

  const handleDownloadFile = async (type: 'png' | 'pdf' | 'docx') => {
    switch (type) {
      // case 'png':
      //   window.open(
      //     `https://antonioguiotto-pdf-storage.s3.amazonaws.com/pdf/postcard.pdf`,
      //     '_blank'
      //   ); // TODO: env variable
      //   break;

      case 'pdf':
        window.open(
          `https://antonioguiotto-pdf-storage.s3.amazonaws.com/pdf/portfolio.pdf`,
          '_blank'
        ); // TODO: env variable
        break;

      default:
        break;
    }
  };

  const postHTML = async () => {
    const access_token = auth.getProp('token');
    let defaultHeaders = {
      'Content-Type': 'application/json',
    };
    let URL = `${process.env.REACT_APP_SERVER_DOMAIN}/api/portfolio/edit-field`;
    let options = {
      method: 'POST',
      headers: {
        ...defaultHeaders,
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({ id: data.id, html: data.html }),
    };

    try {
      await fetch(URL, options);
    } catch (error) {}
  };

  const getHTML = async () => {
    const access_token = auth.getProp('token');
    let defaultHeaders = {
      'Content-Type': 'application/json',
    };
    let URL = `${process.env.REACT_APP_SERVER_DOMAIN}/api/portfolio/get-fields`;
    let options = {
      method: 'GET',
      headers: {
        ...defaultHeaders,
        Authorization: `Bearer ${access_token}`,
      },
    };
    try {
      const response = await fetch(URL, options);
      const json = await response.json();
      const items = json.data?.Items ?? [];
      if (items.length > 0)
        return setData({ id: items[0].id, html: items[0].html });
    } catch (error) {
      console.error(error);
    }
  };

  const isHTML = (text: string) => {
    return !!text.includes('<');
  };

  const renderSpinner = () => {
    return (
      <div className="spinner-container">
        <Spinner />
      </div>
    );
  };

  const handleClearInput = () => {
    setData({ id: 'content-editable-summary', html: '✍🏻' });
  };

  const htmlDecode = (input: any) => {
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes[0].nodeValue;
  };

  const extractStringFromDatabaseObject = (): any => {
    const text = data.html?.trim();

    if (text) {
      if (isHTML(text))
        return <div dangerouslySetInnerHTML={{ __html: text }} />;

      const value = htmlDecode(text) ?? text;

      if (isHTML(value))
        return <div dangerouslySetInnerHTML={{ __html: value }} />;

      return text;
    } else {
      return renderSpinner();
    }
  };

  const handleValueChange = ({ target }: any) => {
    const value = target.value;
    setData({ id: 'content-editable-summary', html: value });
  };

  const handleSaveInput = async () => {
    await postHTML();
    await getHTML();
  };

  const extractStringFromDatabaseObjectThrottled = throttle(
    extractStringFromDatabaseObject,
    2000
  );

  const handleValueChangeThrottled = throttle(handleValueChange, 2000);

  const handleSaveInputThrottled = throttle(handleSaveInput, 2000);

  return (
    <div className="portfolio-page-container">
      <PortfolioContent
        isAdmin={isAdmin}
        handleValueChange={handleValueChangeThrottled}
        data={data}
        handleClearInput={handleClearInput}
        handleDownloadFile={handleDownloadFile}
        extractStringFromDatabaseObject={
          extractStringFromDatabaseObjectThrottled
        }
        isLoading={false} // TODO
        handleSaveInput={handleSaveInputThrottled}
      />
    </div>
  );
}
