export const paymentLinkTemplate = (fullName: string) => {
  return `
  <!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title></title>
  <!--[if !mso]><!-->
  <style type="text/css">
    @import url('https://fonts.googleapis.com/css?family=Inter:400,600');
  </style>
  <!--<![endif]-->
  <style type="text/css" rel="stylesheet" media="all">
    @media only screen and (max-width: 600px) {
      .ms-header {
        display: none !important;
      }
      .ms-content {
        width: 100% !important;
        border-radius: 0;
      }
      .ms-footer {
        width: 100% !important;
      }
      .mobile-wide {
        width: 100% !important;
      }
      .info-lg {
        padding: 30px;
      }
    }
  </style>
  <!--[if mso]>
        <style type="text/css">
        body { font-family: Arial, Helvetica, sans-serif!important  !important; }
        td { font-family: Arial, Helvetica, sans-serif!important  !important; }
        td * { font-family: Arial, Helvetica, sans-serif!important  !important; }
        td p { font-family: Arial, Helvetica, sans-serif!important  !important; }
        td a { font-family: Arial, Helvetica, sans-serif!important  !important; }
        td span { font-family: Arial, Helvetica, sans-serif!important  !important; }
        td div { font-family: Arial, Helvetica, sans-serif!important  !important; }
        td ul li { font-family: Arial, Helvetica, sans-serif!important  !important; }
        td ol li { font-family: Arial, Helvetica, sans-serif!important  !important; }
        td blockquote { font-family: Arial, Helvetica, sans-serif!important  !important; }
        th * { font-family: Arial, Helvetica, sans-serif!important  !important; }
        </style>
        <![endif]-->
</head>

<body
  style="font-family:'Inter', Helvetica, Arial, sans-serif; width: 100% !important; height: 100%; margin: 0; padding: 0; -webkit-text-size-adjust: none; background-color: #f4f7fa; color: #FFF;">
  <div class="preheader"
    style="display:none !important;visibility:hidden;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
  </div>
  <table class="ms-body" width="100%" cellpadding="0" cellspacing="0" role="presentation"
    style="border-collapse:collapse;width:100%;margin-top:0;margin-bottom:50px;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;">
    <tr>
      <td align="center"
        style="word-break:break-word;font-family:'Inter', Helvetica, Arial, sans-serif;font-size:16px;line-height:24px;">
        <table class="ms-container" width="100%" cellpadding="0" cellspacing="0"
          style="border-collapse:collapse;width:100%;margin-top:0;margin-bottom:0;margin-right:0;margin-left:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;">
          <tr>
            <td align="center"
              style="word-break:break-word;font-family:'Inter', Helvetica, Arial, sans-serif;font-size:16px;line-height:24px;">
              <table class="ms-header" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                <tr>
                  <td height="40"
                    style="font-size:0px;line-height:0px;word-break:break-word;font-family:'Inter', Helvetica, Arial, sans-serif;">
                    &nbsp;
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center"
              style="word-break:break-word;font-family:'Inter', Helvetica, Arial, sans-serif;font-size:16px;line-height:24px;">
              <table class="ms-content" width="800" cellpadding="0" cellspacing="0" role="presentation"
                style="border-collapse:collapse;width:800px;margin-top:0;margin-bottom:0;margin-right:auto;margin-left:auto;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;background-color:#272527;border-radius:6px;box-shadow:0 3px 6px 0 rgba(0,0,0,.05); color: #FFF;">
                <tr>
                  <td style="width: 100%;border-radius: 5px 5px 0px 0px;padding: 18px 0px;background-color: #2e2d2e;text-align: center;vertical-align: auto;">
                      <img src="https://d396g00xwrhdnt.cloudfront.net/content/palace_elite_logo_2e003172e6_9d5c3c3f09.png" alt="logo"/>
                  </td>
                </tr>
                <tr>
                  <td style="word-break:break-word;font-family:'Inter', Helvetica, Arial, sans-serif;font-size:16px;line-height:24px;">
                    <table style="width: 800px!important">
                      <tbody>
                        <tr>
                            <td class="margin-bottom: 50px!important">
                              <img width="800" src="https://d396g00xwrhdnt.cloudfront.net/content/lblc_Couple_at_Infinity_Pool_1_1_b1cb400b4f.png" alt="pool"/>
                            </td>
                        </tr>
                      </tbody>
                    </table>
                    <table style="width: 87%;margin: 50px auto; margin-top: 50px!important; margin-bottom: 50px!important;border-spacing: 0px;">
                      <tbody style="width: 100%;">
                        <tr>
                          <td style="margin: 0px 5%; ">
                            <p style="margin-bottom: 20px; margin-top: 20px;">
                                Dear <span style="font-weight: 600;">${fullName}</span>
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="margin: 0px 5%">
                            <p style="margin-bottom: 20px;">
                                To complete your payment for reservation, please visit 
                                <a style="color:#90AFC5" href="${process.env.baseURL}/paylink(ENCRYPT_TOKEN)">this link</a>.
                            </p>
                          </td>
                        </tr>

                        <tr>
                          <td style="margin: 0px 5%">
                            <p style="margin-bottom: 20px;">If you have any questions, please feel free to contact us.</p>
                          </td>
                        </tr>

                        <tr>
                          <td style="margin: 0px 5%; margin-bottom: 50px">
                            <p style="margin-bottom: 20px;">We look forward to seeing you in paradise!</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="center"
                    style="word-break:break-word;font-family:'Inter', Helvetica, Arial, sans-serif;font-size:16px;line-height:16px;height:124px;">
                    <table class="ms-footer" width="600" cellpadding="0" cellspacing="0" role="presentation"
                      style="border-collapse:collapse;border-radius: 0px 0px 5px 5px;width:800px;margin-top:0;margin-bottom:0;margin-right:auto;margin-left:auto;background-color: #363636;">
                      <tr>
                        <td class="ms-content-body" align="center"
                          style="word-break:break-word;font-family:'Inter', Helvetica, Arial, sans-serif;font-size:16px;line-height:16px;padding-right:50px;padding-left:50px;">
                          <p class="small"
                            style="margin-right:0;margin-left:0;color:white;font-size:11px;line-height:21px;">
                            www.PalaceElite.com
                          </p>
                          <p class="small"
                            style="margin-right:0;margin-left:0;color:white;font-size:11px;line-height:18px;">
                            US, CA, Elite Members 1-888-987-7655 MX, Elite Members 800-226-4634<br>
                            WW Direct, Elite Members +52-998-234-0616
                          </p>
                          <p class="small"
                            style="margin-bottom:20px;margin-right:0;margin-left:0;color:white;font-size:11px;line-height:21px;">
                            © 2021 ELITE Members, Palace Resorts
                            </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}
