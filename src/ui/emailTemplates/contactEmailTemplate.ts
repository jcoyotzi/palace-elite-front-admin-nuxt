export const contactUsEmailTemplate = (
  departament: string,
  messsage: string,
  affiliateId: string
) => {
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
        .ms-content-body {
          padding: 30px !important;
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
                <table class="ms-content" width="600" cellpadding="0" cellspacing="0" role="presentation"
                  style="border-collapse:collapse;width:600px;margin-top:0;margin-bottom:0;margin-right:auto;margin-left:auto;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;background-color:#272527;border-radius:6px;box-shadow:0 3px 6px 0 rgba(0,0,0,.05); color: #FFF;">
                  <tr>
                    <td>
                      <div style="width: 100%;height: 28px;background-color: #fff;text-align: center;vertical-align: auto;padding-top: 4px;">
                        <svg xmlns="http://www.w3.org/2000/svg" height="12" viewBox="0 0 300 17" fill="none">
                          <path d="M1.82529 15.8522H0V0.335938H8.58959C10.5178 0.335938 13.4839 1.10327 13.4839 4.79719C13.4839 8.08513 11.3275 9.22721 8.58959 9.22721H1.82529V15.8522ZM8.58959 7.37579C10.3299 7.37579 11.6586 6.84044 11.6586 4.77042C11.6586 2.59779 10.1643 2.14274 8.58959 2.14274H1.82529V7.38917L8.58959 7.37579Z" fill="black"/>
                          <path d="M38.5419 15.8522H36.5108L34.001 10.5344H26.512L24.0604 15.8522H22.0293L29.4333 0.335938H31.2631L38.5419 15.8522ZM30.346 2.54872L27.4246 8.71416H33.1689L30.346 2.54872Z" fill="black"/>
                          <path d="M61.8127 15.8522H50.2168V0.335938H52.0421V14.032H61.8127V15.8522Z" fill="black"/>
                          <path d="M87.9941 15.8522H85.9586L83.4264 10.5344H75.9597L73.5126 15.8522H71.4771L78.8856 0.335938H80.7109L87.9941 15.8522ZM79.7982 2.54872L76.8724 8.71416H82.6212L79.7982 2.54872Z" fill="black"/>
                          <path d="M113.753 13.0945C112.859 13.9243 110.85 16.1772 106.287 16.1772C102.077 16.1772 97.6567 13.4469 97.6567 8.08896C97.6567 2.731 102.077 0.000712477 106.027 0.000712477C107.422 -0.0156198 108.806 0.248993 110.096 0.778699C111.386 1.30841 112.555 2.0923 113.534 3.08344L112.228 4.34597C111.378 3.61879 109.221 1.8209 106.067 1.8209C102.086 1.8209 99.491 4.86348 99.491 8.06665C99.491 11.2698 102.086 14.3749 106.376 14.3749C107.53 14.3961 108.675 14.171 109.734 13.7147C110.794 13.2585 111.743 12.5815 112.519 11.7293L113.753 13.0945Z" fill="black"/>
                          <path d="M139.58 15.8522H126.32V0.335938H139.102V2.15613H128.15V6.89397H133.917V8.71416H128.15V14.032H139.58V15.8522Z" fill="black"/>
                          <path d="M213.398 15.8522H200.147V0.335938H212.924V2.15613H201.972V6.89397H207.739V8.71416H201.972V14.032H213.398V15.8522Z" fill="black"/>
                          <path d="M236.885 15.8522H225.285V0.335938H227.114V14.032H236.885V15.8522Z" fill="black"/>
                          <path d="M249.635 15.8522H247.81V0.335938H249.635V15.8522Z" fill="black"/>
                          <path d="M269.032 15.8522H267.207V2.15613H261.521V0.335938H274.719V2.15613H269.032V15.8522Z" fill="black"/>
                          <path d="M300 15.8522H286.767V0.335938H299.548V2.15613H288.592V6.89397H294.372V8.71416H288.592V14.032H300V15.8522Z" fill="black"/>
                          <path d="M175.46 8.30355L178.202 12.9343C175.166 12.7499 172.061 12.6577 168.888 12.6577C165.756 12.6577 162.656 12.7559 159.636 12.9254L162.491 8.25894L155.574 3.35156L159.225 13.6124L160.057 15.9858C162.947 15.849 165.888 15.7791 168.879 15.7761C171.984 15.7761 175.048 15.852 178.055 15.9992L178.95 13.0994L182.363 3.38279L175.46 8.30355Z" fill="black"/>
                          <path d="M170.96 5.3898L168.92 3.35547L166.88 5.3898L168.92 7.42859L170.96 5.3898Z" fill="black"/>
                          <path d="M168.106 8.29995L166.061 6.26562L164.025 8.29995L166.061 10.3343L168.106 8.29995Z" fill="black"/>
                          <path d="M171.877 6.27353L169.837 8.30859L171.878 10.3429L173.918 8.30788L171.877 6.27353Z" fill="black"/>
                        </svg>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="ms-content-body"
                      style="word-break:break-word;font-family:'Inter', Helvetica, Arial, sans-serif;font-size:16px;line-height:24px;">
                      <table style="width: 87%;margin: 38px auto;border-spacing: 0px;">
                        <tbody style="width: 100%;">
                          <tr>
                            <td>
                              <div style="height: 162px;">
                                <img style="width: 100%;height: 100%;object-fit: cover;" src="https://d396g00xwrhdnt.cloudfront.net/content/bp_Pool_01_1_98108d0ff4.png?updated_at=2022-10-28T19:23:47.507Z" alt="pool">
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td style="border: 1px solid white;border-top: 0px; padding-left: 37px;padding-top: 33px;">
                              <h1 style="font-size: 22px;font-weight: 300;">${departament}</h1>
                              <p style="font-size: 16px; font-weight: 600;">${affiliateId}</p>
                              <p style="font-size: 12px; font-weight: 400;padding-top: 15px;margin-bottom: 70px;">
                              ${messsage}</p>
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
                        style="border-collapse:collapse;width:600px;margin-top:0;margin-bottom:0;margin-right:auto;margin-left:auto;background-color: #fff;">
                        <tr>
                          <td class="ms-content-body" align="center"
                            style="word-break:break-word;font-family:'Inter', Helvetica, Arial, sans-serif;font-size:16px;line-height:16px;padding-right:50px;padding-left:50px;">
                            <p class="small"
                              style="margin-top:20px;margin-bottom:20px;margin-right:0;margin-left:0;color:black;font-size:11px;line-height:21px;">
                              www.PalaceElite.com
                            </p>
                            <p class="small"
                              style="margin-top:20px;margin-bottom:20px;margin-right:0;margin-left:0;color:black;font-size:11px;line-height:21px;">
                              US, CA, Elite Members 1-888-987-7655 MX, Elite Members 800-226-4634
                              WW Direct, Elite Members +52-998-234-0616
                            </p>
                            <p class="small"
                              style="margin-top:20px;margin-bottom:20px;margin-right:0;margin-left:0;color:black;font-size:11px;line-height:21px;">
                              2021 ELITE Members, Palace Resorts
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
  </html>`
}
