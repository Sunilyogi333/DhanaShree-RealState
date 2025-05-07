// ! DO NOT CHANGE THIS FILE UNLESS REQUIREMENT CHANGES OF MAIL TEMPLATE
export const generateHtml = (name: string, date: string, body: string) => {
  return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Connect DhanaShree Email template</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />
</head>

<body style="
          margin: 0;
          font-family: 'Poppins', sans-serif;
          background: #ffffff;
          font-size: 14px;
        ">
    <div style="
            max-width: 680px;
            margin: 0 auto;
            background: #f4f7ff;
            background-size: 800px 452px;
            font-size: 14px;
            color: #434343;
          ">


        <main>
            <div style="
                margin: 0;
                padding: 10px 10px 10px;
                text-align: center;
              ">
                <div style="width: 100%; max-width: 489px; margin: 0 auto;">
                    <p style="
                    margin: 0;
                    margin-top: 17px;
                    font-size: 16px;
                    font-weight: 500;
                  ">
                        Hey ${name},
                    </p>
                    ${body}
                </div>
            </div>

            <p style="
                max-width: 400px;
                margin: 0 auto;
                margin-top: 40px;
                text-align: center;
                font-weight: 500;
                color: #8c8c8c;
              ">
                Need help? Ask at
                <a href="mailto:info.connectDhanaShree@gmail.com"
                    style="color: #499fb6; text-decoration: none;">info.connectDhanaShree@gmail.com</a>
                or visit our
                <a href="" target="_blank" style="color: #499fb6; text-decoration: none;">Help Center</a>
            </p>
        </main>

        <footer style="
              width: 100%;
              max-width: 490px;
              margin: 20px auto 0;
              padding-bottom: 20px;
              text-align: center;
              border-top: 1px solid #e6ebf1;
            ">
            <p style="
                margin: 0;
                margin-top: 40px;
                font-size: 16px;
                font-weight: 600;
                color: #434343;
              ">
                Connect Dhanashree
            </p>
            <p style="margin: 0; margin-top: 8px; color: #434343;">
                Balkhumari, Lalitpur, Nepal
            </p>
            <p style="margin: 0; margin-top: 16px; color: #434343;">
                Copyright © 2025 Company. All rights reserved.
            </p>
        </footer>
    </div>
</body>

</html>`
}
