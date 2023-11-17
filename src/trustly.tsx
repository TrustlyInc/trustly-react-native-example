export const widget = (data = {}) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Trustly</title>
  <script src="https://sandbox.trustly.one/start/scripts/pwmb.js?accessId=A48B73F694C4C8EE6306" type="text/javascript"></script>
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

export const lightbox = (data = {}) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Trustly</title>
  <script src="https://sandbox.trustly.one/start/scripts/pwmb.js?accessId=A48B73F694C4C8EE6306" type="text/javascript"></script>
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
</html>`;
