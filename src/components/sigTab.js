import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  useForm,
  Controller,
  useFormContext,
  FormProvider,
} from 'react-hook-form';
import { InputField, FileInputField } from './FormFields';

const VerifyResult = ({
  sigResult,
  verusSignature,
  children,
  resetCall,
  title,
  fileName,
}) => {
  return (
    <div className="flex flex-col flex-wrap p-4 mt-6 mb-16 break-all rounded bg-gray-105">
      <p className="text-xl">
        Verification Results:{' '}
        {sigResult !== undefined ? (
          sigResult.valid === 'true' ? (
            <span className="text-green-700">Is Valid</span>
          ) : (
            <span className="text-red-700">
              Is not valid or incorrect information
            </span>
          )
        ) : (
          'Processing...'
        )}
      </p>
      {fileName && (
        <>
          <p className="w-full mb-2 font-semibold">File:</p>
          <p className="w-full m-0 break-all">{fileName}</p>
        </>
      )}
      <p className="w-full mb-2 font-semibold">{title}</p>
      <p className="w-full m-0 break-all">{children}</p>
      <p className="w-full mb-2 font-semibold">Identity/Address:</p>
      <p className="w-full m-0 break-all">{verusSignature.Identity}</p>
      <p className="w-full mb-2 font-semibold">Signature:</p>
      <p className="w-full m-0 break-all">{verusSignature.Signature}</p>
      <button
        onClick={resetCall}
        className="px-12 py-5 mt-8 text-sm bg-white border border-solid rounded-full border-bluetrans hover:border-bluebutton text-bluebutton"
      >
        Verify Another Signature
      </button>
    </div>
  );
};

const MessageContent = () => {
  const { register, handleSubmit, errors, reset } = useForm();
  const resetClick = useCallback(() => _handleReset());

  const [verusSignature, setVerusSignature] = useState(null);
  const [sigResult, setSigResult] = useState();
  // TODO Add form validator
  const onSubmit = async (query) => {
    if (query) {
      setVerusSignature(query);

      let url = '/api/verusSignatureMessage';
      let result = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(query),
      });
      let data = await result.json();
      console.log(sigResult);
      if (data) {
        setSigResult(data);
      } else {
        setSigResult({ error: data.message });
      }
    }
  };

  const _handleReset = () => {
    setVerusSignature(null);
    setSigResult();
    reset();
  };
  return (
    <>
      {!verusSignature && (
        <div className="mt-6 mb-16m">
          {/* TODO Add error handler */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-8"
          >
            <div className="justify-center p-2 py-3 border border-gray-300 border-solid rounded-md">
              <label
                className="block px-2 mb-2 ml-2 text-sm text-gray-700 bg-white "
                style={{ marginTop: '-1.45rem', width: 'fit-content' }}
                htmlFor="Message"
              >
                Message / Text
              </label>
              <textarea
                type="text"
                placeholder="Enter Message or Text"
                name="Message"
                className="w-full max-w-full px-2 text-base text-gray-800 border-none outline-none"
                ref={register}
              />
            </div>

            <div className="justify-center p-2 py-3 border border-gray-300 border-solid rounded-md">
              <label
                className="block px-2 mb-2 ml-2 text-sm text-gray-700 bg-white "
                style={{ marginTop: '-1.45rem', width: 'fit-content' }}
                htmlFor="Identity"
              >
                Identity / Address
              </label>
              <input
                type="text"
                placeholder="Enter identity or address that signed the data above"
                name="Identity"
                className="w-full px-2 text-base text-gray-800 border-none outline-none"
                ref={register}
              />
            </div>

            <div className="justify-center p-2 py-3 border border-gray-300 border-solid rounded-md">
              <label
                className="block px-2 mb-2 ml-2 text-sm text-gray-700 bg-white "
                style={{ marginTop: '-1.45rem', width: 'fit-content' }}
                htmlFor="Signature"
              >
                Signature
              </label>
              <input
                type="text"
                placeholder="Enter signature created by the above data and address"
                name="Signature"
                className="w-full px-2 text-base text-gray-800 break-words border-none outline-none"
                ref={register}
              />
            </div>

            <button
              className="w-full px-12 py-5 text-sm bg-transparent border border-solid rounded-full border-bluetrans hover:border-bluebutton hover:bg-bluebutton hover:text-white text-bluebutton"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      )}
      {verusSignature && (
        <VerifyResult
          sigResult={sigResult}
          verusSignature={verusSignature}
          resetCall={_handleReset}
          title="Message/Text:"
        >
          {verusSignature.Message}
        </VerifyResult>
      )}
    </>
  );
};

const FileContent = () => {
  const methods = useForm({ mode: 'onBlur' });
  const [verusSignature, setVerusSignature] = useState();
  const [sigResult, setSigResult] = useState();
  // TODO Add form validator
  const onSubmit = async (values) => {
    if (values) {
      let query = {
        Identity: values.Identity,
        Signature: values.Signature,
        FileName: values.FileList[0].path,
        Hash: values.FileList[0].hash,
      };
      setVerusSignature(query);

      let url = '/api/verusSignatureHash';

      let result = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(query),
      });
      let data = await result.json();
      if (data) {
        setSigResult(data);
      } else {
        setSigResult({ error: data.message });
      }
    }
  };

  const _handleReset = () => {
    setVerusSignature(null);
    setSigResult();
    methods.reset();
  };
  return (
    <>
      {!verusSignature && (
        <div className="mt-6 mb-16">
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="flex flex-col space-y-8"
            >
              <div className="mb-4">
                <FileInputField name="FileList" />
              </div>
              <InputField name="Identity" label="identity / address" />
              <InputField name="Signature" label="Signature" />

              <button
                className="w-full px-12 py-5 text-sm bg-transparent border border-solid rounded-full border-bluetrans hover:border-bluebutton hover:bg-bluebutton hover:text-white text-bluebutton"
                type="submit"
              >
                Submit
              </button>
            </form>
          </FormProvider>
        </div>
      )}
      {verusSignature && (
        <VerifyResult
          sigResult={sigResult}
          verusSignature={verusSignature}
          resetCall={_handleReset}
          title="Hash:"
          fileName={verusSignature.FileName}
        >
          {verusSignature.Hash}
        </VerifyResult>
      )}
    </>
  );
};

const HashContent = () => {
  const { register, handleSubmit, watch, errors, reset } = useForm();

  const [verusSignature, setVerusSignature] = useState(null);
  const [sigResult, setSigResult] = useState();
  // TODO Add form validator
  const onSubmit = async (query) => {
    if (query) {
      setVerusSignature(query);

      let url = '/api/verusSignatureHash';
      let result = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(query),
      });
      let data = await result.json();

      if (data) {
        setSigResult(data);
      } else {
        setSigResult({ error: data.message });
      }
    }
  };

  const _handleReset = () => {
    setVerusSignature(null);
    setSigResult();
    reset();
  };
  return (
    <>
      {!verusSignature && (
        <div className="mt-6 mb-16">
          {/* TODO Add error handler */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-8"
          >
            <div className="justify-center p-2 py-3 border border-gray-300 border-solid rounded-md">
              <label
                className="block px-2 mb-2 ml-2 text-sm text-gray-700 bg-white "
                style={{ marginTop: '-1.45rem', width: 'fit-content' }}
                htmlFor="Hash"
              >
                Hash
              </label>
              <input
                type="text"
                placeholder="Enter hash to verify"
                name="Hash"
                className="w-full px-2 text-base text-gray-800 border-none outline-none"
                ref={register}
              />
            </div>

            <div className="justify-center p-2 py-3 border border-gray-300 border-solid rounded-md">
              <label
                className="block px-2 mb-2 ml-2 text-sm text-gray-700 bg-white "
                style={{ marginTop: '-1.45rem', width: 'fit-content' }}
                htmlFor="Identity"
              >
                Identity / Address
              </label>
              <input
                type="text"
                placeholder="Enter identity or address that signed the data above"
                name="Identity"
                className="w-full px-2 text-base text-gray-800 border-none outline-none"
                ref={register}
              />
            </div>

            <div className="justify-center p-2 py-3 border border-gray-300 border-solid rounded-md">
              <label
                className="block px-2 mb-2 ml-2 text-sm text-gray-700 bg-white "
                style={{ marginTop: '-1.45rem', width: 'fit-content' }}
                htmlFor="Signature"
              >
                Signature
              </label>
              <input
                type="text"
                placeholder="Enter signature created by the above data and address"
                name="Signature"
                className="w-full px-2 text-base text-gray-800 break-words border-none outline-none"
                ref={register}
              />
            </div>

            <button
              className="w-full px-12 py-5 text-sm bg-transparent border border-solid rounded-full border-bluetrans hover:border-bluebutton hover:bg-bluebutton hover:text-white text-bluebutton"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      )}
      {verusSignature && (
        <VerifyResult
          sigResult={sigResult}
          verusSignature={verusSignature}
          resetCall={_handleReset}
          title="Hash:"
        >
          {verusSignature.Hash}
        </VerifyResult>
      )}
    </>
  );
};

const AllContent = () => {
  const methods = useForm();
  const [verusSignature, setVerusSignature] = useState();
  const [sigResult, setSigResult] = useState();
  const sigType = methods.watch('verusSignatureType', 'Message');

  // TODO Add form validator
  const onSubmit = async (values) => {
    if (values) {
      let url = '';
      let query = '';
      if (values.verusSignatureType === 'Message') {
        url = '/api/verusSignatureMessage';
        console.log('url', url);
      } else {
        url = '/api/verusSignatureHash';
      }
      if (values.verusSignatureType === 'File') {
        query = {
          Identity: values.Identity,
          Signature: values.Signature,
          FileName: values.FileList[0].path,
          Hash: values.FileList[0].hash,
          verusSignatureType: values.verusSignatureType,
        };
      } else {
        query = values;
      }
      console.log(query);
      setVerusSignature(query);
      let result = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(query),
      });
      let data = await result.json();
      if (data) {
        setSigResult(data);
      } else {
        setSigResult({ error: data.message });
      }
    }
  };

  const _handleReset = () => {
    setVerusSignature();
    setSigResult();
    methods.reset({ verusSignatureType: 'Message' });
  };
  return (
    <>
      {!verusSignature && (
        <div className="mt-6 mb-16">
          <FormProvider {...methods}>
            {/* TODO Add error handler */}
            {/* TODO Add Change result section */}
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="flex flex-col space-y-8"
            >
              <div
                className="justify-center p-2 py-3 border border-gray-300 border-solid rounded-md"
                style={{ width: 'fit-content' }}
              >
                <label
                  className="block px-2 mb-2 ml-2 text-sm text-gray-700 bg-white "
                  style={{ marginTop: '-1.45rem', width: 'fit-content' }}
                  htmlFor="verusSignatureType"
                >
                  Data Type
                </label>
                <select
                  name="verusSignatureType"
                  className="px-2 text-base text-gray-800 border-none outline-none"
                  ref={methods.register}
                >
                  <option value="Message">Verify Message/Text</option>
                  <option value="File">Verify File</option>
                  <option value="Hash">Verify Hash</option>
                </select>
              </div>

              {sigType === 'Message' && (
                <InputField name="Message" label="Message / Text" />
              )}
              {sigType === 'File' && (
                <>
                  <div className="mb-4">
                    <FileInputField name="FileList" />
                  </div>
                </>
              )}
              {sigType === 'Hash' && <InputField name="Hash" label="Hash" />}
              <InputField name="Identity" label="identity / address" />
              <InputField name="Signature" label="Signature" />

              <button
                className="w-full px-12 py-5 text-sm bg-transparent border border-solid rounded-full border-bluetrans hover:border-bluebutton hover:bg-bluebutton hover:text-white text-bluebutton"
                type="submit"
              >
                Submit
              </button>
            </form>
          </FormProvider>
        </div>
      )}
      {verusSignature && (
        <div className="flex flex-col flex-wrap p-4 mt-6 mb-16 break-all rounded bg-gray-105">
          <p className="text-xl">
            Verification Results:{' '}
            {sigResult !== undefined ? (
              sigResult.valid === 'true' ? (
                <span className="text-green-700">Is Valid</span>
              ) : (
                <span className="text-red-700">
                  Is not valid or incorrect information
                </span>
              )
            ) : (
              'Processing...'
            )}
          </p>
          <p>Data Type: {verusSignature.verusSignatureType}</p>
          {verusSignature.Message && (
            <p className="w-full">Message/Text: {verusSignature.Message}</p>
          )}
          {verusSignature.FileName && (
            <p className="w-full">File: {verusSignature.FileName}</p>
          )}
          {verusSignature.Hash && (
            <p className="w-full">Hash: {verusSignature.Hash}</p>
          )}
          <p className="w-full">Identity/Address: {verusSignature.Identity}</p>
          <p className="w-full">Signature: {verusSignature.Signature}</p>
          <button
            onClick={() => _handleReset()}
            className="px-12 py-5 mt-8 text-sm bg-white border border-solid rounded-full border-bluetrans hover:border-bluebutton text-bluebutton"
          >
            Verify Another Signature
          </button>
        </div>
      )}
    </>
  );
};

const SigTabWindow = () => {
  const [viewTab, setViewTab] = useState(0);
  return (
    <>
      <div className="flex-col justify-center hidden space-x-4 md:flex sm:flex-row">
        <a
          onClick={() => setViewTab(0)}
          className={
            'px-5 text-center text-lg p-1 border-2 border-solid border-t-0 border-r-0 border-l-0 ' +
            (viewTab === 0
              ? 'text-tablink-active border-tablink-active'
              : 'text-tablink border-tablink')
          }
        >
          Message/Text
        </a>
        <a
          onClick={() => setViewTab(1)}
          className={
            'px-5 text-center text-lg p-1 flex-no-wrap border-2 border-solid border-t-0 border-r-0 border-l-0  ' +
            (viewTab === 1
              ? 'text-tablink-active  border-tablink-active'
              : 'text-tablink border-tablink')
          }
        >
          File
        </a>
        <a
          onClick={() => setViewTab(2)}
          className={
            'px-5 text-center cursor-pointer text-lg p-1 border-2 border-solid border-t-0 border-r-0 border-l-0 ' +
            (viewTab === 2
              ? 'text-tablink-active  border-tablink-active'
              : 'text-tablink border-tablink')
          }
        >
          Hash
        </a>
        <a
          onClick={() => setViewTab(3)}
          className={
            'px-5 text-center cursor-pointer text-lg p-1 border-2 border-solid border-t-0 border-r-0 border-l-0 ' +
            (viewTab === 3
              ? 'text-tablink-active  border-tablink-active'
              : 'text-tablink border-tablink')
          }
        >
          All in one
        </a>
      </div>
      <div className="hidden md:block tab-content ">
        <div>
          {viewTab === 0 && <MessageContent />}
          {viewTab === 1 && <FileContent />}
          {viewTab === 2 && <HashContent />}
          {viewTab === 3 && <AllContent />}
        </div>
      </div>
      <div className="md:hidden tab-content">
        <div className="w-full my-2 overflow-hidden tab b">
          <input
            className="absolute opacity-0"
            id="tab-single-one"
            type="radio"
            name="tabs2"
          />
          <label
            className="block p-5 leading-normal border-2 border-t-0 border-b-0 border-r-0 border-solid cursor-pointer border-tablink"
            htmlFor="tab-single-one"
          >
            VerusID
          </label>
          <div className="overflow-hidden leading-normal tab-content-accordion">
            <MessageContent />
          </div>
        </div>
        <div className="w-full my-2 overflow-hidden tab b">
          <input
            className="absolute opacity-0"
            id="tab-single-two"
            type="radio"
            name="tabs2"
          />
          <label
            className="block p-5 leading-normal border-2 border-t-0 border-b-0 border-r-0 border-solid cursor-pointer border-tablink"
            htmlFor="tab-single-two"
          >
            Decentralized Finance
          </label>
          <div className="overflow-hidden leading-normal tab-content-accordion">
            <FileContent />
          </div>
        </div>
        <div className="w-full my-2 overflow-hidden tab b">
          <input
            className="absolute opacity-0"
            id="tab-single-three"
            type="radio"
            name="tabs2"
          />
          <label
            className="block p-5 leading-normal border-2 border-t-0 border-b-0 border-r-0 border-solid cursor-pointer border-tablink"
            htmlFor="tab-single-three"
          >
            Public Blockchains as a Service
          </label>
          <div className="overflow-hidden leading-normal tab-content-accordion">
            <HashContent />
          </div>
        </div>
        <div className="w-full my-2 overflow-hidden tab b">
          <input
            className="absolute opacity-0"
            id="tab-single-four"
            type="radio"
            name="tabs2"
          />
          <label
            className="block p-5 leading-normal border-2 border-t-0 border-b-0 border-r-0 border-solid cursor-pointer border-tablink"
            htmlFor="tab-single-four"
          >
            ERC-20 Bridge
          </label>
          <div className="overflow-hidden leading-normal tab-content-accordion">
            <AllContent />
          </div>
        </div>
      </div>
    </>
  );
};

export default SigTabWindow;
