import { Button } from '../../button';

export const PortfolioContent = ({
  isAdmin,
  data,
  handleDownloadFile,
  extractStringFromDatabaseObject,
  handleValueChange,
  handleClearInput,
  handleSaveInput,
}: any) => {
  return (
    <div className="content-editable-summary-wrapper">
      <div className="content-editable-summary__button-container">
        {/* <Button
          customStyle={{ width: '300px', marginRight: '20px' }}
          handleClick={() => handleDownloadFile('png')}
          label="⤵️ DOWNLOAD CARD 🖼"
        /> */}
        <Button
          customStyle={{ width: '300px', marginRight: '20px' }}
          handleClick={() => handleDownloadFile('pdf')}
          label="⤵️ DOWNLOAD PDF 📄"
        />
      </div>
      {isAdmin() && (
        <div className="content-editable-summary-container">
          <div className="content-editable-summary-commands-container">
            <div className="content-editable-summary-commands-container-title">
              COMMANDS
            </div>
            <Button
              customStyle={{ width: '150px' }}
              handleClick={handleClearInput}
              label="🧹 CLEAR"
            />
            <Button
              customStyle={{ width: '150px', marginTop: '10px' }}
              handleClick={handleSaveInput}
              // label={`${isSaved ? "🔴" : "🟢"} SAVE`} TODO: like editor
              label="⚡️ SAVE"
            />
          </div>
          <div className="content-editable-summary-code-container">
            <div className="content-editable-summary-code-container-title">
              HTML CODE
            </div>
            <textarea
              className="content-editable-summary"
              placeholder="write HTML code"
              onChange={handleValueChange}
              id="content-editable-summary"
              value={data.html}
            ></textarea>
          </div>
        </div>
      )}
      <div className="content-editable-summary-output-container">
        <div className="content-editable-summary-output">
          {extractStringFromDatabaseObject()}
        </div>
      </div>
    </div>
  );
};
