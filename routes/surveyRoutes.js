const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const Survey = mongoose.model('Survey');
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

module.exports = app => {
    app.get("/api/surveys",requireLogin,async (req,res) => {
       const surveys = await Survey.find({ _user: req.user.id });
       res.send(surveys); 
    });
    app.get('/api/surveys/:surveyId/:choice', (req,res) => {
        res.send("Thanks for your valuable feedback!");
    });
    app.post("/api/surveys/webhooks", (req,res) => {
        console.log(req.body);
        const p = new Path('/api/surveys/:surveyId/:choice');
        _.chain(req.body)
            .map(({ url, email }) => {
                const match = p.test(new URL(url).pathname);
                if(match) {
                    return { email, surveyId: match.surveyId, choice: match.choice };
                }
            })
            .compact()
            .uniqBy('email', 'surveyId')
            .each(({ surveyId, email, choice }) => {
                Survey.updateOne({
                    "_id": surveyId,
                    "recipients": {
                        $elemMatch: { email: email, responded: false }
                    }
                }, {
                    $inc : { [choice]: 1 },
                    $set: { 'recipients.$.responded': true },
                    lastResponded: new Date()
                }).exec();
            })
            .value();
        res.send({});
    })
    app.post("/api/surveys", requireLogin, requireCredits, async (req,res) => {
        const { title, body, subject, recipients } = req.body;
        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        });
        //sending emails
        const mailer = new Mailer(survey, surveyTemplate(survey));
        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();
            res.send(user);
        } catch(err) {
            res.status(422).send(err);
        }
    });
}