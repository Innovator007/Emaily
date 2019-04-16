const keys = require('../../config/keys');

module.exports = survey => {
    return `
        <html>
            <body>
                <div style="text-align: center">
                    <h3>We would like to have your valuable input.Your input matters a lot!</h3>
                    <p>Please answer the following question for us:</p>
                    <p>${survey.body}</p>
                    <div>
                        <a style="text-decoration:none;color: #000;padding: 10px 20px;border: 1px solid #ccc;border-radius:20px;" href="${keys.redirectUri}/api/surveys/${survey.id}/yes">Yes</a>
                        <a style="text-decoration:none;color: #000;padding: 10px 20px;border: 1px solid #ccc;border-radius:20px;" href="${keys.redirectUri}/api/surveys/${survey.id}/no">No</a>
                    </div>
                </div>
            </body>
        </html>
    `;
};