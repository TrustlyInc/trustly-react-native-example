export const widget = (data = {}) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Trustly</title>
  <script src="https://sandbox.trustly.one/start/scripts/pwmb.js?accessId=TSwGyK52Mnpt5b8C" type="text/javascript"></script>
</head>
<body>
  <div id="widget"></div>
  <script>
    var establishData = ${JSON.stringify(data)};
    var PayWithMyBankOptions = {
      dragAndDrop: false,
      widgetContainerId: "widget",
    };

    PayWithMyBank.selectBankWidget(establishData, PayWithMyBankOptions);
  </script>
</body>
</html>`;
