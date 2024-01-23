import { getRequestSignature } from './utils/signature';

export const widget = (accessId: String, data = {}) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Trustly</title>
  <script src="https://sandbox.trustly.one/start/scripts/trustly.js?accessId=${accessId}" type="text/javascript"></script>
</head>
<body>
  <div id="widget"></div>
  <script>
    var establishData = ${JSON.stringify(data)};
    var TrustlyOptions = {
      closeButton: false,
      dragAndDrop: true,
      widgetContainerId: "widget",
    };

    const TrustlyWidgetBankSelected = (data) => {
      return false;
    }

    Trustly.selectBankWidget(establishData, TrustlyOptions, TrustlyWidgetBankSelected);

  </script>
</body>
</html>`;

export const lightbox = async (accessId: String, data) => {
  if (!data) return;

  const requestSignature = await getRequestSignature(data);
  data.requestSignature = requestSignature || '';

  return `
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Trustly</title>
        <script src="https://sandbox.trustly.one/start/scripts/trustly.js?accessId=${accessId}" type="text/javascript"></script>
      </head>
      <body>
        <div id="widget"></div>
        <script>
          var establishData = ${JSON.stringify(data)};
          var TrustlyOptions = {
            closeButton: false,
            dragAndDrop: true,
            widgetContainerId: "widget",
          };

          Trustly.establish(establishData, TrustlyOptions);

        </script>
      </body>
    </html>
  `;
};
